const fs = require("fs-extra");
const path = require("path");
const axios = require("axios");

const OUTPUT_DIR = path.join(__dirname, "../assets/mice");

const mice = [
  "Logitech G203 Lightsync",
  "Logitech G403 Hero",
  "Logitech G403 Lightspeed",
  "Logitech G603 Lightspeed",
  "Logitech G604 Lightspeed",
  "Logitech G600 MMO",
  "Logitech MX Anywhere 3",
  "Logitech MX Ergo",
  "Logitech M510",
  "Logitech M705 Marathon"
];

// sources simples (images directes sans API)
function buildSearchUrls(query) {
  const q = encodeURIComponent(query);

  return [
    `https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch=${q}&format=json`,
  ];
}

// filtre basique
function isValid(name) {
  const bad = ["setup", "desk", "hand", "keyboard", "lifestyle"];
  return !bad.some(x => name.toLowerCase().includes(x));
}

// récup image depuis Wikimedia
async function getImage(query) {
  const url = buildSearchUrls(query)[0];

  const res = await axios.get(url);

  const results = res.data?.query?.search;

  if (!results || results.length === 0) return null;

  const best = results.find(r => isValid(r.title));

  return best ? best.title : null;
}

async function run() {
  await fs.ensureDir(OUTPUT_DIR);

  for (const mouse of mice) {
    console.log(`🔎 ${mouse}`);

    try {
      const imgName = await getImage(mouse);

      if (!imgName) {
        console.log("❌ aucune image trouvée");
        continue;
      }

      const fileName = mouse.toLowerCase().replace(/ /g, "-") + ".jpg";
      const filePath = path.join(OUTPUT_DIR, fileName);

      // fallback placeholder propre (temporaire)
      const imageUrl = `https://via.placeholder.com/600x400.png?text=${encodeURIComponent(mouse)}`;

      const response = await axios({ url: imageUrl, responseType: "stream" });

      await new Promise((resolve, reject) => {
        response.data.pipe(fs.createWriteStream(filePath))
          .on("finish", resolve)
          .on("error", reject);
      });

      console.log(`✅ saved ${fileName}`);

    } catch (e) {
      console.log(`❌ error ${mouse}`);
    }
  }
}

run();;