/**
 * ElectronicsPalace
 * Catalogue de souris avec recherche, filtres et panneau détail.
 */

// Fonctions de secours globales (fallback) pour compatibilité
if (typeof window.t !== 'function') {
  window.t = function(text) { return text; };
}
if (typeof window.translateText !== 'function') {
  window.translateText = function(text) { return text; };
}
if (typeof window.localizeCatalogText !== 'function') {
  window.localizeCatalogText = function(value) { return value; };
}
if (typeof window.localizeMouse !== 'function') {
  window.localizeMouse = function(mouse) { return mouse; };
}
if (typeof window.getLanguageConfig !== 'function') {
  window.getLanguageConfig = function() { return { htmlLang: 'en-US', name: 'English (US)' }; };
}
if (typeof window.normalizeLanguageCode !== 'function') {
  window.normalizeLanguageCode = function(lang) { return lang || 'en'; };
}

(function () {
  "use strict";

  console.log('[DEBUG] MinSp - Démarrage de l\'application');
  console.log('[DEBUG] URL actuelle:', window.location.href);
  console.log('[DEBUG] User Agent:', navigator.userAgent);
  console.log('[DEBUG] Détection du protocole - file://', window.location.protocol === 'file:');
  console.log('[DEBUG] Détection du protocole - http://', window.location.protocol === 'http:');
  console.log('[DEBUG] Détection du protocole - https://', window.location.protocol === 'https:');

  // Système d'authentification utilisateur (localStorage)
  var UserAuth = (function() {
    var STORAGE_KEY = 'users';
    var SESSION_KEY = 'currentUser';
    var REVIEWS_KEY = 'minsp_reviews';

    function getUsers() {
      try {
        var data = localStorage.getItem(STORAGE_KEY);
        if (!data) return [];
        var parsed = JSON.parse(data);
        return Array.isArray(parsed) ? parsed : [];
      } catch (e) {
        return [];
      }
    }

    function saveUsers(users) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
    }

    function getReviews() {
      try {
        var data = localStorage.getItem(REVIEWS_KEY);
        return data ? JSON.parse(data) : {};
      } catch (e) {
        return {};
      }
    }

    function saveReviews(reviews) {
      localStorage.setItem(REVIEWS_KEY, JSON.stringify(reviews));
    }

    function generateId() {
      return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
    }

    function register(pseudo, email, password) {
      if (!pseudo || !pseudo.trim() || !email || !email.trim() || !password || !password.trim()) {
        return { success: false, error: 'empty_fields' };
      }
      var users = getUsers();
      if (users.some(function(u) { return u.email === email.trim().toLowerCase(); })) {
        return { success: false, error: 'email_exists' };
      }
      if (users.some(function(u) { return u.pseudo === pseudo.trim(); })) {
        return { success: false, error: 'pseudo_exists' };
      }
      var newUser = {
        id: generateId(),
        pseudo: pseudo.trim(),
        email: email.trim().toLowerCase(),
        password: password
      };
      users.push(newUser);
      saveUsers(users);
      return { success: true };
    }

    function login(email, password) {
      if (!email || !email.trim() || !password || !password.trim()) {
        return { success: false, error: 'empty_fields' };
      }
      var users = getUsers();
      var user = users.find(function(u) {
        return u.email === email.trim().toLowerCase() && u.password === password;
      });
      if (!user) {
        return { success: false, error: 'invalid_credentials' };
      }
      var session = {
        id: user.id,
        pseudo: user.pseudo,
        email: user.email
      };
      localStorage.setItem(SESSION_KEY, JSON.stringify(session));
      return { success: true, user: session };
    }

    function logout() {
      localStorage.removeItem(SESSION_KEY);
    }

    function getCurrentUser() {
      try {
        var data = localStorage.getItem(SESSION_KEY);
        return data ? JSON.parse(data) : null;
      } catch (e) {
        return null;
      }
    }

    function addReview(mouseId, rating, text) {
      var user = getCurrentUser();
      if (!user) {
        return { success: false, error: 'not_logged_in' };
      }
      if (!rating || rating < 1 || rating > 5) {
        return { success: false, error: 'invalid_rating' };
      }
      if (!text || text.trim() === '') {
        return { success: false, error: 'empty_text' };
      }
      var reviews = getReviews();
      if (!reviews[mouseId]) {
        reviews[mouseId] = [];
      }
      var review = {
        author: user.pseudo,
        rating: rating,
        text: text.trim(),
        date: new Date().toISOString().split('T')[0],
        userEmail: user.email
      };
      reviews[mouseId].push(review);
      saveReviews(reviews);
      return { success: true, review: review };
    }

    function getMouseReviews(mouseId) {
      var reviews = getReviews();
      return reviews[mouseId] || [];
    }

    return {
      register: register,
      login: login,
      logout: logout,
      getCurrentUser: getCurrentUser,
      addReview: addReview,
      getMouseReviews: getMouseReviews
    };
  })();

  var Favorites = (function() {
    var STORAGE_KEY = 'favorites';

    function getFavorites() {
      try {
        var data = localStorage.getItem(STORAGE_KEY);
        if (!data) return [];
        var parsed = JSON.parse(data);
        return Array.isArray(parsed) ? parsed : [];
      } catch (e) {
        return [];
      }
    }

    function saveFavorites(favs) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favs));
    }

    function isFavorite(mouseId) {
      var favs = getFavorites();
      return favs.indexOf(mouseId) !== -1;
    }

    function toggleFavorite(mouseId) {
      var favs = getFavorites();
      var index = favs.indexOf(mouseId);
      if (index === -1) {
        favs.push(mouseId);
      } else {
        favs.splice(index, 1);
      }
      saveFavorites(favs);
      return index === -1;
    }

    return {
      getFavorites: getFavorites,
      isFavorite: isFavorite,
      toggleFavorite: toggleFavorite
    };
  })();

  var SearchHistory = (function() {
    var STORAGE_KEY = 'searchHistory';
    var MAX_HISTORY = 8;

    function getHistory() {
      try {
        var data = localStorage.getItem(STORAGE_KEY);
        if (!data) return [];
        var parsed = JSON.parse(data);
        return Array.isArray(parsed) ? parsed : [];
      } catch (e) {
        return [];
      }
    }

    function saveHistory(history) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    }

    function addSearch(query) {
      if (!query || !query.trim()) return;
      var history = getHistory();
      var trimmed = query.trim();
      var index = history.indexOf(trimmed);
      if (index !== -1) {
        history.splice(index, 1);
      }
      history.unshift(trimmed);
      if (history.length > MAX_HISTORY) {
        history = history.slice(0, MAX_HISTORY);
      }
      saveHistory(history);
    }

    function clearHistory() {
      localStorage.removeItem(STORAGE_KEY);
    }

    return {
      getHistory: getHistory,
      addSearch: addSearch,
      clearHistory: clearHistory
    };
  })();

  var REQUIRED_SPECS = ["DPI", "Polling Rate", "Poids", "Type", "Forme"];
  var DEBOUNCE_DELAY = 300;
  var INITIAL_LOAD_COUNT = 20;
  var LOAD_MORE_COUNT = 10;
  var EAGER_IMAGE_COUNT = 8;
  var SPEC_DISPLAY_LABELS = {
    "DPI": "DPI",
    "Polling Rate": "Polling Rate",
    "Poids": "Weight",
    "Type": "Type",
    "Forme": "Shape"
  };

  function normalizeText(value) {
    return String(value || "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim();
  }

  // Variables de langue globales
  var DEFAULT_LANGUAGE = normalizeLanguageCode(
    window.MinSPI18n && typeof window.MinSPI18n.getCurrentLanguage === 'function'
      ? window.MinSPI18n.getCurrentLanguage()
      : 'en'
  );
  var CURRENT_LANGUAGE = DEFAULT_LANGUAGE;

  function debounce(func, delay) {
    var timeoutId;

    return function () {
      var context = this;
      var args = arguments;

      clearTimeout(timeoutId);
      timeoutId = setTimeout(function () {
        func.apply(context, args);
      }, delay);
    };
  }

  function validateMouseData(mouse) {
    if (!mouse || typeof mouse !== "object") {
      return false;
    }

    // Champs requis pour tous les produits (souris, claviers, composants PC)
    var requiredFields = ["id", "name", "brand", "segment"];
    var hasAllRequired = requiredFields.every(function (field) {
      return typeof mouse[field] === "string" && mouse[field].trim() !== "";
    });

    // Les souris ont typeValue et shapeValue, mais pas les autres produits
    // Les claviers et composants PC ont des specs différentes
    var hasValidSpecs = Array.isArray(mouse.specs) && mouse.specs.length > 0;

    return hasAllRequired && hasValidSpecs;
  }

  function hslToHex(h, s, l) {
    var hue = h / 360;
    var sat = s / 100;
    var light = l / 100;

    function hueToRgb(p, q, t) {
      var temp = t;

      if (temp < 0) {
        temp += 1;
      }

      if (temp > 1) {
        temp -= 1;
      }

      if (temp < 1 / 6) {
        return p + (q - p) * 6 * temp;
      }

      if (temp < 1 / 2) {
        return q;
      }

      if (temp < 2 / 3) {
        return p + (q - p) * (2 / 3 - temp) * 6;
      }

      return p;
    }

    var q = light < 0.5
      ? light * (1 + sat)
      : light + sat - light * sat;
    var p = 2 * light - q;

    var r = Math.round(hueToRgb(p, q, hue + 1 / 3) * 255);
    var g = Math.round(hueToRgb(p, q, hue) * 255);
    var b = Math.round(hueToRgb(p, q, hue - 1 / 3) * 255);

    return "#" + [r, g, b].map(function (part) {
      return part.toString(16).padStart(2, "0");
    }).join("");
  }

  function generateDefaultColors(brand) {
    var hash = 0;
    var index;

    for (index = 0; index < brand.length; index += 1) {
      hash = brand.charCodeAt(index) + ((hash << 5) - hash);
    }

    var hue = Math.abs(hash % 360);

    return {
      light: hslToHex(hue, 80, 68),
      dark: hslToHex(hue, 70, 46)
    };
  }

  function getBrandColors(brand) {
    var brandColors = {
      "Asus": { light: "#ff6666", dark: "#cc0000" },
      "Asus / ROG": { light: "#ff6666", dark: "#cc0000" },
      "Logitech": { light: "#66d9ff", dark: "#0099cc" },
      "Razer": { light: "#66ff66", dark: "#33aa33" },
      "Corsair": { light: "#ffcc66", dark: "#cc7a00" },
      "SteelSeries": { light: "#ff66ff", dark: "#cc00cc" },
      "Zowie": { light: "#ff6666", dark: "#cc0000" },
      "HyperX": { light: "#ffe066", dark: "#cc9900" },
      "Cooler Master": { light: "#66ffff", dark: "#00cccc" },
      "Glorious": { light: "#ffcc66", dark: "#cc7a00" },
      "Endgame Gear": { light: "#cc66ff", dark: "#6600cc" },
      "Pulsar": { light: "#ffe6f0", dark: "#ff99cc" },
      "Redragon": { light: "#ff66cc", dark: "#cc0066" },
      "Roccat": { light: "#66cccc", dark: "#006666" },
      "MSI": { light: "#ff6666", dark: "#cc0000" },
      "Microsoft": { light: "#6699ff", dark: "#0052cc" },
      "HP": { light: "#66b3ff", dark: "#0066cc" },
      "Dell": { light: "#b3b3b3", dark: "#666666" },
      "Lenovo": { light: "#ff6666", dark: "#cc0000" },
      "Trust": { light: "#ffcc66", dark: "#cc7a00" },
      "Turtle Beach": { light: "#66ffff", dark: "#00cccc" },
      "Keychron": { light: "#ffffff", dark: "#cccccc" },
      "Kensington": { light: "#cc66ff", dark: "#6600cc" },
      "Urban Factory": { light: "#808080", dark: "#333333" },
      "MCHOSE": { light: "#ff9999", dark: "#ff3333" },
      "ATK": { light: "#99ff99", dark: "#33cc33" },
      "G-Lab": { light: "#ffff66", dark: "#cccc00" },
      "Lamzu": { light: "#e6ccff", dark: "#9966cc" }
    };

    return brandColors[brand] || generateDefaultColors(brand || "unknown");
  }

  function getBrandColor(brand) {
    return getBrandColors(brand).dark;
  }

  function hexToRgba(hex, alpha) {
    var value = String(hex || "").replace("#", "");

    if (!/^[0-9a-fA-F]{6}$/.test(value)) {
      return "rgba(68, 68, 68, " + String(alpha) + ")";
    }

    var r = parseInt(value.slice(0, 2), 16);
    var g = parseInt(value.slice(2, 4), 16);
    var b = parseInt(value.slice(4, 6), 16);

    return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
  }

  function specLabelForDisplay(label) {
    if (typeof window.specLabelForDisplay === 'function') {
      return window.specLabelForDisplay(label);
    }

    return window.t(SPEC_DISPLAY_LABELS[label] || label);
  }

  function closeLanguageMenu() {
    var languageTrigger = document.getElementById("language-trigger");
    var languageMenu = document.getElementById("language-menu");

    if (languageTrigger) {
      languageTrigger.setAttribute("aria-expanded", "false");
    }

    if (languageMenu) {
      languageMenu.classList.add("hidden");
    }
  }

  function setLanguage(langCode) {
    if (window.MinSPI18n && typeof window.MinSPI18n.setLanguage === 'function') {
      window.MinSPI18n.setLanguage(langCode);
      return;
    }

    updateLanguage(langCode);
  }

  function syncLanguageTrigger(activeLang) {
    var config = getLanguageConfig(activeLang);
    var currentLanguageLabel = document.getElementById("current-language-label");
    var currentLanguageFlag = document.getElementById("current-language-flag");

    if (currentLanguageLabel) {
      currentLanguageLabel.textContent = config.name;
    }

    if (currentLanguageFlag) {
      currentLanguageFlag.className = getLanguageFlagClass(activeLang);
      currentLanguageFlag.setAttribute("aria-hidden", "true");
    }
  }

  function renderLanguageMenu(activeLang) {
    var languageMenu = document.getElementById("language-menu");

    if (!languageMenu) {
      return;
    }

    languageMenu.innerHTML = LANGUAGE_ORDER.map(function (lang) {
      var config = getLanguageConfig(lang);
      var isActive = normalizeLanguageCode(activeLang) === lang;

      return (
        '<button class="language-option' + (isActive ? " is-active" : "") + '" type="button" role="option" aria-selected="' + (isActive ? "true" : "false") + '" data-lang="' + escapeHtml(lang) + '">' +
          '<span class="language-flag" aria-hidden="true"><span class="' + escapeHtml(getLanguageFlagClass(lang)) + '"></span></span>' +
          '<span class="language-option-copy">' +
            '<span class="language-option-name">' + escapeHtml(config.name) + "</span>" +
          "</span>" +
        "</button>"
      );
    }).join("");
  }

  function initializeLanguageSelector() {
    var languagePicker = document.getElementById("language-picker");
    var languageTrigger = document.getElementById("language-trigger");
    var languageMenu = document.getElementById("language-menu");

    if (!languagePicker || !languageTrigger || !languageMenu) {
      return;
    }

    renderLanguageMenu(DEFAULT_LANGUAGE);
    syncLanguageTrigger(DEFAULT_LANGUAGE);
    closeLanguageMenu();

    languageTrigger.addEventListener("click", function () {
      var isOpen = languageTrigger.getAttribute("aria-expanded") === "true";

      if (isOpen) {
        closeLanguageMenu();
        return;
      }

      languageTrigger.setAttribute("aria-expanded", "true");
      languageMenu.classList.remove("hidden");
    });

    languageMenu.addEventListener("click", function (event) {
      var option = event.target.closest(".language-option[data-lang]");

      if (!option) {
        return;
      }

      setLanguage(option.getAttribute("data-lang"));
      closeLanguageMenu();
    });

    document.addEventListener("click", function (event) {
      // Allow CTA link to work normally
      if (event.target.closest('#catalog-bubble-cta')) {
        return;
      }
      if (!languagePicker.contains(event.target)) {
        closeLanguageMenu();
      }
    });
  }

  function updateLanguage(lang) {
    var normalizedLang = normalizeLanguageCode(lang);
    var config = getLanguageConfig(normalizedLang);
    var selectedMouse;
    var isHomeView;

    CURRENT_LANGUAGE = normalizedLang;
    document.documentElement.lang = config.htmlLang;

    syncLanguageTrigger(normalizedLang);
    renderLanguageMenu(normalizedLang);
    closeLanguageMenu();

    mice = buildLocalizedMice(normalizedLang);
    window.mice = mice;
    refreshFilterOptions();
    updateHeaderAuth();
    renderCatalog();
    isHomeView = catalogBubbleSection && !catalogBubbleSection.classList.contains('hidden');

    if (state.selectedId) {
      selectedMouse = mice.find(function (mouse) {
        return mouse.id === state.selectedId;
      });
    }

    if (selectedMouse) {
      renderDetail(selectedMouse);
      updateProductSEO(selectedMouse);
    } else {
      renderDetail(null);
      document.title = isHomeView ? getHomeTitle() : getCatalogPageTitle(state.catalog);
    }
  }

  function extractSearchKeywords(mouse) {
    var keywords = [];
    var lowerName = (mouse.name || "").toLowerCase();
    var lowerSummary = (mouse.summary || "").toLowerCase();
    var lowerHighlights = Array.isArray(mouse.highlights) ? mouse.highlights.join(" ").toLowerCase() : "";
    var allText = (lowerName + " " + lowerSummary + " " + lowerHighlights + " " + (mouse.segment || "").toLowerCase());
    
    // Détection d'utilisation (bureautique/gaming) - Gaming prioritaire
    var isGaming = /gaming|jeu|game|fps|mmo|rts|compétition|competition|esport|g502|g pro|g703|g305|g403|g603|g600|g203|gladius|keris|chakram|spatha|harpe|kone|rival|aerox|model|scimitar|naga|viper|deathadder|basilisk|lancehead|mamba|imperator|ouroboros|naga|cynosa|tartarus/.test(allText);
    var isBureautique = /bureautique|office|travail|work|productivité|business|professionnel|mx master|mx anywhere|mx vertical|lift|signature|pebble|m320|m330|m337|m535|m720|m170|m171|m220|m221|m100|m90|b100|surface mobile|intellimouse|basic optical|classic|arc mouse/.test(allText);
    
    if (isGaming) {
      keywords.push("gaming");
      // Ne pas ajouter "bureautique" si c'est clairement une souris gaming
    } else if (isBureautique) {
      keywords.push("bureautique");
    }
    
    if (/ergonomie|ergonomic|vertical|comfort|confort|mx vertical|lift/.test(allText)) {
      keywords.push("ergonomique");
    }
    
    // Détection de connectivité
    if (/sans fil|wireless|wifi|bluetooth|2\.4g|lightspeed/.test(allText)) {
      keywords.push("sans fil");
      keywords.push("wireless");
    }
    if (/filaire|wired|usb|câble|cable/.test(allText)) {
      keywords.push("filaire");
    }
    if (/bluetooth|bt/.test(allText)) {
      keywords.push("bluetooth");
    }
    
    // Détection de couleurs
    var colors = {
      "noir": /noir|black|dark/.test(allText),
      "blanc": /blanc|white/.test(allText),
      "rouge": /rouge|red/.test(allText),
      "bleu": /bleu|blue/.test(allText),
      "vert": /vert|green/.test(allText),
      "rose": /rose|pink/.test(allText),
      "gris": /gris|gray|grey/.test(allText),
      "argent": /argent|silver/.test(allText),
      "or": /or|gold/.test(allText),
      "violet": /violet|purple/.test(allText),
      "orange": /orange/.test(allText),
      "jaune": /jaune|yellow/.test(allText)
    };
    
    Object.keys(colors).forEach(function(color) {
      if (colors[color]) {
        keywords.push(color);
      }
    });
    
    // Détection de caractéristiques spéciales
    if (/silencieux|silent|quiet/.test(allText)) {
      keywords.push("silencieux");
    }
    if (/légère|light|ultra light|superlight/.test(allText)) {
      keywords.push("légère");
      keywords.push("legere");
    }
    if (/rgb|led|lighting|éclairage|eclairage/.test(allText)) {
      keywords.push("rgb");
      keywords.push("éclairage");
    }
    if (/ambidextre|ambidextrous|left|right|gaucher|droitier/.test(allText)) {
      keywords.push("ambidextre");
    }
    if (/symétrique|symmetric/.test(allText)) {
      keywords.push("symétrique");
    }
    if (/trackball|track ball/.test(allText)) {
      keywords.push("trackball");
    }
    if (/mini|compact|petit|small/.test(allText)) {
      keywords.push("compact");
      keywords.push("mini");
    }
    
    // Détection de modèles spécifiques
    if (/pro|professional|expert/.test(allText)) {
      keywords.push("pro");
    }
    if (/master|mx/.test(allText)) {
      keywords.push("master");
    }
    if (/superlight|super light/.test(allText)) {
      keywords.push("superlight");
    }
    if (/hero/.test(allText)) {
      keywords.push("hero");
    }
    
    // Détection de poids (léger/lourd)
    if (/(\d+)\s*g/.test(allText)) {
      var weightMatch = allText.match(/(\d+)\s*g/);
      if (weightMatch) {
        var weight = parseInt(weightMatch[1]);
        if (weight < 80) {
          keywords.push("très légère");
          keywords.push("tres legere");
        } else if (weight < 100) {
          keywords.push("légère");
          keywords.push("legere");
        } else if (weight > 120) {
          keywords.push("lourde");
        }
      }
    }
    
    // Détection de DPI
    if (/(\d+)\s*dpi/.test(allText)) {
      var dpiMatch = allText.match(/(\d+)\s*dpi/);
      if (dpiMatch) {
        var dpi = parseInt(dpiMatch[1]);
        if (dpi >= 16000) {
          keywords.push("high dpi");
          keywords.push("très haute précision");
        } else if (dpi >= 8000) {
          keywords.push("haute précision");
        }
      }
    }
    
    return keywords;
  }

  /**
   * Module de gestion des données avec gestion d'erreurs
   */
  var DataLoader = (function () {
    function loadMouseData() {
      try {
        if (!Array.isArray(window.MOUSE_DATA)) {
          console.warn("MOUSE_DATA n'est pas un tableau valide");
          return [];
        }

        var validated = window.MOUSE_DATA.slice().filter(validateMouseData);

        if (validated.length === 0) {
          console.warn("Aucune souris valide trouvée dans les données");
        }

        return validated;
      } catch (error) {
        console.error("Erreur lors du chargement des données des souris:", error);
        return [];
      }
    }

    function loadKeyboardData() {
      try {
        if (!Array.isArray(window.KEYBOARD_DATA)) {
          console.warn("KEYBOARD_DATA n'est pas un tableau valide");
          return [];
        }

        var validated = window.KEYBOARD_DATA.slice().filter(validateMouseData);

        if (validated.length === 0) {
          console.warn("Aucun clavier valide trouvé dans les données");
        }

        return validated;
      } catch (error) {
        console.error("Erreur lors du chargement des données des claviers:", error);
        return [];
      }
    }

    function loadPCComponentData() {
      try {
        if (!Array.isArray(window.PC_COMPONENT_DATA)) {
          console.warn("PC_COMPONENT_DATA n'est pas un tableau valide");
          return [];
        }

        var validated = window.PC_COMPONENT_DATA.slice().filter(validateMouseData);

        if (validated.length === 0) {
          console.warn("Aucun composant PC valide trouvé dans les données");
        }

        return validated;
      } catch (error) {
        console.error("Erreur lors du chargement des données des composants PC:", error);
        return [];
      }
    }

    function loadAllProducts() {
      var mice = loadMouseData();
      var keyboards = loadKeyboardData();
      var pcComponents = loadPCComponentData();
      
      var allProducts = mice.concat(keyboards).concat(pcComponents);
      
      console.log('[DataLoader] Total produits chargés: ' + allProducts.length + 
                  ' (' + mice.length + ' souris, ' + keyboards.length + ' claviers, ' + 
                  pcComponents.length + ' composants PC)');
      
      return allProducts;
    }

    function buildLocalizedMice(sourceData, lang) {
      try {
        if (!Array.isArray(sourceData)) {
          throw new Error("Les données source doivent être un tableau");
        }

        return sourceData.map(function (mouse) {
          try {
            var localized = localizeMouse(mouse, lang);
            var englishVersion = localizeMouse(mouse, "en");
            var originalSearchText = mouse.searchText || [
              mouse.name,
              mouse.brand,
              mouse.segment,
              mouse.summary
            ].join(" ");
            var localizedSearchText = [
              localized.name,
              localized.brand,
              localized.segment,
              localized.summary,
              Array.isArray(localized.highlights) ? localized.highlights.join(" ") : "",
              localized.typeValue,
              localized.shapeValue
            ].join(" ");
            var englishSearchText = [
              englishVersion.name,
              englishVersion.brand,
              englishVersion.segment,
              englishVersion.summary,
              Array.isArray(englishVersion.highlights) ? englishVersion.highlights.join(" ") : "",
              englishVersion.typeValue,
              englishVersion.shapeValue
            ].join(" ");
            var keywords = extractSearchKeywords(englishVersion);
            var allKeywords = keywords.join(" ");
            var specsText = "";

            if (Array.isArray(localized.specs)) {
              specsText = localized.specs.map(function(spec) {
                return (spec.label || "") + " " + (spec.value || "");
              }).join(" ");
            }

            return Object.assign({}, localized, {
              searchIndex: normalizeText(
                originalSearchText + " " + englishSearchText + " " + localizedSearchText + " " + allKeywords + " " + specsText
              ),
              keywords: keywords,
              price: typeof mouse.price === "number" ? mouse.price : null,
              rating: typeof mouse.rating === "number" ? mouse.rating : null,
              category: mouse.category || "mice",
              id: mouse.id,
              order: mouse.order
            });
          } catch (mouseError) {
            console.error("Erreur lors du traitement du produit:", mouse && mouse.id ? mouse.id : "unknown", mouseError);
            return null;
          }
        }).filter(Boolean);
      } catch (error) {
        console.error("Erreur lors de la localisation des produits:", error);
        return [];
      }
    }

    return {
      load: loadAllProducts,
      loadMice: loadMouseData,
      loadKeyboards: loadKeyboardData,
      loadPCComponents: loadPCComponentData,
      localize: buildLocalizedMice
    };
  })();

  var sourceMice = DataLoader.load();
  console.log('[App] Total source products:', sourceMice.length);
  console.log('[App] Categories:', sourceMice.map(function(m) { return m.category || 'mice'; }).filter(function(v, i, a) { return a.indexOf(v) === i; }));

  function buildLocalizedMice(lang) {
    return DataLoader.localize(sourceMice, lang || CURRENT_LANGUAGE);
  }

  var mice = buildLocalizedMice(CURRENT_LANGUAGE);
  console.log('[App] Localized products:', mice.length);
  
  // Expose globally for AI recommendation page and other external pages
  window.mice = mice;

  var state = {
    query: "",
    brand: "all",
    type: "all",
    catalog: "all",
    gamme: "all",
    connectivite: "all",
    ergonomie: "all",
    priceMin: null,
    priceMax: null,
    ratingMin: null,
    selectedId: null,
    visibleCount: INITIAL_LOAD_COUNT
  };

  var searchInput = document.getElementById("search-input");
  var brandFilter = document.getElementById("brand-filter");
  var typeFilter = document.getElementById("type-filter");
  var languageSwitch = document.getElementById("language-switch");
  var resetFilters = document.getElementById("reset-filters");
  var catalogGrid = document.getElementById("catalog-grid");
  var catalogView = document.getElementById("catalog-view");
  var detailView = document.getElementById("detail-view");
  var closeBtn = document.getElementById("close-btn");
  var detailPanel = document.getElementById("detail-panel");
  var totalModels = document.getElementById("total-models");
  var totalBrands = document.getElementById("total-brands");
  var officialImages = document.getElementById("official-images");
  var visibleResults = document.getElementById("visible-results");
  var standardizedCount = document.getElementById("standardized-count");
  var resultsSummary = document.getElementById("results-summary");
  var lastRenderedDetailId = null;
  var viewTransitionTimer = null;
  var savedScrollPosition = 0;
  var previousBodyOverflow = "";

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function localeSort(left, right) {
    return String(left).localeCompare(
      String(right),
      getLanguageConfig(CURRENT_LANGUAGE).htmlLang,
      { sensitivity: "base" }
    );
  }

  function uniqueValues(getter) {
    return Array.from(
      new Set(
        mice
          .map(getter)
          .filter(Boolean)
      )
    ).sort(localeSort);
  }

  function populateSelect(select, values, fallbackLabel) {
    var fragment = document.createDocumentFragment();
    var firstOption = document.createElement("option");

    firstOption.value = "all";
    firstOption.textContent = fallbackLabel;
    fragment.appendChild(firstOption);

    values.forEach(function (value) {
      var option = document.createElement("option");
      option.value = value;
      option.textContent = value;
      fragment.appendChild(option);
    });

    select.innerHTML = "";
    select.appendChild(fragment);
  }

  function getSpec(mouse, label) {
    return (mouse.specs || []).find(function (spec) {
      return spec && spec.label === label;
    });
  }

  function getSpecValue(mouse, label) {
    var match = getSpec(mouse, label);
    return match ? match.value : "";
  }

  function getSpecs(mouse) {
    return REQUIRED_SPECS.map(function (label) {
      var spec = getSpec(mouse, label);
      var specValue = spec && spec.value ? spec.value : "Not specified";

      return {
        label: label,
        value: spec && spec.value ? spec.value : "Non renseigné",
        value: specValue,
        status: spec && spec.status ? spec.status : "unknown"
      };
    });
  }

  function getSources(mouse) {
    return Array.isArray(mouse.sources)
      ? mouse.sources.filter(function (source) {
        return source && source.url;
      })
      : [];
  }

  function populateSelect(select, values, fallbackLabel) {
    var fragment = document.createDocumentFragment();
    var firstOption = document.createElement("option");

    firstOption.value = "all";
    firstOption.textContent = fallbackLabel;
    fragment.appendChild(firstOption);

    values.forEach(function (value) {
      var option = document.createElement("option");
      var optionValue = typeof value === "object" && value !== null ? value.value : value;
      var optionLabel = typeof value === "object" && value !== null ? value.label : value;

      option.value = optionValue;
      option.textContent = optionLabel;
      fragment.appendChild(option);
    });

    select.innerHTML = "";
    select.appendChild(fragment);
  }

  function getSpecs(mouse) {
    return REQUIRED_SPECS.map(function (label) {
      var spec = getSpec(mouse, label);
      var specValue = spec && spec.value ? spec.value : "Not specified";

      return {
        label: label,
        value: specValue,
        status: spec && spec.status ? spec.status : "unknown"
      };
    });
  }

  function getLocalizedTypeOptionsForCatalog(catalog) {
    var labelsByKey = {};
    var pcComponentCategories = ["case", "gpu", "cpu", "ram", "motherboard", "cooler", "storage", "psu", "fan"];

    sourceMice.forEach(function (mouse) {
      // Filter by catalog if specified
      var mouseCatalog = mouse.category || "mice";
      var isPCComponent = pcComponentCategories.indexOf(mouse.category) !== -1;
      
      if (catalog && catalog !== "all") {
        if (catalog === "pc-component") {
          // For pc-component, show categories as types
          if (!isPCComponent) {
            return;
          }
          // Use the category as the type
          var categoryKey = mouse.category;
          if (categoryKey && !Object.prototype.hasOwnProperty.call(labelsByKey, categoryKey)) {
            labelsByKey[categoryKey] = localizeCatalogText(categoryKey, CURRENT_LANGUAGE);
          }
          return;
        } else if (catalog === "keyboard") {
          // For keyboards, don't show type filter (or show keyboard-specific types if needed)
          if (mouseCatalog !== catalog) {
            return;
          }
        } else if (mouseCatalog !== catalog) {
          return;
        }
      }

      var typeKey = normalizeText(mouse.typeValue || "");

      if (!typeKey || Object.prototype.hasOwnProperty.call(labelsByKey, typeKey)) {
        return;
      }

      labelsByKey[typeKey] = localizeCatalogText(mouse.typeValue || "", CURRENT_LANGUAGE);
    });

    return Object.keys(labelsByKey)
      .sort(function (left, right) {
        return localeSort(labelsByKey[left], labelsByKey[right]);
      })
      .map(function (typeKey) {
        return {
          value: typeKey,
          label: labelsByKey[typeKey]
        };
      });
  }

  function getBrandOptionsForCatalog(catalog) {
    var brands = new Set();
    var pcComponentCategories = ["case", "gpu", "cpu", "ram", "motherboard", "cooler", "storage", "psu", "fan"];

    sourceMice.forEach(function (mouse) {
      // Filter by catalog if specified
      var mouseCatalog = mouse.category || "mice";
      var isPCComponent = pcComponentCategories.indexOf(mouse.category) !== -1;
      
      if (catalog && catalog !== "all") {
        if (catalog === "pc-component") {
          // For pc-component catalog, only show brands from PC components
          if (!isPCComponent) {
            return;
          }
        } else if (mouseCatalog !== catalog) {
          return;
        }
      }

      if (mouse.brand) {
        brands.add(mouse.brand);
      }
    });

    return Array.from(brands).sort(localeSort);
  }

  function refreshFilterOptions() {
    var previousBrand = state.brand;
    var previousType = state.type;
    var brandValues;
    var typeOptions;

    brandValues = getBrandOptionsForCatalog(state.catalog);
    typeOptions = getLocalizedTypeOptionsForCatalog(state.catalog);

    populateSelect(brandFilter, brandValues, "All brands");
    populateSelect(typeFilter, typeOptions, "All types");

    state.brand = brandValues.indexOf(previousBrand) !== -1 ? previousBrand : "all";
    state.type = typeOptions.some(function (option) {
      return option.value === previousType;
    }) ? previousType : "all";

    brandFilter.value = state.brand;
    typeFilter.value = state.type;
  }

  function getFilteredMice() {
    return mice
      .filter(function (mouse) {
        var queryOk = !state.query || mouse.searchIndex.indexOf(state.query) !== -1;
        var brandOk = state.brand === "all" || mouse.brand === state.brand;
        var typeOk = state.type === "all" || mouse.typeKey === state.type;
        var isPCComponent = ["case", "gpu", "cpu", "ram", "motherboard", "cooler", "storage", "psu", "fan"].indexOf(mouse.category) !== -1;
        var catalogOk = state.catalog === "all" || 
                         mouse.category === state.catalog || 
                         (state.catalog === "mice" && !mouse.category) ||
                         (state.catalog === "pc-component" && isPCComponent);

        // Filtre de prix (défensif - n'applique que si les données existent)
        var priceOk = true;
        if (mouse.price !== null && typeof mouse.price === "number") {
          if (state.priceMin !== null && mouse.price < state.priceMin) {
            priceOk = false;
          }
          if (state.priceMax !== null && mouse.price > state.priceMax) {
            priceOk = false;
          }
        }

        // Filtre de rating (défensif - n'applique que si les données existent)
        var ratingOk = true;
        if (mouse.rating !== null && typeof mouse.rating === "number") {
          if (state.ratingMin !== null && mouse.rating < state.ratingMin) {
            ratingOk = false;
          }
        }

        // Filtre de gamme (série/modèle, ex: G Pro, MX Master)
        var gammeOk = state.gamme === "all" || (mouse.gamme && mouse.gamme === state.gamme);

        // Filtre de connectivité (USB, Bluetooth, sans fil)
        var connectiviteOk = state.connectivite === "all" || (mouse.connectivite && mouse.connectivite === state.connectivite);

        // Filtre d'ergonomie (palm, claw, fingertip, etc.)
        var ergonomieOk = state.ergonomie === "all" || (mouse.ergonomie && mouse.ergonomie === state.ergonomie);

        return queryOk && brandOk && typeOk && catalogOk && priceOk && ratingOk && gammeOk && connectiviteOk && ergonomieOk;
      })
      .sort(function (left, right) {
        if (left.brand !== right.brand) {
          return localeSort(left.brand, right.brand);
        }

        var leftOrder = typeof left.order === "number" ? left.order : Number.MAX_SAFE_INTEGER;
        var rightOrder = typeof right.order === "number" ? right.order : Number.MAX_SAFE_INTEGER;

        if (leftOrder !== rightOrder) {
          return leftOrder - rightOrder;
        }

        return localeSort(left.name, right.name);
      });
  }

  function syncStats(filteredMice) {
    var catalogMice = state.catalog === "all" ? mice : mice.filter(function (mouse) {
      var isPCComponent = ["case", "gpu", "cpu", "ram", "motherboard", "cooler", "storage", "psu", "fan"].indexOf(mouse.category) !== -1;
      return mouse.category === state.catalog ||
             (state.catalog === "mice" && !mouse.category) ||
             (state.catalog === "pc-component" && isPCComponent);
    });

    var catalogBrandCount = Array.from(new Set(catalogMice.map(function (mouse) {
      return mouse.brand;
    }).filter(Boolean))).length;
    var catalogImageCount = catalogMice.filter(function (mouse) {
      return mouse.imageStatus === "local" || /^\.\/assets\/mice\//.test(mouse.image || "");
    }).length;

    totalModels.textContent = String(catalogMice.length);
    totalBrands.textContent = String(catalogBrandCount);
    officialImages.textContent = String(catalogImageCount);
    visibleResults.textContent = String(filteredMice.length);

    if (standardizedCount) {
      standardizedCount.textContent = String(catalogMice.length);
    }

    // Get catalog-specific message
    var shownKey, shownOutOfKey;
    if (state.catalog === "keyboard") {
      shownKey = "keyboard shown";
      shownOutOfKey = "keyboard shown out of";
    } else if (state.catalog === "pc-component") {
      shownKey = "pc component shown";
      shownOutOfKey = "pc component shown out of";
    } else if (state.catalog === "mice" || state.catalog === "all") {
      shownKey = "mouse shown";
      shownOutOfKey = "mouse shown out of";
    } else {
      shownKey = "items shown";
      shownOutOfKey = "items shown out of";
    }

    // Note: results-summary text removed from UI - keeping this commented for reference
    // resultsSummary.textContent = filteredMice.length === catalogMice.length
    //   ? filteredMice.length + " " + t(shownKey)
    //   : filteredMice.length + " " + t(shownOutOfKey) + " " + catalogMice.length;
    
    // Update window.statsData for nav-header.js animation
    window.statsData = {
      'total-models': catalogMice.length,
      'total-brands': catalogBrandCount,
      'official-images': catalogImageCount,
      'visible-results': filteredMice.length
    };
    
    // Dispatch event to trigger stats animation
    window.dispatchEvent(new CustomEvent('statsUpdated'));
  }

  /**
   * Module Skeleton Loader pour les images
   */
  var SkeletonLoader = (function () {
    function generateSkeletonHTML(className) {
      return '<div class="skeleton-loader ' + className + '">' +
        '<div class="skeleton-pulse"></div>' +
        '</div>';
    }

    // Convertit un chemin vers sa version WebP
    function getWebPPath(imagePath) {
      if (!imagePath || typeof imagePath !== 'string') {
        return imagePath;
      }
      // Remplace l'extension actuelle par .webp
      return imagePath.replace(/\.(jpg|jpeg|png|gif|bmp|tiff?|webp)$/i, '.webp');
    }

    function generateImageHTML(mouse, shouldPrioritize) {
      var productType = mouse.category === 'keyboard' ? 'clavier' : mouse.category === 'pc-component' ? 'composant PC' : 'souris';

      // Si aucune image n'est disponible, afficher un placeholder SVG
      if (!mouse.image || typeof mouse.image !== 'string' || mouse.image.trim() === '') {
        var brandColor = getBrandColor(mouse.brand || '');
        var placeholderSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="500" height="500" viewBox="0 0 500 500">'
          + '<rect width="500" height="500" fill="' + hexToRgba(brandColor, 0.1) + '"/>'
          + '<rect x="190" y="160" width="120" height="100" rx="8" fill="none" stroke="' + hexToRgba(brandColor, 0.4) + '" stroke-width="4"/>'
          + '<circle cx="230" cy="195" r="12" fill="none" stroke="' + hexToRgba(brandColor, 0.4) + '" stroke-width="4"/>'
          + '<polyline points="190,260 240,210 270,240 300,210 310,220 310,260" fill="none" stroke="' + hexToRgba(brandColor, 0.4) + '" stroke-width="4"/>'
          + '<text x="250" y="310" text-anchor="middle" font-family="system-ui,sans-serif" font-size="14" fill="' + hexToRgba(brandColor, 0.6) + '">' + escapeHtml(mouse.brand || '') + '</text>'
          + '<text x="250" y="335" text-anchor="middle" font-family="system-ui,sans-serif" font-size="12" fill="' + hexToRgba(brandColor, 0.4) + '">Image non disponible</text>'
          + '</svg>';
        var dataUri = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(placeholderSvg);
        return '<img class="mouse-photo" loading="lazy" decoding="async" width="500" height="500" src="'
          + dataUri
          + '" alt="MinSp ' + productType + ' '
          + escapeHtml(mouse.name)
          + ' (placeholder)">';
      }

      // Priorité au format WebP pour optimiser le chargement
      var webpImage = getWebPPath(mouse.image);
      var originalFallback = mouse.placeholderImage || mouse.image;

      return '<img class="mouse-photo" loading="'
        + (shouldPrioritize ? "eager" : "lazy")
        + '" fetchpriority="'
        + (shouldPrioritize ? "high" : "auto")
        + '" decoding="async" width="500" height="500" referrerpolicy="no-referrer" src="'
        + escapeHtml(webpImage)
        + '" data-fallback="'
        + escapeHtml(originalFallback)
        + '" data-original="'
        + escapeHtml(mouse.image)
        + '" alt="MinSp ' + productType + ' '
        + escapeHtml(mouse.name)
        + '">';
    }

    function wrapWithSkeleton(imageHTML, skeletonHTML) {
      return '<div class="image-wrapper is-loading">' +
        skeletonHTML +
        imageHTML +
        '</div>';
    }

    return {
      skeleton: generateSkeletonHTML,
      image: generateImageHTML,
      wrap: wrapWithSkeleton
    };
  })();

  function mediaMarkup(mouse, compact, priorityIndex) {
    var shouldPrioritize = !compact || priorityIndex < EAGER_IMAGE_COUNT;
    var imageHTML = SkeletonLoader.image(mouse, shouldPrioritize);
    var skeletonClass = compact ? "skeleton-compact" : "skeleton-detail";
    var skeletonHTML = SkeletonLoader.skeleton(skeletonClass);

    if (compact) {
      return '<div class="mouse-thumb mouse-frame is-loading">' + skeletonHTML + imageHTML + "</div>";
    }

    return '<div class="detail-image-wrapper mouse-frame is-loading">' + skeletonHTML + imageHTML + "</div>";
  }

  // Extrait le domaine d'une URL pour l'affichage
  function extractDomain(url) {
    if (!url) return '';
    try {
      var match = url.match(/^https?:\/\/([^\/]+)/);
      return match ? match[1].replace(/^www\./, '') : '';
    } catch (e) {
      return '';
    }
  }

  function sourceLinksMarkup(mouse) {
    var sources = mouse.sources || [];

    if (!sources.length) {
      return (
        '<div class="source-empty">' +
          "<p>No source has been added for this profile yet.</p>" +
        "</div>"
      );
    }

    return (
      '<ul class="source-list" role="list" aria-label="Sources for ' + escapeHtml(mouse.name) + '">' +
        sources.map(function (source, index) {
          var linkLabel = source.label || source.url;
          var ariaLabel = linkLabel + (source.url ? ' (opens in new tab)' : '');
          return (
            '<li class="source-item">' +
              (source.url
                ? '<a href="' + escapeHtml(source.url) + '" target="_blank" rel="noopener noreferrer" ' +
                  'class="source-link" aria-label="' + escapeHtml(ariaLabel) + '">' +
                  escapeHtml(linkLabel) + '<span class="source-domain">' + extractDomain(source.url) + "</span></a>"
                : '<span class="source-link is-placeholder">' + escapeHtml(linkLabel) + "</span>") +
            "</li>"
          );
        }).join("") +
      "</ul>"
    );
  }

  function highlightsMarkup(highlights) {
    if (!highlights.length) {
      return (
        '<ul class="highlight-list">' +
          "<li>Detailed highlights are still being refined for this mouse.</li>" +
        "</ul>"
      );
    }

    return (
      '<ul class="highlight-list">' +
        highlights.map(function (item) {
          return "<li>" + escapeHtml(item) + "</li>";
        }).join("") +
      "</ul>"
    );
  }

  function syncStats(filteredMice) {
    var catalogMice = state.catalog === "all" ? mice : mice.filter(function (mouse) {
      var isPCComponent = ["case", "gpu", "cpu", "ram", "motherboard", "cooler", "storage", "psu", "fan"].indexOf(mouse.category) !== -1;
      return mouse.category === state.catalog ||
             (state.catalog === "mice" && !mouse.category) ||
             (state.catalog === "pc-component" && isPCComponent);
    });

    var catalogBrandCount = Array.from(new Set(catalogMice.map(function (mouse) {
      return mouse.brand;
    }).filter(Boolean))).length;
    var catalogImageCount = catalogMice.filter(function (mouse) {
      return mouse.imageStatus === "local" || /^\.\/assets\/mice\//.test(mouse.image || "");
    }).length;

    totalModels.textContent = String(catalogMice.length);
    totalBrands.textContent = String(catalogBrandCount);
    officialImages.textContent = String(catalogImageCount);
    visibleResults.textContent = String(filteredMice.length);
  }

  function specStatusLabel(status) {
    switch (status) {
      case "confirmed":
        return "Confirmed";
      case "estimated":
        return "Estimated";
      case "profile":
        return "Inferred";
      default:
        return "Needs review";
    }
  }

  function qualityLabelForLevel(level) {
    switch (level) {
      case "solid":
        return "Reliable";
      case "partial":
        return "Partial";
      default:
        return "Needs review";
    }
  }

  function reviewListMarkup(items, emptyText) {
    var list;

    function splitTextIntoBullets(text) {
      return String(text)
        .split(/\s+(?=(?:More|Very|Less|If)\b)/)
        .map(function (part) {
          return part.trim();
        })
        .filter(Boolean);
    }

    if (Array.isArray(items)) {
      list = items.filter(Boolean).flatMap(function (item) {
        return splitTextIntoBullets(item);
      }).filter(Boolean);
    } else if (typeof items === "string" && items.trim()) {
      list = splitTextIntoBullets(items);
    } else {
      list = [];
    }

    if (!list.length) {
      list = [emptyText];
    }

    return (
      '<ul class="review-list">' +
        list.map(function (item) {
          return "<li>" + escapeHtml(item) + "</li>";
        }).join("") +
      "</ul>"
    );
  }

  // Génère le HTML pour l'affichage des étoiles de notation
  function starRatingMarkup(rating, maxStars) {
    maxStars = maxStars || 5;
    var fullStars = Math.floor(rating || 0);
    var hasHalfStar = (rating || 0) % 1 >= 0.5;
    var emptyStars = maxStars - fullStars - (hasHalfStar ? 1 : 0);
    var html = '<span class="star-rating" aria-label="Note: ' + (rating || 0) + ' sur ' + maxStars + '">';
    
    for (var i = 0; i < fullStars; i++) {
      html += '<span class="star star-full">★</span>';
    }
    if (hasHalfStar) {
      html += '<span class="star star-half">★</span>';
    }
    for (var i = 0; i < emptyStars; i++) {
      html += '<span class="star star-empty">☆</span>';
    }
    
    html += '<span class="rating-value">' + (rating ? rating.toFixed(1) : "0.0") + '</span>';
    html += '</span>';
    return html;
  }

  // Génère le HTML pour un commentaire utilisateur
  function userCommentMarkup(comment) {
    if (!comment || !comment.author) {
      return '';
    }
    return (
      '<article class="user-comment">' +
        '<div class="comment-header">' +
          '<span class="comment-author">' + escapeHtml(comment.author) + '</span>' +
          starRatingMarkup(comment.rating, 5) +
          '<span class="comment-date">' + escapeHtml(comment.date || "") + '</span>' +
        '</div>' +
        '<p class="comment-text">' + escapeHtml(comment.text || "") + '</p>' +
      '</article>'
    );
  }

  // Génère le HTML pour le formulaire d'ajout d'avis (adapté selon connexion)
  function addReviewFormMarkup(mouseId) {
    var currentUser = UserAuth.getCurrentUser();

    if (!currentUser) {
      return (
        '<section class="detail-block add-review-section auth-required">' +
          '<h3>' + escapeHtml("Write a review") + '</h3>' +
          '<p class="auth-message">' + escapeHtml("Sign in to leave a review") + '</p>' +
          '<div class="auth-buttons">' +
            '<a href="login.html?return=index.html&mode=login" class="auth-btn login-btn">' + escapeHtml("Log in") + '</a>' +
            '<a href="login.html?return=index.html&mode=register" class="auth-btn register-btn">' + escapeHtml("Create an account") + '</a>' +
          '</div>' +
        '</section>'
      );
    }

    return (
      '<section class="detail-block add-review-section">' +
        '<div class="review-header-logged">' +
          '<h3>' + escapeHtml("Write a review") + '</h3>' +
          '<span class="logged-user">' + escapeHtml("Welcome") + ', ' + escapeHtml(currentUser.pseudo) + '</span>' +
          '<button type="button" class="logout-btn" id="logout-btn">' + escapeHtml("Log out") + '</button>' +
        '</div>' +
        '<form class="review-form" id="review-form-' + escapeHtml(mouseId || "") + '">' +
          '<div class="form-group">' +
            '<label>' + escapeHtml("Your rating") + '</label>' +
            '<div class="star-input" data-rating="0">' +
              '<button type="button" data-value="1" class="star-btn" aria-label="1 étoile">☆</button>' +
              '<button type="button" data-value="2" class="star-btn" aria-label="2 étoiles">☆</button>' +
              '<button type="button" data-value="3" class="star-btn" aria-label="3 étoiles">☆</button>' +
              '<button type="button" data-value="4" class="star-btn" aria-label="4 étoiles">☆</button>' +
              '<button type="button" data-value="5" class="star-btn" aria-label="5 étoiles">☆</button>' +
              '<input type="hidden" name="rating" id="review-rating" value="0" required>' +
            '</div>' +
          '</div>' +
          '<div class="form-group">' +
            '<label for="review-text">' + escapeHtml("Your review") + '</label>' +
            '<textarea id="review-text" name="text" rows="4" required placeholder="' + escapeHtml("Share your experience with this mouse...") + '"></textarea>' +
          '</div>' +
          '<button type="submit" class="submit-review-btn">' + escapeHtml("Submit review") + '</button>' +
        '</form>' +
      '</section>'
    );
  }

  // Génère le HTML pour la liste des commentaires utilisateurs (fusion localStorage + données)
  function userCommentsMarkup(mouse) {
    // Fusionner les avis de localStorage avec les avis de données statiques
    var storedReviews = UserAuth.getMouseReviews(mouse.id);
    var staticComments = mouse.userComments || [];
    var allComments = staticComments.concat(storedReviews);
    
    // Supprimer les doublons par userEmail + date
    var seen = {};
    allComments = allComments.filter(function(comment) {
      var key = (comment.userEmail || comment.author) + '_' + comment.date;
      if (seen[key]) return false;
      seen[key] = true;
      return true;
    });
    
    if (!Array.isArray(allComments) || allComments.length === 0) {
      return (
        '<section class="detail-block user-reviews-section">' +
          '<h3>' + escapeHtml("User reviews") + '</h3>' +
          '<p class="no-reviews">' + escapeHtml("No user reviews yet. Be the first to share your experience!") + '</p>' +
        '</section>'
      );
    }

    var averageRating = allComments.reduce(function(sum, c) {
      return sum + (c.rating || 0);
    }, 0) / allComments.length;

    var commentsHtml = allComments.map(function(comment) {
      return userCommentMarkup(comment);
    }).join("");

    return (
      '<section class="detail-block user-reviews-section">' +
        '<div class="reviews-summary">' +
          '<h3>' + escapeHtml("User reviews") + '</h3>' +
          '<div class="average-rating">' +
            starRatingMarkup(averageRating, 5) +
            '<span class="reviews-count">(' + allComments.length + ' ' + escapeHtml("reviews") + ')</span>' +
          '</div>' +
        '</div>' +
        '<div class="comments-list">' + commentsHtml + '</div>' +
      '</section>'
    );
  }

  function detailReviewMarkup(mouse) {
    var review = mouse.review || {};
    var confidence = review.confidence || {};
    var qualityLevel = confidence.level || "caution";
    var qualityLabel = qualityLabelForLevel(qualityLevel);
    var qualityNote = confidence.note || "Some information should still be verified before buying.";

    // Note moyenne de la souris (si disponible)
    var averageRating = mouse.averageRating || (mouse.userComments ? 
      mouse.userComments.reduce(function(sum, c) { return sum + (c.rating || 0); }, 0) / mouse.userComments.length : 
      null);

    return (
      '<section class="detail-block">' +
        '<div class="review-head">' +
          '<div class="review-head-copy">' +
            "<h3>" + escapeHtml("Quick review") + "</h3>" +
            '<p class="review-head-note">' + escapeHtml(qualityNote) + "</p>" +
          "</div>" +
          '<span class="quality-badge quality-' + escapeHtml(qualityLevel) + '">' + escapeHtml(qualityLabel) + "</span>" +
        "</div>" +
        (averageRating ? '<div class="product-rating">' + starRatingMarkup(averageRating, 5) + '</div>' : '') +
        '<p class="review-verdict">' + escapeHtml(review.verdict || "Review notes are still being refined for this mouse.") + "</p>" +
        '<div class="review-grid">' +
          '<article class="review-card review-card-positive">' +
            '<p class="review-card-kicker">' + escapeHtml("Why buy it") + "</p>" +
            reviewListMarkup(review.whyBuy, "Shape and real-world use are still the first things to check.") +
          "</article>" +
          '<article class="review-card review-card-caution">' +
            '<p class="review-card-kicker">' + escapeHtml("Why skip it") + "</p>" +
            reviewListMarkup(review.whySkip || review.whyAvoid || review.skipFor, "Make sure the shape really fits your grip before deciding.") +
          "</article>" +
          '<article class="review-card review-card-profile">' +
            '<p class="review-card-kicker">' + escapeHtml("Best for") + "</p>" +
            '<p class="review-profile-line"><strong>' + escapeHtml("Yes if:") + "</strong> " + escapeHtml(review.bestFor || "you want a mouse that matches your grip style.") + "</p>" +
            '<p class="review-profile-line"><strong>' + escapeHtml("Less relevant if:") + "</strong> " + escapeHtml(review.skipFor || "you are looking for the exact opposite shape or feel.") + "</p>" +
          "</article>" +
          '<article class="review-card review-card-data">' +
            '<p class="review-card-kicker">' + escapeHtml("Profile reliability") + "</p>" +
            '<p class="review-data-line">' + escapeHtml(qualityNote) + "</p>" +
          "</article>" +
        '</div>' +
      '</section>' +
      userCommentsMarkup(mouse) +
      addReviewFormMarkup(mouse.id)
    );
  }

  /**
   * Module générateur de HTML modulaire
   * Sépare la logique de rendu en fonctions distinctes réutilisables
   */
  var HTMLGenerator = (function () {
    // Génère le HTML d'une carte de souris
    function generateCardHTML(mouse, index, isSelected) {
      try {
        var specs = getSpecs(mouse);
        var summary = mouse.summary && mouse.summary.length > 170
          ? mouse.summary.slice(0, 167) + "..."
          : mouse.summary;
        var brandColor = getBrandColor(mouse.brand);
        var brandGlow = hexToRgba(brandColor, 0.4);
        var customStyle = 'style="--brand-color: ' + brandColor + "; --brand-glow: " + brandGlow + ';"';
        var selectedClass = isSelected ? " selected" : "";
        var ariaPressed = isSelected ? "true" : "false";

        return (
          '<button class="mouse-card' + selectedClass + '" type="button" data-id="' + escapeHtml(mouse.id) + '" aria-pressed="' + ariaPressed + '" ' + customStyle + ">" +
            '<span class="card-fav-btn" data-fav-id="' + escapeHtml(mouse.id) + '" role="button" aria-label="' + escapeHtml(Favorites.isFavorite(mouse.id) ? 'Remove from favorites' : 'Add to favorites') + '">' + (Favorites.isFavorite(mouse.id) ? '★' : '☆') + '</span>' +
            mediaMarkup(mouse, true, index) +
            generateCardContentHTML(mouse, summary, specs) +
          "</button>"
        );
      } catch (error) {
        console.error("Erreur lors de la génération de la carte:", mouse.id, error);
        return generateErrorCardHTML(mouse.id);
      }
    }

    // Génère le contenu interne d'une carte
    function generateCardContentHTML(mouse, summary, specs) {
      return '<div class="card-copy">' +
        '<p class="card-brand">' + escapeHtml(mouse.brand) + "</p>" +
        '<strong class="card-title notranslate" translate="no">' + escapeHtml(mouse.name) + "</strong>" +
        '<p class="card-summary">' + escapeHtml(summary || "Summary not available yet.") + "</p>" +
        '<div class="card-pills">' +
          '<span class="meta-pill">' + escapeHtml(mouse.typeValue) + "</span>" +
          '<span class="meta-pill">' + escapeHtml(mouse.shapeValue) + "</span>" +
        "</div>" +
      "</div>" +
      '<div class="card-specs-inline">' +
        '<span>' + escapeHtml(specs[0].value) + "</span>" +
        '<span>' + escapeHtml(specs[2].value) + "</span>" +
      "</div>";
    }

    // Génère une carte d'erreur
    function generateErrorCardHTML(mouseId) {
      return '<div class="mouse-card error-card" data-id="' + escapeHtml(mouseId || "unknown") + '">' +
        '<p class="error-message">' + escapeHtml("Display error") + "</p>" +
      "</div>";
    }

    // Génère le HTML du panneau de détails avec onglets
    function generateDetailPanelHTML(mouse) {
      try {
        if (!mouse) {
          return generateEmptyDetailHTML(
            "Choose a mouse",
            "Click a catalog card to open the full profile with image, summary, specs, and sources."
          );
        }

        var brandColor = getBrandColor(mouse.brand);

        return (
          '<div class="detail-shell">' +
            '<div class="detail-hero">' +
              mediaMarkup(mouse, false, 0) +
              generateDetailHeaderHTML(mouse) +
            "</div>" +
            '<nav class="detail-tabs" role="tablist" aria-label="Product sections">' +
              '<button class="detail-tab active" role="tab" aria-selected="true" data-tab="specs" id="tab-specs">' +
                escapeHtml("Specifications") +
              '</button>' +
              '<button class="detail-tab" role="tab" aria-selected="false" data-tab="review" id="tab-review">' +
                escapeHtml("Review") +
              '</button>' +
              '<button class="detail-tab" role="tab" aria-selected="false" data-tab="compare" id="tab-compare">' +
                escapeHtml("Comparison") +
              '</button>' +
            '</nav>' +
            '<div class="detail-tab-content">' +
              '<div class="tab-panel active" role="tabpanel" aria-labelledby="tab-specs" id="panel-specs">' +
                '<section class="detail-block">' +
                  "<h3>" + escapeHtml("Standardized specs") + "</h3>" +
                  detailSpecMarkup(mouse) +
                "</section>" +
                '<section class="detail-block">' +
                  "<h3>" + escapeHtml("Key highlights") + "</h3>" +
                  detailHighlightsMarkup(mouse) +
                "</section>" +
                '<section class="detail-block">' +
                  "<h3>" + escapeHtml("Sources") + "</h3>" +
                  sourceLinksMarkup(mouse) +
                "</section>" +
                '<section class="detail-block minsp-links">' +
                  "<h3>MinSp</h3>" +
                  '<p><a href="#" class="minsp-internal-link" onclick="window.scrollTo(0,0); return false;">Comparatif MinSp</a> • <a href="#catalog-panel" class="minsp-internal-link">Voir sur MinSp</a></p>' +
                "</section>" +
              '</div>' +
              '<div class="tab-panel" role="tabpanel" aria-labelledby="tab-review" id="panel-review" hidden>' +
                detailReviewMarkup(mouse) +
              '</div>' +
              '<div class="tab-panel" role="tabpanel" aria-labelledby="tab-compare" id="panel-compare" hidden>' +
                '<section class="detail-block">' +
                  '<p>' + escapeHtml("Comparison feature coming soon. Select another mouse to compare side by side.") + '</p>' +
                '</section>' +
              '</div>' +
            '</div>' +
          "</div>"
        );
      } catch (error) {
        console.error("Erreur lors de la génération du panneau de détails:", error);
        return generateErrorDetailHTML();
      }
    }

    // Génère l'en-tête du panneau de détails
    function generateDetailHeaderHTML(mouse) {
      var isFav = Favorites.isFavorite(mouse.id);
      return '<div class="detail-copy">' +
        '<div class="detail-title-row">' +
          '<div>' +
            '<p class="section-kicker">' + escapeHtml("Product details") + "</p>" +
            '<h2 class="notranslate" translate="no">' + escapeHtml(mouse.name) + "</h2>" +
          '</div>' +
          '<button type="button" class="fav-btn' + (isFav ? ' is-fav' : '') + '" id="fav-btn" data-id="' + escapeHtml(mouse.id) + '" aria-label="' + escapeHtml(isFav ? 'Remove from favorites' : 'Add to favorites') + '">' +
            (isFav ? '★' : '☆') +
          '</button>' +
        '</div>' +
        '<p class="detail-summary">' + escapeHtml(mouse.summary || "No summary is available for this mouse yet.") + "</p>" +
        '<div class="detail-tags">' +
          '<span class="detail-tag">' + escapeHtml(mouse.brand) + "</span>" +
          '<span class="detail-tag">' + escapeHtml(mouse.typeValue) + "</span>" +
          '<span class="detail-tag">' + escapeHtml(mouse.shapeValue) + "</span>" +
          '<span class="detail-tag">' + escapeHtml(mouse.segment) + "</span>" +
        "</div>" +
      "</div>";
    }

    // Génère le HTML de l'état vide du panneau de détails
    function generateEmptyDetailHTML(title, text) {
      return '<div class="detail-empty">' +
        '<p class="section-kicker">' + escapeHtml("Product details") + "</p>" +
        "<h2>" + escapeHtml(title) + "</h2>" +
        "<p>" + escapeHtml(text) + "</p>" +
      "</div>";
    }

    // Génère le HTML d'erreur du panneau de détails
    function generateErrorDetailHTML() {
      return '<div class="detail-empty detail-error">' +
        '<p class="section-kicker">' + escapeHtml("Product details") + "</p>" +
        "<h2>" + escapeHtml("Display error") + "</h2>" +
        "<p>" + escapeHtml("Unable to display product details.") + "</p>" +
      "</div>";
    }

    // Génère le HTML du catalogue vide
    function generateEmptyCatalogHTML() {
      // Get catalog-specific message
      var noMatchKey;
      if (state.catalog === "keyboard") {
        noMatchKey = "No matching keyboard";
      } else if (state.catalog === "pc-component") {
        noMatchKey = "No matching pc component";
      } else if (state.catalog === "mice" || state.catalog === "all") {
        noMatchKey = "No matching mouse";
      } else {
        noMatchKey = "No matching item";
      }

      return '<div class="empty-state">' +
        "<h3>" + escapeHtml(noMatchKey) + "</h3>" +
        "<p>" + escapeHtml("Try another search, brand, or type filter.") + "</p>" +
        '<button class="reset-button show-all-button" type="button" id="show-all-btn" aria-label="' + escapeHtml("Show all") + '">' +
          escapeHtml("Show all") +
        "</button>" +
      "</div>";
    }

    // Génère le HTML du bouton "Charger plus"
    function generateLoadMoreButtonHTML() {
      return '<button class="load-more-button" type="button" id="load-more" aria-label="' + escapeHtml("Load more products") + '">' +
        escapeHtml("Load more") +
      "</button>";
    }

    // Génère une miniature de favori (image seulement, cliquable)
    function generateFavThumbnailHTML(mouse) {
      var brandColor = getBrandColor(mouse.brand);
      var brandGlow = hexToRgba(brandColor, 0.4);
      var customStyle = 'style="--brand-color: ' + brandColor + "; --brand-glow: " + brandGlow + ';"';
      var isFav = Favorites.isFavorite(mouse.id);

      return '<button class="fav-thumb" type="button" data-id="' + escapeHtml(mouse.id) + '" ' + customStyle + ' title="' + escapeHtml(mouse.name) + '">' +
        '<span class="fav-thumb-fav-btn" data-fav-id="' + escapeHtml(mouse.id) + '" role="button" aria-label="' + escapeHtml(isFav ? 'Remove from favorites' : 'Add to favorites') + '">' + (isFav ? '★' : '☆') + '</span>' +
        mediaMarkup(mouse, true, 0) +
      '</button>';
    }

    return {
      card: generateCardHTML,
      cardContent: generateCardContentHTML,
      errorCard: generateErrorCardHTML,
      detailPanel: generateDetailPanelHTML,
      detailHeader: generateDetailHeaderHTML,
      emptyDetail: generateEmptyDetailHTML,
      errorDetail: generateErrorDetailHTML,
      emptyCatalog: generateEmptyCatalogHTML,
      loadMoreButton: generateLoadMoreButtonHTML,
      favThumbnail: generateFavThumbnailHTML
    };
  })();

  // Fonctions wrapper pour compatibilité avec le code existant
  function cardMarkup(mouse, index) {
    return HTMLGenerator.card(mouse, index, state.selectedId === mouse.id);
  }

  function favThumbnailMarkup(mouse) {
    return HTMLGenerator.favThumbnail(mouse);
  }

  /**
   * Améliore l'accessibilité d'une carte après son insertion dans le DOM
   */
  function enhanceCardAccessibility(cardElement, mouse) {
    if (!cardElement) return;

    // Ajouter un aria-label descriptif
    var specs = getSpecs(mouse);
    var specText = specs.slice(0, 2).map(function (s) { return s.value; }).join(', ');
    var typeText = mouse.typeValue || '';
    var shapeText = mouse.shapeValue || '';
    var categoryText = mouse.category || 'mice';
    var labelParts = [mouse.name + ' by ' + mouse.brand];
    if (typeText) labelParts.push(typeText);
    if (shapeText) labelParts.push(shapeText);
    if (!typeText && !shapeText) labelParts.push(categoryText);
    labelParts.push('Specs: ' + specText);
    var label = labelParts.join('. ');

    cardElement.setAttribute('aria-label', label);
    cardElement.setAttribute('title', mouse.name);

    // S'assurer que la carte est focusable
    if (!cardElement.hasAttribute('tabindex')) {
      cardElement.setAttribute('tabindex', '0');
    }
  }

  function detailHighlightsMarkup(mouse) {
    var highlights = Array.isArray(mouse.highlights)
      ? mouse.highlights.filter(Boolean).slice(0, 4)
      : [];

    if (!highlights.length) {
      return (
        '<ul class="highlight-list">' +
          "<li>" + escapeHtml("Detailed highlights are still being refined for this mouse.") + "</li>" +
        "</ul>"
      );
    }

    return (
      '<ul class="highlight-list">' +
        highlights.map(function (item) {
          return "<li>" + escapeHtml(item) + "</li>";
        }).join("") +
      "</ul>"
    );
  }

  function detailSpecMarkup(mouse) {
    return (
      '<div class="spec-grid">' +
        getSpecs(mouse).map(function (spec) {
          var status = spec.status || "unknown";

          return (
            '<article class="spec-card spec-card-' + escapeHtml(status) + '">' +
              '<div class="spec-card-head">' +
                '<span class="spec-label">' + escapeHtml(specLabelForDisplay(spec.label)) + "</span>" +
                '<span class="spec-status spec-status-' + escapeHtml(status) + '">' + escapeHtml(specStatusLabel(status)) + "</span>" +
              "</div>" +
              '<strong class="spec-value">' + escapeHtml(spec.value) + "</strong>" +
            "</article>"
          );
        }).join("") +
      "</div>"
    );
  }

  // Fonctions wrapper utilisant le module HTMLGenerator
  function detailMarkup(mouse) {
    return HTMLGenerator.detailPanel(mouse);
  }

  function emptyCatalogMarkup() {
    return HTMLGenerator.emptyCatalog();
  }

  function emptyDetailMarkup(title, text) {
    return HTMLGenerator.emptyDetail(title, text);
  }

  function bindImageFallbacks(root) {
    if (!root || typeof root.querySelectorAll !== "function") {
      return;
    }

    function setImageReadyState(image, ready) {
      var frame = image.closest(".mouse-frame");
      var skeleton = frame ? frame.querySelector(".skeleton-loader") : null;

      if (ready) {
        image.classList.add("is-ready");
        if (frame) {
          frame.classList.remove("is-loading");
        }
        if (skeleton) {
          skeleton.style.opacity = "0";
          skeleton.style.transition = "opacity 0.3s ease";
          setTimeout(function () {
            skeleton.style.display = "none";
          }, 300);
        }
        return;
      }

      image.classList.remove("is-ready");
      if (frame) {
        frame.classList.add("is-loading");
      }
      if (skeleton) {
        skeleton.style.opacity = "1";
        skeleton.style.display = "";
      }
    }

    root.querySelectorAll(".mouse-photo").forEach(function (image) {
      if (image.dataset.bound === "true") {
        if (image.complete && image.naturalWidth > 0) {
          setImageReadyState(image, true);
        }
        return;
      }

      image.dataset.bound = "true";

      function handleError() {
        var fallback = image.getAttribute("data-fallback");
        var original = image.getAttribute("data-original");
        var currentSrc = image.src;

        // Si on essayait WebP et ça a échoué, tenter l'original
        if (original && currentSrc !== original && original.replace(/\.webp$/i, '') !== currentSrc.replace(/\.webp$/i, '')) {
          setImageReadyState(image, false);
          image.src = original;
          return;
        }

        // Si l'original échoue aussi, utiliser le fallback
        if (fallback && currentSrc !== fallback) {
          setImageReadyState(image, false);
          image.src = fallback;
          return;
        }

        // Tous les fallbacks ont échoué, afficher un placeholder SVG
        var altText = image.alt || '';
        var brandMatch = altText.match(/MinSp\s+\S+\s+(.+?)(?:\s+\(placeholder\))?$/);
        var brandName = brandMatch ? brandMatch[1].split(' ')[0] : '';
        var brandColor = getBrandColor(brandName);
        var placeholderSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="500" height="500" viewBox="0 0 500 500">'
          + '<rect width="500" height="500" fill="' + hexToRgba(brandColor, 0.1) + '"/>'
          + '<rect x="190" y="160" width="120" height="100" rx="8" fill="none" stroke="' + hexToRgba(brandColor, 0.4) + '" stroke-width="4"/>'
          + '<circle cx="230" cy="195" r="12" fill="none" stroke="' + hexToRgba(brandColor, 0.4) + '" stroke-width="4"/>'
          + '<polyline points="190,260 240,210 270,240 300,210 310,220 310,260" fill="none" stroke="' + hexToRgba(brandColor, 0.4) + '" stroke-width="4"/>'
          + '<text x="250" y="310" text-anchor="middle" font-family="system-ui,sans-serif" font-size="14" fill="' + hexToRgba(brandColor, 0.6) + '">' + escapeHtml(brandName) + '</text>'
          + '<text x="250" y="335" text-anchor="middle" font-family="system-ui,sans-serif" font-size="12" fill="' + hexToRgba(brandColor, 0.4) + '">Image non disponible</text>'
          + '</svg>';
        image.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(placeholderSvg);
        image.removeAttribute("data-fallback");
        image.removeAttribute("data-original");
        setImageReadyState(image, true);
      }

      image.addEventListener("load", function () {
        setImageReadyState(image, true);
      });

      image.addEventListener("error", handleError);
      setImageReadyState(image, false);

      if (image.complete) {
        if (image.naturalWidth > 0) {
          setImageReadyState(image, true);
        } else {
          handleError();
        }
      }
    });
  }

  function getVisibleMice(filteredMice) {
    return filteredMice.slice(0, state.visibleCount);
  }

  function hasMoreItems(filteredMice) {
    return filteredMice.length > state.visibleCount;
  }

  function loadMoreButtonMarkup() {
    return HTMLGenerator.loadMoreButton();
  }

  function resetDetailScroll() {
    detailPanel.scrollTop = 0;
    detailView.scrollTop = 0;
  }

  function focusElementWithoutScroll(element) {
    if (!element || typeof element.focus !== "function") {
      return;
    }

    try {
      element.focus({ preventScroll: true });
    } catch (error) {
      element.focus();
    }
  }

  /**
   * Focus Trap pour la modal de détails
   * Empêche le focus de sortir de la modal quand elle est ouverte
   */
  var FocusTrap = (function () {
    var trapContainer = null;
    var previousActiveElement = null;

    function getFocusableElements() {
      if (!trapContainer) return [];

      var selectors = [
        'a[href]',
        'button:not([disabled])',
        'input:not([disabled])',
        'select:not([disabled])',
        'textarea:not([disabled])',
        '[tabindex]:not([tabindex="-1"])'
      ].join(', ');

      return Array.from(trapContainer.querySelectorAll(selectors)).filter(function (el) {
        return el.offsetParent !== null && !el.disabled;
      });
    }

    function handleTabKey(event) {
      if (!trapContainer) return;

      var focusableElements = getFocusableElements();
      if (focusableElements.length === 0) return;

      var firstElement = focusableElements[0];
      var lastElement = focusableElements[focusableElements.length - 1];
      var activeElement = document.activeElement;

      if (event.shiftKey) {
        // Shift+Tab - aller à l'élément précédent
        if (activeElement === firstElement || !trapContainer.contains(activeElement)) {
          event.preventDefault();
          lastElement.focus();
        }
      } else {
        // Tab - aller à l'élément suivant
        if (activeElement === lastElement || !trapContainer.contains(activeElement)) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    }

    function activate(container) {
      trapContainer = container;
      previousActiveElement = document.activeElement;

      document.addEventListener('keydown', handleKeydown);

      // Mettre le focus sur le premier élément focusable
      var focusableElements = getFocusableElements();
      if (focusableElements.length > 0) {
        setTimeout(function () {
          focusableElements[0].focus();
        }, 100);
      }
    }

    function deactivate() {
      document.removeEventListener('keydown', handleKeydown);
      trapContainer = null;

      // Restaurer le focus précédent
      if (previousActiveElement && previousActiveElement.focus) {
        focusElementWithoutScroll(previousActiveElement);
      }
    }

    function handleKeydown(event) {
      if (event.key === 'Tab') {
        handleTabKey(event);
      }
    }

    return {
      activate: activate,
      deactivate: deactivate
    };
  })();

  function renderDetailFromVisibleMice(visibleMice) {
    var current = visibleMice.find(function (item) {
      return item.id === state.selectedId;
    });

    if (!visibleMice.length) {
      lastRenderedDetailId = null;
      detailPanel.style.removeProperty("--brand-color");
      detailPanel.style.removeProperty("--brand-glow");
      detailPanel.innerHTML = emptyDetailMarkup(
        "No visible result",
        "The detail panel will update again as soon as a matching mouse is visible."
      );
      resetDetailScroll();
      return;
    }

    if (!current) {
      lastRenderedDetailId = null;
      detailPanel.style.removeProperty("--brand-color");
      detailPanel.style.removeProperty("--brand-glow");
      detailPanel.innerHTML = emptyDetailMarkup(
        "Choose a mouse",
        "Click a catalog card to open the full profile with image, summary, specs, and sources."
      );
      resetDetailScroll();
      return;
    }

    var brandColor = getBrandColor(current.brand);
    var detailChanged = lastRenderedDetailId !== current.id;

    detailPanel.style.setProperty("--brand-color", brandColor);
    detailPanel.style.setProperty("--brand-glow", hexToRgba(brandColor, 0.4));
    detailPanel.innerHTML = detailMarkup(current);

    if (detailChanged) {
      resetDetailScroll();
    }

    bindImageFallbacks(detailPanel);
    lastRenderedDetailId = current.id;
  }

  function clearViewTransitionTimer() {
    if (viewTransitionTimer) {
      clearTimeout(viewTransitionTimer);
      viewTransitionTimer = null;
    }
  }

  function setDetailMarkup(title, text) {
    detailPanel.style.removeProperty("--brand-color");
    detailPanel.style.removeProperty("--brand-glow");
    detailPanel.innerHTML = emptyDetailMarkup(title, text);
    resetDetailScroll();
  }

  function renderDetail(mouse) {
    if (!mouse) {
      setDetailMarkup(
        "Choose a mouse",
        "Click a catalog card to open the full profile with image, summary, specs, and sources."
      );
      return;
    }

    var brandColor = getBrandColor(mouse.brand);

    detailPanel.style.setProperty("--brand-color", brandColor);
    detailPanel.style.setProperty("--brand-glow", hexToRgba(brandColor, 0.4));
    detailPanel.innerHTML = detailMarkup(mouse);
    resetDetailScroll();
    bindImageFallbacks(detailPanel);
    bindDetailTabs();
    bindReviewForm(mouse);
    bindFavoriteBtn(mouse);
  }

  function bindFavoriteBtn(mouse) {
    var favBtn = detailPanel.querySelector('#fav-btn');
    if (!favBtn) return;
    favBtn.addEventListener('click', function() {
      var isFav = Favorites.toggleFavorite(mouse.id);
      favBtn.classList.toggle('is-fav', isFav);
      favBtn.textContent = isFav ? '★' : '☆';
      favBtn.setAttribute('aria-label', isFav ? 'Remove from favorites' : 'Add to favorites');
      renderCatalog();
    });
  }

  // Gère l'interaction avec le formulaire d'avis (étoiles + soumission + auth)
  function bindReviewForm(mouse) {
    var form = detailPanel.querySelector('.review-form');
    var currentUser = UserAuth.getCurrentUser();

    // Si pas connecté, les liens directs vers login.html suffisent
    if (!currentUser) {
      return;
    }

    // Gestion du bouton logout
    var logoutBtn = detailPanel.querySelector('#logout-btn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', function() {
        UserAuth.logout();
        updateHeaderAuth();
        renderDetail(mouse);
      });
    }

    if (!form) return;

    // Gestion des étoiles cliquables
    var starContainer = form.querySelector('.star-input');
    var ratingInput = form.querySelector('#review-rating');
    var starButtons = form.querySelectorAll('.star-btn');

    if (starContainer && ratingInput) {
      starButtons.forEach(function(btn) {
        btn.addEventListener('click', function() {
          var value = parseInt(btn.getAttribute('data-value'), 10);
          ratingInput.value = value;

          starButtons.forEach(function(s, index) {
            if (index < value) {
              s.classList.add('active');
              s.textContent = '★';
            } else {
              s.classList.remove('active');
              s.textContent = '☆';
            }
          });
        });

        btn.addEventListener('mouseenter', function() {
          var hoverValue = parseInt(btn.getAttribute('data-value'), 10);
          starButtons.forEach(function(s, index) {
            if (index < hoverValue) {
              s.textContent = '★';
            } else {
              s.textContent = '☆';
            }
          });
        });
      });

      starContainer.addEventListener('mouseleave', function() {
        var currentValue = parseInt(ratingInput.value, 10) || 0;
        starButtons.forEach(function(s, index) {
          if (index < currentValue) {
            s.textContent = '★';
          } else {
            s.textContent = '☆';
          }
        });
      });
    }

    // Soumission du formulaire via UserAuth
    form.addEventListener('submit', function(event) {
      event.preventDefault();

      var rating = parseInt(ratingInput.value, 10);
      var text = form.querySelector('#review-text').value.trim();

      var result = UserAuth.addReview(mouse.id, rating, text);

      if (!result.success) {
        alert(result.error === 'not_logged_in' ? 'Sign in to leave a review' :
               result.error === 'invalid_rating' ? 'Please select a rating' :
               result.error === 'empty_text' ? 'All fields are required' : 'Error');
        return;
      }

      alert('Review submitted successfully');
      form.reset();
      starButtons.forEach(function(s) {
        s.classList.remove('active');
        s.textContent = '☆';
      });
      ratingInput.value = '0';

      // Recharger la page produit pour afficher le nouvel avis
      mouse.userComments = UserAuth.getMouseReviews(mouse.id);
      renderDetail(mouse);
    });
  }

  function updateHeaderAuth() {
    var userSection = document.getElementById('user-section');
    if (!userSection) return;

    var currentUser = UserAuth.getCurrentUser();

    if (currentUser) {
      userSection.innerHTML =
        '<div class="header-user-card">' +
          '<span class="header-user-avatar">' + escapeHtml(currentUser.pseudo.charAt(0).toUpperCase()) + '</span>' +
          '<span class="header-user-name">' + escapeHtml(currentUser.pseudo) + '</span>' +
          '<button type="button" class="header-logout-btn" id="header-logout-btn" title="Log out">' +
            '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
              '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>' +
              '<polyline points="16 17 21 12 16 7"></polyline>' +
              '<line x1="21" y1="12" x2="9" y2="12"></line>' +
            '</svg>' +
          '</button>' +
        '</div>';
      var logoutBtn = userSection.querySelector('#header-logout-btn');
      if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
          UserAuth.logout();
          updateHeaderAuth();
          if (state.selectedId) {
            var mouse = mice.find(function(m) { return m.id === state.selectedId; });
            if (mouse) renderDetail(mouse);
          }
        });
      }
    } else {
      var returnPage = state.selectedId ? 'index.html?product=' + state.selectedId : 'index.html';
      userSection.innerHTML =
        '<a href="login.html?return=' + encodeURIComponent(returnPage) + '&mode=login" class="header-auth-btn header-login-btn">' + escapeHtml('Log in') + '</a>' +
        '<a href="login.html?return=' + encodeURIComponent(returnPage) + '&mode=register" class="header-auth-btn header-register-btn">' + escapeHtml('Create an account') + '</a>';
    }
  }

  // Affiche la modale de connexion/inscription
  function showAuthModal(mode) {
    var existingModal = document.querySelector('.auth-modal-overlay');
    if (existingModal) existingModal.remove();

    var isLogin = mode === 'login';
    var modal = document.createElement('div');
    modal.className = 'auth-modal-overlay';
    modal.innerHTML = (
      '<div class="auth-modal">' +
        '<button type="button" class="modal-close" id="close-auth-modal">&times;</button>' +
        '<h2>' + escapeHtml(isLogin ? 'Log in' : 'Create an account') + '</h2>' +
        '<form class="auth-modal-form" id="auth-form">' +
          (!isLogin ? '<div class="form-group"><label>' + escapeHtml('Username') + '</label><input type="text" name="pseudo" required></div>' : '') +
          '<div class="form-group"><label>' + escapeHtml('Email') + '</label><input type="email" name="email" required></div>' +
          '<div class="form-group"><label>' + escapeHtml('Password') + '</label><input type="password" name="password" required></div>' +
          (!isLogin ? '<div class="form-group"><label>' + escapeHtml('Confirm password') + '</label><input type="password" name="confirmPassword" required></div>' : '') +
          '<div class="form-error" id="auth-error"></div>' +
          '<button type="submit" class="submit-review-btn">' + escapeHtml(isLogin ? 'Log in' : 'Create account') + '</button>' +
        '</form>' +
        '<p class="auth-switch">' +
          (isLogin ? '<button type="button" class="link-btn" id="switch-to-register">' + escapeHtml('No account? Create one') + '</button>' :
                     '<button type="button" class="link-btn" id="switch-to-login">' + escapeHtml('Already have an account? Log in') + '</button>') +
        '</p>' +
      '</div>'
    );

    document.body.appendChild(modal);

    // Fermer la modale
    modal.querySelector('#close-auth-modal').addEventListener('click', function(e) {
      e.stopPropagation();
      modal.remove();
    });
    modal.addEventListener('click', function(e) {
      if (e.target === modal) {
        modal.remove();
      }
    });

    // Basculer login/register
    var switchBtn = modal.querySelector(isLogin ? '#switch-to-register' : '#switch-to-login');
    if (switchBtn) {
      switchBtn.addEventListener('click', function() {
        modal.remove();
        showAuthModal(isLogin ? 'register' : 'login');
      });
    }

    // Soumission du formulaire
    modal.querySelector('#auth-form').addEventListener('submit', function(event) {
      event.preventDefault();
      var formData = new FormData(event.target);
      var errorDiv = modal.querySelector('#auth-error');

      if (!isLogin) {
        var pseudo = formData.get('pseudo').trim();
        var email = formData.get('email').trim();
        var password = formData.get('password');
        var confirmPassword = formData.get('confirmPassword');
        if (!pseudo || !email || !password) {
          errorDiv.textContent = 'All fields are required';
          return;
        }
        if (confirmPassword !== password) {
          errorDiv.textContent = 'Passwords do not match';
          return;
        }
        var result = UserAuth.register(pseudo, email, password);
        if (!result.success) {
          errorDiv.textContent = result.error === 'email_exists' ? 'Email already exists' :
                                   result.error === 'pseudo_exists' ? 'Username already exists' :
                                   result.error === 'empty_fields' ? 'All fields are required' : 'Error';
          return;
        }
        alert('Account created! Please log in.');
        modal.remove();
        showAuthModal('login');
      } else {
        var loginResult = UserAuth.login(formData.get('email'), formData.get('password'));
        if (!loginResult.success) {
          errorDiv.textContent = 'Invalid email or password';
          return;
        }
        modal.remove();
        updateHeaderAuth();
        if (state.selectedId) {
          var mouse = mice.find(function(m) { return m.id === state.selectedId; });
          if (mouse) renderDetail(mouse);
        }
      }
    });
  }

  function bindDetailTabs() {
    var tabs = detailPanel.querySelectorAll('.detail-tab');
    var panels = detailPanel.querySelectorAll('.tab-panel');
    
    tabs.forEach(function(tab) {
      tab.addEventListener('click', function() {
        var targetTab = tab.getAttribute('data-tab');
        
        // Mettre à jour les onglets
        tabs.forEach(function(t) {
          t.classList.remove('active');
          t.setAttribute('aria-selected', 'false');
        });
        tab.classList.add('active');
        tab.setAttribute('aria-selected', 'true');
        
        // Mettre à jour les panneaux
        panels.forEach(function(panel) {
          panel.classList.remove('active');
          panel.hidden = true;
        });
        var targetPanel = detailPanel.querySelector('#panel-' + targetTab);
        if (targetPanel) {
          targetPanel.classList.add('active');
          targetPanel.hidden = false;
        }
      });
    });
  }

  function updateProductSEO(mouse) {
    if (!mouse) return;
    var head = document.head;
    var existingDynamic = head.querySelectorAll('meta[data-dynamic-seo], script[data-dynamic-seo], link[data-dynamic-seo]');
    existingDynamic.forEach(function(el) { el.remove(); });
    var productType = mouse.category === 'keyboard' ? 'clavier' : mouse.category === 'pc-component' ? 'composant PC' : 'souris';
    var titleText = 'MinSp ' + productType + ' ' + mouse.name + ' | ' + mouse.brand + ' - comparateur';
    document.title = titleText;
    var metaDesc = 'MinSp comparateur : ' + (mouse.summary || mouse.segment + ' ' + mouse.typeValue + ' ' + mouse.shapeValue);
    var metaTags = [
      { name: 'description', content: metaDesc },
      { name: 'keywords', content: ['MinSp', mouse.brand, mouse.name, mouse.typeValue, mouse.shapeValue, mouse.segment].join(', ') },
      { property: 'og:title', content: 'MinSp - ' + mouse.name + ' by ' + mouse.brand },
      { property: 'og:description', content: metaDesc },
      { property: 'og:type', content: 'product' },
      { property: 'og:image', content: window.location.origin + '/' + mouse.image.replace(/^\.\//, '') },
      { property: 'og:url', content: window.location.href },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'MinSp - ' + mouse.name },
      { name: 'twitter:description', content: metaDesc },
      { name: 'twitter:image', content: window.location.origin + '/' + mouse.image.replace(/^\.\//, '') }
    ];
    metaTags.forEach(function(meta) {
      var el = document.createElement('meta');
      el.setAttribute('data-dynamic-seo', 'true');
      if (meta.name) el.name = meta.name;
      if (meta.property) el.setAttribute('property', meta.property);
      el.content = meta.content;
      head.appendChild(el);
    });
    var schemaData = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: mouse.name,
      brand: { '@type': 'Brand', name: mouse.brand },
      description: metaDesc,
      image: window.location.origin + '/' + mouse.image.replace(/^\.\//, ''),
      category: mouse.segment,
      offers: {
        '@type': 'Offer',
        availability: 'https://schema.org/InStock',
        price: mouse.price ? mouse.price.toString() : '0',
        priceCurrency: 'EUR'
      }
    };
    var scriptEl = document.createElement('script');
    scriptEl.type = 'application/ld+json';
    scriptEl.setAttribute('data-dynamic-seo', 'true');
    scriptEl.textContent = JSON.stringify(schemaData);
    head.appendChild(scriptEl);
  }

  var HOME_TITLE = "MinSp - Electronic Product Comparison";

  function resetSEO() {
    var head = document.head;
    var existingDynamic = head.querySelectorAll('meta[data-dynamic-seo], script[data-dynamic-seo]');
    existingDynamic.forEach(function(el) { el.remove(); });
    document.title = HOME_TITLE;
  }

  function showProduct(id) {
    // 1. Chercher d'abord dans mice (données déjà chargées)
    var mouse = mice.find(function (item) {
      return item.id === id;
    });

    // 2. Si non trouvé, chercher dans window.MOUSE_DATA
    if (!mouse && Array.isArray(window.MOUSE_DATA)) {
      mouse = window.MOUSE_DATA.find(function (item) {
        return item.id === id;
      });
    }

    // 3. Chercher aussi dans window.KEYBOARD_DATA et window.PCCOMPONENT_DATA
    if (!mouse && Array.isArray(window.KEYBOARD_DATA)) {
      mouse = window.KEYBOARD_DATA.find(function (item) {
        return item.id === id;
      });
    }
    if (!mouse && Array.isArray(window.PCCOMPONENT_DATA)) {
      mouse = window.PCCOMPONENT_DATA.find(function (item) {
        return item.id === id;
      });
    }

    // 4. Null check avec log d'erreur
    if (!mouse) {
      console.error('[showProduct] Produit non trouvé pour l\'ID:', id);
      console.error('[showProduct] IDs disponibles dans mice:', mice.map(function(m) { return m.id; }).slice(0, 10), '...');
      setDetailMarkup(
        "Product not found",
        "The product you're looking for could not be loaded. Please try again or select another product."
      );
      detailView.classList.remove("hidden");
      return;
    }

    var detailAlreadyOpen = !detailView.classList.contains("hidden");

    state.selectedId = mouse.id;
    updateProductSEO(mouse);
    renderCatalog();
    renderDetail(mouse);

    if (!detailAlreadyOpen) {
      savedScrollPosition = window.pageYOffset || window.scrollY || 0;
      previousBodyOverflow = document.body.style.overflow;
    }

    clearViewTransitionTimer();
    catalogView.setAttribute("aria-hidden", "true");
    if (toolbarPanel) toolbarPanel.classList.add("is-blurred");
    detailView.classList.remove("hidden");
    detailView.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    resetDetailScroll();
    // Ne pas remonter en haut, garder la position actuelle

    // Activer le focus trap pour l'accessibilité
    FocusTrap.activate(detailView);

    requestAnimationFrame(function () {
      detailView.classList.add("is-visible");
      focusElementWithoutScroll(closeBtn);
    });
  }

  function hideProduct() {
    if (detailView.classList.contains("hidden")) {
      return;
    }

    resetSEO();

    // Désactiver le focus trap avant de fermer
    FocusTrap.deactivate();

    clearViewTransitionTimer();
    detailView.classList.remove("is-visible");
    detailView.setAttribute("aria-hidden", "true");

    viewTransitionTimer = setTimeout(function () {
      detailView.classList.add("hidden");
      catalogView.setAttribute("aria-hidden", "false");
      if (toolbarPanel) toolbarPanel.classList.remove("is-blurred");
      document.body.style.overflow = previousBodyOverflow;
      // Retourner à la position exacte de la carte sélectionnée
      window.scrollTo(0, savedScrollPosition);

      requestAnimationFrame(function () {
        var selectedCard = catalogGrid.querySelector('.mouse-card[data-id="' + state.selectedId + '"]');
        focusElementWithoutScroll(selectedCard || catalogGrid);
      });
    }, 300);
  }

  function renderCatalog() {
    var filteredMice = getFilteredMice();
    var visibleMice = getVisibleMice(filteredMice);
    var selectionStillVisible = visibleMice.some(function (mouse) {
      return mouse.id === state.selectedId;
    });

    if (!selectionStillVisible) {
      state.selectedId = null;
    }

    catalogGrid.setAttribute("aria-busy", "true");
    syncStats(visibleMice);

    var catalogHTML = visibleMice.length
      ? visibleMice.map(function (mouse, index) {
        return cardMarkup(mouse, index);
      }).join("")
      : emptyCatalogMarkup();

    if (hasMoreItems(filteredMice) && visibleMice.length > 0) {
      catalogHTML += loadMoreButtonMarkup();
    }

    catalogGrid.innerHTML = catalogHTML;
    bindImageFallbacks(catalogGrid);
    catalogGrid.setAttribute("aria-busy", "false");

    // Annoncer les résultats aux lecteurs d'écran
    var resultMessage = visibleMice.length > 0
      ? visibleMice.length + ' ' + (state.catalog === 'keyboard' ? 'keyboard shown' : state.catalog === 'pc-component' ? 'pc component shown' : 'mouse shown')
      : 'No results';
    announceToScreenReader(resultMessage);

    // Bind fav buttons in catalog cards
    catalogGrid.querySelectorAll('.card-fav-btn').forEach(function(btn) {
      btn.addEventListener('click', function(e) {
        e.stopPropagation();
        e.preventDefault();
        var mouseId = btn.getAttribute('data-fav-id');
        var isFav = Favorites.toggleFavorite(mouseId);
        btn.textContent = isFav ? '★' : '☆';
        btn.classList.toggle('is-fav', isFav);
        btn.setAttribute('aria-label', isFav ? 'Remove from favorites' : 'Add to favorites');
        renderCatalog();
      });
    });

    // Améliorer l'accessibilité des cartes
    if (visibleMice.length > 0) {
      visibleMice.forEach(function (mouse) {
        var card = catalogGrid.querySelector('.mouse-card[data-id="' + mouse.id + '"]');
        if (card) {
          enhanceCardAccessibility(card, mouse);

          // Ajouter support Enter/Space pour ouvrir la fiche
          card.addEventListener('keydown', function (event) {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault();
              showProduct(mouse.id);
            }
          });
        }
      });
    }

    var loadMoreButton = document.getElementById("load-more");
    if (loadMoreButton) {
      loadMoreButton.addEventListener("click", function () {
        state.visibleCount += LOAD_MORE_COUNT;
        announceToScreenReader('Loading more products...');
        renderCatalog();
      });
    }

    // Gestionnaire pour le bouton "Tout afficher" quand aucun résultat
    var showAllButton = document.getElementById("show-all-btn");
    if (showAllButton) {
      showAllButton.addEventListener("click", function () {
        resetAllFilters();
      });
    }

    catalogGrid.setAttribute("aria-busy", "false");
  }

  function resetAllFilters() {
    hideProduct();
    state.query = "";
    state.brand = "all";
    state.type = "all";
    // Ne pas reset state.catalog - garder le catalogue actuel
    state.gamme = "all";
    state.connectivite = "all";
    state.ergonomie = "all";
    state.priceMin = null;
    state.priceMax = null;
    state.ratingMin = null;
    state.selectedId = null;
    state.visibleCount = INITIAL_LOAD_COUNT;

    searchInput.value = "";
    brandFilter.value = "all";
    typeFilter.value = "all";

    // Réinitialiser les nouveaux filtres si les éléments existent
    var gammeFilter = document.getElementById("gamme-filter");
    var connectiviteFilter = document.getElementById("connectivite-filter");
    var ergonomieFilter = document.getElementById("ergonomie-filter");
    if (gammeFilter) gammeFilter.value = "all";
    if (connectiviteFilter) connectiviteFilter.value = "all";
    if (ergonomieFilter) ergonomieFilter.value = "all";

    renderCatalog();
    searchInput.focus();
  }

  var debouncedSearch = debounce(function (event) {
    hideProduct();
    var rawQuery = event.target.value;
    state.query = normalizeText(rawQuery);
    state.visibleCount = INITIAL_LOAD_COUNT;
    state.selectedId = null;
    SearchHistory.addSearch(rawQuery);
    renderCatalog();
    renderSearchHistory();
  }, DEBOUNCE_DELAY);

  function renderSearchHistory() {
    var container = document.getElementById('search-history-container');
    if (!container) return;
    var history = SearchHistory.getHistory();
    if (history.length === 0) {
      container.innerHTML = '';
      container.style.display = 'none';
      return;
    }
    var html = '<div class="search-history" role="region" aria-label="' + escapeHtml("Recent searches") + '">' +
      '<div class="search-history-header">' +
        '<span class="search-history-title" id="search-history-title">' + escapeHtml("Recent searches") + '</span>' +
        '<button type="button" class="search-history-clear" id="clear-search-history" aria-label="' + escapeHtml("Clear") + ' ' + escapeHtml("Recent searches") + '">' + escapeHtml("Clear") + '</button>' +
      '</div>' +
      '<div class="search-history-list" role="list">';
    history.forEach(function(query) {
      html += '<button type="button" class="search-history-item" data-query="' + escapeHtml(query) + '" role="listitem" aria-label="' + escapeHtml("Search for") + ' ' + escapeHtml(query) + '">' + escapeHtml(query) + '</button>';
    });
    html += '</div></div>';
    container.innerHTML = html;
    container.style.display = 'block';

    container.querySelectorAll('.search-history-item').forEach(function(btn) {
      btn.addEventListener('click', function() {
        var query = btn.getAttribute('data-query');
        searchInput.value = query;
        state.query = normalizeText(query);
        state.visibleCount = INITIAL_LOAD_COUNT;
        state.selectedId = null;
        renderCatalog();
      });
    });

    var clearBtn = container.querySelector('#clear-search-history');
    if (clearBtn) {
      clearBtn.addEventListener('click', function() {
        SearchHistory.clearHistory();
        renderSearchHistory();
      });
    }
  }

  var favoritesGrid = document.getElementById('favorites-grid');
  var catalogPanel = document.getElementById('catalog-panel');
  var favoritesPage = document.getElementById('favorites-page');
  var catalogBubbleSection = document.getElementById('catalog-bubble-section');
  var toolbarPanel = document.getElementById('toolbar-panel');
  var mainWorkspace = document.getElementById('main-workspace');
  var typeFilter = document.getElementById('type-filter');

  function announceToScreenReader(message) {
    var announcer = document.getElementById('sr-announcer');
    if (!announcer) {
      announcer = document.createElement('div');
      announcer.id = 'sr-announcer';
      announcer.setAttribute('aria-live', 'polite');
      announcer.setAttribute('aria-atomic', 'true');
      announcer.className = 'sr-only';
      document.body.appendChild(announcer);
    }
    announcer.textContent = message;
    setTimeout(function() { announcer.textContent = ''; }, 1000);
  }

  var ROUTE_MAP = {
    'keyboard': '/claviers',
    'mice': '/souris',
    'pc-component': '/composants'
  };

  var CATALOG_MAP = {
    '/claviers': 'keyboard',
    '/souris': 'mice',
    '/composants': 'pc-component'
  };

  function getRouteForCatalog(catalogType) {
    return ROUTE_MAP[catalogType] || '/';
  }

  function getCatalogForRoute(path) {
    return CATALOG_MAP[path] || null;
  }

  var currentRoute = '/';

  function isFileProtocol() {
    return window.location.protocol === 'file:';
  }

  function pathToHash(path) {
    return '#!/' + path.replace(/^\//, '');
  }

  function hashToPath(hash) {
    return hash.replace(/^#!/, '/').replace(/^#/, '/');
  }

  function updateRoute(path, title) {
    currentRoute = path;
    if (isFileProtocol()) {
      var newHash = pathToHash(path);
      if (window.location.hash !== newHash) {
        window.history.pushState({ path: path }, title, newHash);
      }
    } else if (window.location.pathname !== path) {
      window.history.pushState({ path: path }, title, path);
    }
  }

  function handleRoute(path, hash) {
    var routePath = path;
    if (isFileProtocol() && hash) {
      routePath = hashToPath(hash);
    } else if (isFileProtocol() && !path) {
      routePath = currentRoute;
    }
    // Handle about.html route - let it navigate normally
    if (routePath.includes('about.html') || routePath.includes('/about')) {
      return;
    }
    var catalogType = getCatalogForRoute(routePath);
    if (catalogType) {
      showCatalog(catalogType, false);
    } else if (routePath === '/' || routePath === '') {
      showHome(false);
    }
  }

  var PAGE_TITLES = {
    'keyboard': "MinSp - Mechanical & Gaming Keyboard Comparison",
    'mice': "MinSp - Gaming & Office Mouse Comparison",
    'pc-component': "MinSp - PC Component Comparison"
  };

  var STAT_LABELS = {
    'keyboard': { models: 'Keyboards', brands: 'Brands', images: 'Images', results: 'Results' },
    'mice': { models: 'Mice', brands: 'Brands', images: 'Images', results: 'Results' },
    'pc-component': { models: 'Components', brands: 'Brands', images: 'Images', results: 'Results' },
    'all': { models: 'Models', brands: 'Brands', images: 'Images', results: 'Results' }
  };

  function updateStatLabels(catalogType) {
    var labels = STAT_LABELS[catalogType] || STAT_LABELS['all'];
    var modelsLabel = document.getElementById('models-label');
    var brandsLabel = document.getElementById('brands-label');
    var imagesLabel = document.getElementById('images-label');
    var resultsLabel = document.getElementById('results-label');
    if (modelsLabel) modelsLabel.textContent = window.t(labels.models);
    if (brandsLabel) brandsLabel.textContent = window.t(labels.brands);
    if (imagesLabel) imagesLabel.textContent = window.t(labels.images);
    if (resultsLabel) resultsLabel.textContent = window.t(labels.results);
  }

  function showCatalog(catalogType, shouldUpdateRoute) {
    if (!toolbarPanel || !mainWorkspace) return;
    var pageTitle = PAGE_TITLES[catalogType] || "MinSp - Electronic Product Comparison";
    document.title = pageTitle;
    if (shouldUpdateRoute !== false) {
      updateRoute(getRouteForCatalog(catalogType), pageTitle);
    }
    if (catalogBubbleSection) catalogBubbleSection.classList.add('hidden');
    toolbarPanel.classList.remove('hidden');
    mainWorkspace.classList.remove('hidden');
    state.catalog = catalogType || "all";
    state.type = "all";
    state.brand = "all";
    state.query = "";
    if (searchInput) searchInput.value = "";
    updateStatLabels(state.catalog);
    refreshFilterOptions();
    renderCatalog();
    var catalogName = state.catalog === 'all' ? 'All catalog' : (state.catalog === 'pc-component' ? 'Pc Component' : state.catalog === 'keyboard' ? 'Keyboard' : 'Mice');
    announceToScreenReader(window.t('Catalog opened:') + ' ' + window.t(catalogName));
  }

  function showHome(shouldUpdateRoute) {
    if (!toolbarPanel || !mainWorkspace) return;
    document.title = HOME_TITLE;
    if (shouldUpdateRoute !== false) {
      updateRoute('/', HOME_TITLE);
    }
    if (catalogBubbleSection) catalogBubbleSection.classList.remove('hidden');
    toolbarPanel.classList.add('hidden');
    mainWorkspace.classList.add('hidden');
    hideFavoritesPage();
    state.catalog = "all";
    updateStatLabels('all');
    refreshFilterOptions();
  }

  function showFavoritesPage() {
    if (!favoritesPage || !catalogPanel) return;
    renderFavoritesGrid();
    catalogPanel.classList.add('hidden');
    favoritesPage.classList.remove('hidden');
  }

  function hideFavoritesPage() {
    if (!favoritesPage || !catalogPanel) return;
    favoritesPage.classList.add('hidden');
    catalogPanel.classList.remove('hidden');
    renderCatalog();
  }

  function renderFavoritesGrid() {
    if (!favoritesGrid) return;
    var favIds = Favorites.getFavorites();
    var favMice = favIds.map(function(fid) {
      return mice.find(function(m) { return m.id === fid; });
    }).filter(function(m) { return m; });

    var html = '';
    if (favMice.length > 0) {
      favMice.forEach(function(mouse, index) {
        html += cardMarkup(mouse, index);
      });
    } else {
      html = '<div class="empty-state">' +
        '<h3>' + escapeHtml("No favorites") + '</h3>' +
        '<p>' + escapeHtml("Add mice to your favorites to see them here.") + '</p>' +
      '</div>';
    }

    favoritesGrid.innerHTML = html;
    bindImageFallbacks(favoritesGrid);

    favoritesGrid.querySelectorAll('.mouse-card').forEach(function(card) {
      card.addEventListener('click', function() {
        var id = card.getAttribute('data-id');
        showProduct(id);
      });
    });

    favoritesGrid.querySelectorAll('.card-fav-btn').forEach(function(btn) {
      btn.addEventListener('click', function(e) {
        e.stopPropagation();
        e.preventDefault();
        var mouseId = btn.getAttribute('data-fav-id');
        var isFav = Favorites.toggleFavorite(mouseId);
        btn.textContent = isFav ? '★' : '☆';
        btn.classList.toggle('is-fav', isFav);
        btn.setAttribute('aria-label', isFav ? 'Remove from favorites' : 'Add to favorites');
        renderFavoritesGrid();
      });
    });
  }

  function bindEvents() {
    if (searchInput) {
      searchInput.addEventListener("input", debouncedSearch);
    }

    if (brandFilter) {
      brandFilter.addEventListener("change", function (event) {
        hideProduct();
        state.brand = event.target.value;
        state.visibleCount = INITIAL_LOAD_COUNT;
        state.selectedId = null;
        renderCatalog();
      });
    }

    if (typeFilter) {
      typeFilter.addEventListener("change", function (event) {
        hideProduct();
        state.type = event.target.value;
        state.visibleCount = INITIAL_LOAD_COUNT;
        state.selectedId = null;
        renderCatalog();
      });
    }

    // Event listeners pour les nouveaux filtres (avec vérification défensive)
    var gammeFilter = document.getElementById("gamme-filter");
    if (gammeFilter) {
      gammeFilter.addEventListener("change", function (event) {
        hideProduct();
        state.gamme = event.target.value;
        state.visibleCount = INITIAL_LOAD_COUNT;
        state.selectedId = null;
        renderCatalog();
      });
    }

    var connectiviteFilter = document.getElementById("connectivite-filter");
    if (connectiviteFilter) {
      connectiviteFilter.addEventListener("change", function (event) {
        hideProduct();
        state.connectivite = event.target.value;
        state.visibleCount = INITIAL_LOAD_COUNT;
        state.selectedId = null;
        renderCatalog();
      });
    }

    var ergonomieFilter = document.getElementById("ergonomie-filter");
    if (ergonomieFilter) {
      ergonomieFilter.addEventListener("change", function (event) {
        hideProduct();
        state.ergonomie = event.target.value;
        state.visibleCount = INITIAL_LOAD_COUNT;
        state.selectedId = null;
        renderCatalog();
      });
    }

    if (resetFilters) {
      resetFilters.addEventListener("click", function () {
        resetAllFilters();
      });
    }

    var favViewBtn = document.getElementById('fav-view-btn');
    if (favViewBtn) {
      favViewBtn.addEventListener('click', function() {
        showFavoritesPage();
      });
    }

    var backToCatalogBtn = document.getElementById('back-to-catalog');
    if (backToCatalogBtn) {
      backToCatalogBtn.addEventListener('click', function() {
        hideFavoritesPage();
      });
    }

    var backHomeBtn = document.getElementById('back-home-btn');
    if (backHomeBtn) {
      backHomeBtn.addEventListener('click', function() {
        showHome();
      });
    }

    var bubbleCards = document.querySelectorAll('.catalog-bubble-card:not(.catalog-bubble-card-soon)');
    bubbleCards.forEach(function(card) {
      card.addEventListener('click', function(event) {
        event.preventDefault();
        event.stopPropagation();
        var catalogType = card.getAttribute('data-catalog');
        if (catalogType) showCatalog(catalogType);
        return false;
      });
    });

    // CTA link - let it work naturally without JavaScript intervention

    window.addEventListener('popstate', function(event) {
      var path = window.location.pathname;
      var hash = window.location.hash;
      handleRoute(path, hash);
    });

    if (catalogGrid) {
      catalogGrid.addEventListener("click", function (event) {
        var card = event.target.closest(".mouse-card[data-id]");

        if (!card) {
          return;
        }

        var newSelectedId = card.getAttribute("data-id");
        console.log('[Catalog Click] ID récupéré de la carte:', newSelectedId);
        console.log('[Catalog Click] Premier ID dans mice:', mice.length > 0 ? mice[0].id : 'aucun');
        showProduct(newSelectedId);
      });
    }

    if (closeBtn) {
      closeBtn.addEventListener("click", function () {
        hideProduct();
      });
    }

    // Click outside to close (for mobile bottom sheet)
    if (detailView) {
      detailView.addEventListener("click", function (event) {
        // If clicking on the backdrop (not the shell content)
        if (event.target === detailView) {
          hideProduct();
        }
      });
    }

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        closeLanguageMenu();
        hideProduct();
      }
    });
  }

  window.addEventListener('minsp:languagechange', function (event) {
    var nextLanguage = event && event.detail ? event.detail.language : null;
    var normalizedLanguage = normalizeLanguageCode(nextLanguage);

    if (!nextLanguage || normalizedLanguage === CURRENT_LANGUAGE) {
      return;
    }

    updateLanguage(normalizedLanguage);
  });

  function init() {
    console.log('[DEBUG] Initialisation de l\'application');
    console.log('[DEBUG] Éléments DOM requis:', {
      searchInput: !!searchInput,
      brandFilter: !!brandFilter,
      typeFilter: !!typeFilter,
      catalogGrid: !!catalogGrid,
      detailPanel: !!detailPanel,
      closeBtn: !!closeBtn,
      backHomeBtn: !!backHomeBtn,
      favViewBtn: !!favViewBtn,
      aiRecommendBtn: !!aiRecommendBtn,
      languagePicker: !!languagePicker,
      languageTrigger: !!languageTrigger,
      languageMenu: !!languageMenu,
      navLangFlag: !!navLangFlag,
      navLangLabel: !!navLangLabel,
      navLangMenu: !!navLangMenu,
      navLangOptions: !!navLangOptions,
      navMobileToggle: !!navMobileToggle,
      navMobileMenu: !!navMobileMenu,
      navMobileLinks: !!navMobileLinks,
      navMobileOverlay: !!navMobileOverlay,
      themeToggle: !!themeToggle,
      themeToggleIcon: !!themeToggleIcon
    });
    
    var initialLanguage;

    // Log which elements are missing but don't block initialization
    var missingElements = [];
    if (!searchInput) missingElements.push('searchInput');
    if (!catalogGrid) missingElements.push('catalogGrid');
    if (!detailPanel) missingElements.push('detailPanel');

    if (missingElements.length > 0) {
      console.warn('[App] Some elements not found on this page:', missingElements.join(', '));
    }

    // Set up elements that do exist
    if (catalogGrid) {
      catalogGrid.setAttribute("tabindex", "0");
      catalogGrid.setAttribute("aria-busy", "false");
    }
    if (detailPanel) {
      detailPanel.setAttribute("tabindex", "0");
    }

    initializeLanguageSelector();
    bindEvents();
    updateHeaderAuth();
    initialLanguage = window.MinSPI18n && typeof window.MinSPI18n.getCurrentLanguage === 'function'
      ? window.MinSPI18n.getCurrentLanguage()
      : DEFAULT_LANGUAGE;
    updateLanguage(initialLanguage);
    window.setLanguage = setLanguage;
    window.showProduct = showProduct;
    window.hideProduct = hideProduct;
    renderSearchHistory();

    var initialPath = window.location.pathname;
    var initialHash = window.location.hash;

    function getInitialRoute() {
      if (isFileProtocol() && initialHash) {
        return hashToPath(initialHash);
      }
      var pathSegments = initialPath.split('/').filter(Boolean);
      var lastSegment = pathSegments[pathSegments.length - 1] || '';
      if (['souris', 'claviers', 'composants'].includes(lastSegment)) {
        return '/' + lastSegment;
      }
      return initialPath;
    }

    var routeToHandle = getInitialRoute();
    console.log('[Route Debug] Path:', initialPath, 'Hash:', initialHash, 'Route:', routeToHandle, 'isFile:', isFileProtocol());

    function loadInitialRoute() {
      if (routeToHandle && routeToHandle !== '/') {
        if (!toolbarPanel || !mainWorkspace) {
          console.log('[Route] DOM not ready, retrying...');
          setTimeout(loadInitialRoute, 50);
          return;
        }
        handleRoute(routeToHandle, initialHash);
        console.log('[Route] Loaded catalog from URL:', routeToHandle);
      } else if (routeToHandle === '/') {
        // Page d'accueil - mettre à jour les statistiques avec délai
        setTimeout(function() {
          if (typeof mice !== 'undefined' && mice.length > 0) {
            syncStats(mice);
          }
        }, 100);
      }
    }

    setTimeout(loadInitialRoute, 0);

    // Sécuriser le rendu initial du catalogue
    if (typeof mice !== 'undefined' && mice.length > 0) {
      renderCatalog();
      // Mettre à jour les statistiques après le chargement
      syncStats(mice);
      console.log("MinSp : Catalogue chargé avec succès -", mice.length, "produits trouvés");
    } else {
      console.error("MinSp Error : Les données 'mice' sont introuvables !");
    }
  }

  // Note: AI Recommendation feature moved to separate page: ai-recommend.html

  // Vérification finale avant initialisation
  if (typeof mice !== 'undefined' && mice.length > 0) {
    init();
  } else {
    console.error("MinSp Critical Error : Impossible d'initialiser - données manquantes");
  }
}());
