const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.resolve(__dirname, "..");
const DATA_FILE = path.join(ROOT, "data", "mice.js");
const REPORT_DIR = path.join(ROOT, "reports");
const REPORT_FILE = path.join(REPORT_DIR, "official-spec-audit.json");

function loadCatalog() {
  const source = fs.readFileSync(DATA_FILE, "utf8");
  const context = { window: {} };
  vm.createContext(context);
  vm.runInContext(source, context);
  return Array.isArray(context.window.MOUSE_DATA) ? context.window.MOUSE_DATA : [];
}

function isLikelyProductUrl(url) {
  return /\/(products?|shop|mice|mouse|gaming-mice)\//i.test(url) || /\.html/i.test(url);
}

function decodeHtml(value) {
  return String(value || "")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, "\"")
    .replace(/&#39;/gi, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">");
}

function stripHtml(html) {
  return decodeHtml(
    String(html || "")
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<noscript[\s\S]*?<\/noscript>/gi, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim()
  );
}

function maxNumber(values) {
  return values.length ? Math.max.apply(null, values) : null;
}

function extractUnitValues(text, unitPattern) {
  const matches = [];
  const regex = new RegExp("(\\d{1,3}(?:[ .,]\\d{3})+|\\d{1,5}(?:[.,]\\d+)?)\\s*(?:" + unitPattern + ")", "ig");
  let match = regex.exec(text);

  while (match) {
    if (!match[1]) {
      match = regex.exec(text);
      continue;
    }

    const numeric = Number.parseFloat(match[1].replace(/[ ,]/g, "").replace(",", "."));

    if (Number.isFinite(numeric)) {
      matches.push(numeric);
    }

    match = regex.exec(text);
  }

  return matches;
}

function extractDpi(text) {
  const direct = extractUnitValues(text, "dpi");
  return maxNumber(direct);
}

function extractPolling(text) {
  const contextMatches = String(text || "").match(/[^.!?\n]{0,120}(?:polling|report(?:ing)? rate|usb report rate|hyperpolling|report rate)[^.!?\n]{0,120}[.!?]?/ig) || [];
  const scopedText = contextMatches.join(" ");
  const hz = extractUnitValues(scopedText, "hz");
  const kRegex = /(\d{1,2}(?:[.,]\d+)?)\s*k(?:hz)?\b/ig;
  const kValues = [];
  let match = kRegex.exec(scopedText);

  while (match) {
    const numeric = Number.parseFloat(match[1].replace(",", "."));
    if (Number.isFinite(numeric)) {
      kValues.push(numeric * 1000);
    }
    match = kRegex.exec(scopedText);
  }

  return maxNumber(hz.concat(kValues));
}

function extractWeight(text) {
  const candidates = String(text || "").match(/[^.!?\n]{0,140}(?:weight|weighs|weighing|lightweight|at just|just|ultra-light)[^.!?\n]{0,140}[.!?]?/ig) || [];
  const grams = extractUnitValues(candidates.join(" "), "g\\b|grams?\\b");
  const sane = grams.filter((value) => value >= 20 && value <= 250);
  return sane.length ? Math.min.apply(null, sane) : null;
}

function detectShape(text) {
  const lower = String(text || "").toLowerCase();

  if (/(ambidextrous|ambidextrie|ambidextre|symmetrical|symmetric design|symmetric shape|symmetrical shape)/i.test(lower)) {
    return {
      shape: "Ambidextre",
      evidence: "Matched ambidextrous/symmetrical wording on the product page."
    };
  }

  if (/(ergonomic|ergonomique|right-handed|right hand|for right-handed|for right hand|right-handed ergonomic|vertical ergonomic)/i.test(lower)) {
    return {
      shape: "Ergonomique",
      evidence: "Matched ergonomic/right-handed wording on the product page."
    };
  }

  return null;
}

function collectSnippets(text) {
  const sentences = String(text || "").match(/[^.!?]{0,140}(?:ambidextrous|ambidextre|symmetrical|ergonomic|right-handed|dpi|hz|gram|weight)[^.!?]{0,140}[.!?]?/ig) || [];
  return sentences.slice(0, 12).map((item) => item.trim());
}

async function fetchPage(url) {
  const response = await fetch(url, {
    redirect: "follow",
    headers: {
      "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) CodexSpecAudit/1.0"
    }
  });

  if (!response.ok) {
    throw new Error("HTTP " + response.status);
  }

  return response.text();
}

async function main() {
  const args = process.argv.slice(2);
  const limitIndex = args.indexOf("--limit");
  const limit = limitIndex !== -1 && args[limitIndex + 1]
    ? Number.parseInt(args[limitIndex + 1], 10)
    : Number.POSITIVE_INFINITY;

  const catalog = loadCatalog();
  const targets = catalog
    .map((item) => ({
      name: item.name,
      brand: item.brand,
      currentShape: item.shapeValue,
      currentSpecs: item.specMap,
      source: (item.sources || [])[0] || null
    }))
    .filter((item) => item.source && item.source.url && isLikelyProductUrl(item.source.url))
    .slice(0, limit);

  const report = [];

  for (const item of targets) {
    const entry = {
      name: item.name,
      brand: item.brand,
      url: item.source.url,
      currentShape: item.currentShape,
      currentSpecs: item.currentSpecs,
      fetched: false
    };

    try {
      const html = await fetchPage(item.source.url);
      const text = stripHtml(html);
      const shape = detectShape(text);
      const dpi = extractDpi(text);
      const polling = extractPolling(text);
      const weight = extractWeight(text);

      entry.fetched = true;
      entry.detectedShape = shape ? shape.shape : null;
      entry.shapeEvidence = shape ? shape.evidence : null;
      entry.detectedSpecs = {
        dpi: dpi ? String(Math.round(dpi)) + " DPI" : null,
        pollingRate: polling ? String(Math.round(polling)) + " Hz" : null,
        weight: weight ? String(Math.round(weight)) + " g" : null
      };
      entry.snippets = collectSnippets(text);
    } catch (error) {
      entry.error = error.message;
    }

    report.push(entry);
    console.log(entry.fetched ? "OK  " + entry.name : "ERR " + entry.name + " :: " + entry.error);
  }

  fs.mkdirSync(REPORT_DIR, { recursive: true });
  fs.writeFileSync(REPORT_FILE, JSON.stringify(report, null, 2), "utf8");
  console.log("Wrote " + REPORT_FILE);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
