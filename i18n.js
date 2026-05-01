/**
 * MinSp I18n - Système de traduction propre
 * Gestion native française avec traduction optionnelle
 * Pas de mélange hybride - français par défaut
 */
(function() {
  'use strict';

  const I18N = {
    // Langue par défaut du site (français)
    defaultLang: 'fr',
    currentLang: 'fr',
    
    // Translations
    translations: {
      fr: {
        // Site meta
        siteName: 'MinSp',
        siteSlogan: 'choisir, comparer, jouer',
        siteDescription: 'Un catalogue propre et standardisé pour comparer les produits tech',
        
        // Navigation
        home: 'Accueil',
        catalog: 'Catalogue',
        favorites: 'Favoris',
        search: 'Recherche',
        reset: 'Réinitialiser',
        backToCatalog: 'Retour au catalogue',
        
        // Filtres
        brand: 'Marque',
        allBrands: 'Toutes les marques',
        type: 'Type',
        allTypes: 'Tous les types',
        
        // Catégories
        mice: 'Souris',
        keyboards: 'Claviers',
        pcComponents: 'Composants PC',
        
        // Stats
        models: 'Modèles',
        brands: 'Marques',
        images: 'Images',
        results: 'Résultats',
        
        // Catalogue
        productSelection: 'Sélection produits',
        loadMore: 'Charger plus',
        noResults: 'Aucun résultat',
        tryAnotherSearch: 'Essayez une autre recherche, marque ou type.',
        
        // Fiches produits
        productDetails: 'Fiche produit',
        specifications: 'Spécifications',
        sources: 'Sources',
        dpi: 'DPI',
        pollingRate: 'Polling Rate',
        weight: 'Poids',
        shape: 'Forme',
        
        // Auth
        login: 'Se connecter',
        logout: 'Se déconnecter',
        register: 'Créer un compte',
        username: 'Pseudo',
        email: 'Email',
        password: 'Mot de passe',
        
        // Erreurs
        invalidCredentials: 'Email ou mot de passe invalide',
        emailExists: 'Cet email existe déjà',
        allFieldsRequired: 'Tous les champs sont requis'
      },
      
      en: {
        siteName: 'MinSp',
        siteSlogan: 'choose, compare, play',
        siteDescription: 'A clean, standardized catalog to compare tech products',
        
        home: 'Home',
        catalog: 'Catalog',
        favorites: 'Favorites',
        search: 'Search',
        reset: 'Reset',
        backToCatalog: 'Back to catalog',
        
        brand: 'Brand',
        allBrands: 'All brands',
        type: 'Type',
        allTypes: 'All types',
        
        mice: 'Mice',
        keyboards: 'Keyboards',
        pcComponents: 'PC Components',
        
        models: 'Models',
        brands: 'Brands',
        images: 'Images',
        results: 'Results',
        
        productSelection: 'Product Selection',
        loadMore: 'Load more',
        noResults: 'No results',
        tryAnotherSearch: 'Try another search, brand, or type.',
        
        productDetails: 'Product Details',
        specifications: 'Specifications',
        sources: 'Sources',
        dpi: 'DPI',
        pollingRate: 'Polling Rate',
        weight: 'Weight',
        shape: 'Shape',
        
        login: 'Log in',
        logout: 'Log out',
        register: 'Create account',
        username: 'Username',
        email: 'Email',
        password: 'Password',
        
        invalidCredentials: 'Invalid email or password',
        emailExists: 'This email already exists',
        allFieldsRequired: 'All fields are required'
      }
    },

    // Initialiser le système
    init() {
      // Détecter la langue préférée
      const saved = localStorage.getItem('minsp_language');
      const browser = navigator.language?.split('-')[0];
      this.currentLang = saved || (browser === 'fr' ? 'fr' : 'en');
      
      // Mettre à jour l'attribut lang du document
      document.documentElement.lang = this.currentLang === 'fr' ? 'fr' : 'en';
      
      // Traduire la page
      this.translatePage();
      
      return this;
    },

    // Changer de langue
    setLang(lang) {
      if (this.translations[lang]) {
        this.currentLang = lang;
        localStorage.setItem('minsp_language', lang);
        document.documentElement.lang = lang === 'fr' ? 'fr' : 'en';
        this.translatePage();
        return true;
      }
      return false;
    },

    // Obtenir une traduction
    t(key, fallback) {
      const lang = this.translations[this.currentLang] || this.translations[this.defaultLang];
      return lang[key] || fallback || key;
    },

    // Traduire toute la page
    translatePage() {
      document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        const text = this.t(key);
        if (el.hasAttribute('placeholder')) {
          el.placeholder = text;
        } else {
          el.textContent = text;
        }
      });
    },

    // Obtenir les métadonnées SEO pour une page
    getPageMeta(page) {
      const metas = {
        index: {
          fr: {
            title: 'MinSp — Comparateur de produits tech | Souris, Claviers, PC',
            description: 'Comparez gratuitement les meilleurs souris gaming, claviers mécaniques et composants PC. Analyse IA, filtres avancés, sans inscription.'
          },
          en: {
            title: 'MinSp — Tech Product Comparison | Mice, Keyboards, PC Parts',
            description: 'Compare gaming mice, mechanical keyboards and PC components for free. AI analysis, advanced filters, no signup required.'
          }
        },
        mice: {
          fr: {
            title: 'MinSp — Catalogue Souris | Gaming, Bureau, Sans-fil',
            description: 'Explorez notre catalogue complet de souris gaming et bureau. Comparez DPI, polling rate, poids et plus. Filtres avancés et recommandation IA.'
          },
          en: {
            title: 'MinSp — Mice Catalog | Gaming, Office, Wireless',
            description: 'Browse our complete catalog of gaming and office mice. Compare DPI, polling rate, weight and more. Advanced filters and AI recommendations.'
          }
        },
        keyboards: {
          fr: {
            title: 'MinSp — Catalogue Claviers | Mécaniques, Gaming, TKL',
            description: 'Découvrez notre catalogue de claviers mécaniques et gaming. Comparez switches, layout, taille et fonctionnalités. Recommandation IA disponible.'
          },
          en: {
            title: 'MinSp — Keyboard Catalog | Mechanical, Gaming, TKL',
            description: 'Browse our mechanical and gaming keyboard catalog. Compare switches, layout, size and features. AI recommendations available.'
          }
        },
        'pc-components': {
          fr: {
            title: 'MinSp — Catalogue Composants PC | GPU, CPU, RAM, Carte mère',
            description: 'Comparez les meilleurs composants PC : cartes graphiques, processeurs, RAM, cartes mères et plus. Filtres avancés et fiche technique détaillée.'
          },
          en: {
            title: 'MinSp — PC Components Catalog | GPU, CPU, RAM, Motherboard',
            description: 'Compare the best PC components: graphics cards, processors, RAM, motherboards and more. Advanced filters and detailed specs.'
          }
        },
        'ai-recommend': {
          fr: {
            title: 'MinSp — Recommandation IA Souris | Trouvez votre souris idéale',
            description: 'Obtenez une recommandation de souris personnalisée par IA en 30 secondes. Analysez votre profil, grip, budget et usage. Gratuit et sans inscription.'
          },
          en: {
            title: 'MinSp — AI Mouse Recommendation | Find your perfect mouse',
            description: 'Get a personalized AI mouse recommendation in 30 seconds. Analyze your profile, grip, budget and usage. Free, no signup required.'
          }
        }
      };
      
      return metas[page]?.[this.currentLang] || metas[page]?.[this.defaultLang];
    }
  };

  // Exposer globalement
  window.MinSpI18n = I18N;
  
  // Auto-init si DOM prêt
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => I18N.init());
  } else {
    I18N.init();
  }
})();
