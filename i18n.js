/**
 * MinSp I18n - Système de traduction centralisé et robuste
 * Reconstruction complète - v2.0
 */
(function() {
  'use strict';

  // ═══════════════════════════════════════════════════════════
  // 1. CENTRALISATION DES DONNÉES
  // ═══════════════════════════════════════════════════════════
  
  const translations = {
    fr: {
      // Meta & SEO
      siteName: 'MinSp',
      siteTagline: 'choisir, comparer, jouer',
      pageTitleHome: 'MinSp — Comparateur de produits tech | Souris, Claviers, PC',
      metaDescriptionHome: 'Comparez gratuitement les meilleurs souris gaming, claviers mécaniques et composants PC. Analyse IA, filtres avancés, sans inscription.',
      metaKeywords: 'comparateur souris, souris gaming, clavier mécanique, composants PC, comparaison produit, DPI, polling rate, MinSp',
      ogLocale: 'fr_FR',
      
      // Navigation
      navHome: 'Accueil',
      navMice: 'Souris',
      navKeyboards: 'Claviers',
      navPCComponents: 'Composants PC',
      navAIRecommendation: 'Recommandation IA',
      navFavorites: 'Favoris',
      navLogin: 'Se connecter',
      navLanguageLabel: 'Choisir la langue',
      
      // Langues
      langEnglishUS: 'English (US)',
      langFrench: 'Français (FR)',
      langSpanish: 'Español (ES)',
      langGerman: 'Deutsch (DE)',
      langItalian: 'Italiano (IT)',
      langEnglishUK: 'English (UK)',
      
      // Stats
      statModels: 'Modèles',
      statBrands: 'Marques',
      statImages: 'Images',
      statResults: 'Résultats',
      
      // Catalog Bubble Section
      catalogTitle: 'Catalogue',
      catalogSubtitle: 'Explorez nos catégories de produits',
      catMiceName: 'Souris',
      catMiceDesc: 'Gaming & bureau',
      catKeyboardsName: 'Claviers',
      catKeyboardsDesc: 'Mécaniques & gaming',
      catPCComponentsName: 'Composants PC',
      catPCComponentsDesc: 'Cartes graphiques, RAM…',
      catSmartphonesName: 'Smartphones',
      catSmartphonesDesc: 'Bientôt disponible',
      catAudioName: 'Audio',
      catAudioDesc: 'Bientôt disponible',
      catAccessoriesName: 'Accessoires',
      catAccessoriesDesc: 'Bientôt disponible',
      catalogCTA: 'En savoir plus',
      
      // Toolbar & Filtres
      labelSearch: 'Recherche',
      labelBrand: 'Marque',
      labelType: 'Type',
      placeholderSearch: 'Rechercher : gaming, bureau, sans-fil, couleur, poids...',
      optionAllBrands: 'Toutes les marques',
      optionAllTypes: 'Tous les types',
      buttonReset: 'Réinitialiser',
      searchHelp: 'Utilisez ce champ pour rechercher des produits par nom, marque ou caractéristiques.',
      brandHelp: 'Filtrez les résultats par marque de produit.',
      typeHelp: 'Filtrez les résultats par type de produit, gaming ou bureau.',
      
      // Section Catalog
      sectionCatalogKicker: 'Catalogue',
      sectionCatalogTitle: 'Sélection de produits',
      buttonBackHome: '🏠 Accueil',
      buttonFavorites: 'Favoris',
      buttonAI: 'IA',
      aiTooltip: 'Obtenez une recommandation IA (connexion requise)',
      
      // Section Favoris
      favKicker: 'Favoris',
      favTitle: 'Vos favoris',
      buttonBackToCatalog: '← Retour au catalogue',
      
      // Detail Panel Empty State
      detailEmptyKicker: 'Détails produit',
      detailEmptyTitle: 'Choisissez un produit',
      detailEmptyText: 'Cliquez sur une carte pour ouvrir l\'image, les 5 caractéristiques standardisées, et les sources associées.',
      buttonCloseDetails: 'Fermer les détails du produit',
      
      // Footer
      footerQuickLinks: 'Liens rapides',
      footerLinkHome: 'Accueil',
      footerLinkMice: 'Catalogue Souris',
      footerLinkKeyboards: 'Catalogue Claviers',
      footerLinkPCComponents: 'Composants PC',
      footerLinkAbout: 'À propos de MinSp',
      footerLinkMethodology: 'Méthodologie',
      footerLinkAI: 'Recommandation IA',
      footerPopularRecs: 'Recommandations populaires',
      footerBudgetGaming: 'Souris Gaming Budget',
      footerWirelessFPS: 'Souris FPS Sans-fil',
      footerOfficeUnder80: 'Souris Bureau < 80€',
      footerUltraLight: 'Ultra-légères Sans-fil',
      footerLogitechGaming: 'Logitech Gaming',
      footerSmallHand: 'Petites Mains Gaming',
      
      // JSON-LD (Rich Snippets)
      jsonLdSiteName: 'MinSp',
      jsonLdSearchAction: 'Recherche',
      currency: 'EUR'
    },
    
    en: {
      // Meta & SEO
      siteName: 'MinSp',
      siteTagline: 'choose, compare, play',
      pageTitleHome: 'MinSp — Tech Product Comparison | Mice, Keyboards, PC',
      metaDescriptionHome: 'Compare gaming mice, mechanical keyboards and PC components for free. AI analysis, advanced filters, no signup required.',
      metaKeywords: 'mouse comparison, gaming mouse, mechanical keyboard, PC components, product comparison, DPI, polling rate, MinSp',
      ogLocale: 'en_US',
      
      // Navigation
      navHome: 'Home',
      navMice: 'Mice',
      navKeyboards: 'Keyboards',
      navPCComponents: 'PC Components',
      navAIRecommendation: 'AI Recommendation',
      navFavorites: 'Favorites',
      navLogin: 'Sign in',
      navLanguageLabel: 'Choose language',
      
      // Langues
      langEnglishUS: 'English (US)',
      langFrench: 'Français (FR)',
      langSpanish: 'Español (ES)',
      langGerman: 'Deutsch (DE)',
      langItalian: 'Italiano (IT)',
      langEnglishUK: 'English (UK)',
      
      // Stats
      statModels: 'Models',
      statBrands: 'Brands',
      statImages: 'Images',
      statResults: 'Results',
      
      // Catalog Bubble Section
      catalogTitle: 'Catalog',
      catalogSubtitle: 'Explore our product categories',
      catMiceName: 'Mice',
      catMiceDesc: 'Gaming & office',
      catKeyboardsName: 'Keyboards',
      catKeyboardsDesc: 'Mechanical & gaming',
      catPCComponentsName: 'PC Components',
      catPCComponentsDesc: 'Graphics cards, RAM…',
      catSmartphonesName: 'Smartphones',
      catSmartphonesDesc: 'Coming soon',
      catAudioName: 'Audio',
      catAudioDesc: 'Coming soon',
      catAccessoriesName: 'Accessories',
      catAccessoriesDesc: 'Coming soon',
      catalogCTA: 'Learn more',
      
      // Toolbar & Filtres
      labelSearch: 'Search',
      labelBrand: 'Brand',
      labelType: 'Type',
      placeholderSearch: 'Search: gaming, office, wireless, color, weight...',
      optionAllBrands: 'All brands',
      optionAllTypes: 'All types',
      buttonReset: 'Reset',
      searchHelp: 'Use this field to search products by name, brand, or features.',
      brandHelp: 'Filter results by product brand.',
      typeHelp: 'Filter results by product type, gaming or office.',
      
      // Section Catalog
      sectionCatalogKicker: 'Catalog',
      sectionCatalogTitle: 'Product selection',
      buttonBackHome: '🏠 Home',
      buttonFavorites: 'Favorites',
      buttonAI: 'AI',
      aiTooltip: 'Get AI recommendation (login required)',
      
      // Section Favoris
      favKicker: 'Favorites',
      favTitle: 'Your favorites',
      buttonBackToCatalog: '← Back to catalog',
      
      // Detail Panel Empty State
      detailEmptyKicker: 'Product details',
      detailEmptyTitle: 'Choose a product',
      detailEmptyText: 'Click a card to open the image, the 5 standardized specs, and the related sources.',
      buttonCloseDetails: 'Close product details',
      
      // Footer
      footerQuickLinks: 'Quick Links',
      footerLinkHome: 'Home',
      footerLinkMice: 'Mice Catalog',
      footerLinkKeyboards: 'Keyboards Catalog',
      footerLinkPCComponents: 'PC Components',
      footerLinkAbout: 'About MinSp',
      footerLinkMethodology: 'Methodology',
      footerLinkAI: 'AI Recommendation',
      footerPopularRecs: 'Popular Recommendations',
      footerBudgetGaming: 'Budget Gaming Mice',
      footerWirelessFPS: 'Wireless FPS Mice',
      footerOfficeUnder80: 'Office Mice Under €80',
      footerUltraLight: 'Ultra-Light Wireless',
      footerLogitechGaming: 'Logitech Gaming',
      footerSmallHand: 'Small Hand Gaming',
      
      // JSON-LD (Rich Snippets)
      jsonLdSiteName: 'MinSp',
      jsonLdSearchAction: 'Search',
      currency: 'USD'
    }
  };

  // ═══════════════════════════════════════════════════════════
  // 2. LOGIQUE DE LANGUE
  // ═══════════════════════════════════════════════════════════
  
  const STORAGE_KEY = 'minsp_language_v2';
  const SUPPORTED_LANGS = ['fr', 'en'];
  const DEFAULT_LANG = 'fr';
  
  let currentLang = DEFAULT_LANG;
  
  function detectLanguage() {
    // 1. localStorage first
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && SUPPORTED_LANGS.includes(saved)) {
      return saved;
    }
    
    // 2. Browser language as fallback
    const browserLang = (navigator.language || navigator.userLanguage || 'fr').toLowerCase();
    const baseLang = browserLang.split('-')[0];
    
    if (SUPPORTED_LANGS.includes(baseLang)) {
      return baseLang;
    }
    
    return DEFAULT_LANG;
  }
  
  function saveLanguage(lang) {
    if (SUPPORTED_LANGS.includes(lang)) {
      localStorage.setItem(STORAGE_KEY, lang);
      currentLang = lang;
      return true;
    }
    return false;
  }
  
  // ═══════════════════════════════════════════════════════════
  // 3. AUTOMATISATION DU RENDU
  // ═══════════════════════════════════════════════════════════
  
  function getText(key) {
    const langData = translations[currentLang] || translations[DEFAULT_LANG];
    return langData[key] || key;
  }
  
  function updateSEO() {
    // Update HTML lang attribute
    document.documentElement.lang = currentLang;
    
    // Update title
    const title = getText('pageTitleHome');
    if (title && title !== 'pageTitleHome') {
      document.title = title;
    }
    
    // Update meta description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.content = getText('metaDescriptionHome');
    }
    
    // Update meta keywords
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.content = getText('metaKeywords');
    }
    
    // Update OG locale
    const ogLocale = document.querySelector('meta[property="og:locale"]');
    if (ogLocale) {
      ogLocale.content = getText('ogLocale');
    }
    
    // Update OG title and description
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.content = getText('pageTitleHome');
    }
    
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) {
      ogDesc.content = getText('metaDescriptionHome');
    }
    
    // Update Twitter
    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) {
      twitterTitle.content = getText('pageTitleHome');
    }
    
    const twitterDesc = document.querySelector('meta[name="twitter:description"]');
    if (twitterDesc) {
      twitterDesc.content = getText('metaDescriptionHome');
    }
  }
  
  function updateJSONLD() {
    // Find or create JSON-LD script
    let jsonLdScript = document.querySelector('script[type="application/ld+json"][data-i18n="jsonld"]');
    
    if (!jsonLdScript) {
      // Try to find existing one without data-i18n
      jsonLdScript = document.querySelector('script[type="application/ld+json"]');
      if (jsonLdScript) {
        jsonLdScript.setAttribute('data-i18n', 'jsonld');
      }
    }
    
    if (jsonLdScript) {
      const jsonLdData = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": getText('jsonLdSiteName'),
        "url": "https://minsp.onrender.com/",
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://minsp.onrender.com/?search={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      };
      
      // Add alternate language versions
      const availableLanguages = ['fr', 'en'];
      if (availableLanguages.length > 1) {
        jsonLdData["@context"] = "https://schema.org";
        jsonLdData["inLanguage"] = currentLang;
      }
      
      jsonLdScript.textContent = JSON.stringify(jsonLdData, null, 2);
    }
  }
  
  function updateHeaderUI() {
    // Update language dropdown flag and label
    const langFlag = document.getElementById('nav-lang-flag');
    const langLabel = document.getElementById('nav-lang-label');
    
    if (langFlag && langLabel) {
      const flagMap = {
        'fr': 'fi-fr',
        'en': 'fi-us'
      };
      langFlag.className = 'fi ' + (flagMap[currentLang] || 'fi-us');
      langLabel.textContent = currentLang.toUpperCase();
    }
    
    // Update active state in language menu
    const langOptions = document.querySelectorAll('.nav-lang-option');
    langOptions.forEach(function(opt) {
      const optLang = opt.getAttribute('data-lang');
      if (optLang === currentLang) {
        opt.classList.add('is-active');
        opt.setAttribute('aria-selected', 'true');
      } else {
        opt.classList.remove('is-active');
        opt.setAttribute('aria-selected', 'false');
      }
    });
  }
  
  function updateLanguage(lang) {
    if (!SUPPORTED_LANGS.includes(lang)) {
      console.warn('Language not supported:', lang);
      return false;
    }
    
    // Save and set current language
    saveLanguage(lang);
    currentLang = lang;
    
    // Update all elements with data-i18n
    document.querySelectorAll('[data-i18n]').forEach(function(el) {
      const key = el.getAttribute('data-i18n');
      if (key === 'jsonld') return; // Skip JSON-LD, handled separately
      
      const text = getText(key);
      if (text && text !== key) {
        el.textContent = text;
      }
    });
    
    // Update placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(function(el) {
      const key = el.getAttribute('data-i18n-placeholder');
      const text = getText(key);
      if (text && text !== key) {
        el.placeholder = text;
      }
    });
    
    // Update aria-labels
    document.querySelectorAll('[data-i18n-aria]').forEach(function(el) {
      const key = el.getAttribute('data-i18n-aria');
      const text = getText(key);
      if (text && text !== key) {
        el.setAttribute('aria-label', text);
      }
    });
    
    // Update option values in selects
    document.querySelectorAll('[data-i18n-options]').forEach(function(select) {
      const firstOption = select.querySelector('option[value="all"]');
      if (firstOption) {
        const key = select.getAttribute('data-i18n-options');
        const text = getText(key);
        if (text && text !== key) {
          firstOption.textContent = text;
        }
      }
    });
    
    // Update SEO meta tags
    updateSEO();
    
    // Update JSON-LD structured data
    updateJSONLD();
    
    // Update header UI
    updateHeaderUI();
    
    // Dispatch custom event for other scripts
    window.dispatchEvent(new CustomEvent('languageChanged', { 
      detail: { language: lang } 
    }));
    
    return true;
  }
  
  // ═══════════════════════════════════════════════════════════
  // 4. INITIALISATION
  // ═══════════════════════════════════════════════════════════
  
  function init() {
    // Detect and set language
    const detectedLang = detectLanguage();
    currentLang = detectedLang;
    
    // Apply translations
    updateLanguage(currentLang);
    
    console.log('[I18n] Initialized with language:', currentLang);
  }
  
  // Auto-init when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  
  // ═══════════════════════════════════════════════════════════
  // 5. EXPOSITION GLOBALE
  // ═══════════════════════════════════════════════════════════
  
  window.I18n = {
    t: getText,
    updateLanguage: updateLanguage,
    getCurrentLang: function() { return currentLang; },
    getSupportedLangs: function() { return SUPPORTED_LANGS; },
    translations: translations
  };
  
  // Legacy compatibility
  window.setLanguage = updateLanguage;
  
})();
