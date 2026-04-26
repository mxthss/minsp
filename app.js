/**
 * ElectronicsPalace
 * Catalogue de souris avec recherche, filtres et panneau détail.
 */
(function () {
  "use strict";

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

  var TRANSLATIONS = {
    "fr": {
      // Header et navigation
      "Standardized mouse catalog": "Catalogue standardisé de souris",
      "choose, compare, play": "choisir, comparer, jouer",
      "A clean, standardized catalog to compare gaming and office mice.": "Un catalogue propre et standardisé pour comparer les souris gaming et bureautiques.",
      "Each product includes an image, sources, and exactly": "Chaque produit inclut une image, des sources, et exactement",
      "profiles built around 5 core specs.": "fiches construites autour de 5 spécifications principales.",
      
      // Recherche et filtres
      "Search": "Recherche",
      "Search for": "Rechercher",
      "Search for a model, brand, or keyword...": "Chercher un modèle, une marque ou un mot-clé...",
      "Search: gaming, office, wireless, color, weight, features...": "Recherche : gaming, bureau, sans fil, couleur, poids, fonctionnalités...",
      "Brand": "Marque",
      "All brands": "Toutes les marques",
      "Type": "Type",
      "All types": "Tous les types",
      "All catalog": "Tout le catalogue",
      "Keyboard": "Clavier",
      "Mice": "Souris",
      "Pc Component": "Composant PC",
      "case": "Boîtier",
      "gpu": "Carte graphique",
      "cpu": "Processeur",
      "ram": "Mémoire RAM",
      "motherboard": "Carte mère",
      "cooler": "Refroidissement",
      "storage": "Stockage",
      "psu": "Alimentation",
      "fan": "Ventilateurs",
      "Welcome to ElectronicsPalace": "Bienvenue sur ElectronicsPalace",
      "Choose your category": "Choisissez votre catégorie",
      "Home": "Accueil",
      "Reset": "Réinitialiser",
      
      // Statistiques
      "Models": "Modèles",
      "Brands": "Marques",
      "Images": "Images",
      "Results": "Résultats",
      
      // Catalogue
      "Catalog": "Catalogue",
      "Product selection": "Sélection produits",
      "mouse shown": "souris affichée",
      "mouse shown out of": "souris affichée sur",
      "keyboard shown": "clavier affiché",
      "keyboard shown out of": "clavier affiché sur",
      "pc component shown": "composant PC affiché",
      "pc component shown out of": "composant PC affiché sur",
      "items shown": "articles affichés",
      "items shown out of": "articles affichés sur",
      "No results": "Aucun résultat",
      "Try another search, brand, or type filter.": "Essayez une autre recherche, marque ou type.",
      "Load more": "Charger plus",
      "Loading more products": "Chargement de plus de produits",
      "Open": "Ouvrir",
      "catalog": "catalogue",
      "Catalog opened": "Catalogue ouvert",
      "No matching mouse": "Aucune souris ne correspond à votre recherche",
      "No matching keyboard": "Aucun clavier ne correspond à votre recherche",
      "No matching pc component": "Aucun composant PC ne correspond à votre recherche",
      "No matching item": "Aucun article ne correspond à votre recherche",
      "Show all": "Tout afficher",
      
      // Détails
      "Product details": "Fiche détail",
      "Choose a mouse": "Choisis une souris",
      "Click a catalog card to open the full profile with image, summary, specs, and sources.": "Clique sur une carte du catalogue pour ouvrir la fiche complète avec image, résumé, spécifications et sources.",
      "Quick review": "Avis constructif",
      "Why buy it": "Pourquoi l'acheter",
      "Why skip it": "Pourquoi passer son tour",
      "Best for": "Pour quel profil",
      "Yes if:": "Oui si :",
      "Less relevant if:": "Moins pertinent si :",
      "Profile reliability": "Fiabilité de la fiche",
      "Standardized specs": "Spécifications standardisées",
      "Specifications": "Spécifications",
      "Review": "Avis",
      "Comparison": "Comparaison",
      "Comparison feature coming soon. Select another mouse to compare side by side.": "Fonction de comparaison à venir. Sélectionnez une autre souris pour comparer côte à côte.",
      "User reviews": "Avis utilisateurs",
      "reviews": "avis",
      "No user reviews yet. Be the first to share your experience!": "Aucun avis utilisateur pour le moment. Soyez le premier à partager votre expérience !",
      "Write a review": "Écrire un avis",
      "Your name": "Votre nom",
      "Enter your name": "Entrez votre nom",
      "Your rating": "Votre note",
      "Your review": "Votre avis",
      "Share your experience with this mouse...": "Partagez votre expérience avec cette souris...",
      "Submit review": "Envoyer l'avis",
      "Please select a rating": "Veuillez sélectionner une note",
      "Thank you for your review! It will be published after moderation.": "Merci pour votre avis ! Il sera publié après modération.",
      "Sign in to leave a review": "Connectez-vous pour laisser un avis",
      "Create an account": "Créer un compte",
      "Log in": "Se connecter",
      "Log out": "Se déconnecter",
      "Username": "Pseudo",
      "Email": "Email",
      "Password": "Mot de passe",
      "Confirm password": "Confirmer le mot de passe",
      "Create account": "Créer le compte",
      "Already have an account? Log in": "Déjà un compte ? Connectez-vous",
      "No account? Create one": "Pas de compte ? Créez-en un",
      "Passwords do not match": "Les mots de passe ne correspondent pas",
      "All fields are required": "Tous les champs sont requis",
      "Invalid email or password": "Email ou mot de passe invalide",
      "Email already exists": "Cet email existe déjà",
      "Username already exists": "Ce pseudo existe déjà",
      "Review submitted successfully": "Avis envoyé avec succès",
      "Welcome": "Bienvenue",
      "Account created! Please log in.": "Compte créé ! Veuillez vous connecter.",
      "Add to favorites": "Ajouter aux favoris",
      "Remove from favorites": "Retirer des favoris",
      "Favorites": "Favoris",
      "No favorites": "Aucun favori",
      "Add mice to your favorites to see them here.": "Ajoutez des souris à vos favoris pour les voir ici.",
      "Your favorite mouse": "Votre souris favorite",
      "Back to catalog": "Retour au catalogue",
      "Recent searches": "Recherches récentes",
      "Clear": "Effacer",
      "Key highlights": "Points clés",
      "Sources": "Sources",
      "No source has been added for this profile yet.": "Aucune source n'a été ajoutée pour cette fiche.",
      "Detailed highlights are still being refined for this mouse.": "Les points clés détaillés sont encore en cours d'affinage pour cette souris.",
      
      // Spécifications
      "DPI": "DPI",
      "Polling Rate": "Polling Rate",
      "Weight": "Poids",
      "Type": "Type",
      "Shape": "Forme",
      "Confirmed": "Confirmé",
      "Estimated": "Estimé",
      "Inferred": "Déduit",
      "Needs review": "À vérifier",
      "Reliable": "Fiable",
      "Partial": "Partiel",
      "Not specified": "Non spécifié",
      
      // Qualité et avis
      "Some information should still be verified before buying.": "Certaines informations restent à vérifier avant achat.",
      "Review notes are still being refined for this mouse.": "Les avis sont encore en cours d'affinage pour cette souris.",
      "Shape and real-world use are still the first things to check.": "La forme et l'usage réel restent les premiers critères à vérifier.",
      "Make sure the shape really fits your grip before deciding.": "Vérifie surtout que la forme correspond vraiment à votre prise avant de décider.",
      "you want a mouse that matches your grip style.": "vous voulez une souris qui correspond à votre style de prise.",
      "you are looking for the exact opposite shape or feel.": "vous cherchez l'exact opposé de cette forme ou sensation.",
      
      // Messages divers
      "Summary not available yet.": "Résumé non disponible pour le moment.",
      "No summary is available for this mouse yet.": "Aucun résumé n'est disponible pour cette souris.",
      "No visible result": "Aucun résultat visible",
      "The detail panel will update again as soon as a matching mouse is visible.": "Le panneau détail se mettra à jour dès qu'une souris correspondante sera visible.",
      
      // Messages d'erreur et états vides
      "No results": "Aucun résultat",
      "Try another search, brand, or type filter.": "Essayez une autre recherche, marque ou type de filtre.",
      
      // Labels de spécifications
      "DPI": "DPI",
      "Polling Rate": "Polling Rate", 
      "Weight": "Poids",
      "Type": "Type",
      "Shape": "Forme"
    },
    
    "en": {
      // Anglais par défaut (déjà en anglais dans le HTML)
    },
    
    "en-us": {
      // Anglais américain (similaire à l'anglais britannique pour l'instant)
    },
    
    "de": {
      // Header et navigation
      "Standardized mouse catalog": "Standardisierte Mauskatalog",
      "choose, compare, play": "wählen, vergleichen, spielen",
      "A clean, standardized catalog to compare gaming and office mice.": "Ein sauberer, standardisierter Katalog zum Vergleich von Gaming- und Büromäusen.",
      "Each product includes an image, sources, and exactly": "Jedes Produkt enthält ein Bild, Quellen und genau",
      "profiles built around 5 core specs.": "Profile, die um 5 Kernspezifikationen aufgebaut sind.",
      
      // Recherche et filtres
      "Search": "Suche",
      "Search for": "Suchen nach",
      "Search for a model, brand, or keyword...": "Suche nach einem Modell, Marke oder Schlüsselwort...",
      "Search: gaming, office, wireless, color, weight, features...": "Suche: Gaming, Büro, kabellos, Farbe, Gewicht, Funktionen...",
      "Brand": "Marke",
      "All brands": "Alle Marken",
      "Type": "Typ",
      "All types": "Alle Typen",
      "All catalog": "Gesamter Katalog",
      "Keyboard": "Tastatur",
      "Mice": "Mäuse",
      "Pc Component": "PC-Komponente",
      "case": "Gehäuse",
      "gpu": "Grafikkarte",
      "cpu": "Prozessor",
      "ram": "Arbeitsspeicher",
      "motherboard": "Mainboard",
      "cooler": "Kühlung",
      "storage": "Speicher",
      "psu": "Netzteil",
      "fan": "Lüfter",
      "Welcome to ElectronicsPalace": "Willkommen bei ElectronicsPalace",
      "Choose your category": "Wählen Sie Ihre Kategorie",
      "Home": "Startseite",
      "Reset": "Zurücksetzen",
      
      // Statistiques
      "Models": "Modelle",
      "Brands": "Marken",
      "Images": "Bilder",
      "Results": "Ergebnisse",
      
      // Catalogue
      "Catalog": "Katalog",
      "Product selection": "Produktauswahl",
      "mouse shown": "Maus angezeigt",
      "mouse shown out of": "Maus angezeigt von",
      "keyboard shown": "Tastatur angezeigt",
      "keyboard shown out of": "Tastatur angezeigt von",
      "pc component shown": "PC-Komponente angezeigt",
      "pc component shown out of": "PC-Komponente angezeigt von",
      "items shown": "Artikel angezeigt",
      "items shown out of": "Artikel angezeigt von",
      "No results": "Keine Ergebnisse",
      "Try another search, brand, or type filter.": "Versuchen Sie eine andere Suche, Marke oder einen anderen Typ.",
      "Load more": "Mehr laden",
      "Loading more products": "Weitere Produkte werden geladen",
      "Open": "Öffnen",
      "catalog": "Katalog",
      "Catalog opened": "Katalog geöffnet",
      "No matching mouse": "Keine Maus entspricht Ihrer Suche",
      "No matching keyboard": "Keine Tastatur entspricht Ihrer Suche",
      "No matching pc component": "Keine PC-Komponente entspricht Ihrer Suche",
      "No matching item": "Kein Artikel entspricht Ihrer Suche",
      "Show all": "Alle anzeigen",
      
      // Détails
      "Product details": "Produktdetails",
      "Choose a mouse": "Wählen Sie eine Maus",
      "Click a catalog card to open the full profile with image, summary, specs, and sources.": "Klicken Sie auf eine Katalogkarte, um das vollständige Profil mit Bild, Zusammenfassung, Spezifikationen und Quellen zu öffnen.",
      "Quick review": "Schnelle Übersicht",
      "Why buy it": "Warum kaufen",
      "Why skip it": "Warum überspringen",
      "Best for": "Am besten für",
      "Yes if:": "Ja, wenn:",
      "Less relevant if:": "Weniger relevant, wenn:",
      "Profile reliability": "Profil-Zuverlässigkeit",
      "Standardized specs": "Standardisierte Spezifikationen",
      "Specifications": "Spezifikationen",
      "Review": "Bewertung",
      "Comparison": "Vergleich",
      "Comparison feature coming soon. Select another mouse to compare side by side.": "Vergleichsfunktion demnächst verfügbar. Wählen Sie eine andere Maus zum Vergleichen.",
      "User reviews": "Benutzerbewertungen",
      "reviews": "Bewertungen",
      "No user reviews yet. Be the first to share your experience!": "Noch keine Benutzerbewertungen. Seien Sie der erste, der seine Erfahrung teilt!",
      "Write a review": "Bewertung schreiben",
      "Your name": "Ihr Name",
      "Enter your name": "Ihren Namen eingeben",
      "Your rating": "Ihre Bewertung",
      "Your review": "Ihre Bewertung",
      "Share your experience with this mouse...": "Teilen Sie Ihre Erfahrung mit dieser Maus...",
      "Submit review": "Bewertung absenden",
      "Please select a rating": "Bitte wählen Sie eine Bewertung",
      "Thank you for your review! It will be published after moderation.": "Vielen Dank für Ihre Bewertung! Sie wird nach der Moderation veröffentlicht.",
      "Sign in to leave a review": "Melden Sie sich an, um eine Bewertung abzugeben",
      "Create an account": "Konto erstellen",
      "Log in": "Anmelden",
      "Log out": "Abmelden",
      "Username": "Benutzername",
      "Email": "E-Mail",
      "Password": "Passwort",
      "Confirm password": "Passwort bestätigen",
      "Create account": "Konto erstellen",
      "Already have an account? Log in": "Bereits ein Konto? Anmelden",
      "No account? Create one": "Kein Konto? Erstellen Sie eines",
      "Passwords do not match": "Passwörter stimmen nicht überein",
      "All fields are required": "Alle Felder sind erforderlich",
      "Invalid email or password": "Ungültige E-Mail oder Passwort",
      "Email already exists": "E-Mail existiert bereits",
      "Username already exists": "Benutzername existiert bereits",
      "Review submitted successfully": "Bewertung erfolgreich abgegeben",
      "Welcome": "Willkommen",
      "Add to favorites": "Zu Favoriten hinzufügen",
      "Remove from favorites": "Aus Favoriten entfernen",
      "Favorites": "Favoriten",
      "No favorites": "Keine Favoriten",
      "Add mice to your favorites to see them here.": "Fügen Sie Mäuse zu Ihren Favoriten hinzu, um sie hier zu sehen.",
      "Your favorite mouse": "Ihre Lieblingsmaus",
      "Back to catalog": "Zurück zum Katalog",
      "Recent searches": "Letzte Suchen",
      "Clear": "Löschen",
      "Key highlights": "Wichtige Highlights",
      "Sources": "Quellen",
      "No source has been added for this profile yet.": "Für dieses Profil wurden noch keine Quellen hinzugefügt.",
      "Detailed highlights are still being refined for this mouse.": "Detaillierte Highlights werden für diese Maus noch verfeinert.",
      
      // Spécifications
      "DPI": "DPI",
      "Polling Rate": "Polling Rate",
      "Weight": "Gewicht",
      "Type": "Typ",
      "Shape": "Form",
      "Confirmed": "Bestätigt",
      "Estimated": "Geschätzt",
      "Inferred": "Abgeleitet",
      "Needs review": "Überprüfung erforderlich",
      "Reliable": "Zuverlässig",
      "Partial": "Teilweise",
      "Not specified": "Nicht angegeben",
      
      // Qualité
      "Some information should still be verified before buying.": "Einige Informationen sollten vor dem Kauf noch überprüft werden.",
      "Review notes are still being refined for this mouse.": "Überprüfungsnotizen werden für diese Maus noch verfeinert.",
      "Shape and real-world use are still the first things to check.": "Form und praktische Anwendung sind immer noch die ersten Dinge, die überprüft werden sollten.",
      "Make sure the shape really fits your grip before deciding.": "Stellen Sie sicher, dass die Form wirklich zu Ihrem Griff passt, bevor Sie sich entscheiden.",
      "you want a mouse that matches your grip style.": "Sie wollen eine Maus, die zu Ihrem Griffstil passt.",
      "you are looking for the exact opposite shape or feel.": "Sie suchen das genaue Gegenteil dieser Form oder dieses Gefühls.",
      
      // Messages divers
      "Summary not available yet.": "Zusammenfassung noch nicht verfügbar."
    },
    
    "es": {
      // Header et navigation
      "Standardized mouse catalog": "Catálogo estandarizado de ratones",
      "choose, compare, play": "elegir, comparar, jugar",
      "A clean, standardized catalog to compare gaming and office mice.": "Un catálogo limpio y estandarizado para comparar ratones gaming y de oficina.",
      "Each product includes an image, sources, and exactly": "Cada producto incluye una imagen, fuentes y exactamente",
      "profiles built around 5 core specs.": "perfiles construidos alrededor de 5 especificaciones centrales.",
      
      // Recherche et filtres
      "Search": "Buscar",
      "Search for": "Buscar",
      "Search for a model, brand, or keyword...": "Buscar un modelo, marca o palabra clave...",
      "Search: gaming, office, wireless, color, weight, features...": "Buscar: gaming, oficina, inalámbrico, color, peso, características...",
      "Brand": "Marca",
      "All brands": "Todas las marcas",
      "Type": "Tipo",
      "All types": "Todos los tipos",
      "All catalog": "Todo el catálogo",
      "Keyboard": "Teclado",
      "Mice": "Ratones",
      "Pc Component": "Componente PC",
      "case": "Caja",
      "gpu": "Tarjeta gráfica",
      "cpu": "Procesador",
      "ram": "Memoria RAM",
      "motherboard": "Placa base",
      "cooler": "Refrigeración",
      "storage": "Almacenamiento",
      "psu": "Fuente de alimentación",
      "fan": "Ventiladores",
      "Welcome to ElectronicsPalace": "Bienvenido a ElectronicsPalace",
      "Choose your category": "Elige tu categoría",
      "Home": "Inicio",
      "Reset": "Restablecer",
      
      // Statistiques
      "Models": "Modelos",
      "Brands": "Marcas",
      "Images": "Imágenes",
      "Results": "Resultados",
      
      // Catalogue
      "Catalog": "Catálogo",
      "Product selection": "Selección de productos",
      "mouse shown": "ratón mostrado",
      "mouse shown out of": "ratón mostrado de",
      "keyboard shown": "teclado mostrado",
      "keyboard shown out of": "teclado mostrado de",
      "pc component shown": "componente PC mostrado",
      "pc component shown out of": "componente PC mostrado de",
      "items shown": "artículos mostrados",
      "items shown out of": "artículos mostrados de",
      "No results": "Sin resultados",
      "Try another search, brand, or type filter.": "Pruebe otra búsqueda, marca o tipo de filtro.",
      "Load more": "Cargar más",
      "Loading more products": "Cargando más productos",
      "Open": "Abrir",
      "catalog": "catálogo",
      "Catalog opened": "Catálogo abierto",
      "No matching mouse": "Ningún ratón coincide con su búsqueda",
      "No matching keyboard": "Ningún teclado coincide con su búsqueda",
      "No matching pc component": "Ningún componente PC coincide con su búsqueda",
      "No matching item": "Ningún artículo coincide con su búsqueda",
      "Show all": "Mostrar todo",
      
      // Détails
      "Product details": "Detalles del producto",
      "Choose a mouse": "Elija un ratón",
      "Click a catalog card to open the full profile with image, summary, specs, and sources.": "Haga clic en una tarjeta del catálogo para abrir el perfil completo con imagen, resumen, especificaciones y fuentes.",
      "Quick review": "Revisión rápida",
      "Why buy it": "Por qué comprarlo",
      "Why skip it": "Por qué omitirlo",
      "Best for": "Mejor para",
      "Yes if:": "Sí si:",
      "Less relevant if:": "Menos relevante si:",
      "Profile reliability": "Fiabilidad del perfil",
      "Standardized specs": "Especificaciones estandarizadas",
      "Specifications": "Especificaciones",
      "Review": "Reseña",
      "Comparison": "Comparación",
      "Comparison feature coming soon. Select another mouse to compare side by side.": "Función de comparación próximamente. Seleccione otro ratón para comparar lado a lado.",
      "User reviews": "Opiniones de usuarios",
      "reviews": "opiniones",
      "No user reviews yet. Be the first to share your experience!": "Aún no hay opiniones de usuarios. ¡Sea el primero en compartir su experiencia!",
      "Write a review": "Escribir una opinión",
      "Your name": "Su nombre",
      "Enter your name": "Ingrese su nombre",
      "Your rating": "Su calificación",
      "Your review": "Su opinión",
      "Share your experience with this mouse...": "Comparta su experiencia con este ratón...",
      "Submit review": "Enviar opinión",
      "Please select a rating": "Por favor seleccione una calificación",
      "Thank you for your review! It will be published after moderation.": "¡Gracias por su opinión! Será publicada después de la moderación.",
      "Sign in to leave a review": "Inicie sesión para dejar una opinión",
      "Create an account": "Crear una cuenta",
      "Log in": "Iniciar sesión",
      "Log out": "Cerrar sesión",
      "Username": "Nombre de usuario",
      "Email": "Correo electrónico",
      "Password": "Contraseña",
      "Confirm password": "Confirmar contraseña",
      "Create account": "Crear cuenta",
      "Already have an account? Log in": "¿Ya tiene una cuenta? Inicie sesión",
      "No account? Create one": "¿No tiene cuenta? Cree una",
      "Passwords do not match": "Las contraseñas no coinciden",
      "All fields are required": "Todos los campos son obligatorios",
      "Invalid email or password": "Correo o contraseña inválidos",
      "Email already exists": "El correo ya existe",
      "Username already exists": "El nombre de usuario ya existe",
      "Review submitted successfully": "Opinión enviada con éxito",
      "Welcome": "Bienvenido",
      "Add to favorites": "Agregar a favoritos",
      "Remove from favorites": "Eliminar de favoritos",
      "Favorites": "Favoritos",
      "No favorites": "Sin favoritos",
      "Add mice to your favorites to see them here.": "Agregue ratones a sus favoritos para verlos aquí.",
      "Your favorite mouse": "Tu ratón favorito",
      "Back to catalog": "Volver al catálogo",
      "Recent searches": "Búsquedas recientes",
      "Clear": "Borrar",
      "Key highlights": "Aspectos clave",
      "Sources": "Fuentes",
      "No source has been added for this profile yet.": "Aún no se ha agregado ninguna fuente para este perfil.",
      "Detailed highlights are still being refined for this mouse.": "Los aspectos clave detallados aún se están refinando para este ratón.",
      
      // Spécifications
      "DPI": "DPI",
      "Polling Rate": "Polling Rate",
      "Weight": "Peso",
      "Type": "Tipo",
      "Shape": "Forma",
      "Confirmed": "Confirmado",
      "Estimated": "Estimado",
      "Inferred": "Inferido",
      "Needs review": "Necesita revisión",
      "Reliable": "Confiable",
      "Partial": "Parcial",
      "Not specified": "No especificado",
      
      // Qualité
      "Some information should still be verified before buying.": "Alguna información aún debe ser verificada antes de comprar.",
      "Review notes are still being refined for this mouse.": "Las notas de revisión aún se están refinando para este ratón.",
      "Shape and real-world use are still the first things to check.": "La forma y el uso práctico siguen siendo las primeras cosas que verificar.",
      "Make sure the shape really fits your grip before deciding.": "Asegúrese de que la forma realmente se ajuste a su agarre antes de decidir.",
      "you want a mouse that matches your grip style.": "usted quiere un ratón que coincida con su estilo de agarre.",
      "you are looking for the exact opposite shape or feel.": "usted busca la forma o sensación exactamente opuesta.",
      
      // Messages divers
      "Summary not available yet.": "Resumen no disponible aún."
    },
    
    "it": {
      // Header et navigation
      "Standardized mouse catalog": "Catalogo standardizzato di mouse",
      "choose, compare, play": "scegliere, confrontare, giocare",
      "A clean, standardized catalog to compare gaming and office mice.": "Un catalogo pulito e standardizzato per confrontare mouse gaming e da ufficio.",
      "Each product includes an image, sources, and exactly": "Ogni prodotto include un'immagine, fonti ed esattamente",
      "profiles built around 5 core specs.": "profili costruiti attorno a 5 specifiche principali.",
      
      // Recherche et filtres
      "Search": "Ricerca",
      "Search for": "Cerca",
      "Search for a model, brand, or keyword...": "Cerca un modello, marca o parola chiave...",
      "Search: gaming, office, wireless, color, weight, features...": "Ricerca: gaming, ufficio, wireless, colore, peso, funzionalità...",
      "Brand": "Marca",
      "All brands": "Tutte le marche",
      "Type": "Tipo",
      "All types": "Tutti i tipi",
      "All catalog": "Tutto il catalogo",
      "Keyboard": "Tastiera",
      "Mice": "Mouse",
      "Pc Component": "Componente PC",
      "case": "Case",
      "gpu": "Scheda video",
      "cpu": "Processore",
      "ram": "Memoria RAM",
      "motherboard": "Scheda madre",
      "cooler": "Raffreddamento",
      "storage": "Archiviazione",
      "psu": "Alimentatore",
      "fan": "Ventole",
      "Welcome to ElectronicsPalace": "Benvenuto su ElectronicsPalace",
      "Choose your category": "Scegli la tua categoria",
      "Home": "Home",
      "Reset": "Reimposta",
      
      // Statistiques
      "Models": "Modelli",
      "Brands": "Marche",
      "Images": "Immagini",
      "Results": "Risultati",
      
      // Catalogue
      "Catalog": "Catalogo",
      "Product selection": "Selezione prodotti",
      "mouse shown": "mouse mostrato",
      "mouse shown out of": "mouse mostrato su",
      "keyboard shown": "tastiera mostrata",
      "keyboard shown out of": "tastiera mostrata su",
      "pc component shown": "componente PC mostrato",
      "pc component shown out of": "componente PC mostrato su",
      "items shown": "articoli mostrati",
      "items shown out of": "articoli mostrati su",
      "No results": "Nessun risultato",
      "Try another search, brand, or type filter.": "Prova un'altra ricerca, marca o tipo di filtro.",
      "Load more": "Carica più",
      "Loading more products": "Caricamento di più prodotti",
      "Open": "Apri",
      "catalog": "catalogo",
      "Catalog opened": "Catalogo aperto",
      "No matching mouse": "Nessun mouse corrisponde alla tua ricerca",
      "No matching keyboard": "Nessuna tastiera corrisponde alla tua ricerca",
      "No matching pc component": "Nessun componente PC corrisponde alla tua ricerca",
      "No matching item": "Nessun articolo corrisponde alla tua ricerca",
      "Show all": "Mostra tutto",
      
      // Détails
      "Product details": "Dettagli prodotto",
      "Choose a mouse": "Scegli un mouse",
      "Click a catalog card to open the full profile with image, summary, specs, and sources.": "Clicca su una scheda del catalogo per aprire il profilo completo con immagine, riepilogo, specifiche e fonti.",
      "Quick review": "Riepilogo veloce",
      "Why buy it": "Perché comprarlo",
      "Why skip it": "Perché saltarlo",
      "Best for": "Migliore per",
      "Yes if:": "Sì se:",
      "Less relevant if:": "Meno rilevante se:",
      "Profile reliability": "Affidabilità del profilo",
      "Standardized specs": "Specifiche standardizzate",
      "Specifications": "Specifiche",
      "Review": "Recensione",
      "Comparison": "Confronto",
      "Comparison feature coming soon. Select another mouse to compare side by side.": "Funzione di confronto in arrivo. Seleziona un altro mouse per confrontare fianco a fianco.",
      "User reviews": "Recensioni utenti",
      "reviews": "recensioni",
      "No user reviews yet. Be the first to share your experience!": "Ancora nessuna recensione utente. Sii il primo a condividere la tua esperienza!",
      "Write a review": "Scrivi una recensione",
      "Your name": "Il tuo nome",
      "Enter your name": "Inserisci il tuo nome",
      "Your rating": "La tua valutazione",
      "Your review": "La tua recensione",
      "Share your experience with this mouse...": "Condividi la tua esperienza con questo mouse...",
      "Submit review": "Invia recensione",
      "Please select a rating": "Seleziona una valutazione",
      "Thank you for your review! It will be published after moderation.": "Grazie per la tua recensione! Sarà pubblicata dopo la moderazione.",
      "Sign in to leave a review": "Accedi per lasciare una recensione",
      "Create an account": "Crea un account",
      "Log in": "Accedi",
      "Log out": "Esci",
      "Username": "Nome utente",
      "Email": "Email",
      "Password": "Password",
      "Confirm password": "Conferma password",
      "Create account": "Crea account",
      "Already have an account? Log in": "Hai già un account? Accedi",
      "No account? Create one": "Nessun account? Creane uno",
      "Passwords do not match": "Le password non coincidono",
      "All fields are required": "Tutti i campi sono obbligatori",
      "Invalid email or password": "Email o password non validi",
      "Email already exists": "Email già esistente",
      "Username already exists": "Nome utente già esistente",
      "Review submitted successfully": "Recensione inviata con successo",
      "Welcome": "Benvenuto",
      "Add to favorites": "Aggiungi ai preferiti",
      "Remove from favorites": "Rimuovi dai preferiti",
      "Favorites": "Preferiti",
      "No favorites": "Nessun preferito",
      "Add mice to your favorites to see them here.": "Aggiungi mouse ai tuoi preferiti per vederli qui.",
      "Your favorite mouse": "Il tuo mouse preferito",
      "Back to catalog": "Torna al catalogo",
      "Recent searches": "Ricerche recenti",
      "Clear": "Cancella",
      "Key highlights": "Punti chiave",
      "Sources": "Fonti",
      "No source has been added for this profile yet.": "Nessuna fonte è stata ancora aggiunta per questo profilo.",
      "Detailed highlights are still being refined for this mouse.": "I punti chiave dettagliati sono ancora in fase di perfezionamento per questo mouse.",
      
      // Spécifications
      "DPI": "DPI",
      "Polling Rate": "Polling Rate",
      "Weight": "Peso",
      "Type": "Tipo",
      "Shape": "Forma",
      "Confirmed": "Confermato",
      "Estimated": "Stimato",
      "Inferred": "Dedotto",
      "Needs review": "Richiede revisione",
      "Reliable": "Affidabile",
      "Partial": "Parziale",
      "Not specified": "Non specificato",
      
      // Qualité
      "Some information should still be verified before buying.": "Alcune informazioni dovrebbero ancora essere verificate prima dell'acquisto.",
      "Review notes are still being refined for this mouse.": "Le note di revisione sono ancora in fase di perfezionamento per questo mouse.",
      "Shape and real-world use are still the first things to check.": "La forma e l'uso pratico sono ancora le prime cose da verificare.",
      "Make sure the shape really fits your grip before deciding.": "Assicurati che la forma si adatti davvero alla tua presa prima di decidere.",
      "you want a mouse that matches your grip style.": "vuoi un mouse che corrisponda al tuo stile di presa.",
      "you are looking for the exact opposite shape or feel.": "stai cercando la forma o sensazione esattamente opposta.",
      
      // Messages divers
      "Summary not available yet.": "Riepilogo non ancora disponibile."
    }
  };

  var CURRENT_LANGUAGE = "fr";
  var LANGUAGE_CONFIG = {
    "fr": { flag: "FR", name: "Français", htmlLang: "fr" },
    "en": { flag: "GB", name: "English", htmlLang: "en" },
    "en-us": { flag: "US", name: "English (US)", htmlLang: "en" },
    "de": { flag: "DE", name: "Deutsch", htmlLang: "de" },
    "es": { flag: "ES", name: "Español", htmlLang: "es" },
    "it": { flag: "IT", name: "Italiano", htmlLang: "it" }
  };

  var FLAG_EMOJIS = {
    "FR": "FR",
    "GB": "GB", 
    "US": "US",
    "DE": "DE",
    "ES": "ES",
    "IT": "IT"
  };

  var FLAG_DISPLAY = {
    "FR": "FR",
    "GB": "GB", 
    "US": "US",
    "DE": "DE",
    "ES": "ES",
    "IT": "IT"
  };

  var TRANSLATION_SUPPLEMENTS = {
    "fr": {
      "Language": "Langue",
      "Choose the catalog language.": "Choisissez la langue du catalogue.",
      "Use this field to search mice by name, brand, or features.": "Utilisez ce champ pour rechercher des souris par nom, marque ou caracteristiques.",
      "Filter results by mouse brand.": "Filtrer les resultats par marque.",
      "Filter results by mouse type, gaming or office.": "Filtrer les resultats par type de souris, gaming ou bureautique.",
      "Search and filters": "Recherche et filtres",
      "Catalog stats": "Statistiques du catalogue",
      "Mouse product grid": "Grille des produits",
      "Selected product details": "Details du produit selectionne",
      "Close product details": "Fermer les details du produit",
      "Load more products": "Charger plus de produits",
      "Gaming & office": "Gaming & bureautique",
      "Legacy & classics": "Legacy & historiques",
      "Office & legacy": "Bureautique & historique",
      "Office & classics": "Bureautique & classique",
      "Office & ergonomics": "Bureautique & ergonomie",
      "Office / wellness": "Bureautique / sante",
      "Gaming & productivity": "Gaming & productivite",
      "Office": "Bureautique",
      "Productivity": "Productivite",
      "Miscellaneous": "Divers",
      "Ambidextrous": "Ambidextre",
      "Symmetrical": "Symetrique",
      "Ergonomic": "Ergonomique",
      "Vertical": "Verticale",
      "Right-handed": "Droitier",
      "Left-handed": "Gaucher",
      "Wireless": "Sans fil",
      "Wired": "Filaire",
      "Compact": "Compacte",
      "Travel-friendly": "Nomade"
    },
    "de": {
      "Language": "Sprache",
      "Choose the catalog language.": "Wahlen Sie die Katalogsprache.",
      "Use this field to search mice by name, brand, or features.": "Verwenden Sie dieses Feld, um nach Name, Marke oder Funktionen zu suchen.",
      "Filter results by mouse brand.": "Filtern Sie die Ergebnisse nach Marke.",
      "Filter results by mouse type, gaming or office.": "Filtern Sie die Ergebnisse nach Maustyp, Gaming oder Buro.",
      "Search and filters": "Suche und Filter",
      "Catalog stats": "Katalogstatistiken",
      "Mouse product grid": "Produktgitter",
      "Selected product details": "Ausgewahlte Produktdetails",
      "Close product details": "Produktdetails schliessen",
      "Load more products": "Mehr Produkte laden",
      "Gaming & office": "Gaming & Buro",
      "Legacy & classics": "Legacy & Klassiker",
      "Office & legacy": "Buro & Legacy",
      "Office & classics": "Buro & Klassiker",
      "Office & ergonomics": "Buro & Ergonomie",
      "Office / wellness": "Buro / Komfort",
      "Gaming & productivity": "Gaming & Produktivitat",
      "Office": "Buro",
      "Productivity": "Produktivitat",
      "Miscellaneous": "Verschiedenes",
      "Ambidextrous": "Beidhandig",
      "Symmetrical": "Symmetrisch",
      "Ergonomic": "Ergonomisch",
      "Vertical": "Vertikal",
      "Right-handed": "Rechtshander",
      "Left-handed": "Linkshander",
      "Wireless": "Kabellos",
      "Wired": "Kabelgebunden",
      "Compact": "Kompakt",
      "Travel-friendly": "Mobil"
    },
    "es": {
      "Language": "Idioma",
      "Choose the catalog language.": "Elige el idioma del catalogo.",
      "Use this field to search mice by name, brand, or features.": "Usa este campo para buscar ratones por nombre, marca o caracteristicas.",
      "Filter results by mouse brand.": "Filtra los resultados por marca.",
      "Filter results by mouse type, gaming or office.": "Filtra los resultados por tipo de raton, gaming u oficina.",
      "Search and filters": "Busqueda y filtros",
      "Catalog stats": "Estadisticas del catalogo",
      "Mouse product grid": "Cuadricula de productos",
      "Selected product details": "Detalles del producto seleccionado",
      "Close product details": "Cerrar los detalles del producto",
      "Load more products": "Cargar mas productos",
      "Gaming & office": "Gaming y oficina",
      "Legacy & classics": "Legacy y clasicos",
      "Office & legacy": "Oficina y legacy",
      "Office & classics": "Oficina y clasicos",
      "Office & ergonomics": "Oficina y ergonomia",
      "Office / wellness": "Oficina / bienestar",
      "Gaming & productivity": "Gaming y productividad",
      "Office": "Oficina",
      "Productivity": "Productividad",
      "Miscellaneous": "Varios",
      "Ambidextrous": "Ambidiestro",
      "Symmetrical": "Simetrico",
      "Ergonomic": "Ergonomico",
      "Vertical": "Vertical",
      "Right-handed": "Diestro",
      "Left-handed": "Zurdo",
      "Wireless": "Inalambrico",
      "Wired": "Con cable",
      "Compact": "Compacto",
      "Travel-friendly": "Portatil"
    },
    "it": {
      "Language": "Lingua",
      "Choose the catalog language.": "Scegli la lingua del catalogo.",
      "Use this field to search mice by name, brand, or features.": "Usa questo campo per cercare mouse per nome, marca o caratteristiche.",
      "Filter results by mouse brand.": "Filtra i risultati per marca.",
      "Filter results by mouse type, gaming or office.": "Filtra i risultati per tipo di mouse, gaming o ufficio.",
      "Search and filters": "Ricerca e filtri",
      "Catalog stats": "Statistiche del catalogo",
      "Mouse product grid": "Griglia prodotti",
      "Selected product details": "Dettagli del prodotto selezionato",
      "Close product details": "Chiudi i dettagli del prodotto",
      "Load more products": "Carica piu prodotti",
      "Gaming & office": "Gaming e ufficio",
      "Legacy & classics": "Legacy e classici",
      "Office & legacy": "Ufficio e legacy",
      "Office & classics": "Ufficio e classici",
      "Office & ergonomics": "Ufficio ed ergonomia",
      "Office / wellness": "Ufficio / benessere",
      "Gaming & productivity": "Gaming e produttivita",
      "Office": "Ufficio",
      "Productivity": "Produttivita",
      "Miscellaneous": "Vari",
      "Ambidextrous": "Ambidestro",
      "Symmetrical": "Simmetrico",
      "Ergonomic": "Ergonomico",
      "Vertical": "Verticale",
      "Right-handed": "Destro",
      "Left-handed": "Mancino",
      "Wireless": "Wireless",
      "Wired": "Cablato",
      "Compact": "Compatto",
      "Travel-friendly": "Da viaggio"
    }
  };

  Object.keys(TRANSLATION_SUPPLEMENTS).forEach(function (languageCode) {
    TRANSLATIONS[languageCode] = Object.assign(
      {},
      TRANSLATIONS[languageCode] || {},
      TRANSLATION_SUPPLEMENTS[languageCode]
    );
  });

  Object.assign(TRANSLATIONS.fr, {
    "Reset all search filters": "Reinitialiser tous les filtres de recherche",
    "No summary is available for this mouse yet.": "Aucun resume n'est disponible pour cette souris pour le moment.",
    "Click a catalog card to open the full profile with image, summary, specs, and sources.": "Cliquez sur une carte du catalogue pour ouvrir la fiche complete avec image, resume, specifications et sources.",
    "No visible result": "Aucun resultat visible",
    "The detail panel will update again as soon as a matching mouse is visible.": "Le panneau detail se mettra a jour des qu'une souris correspondante sera visible."
  });

  Object.assign(TRANSLATIONS.de, {
    "Reset all search filters": "Alle Suchfilter zurucksetzen",
    "No summary is available for this mouse yet.": "Fur diese Maus ist noch keine Zusammenfassung verfugbar.",
    "Click a catalog card to open the full profile with image, summary, specs, and sources.": "Klicken Sie auf eine Katalogkarte, um das vollstandige Profil mit Bild, Zusammenfassung, Spezifikationen und Quellen zu offnen.",
    "No visible result": "Kein sichtbares Ergebnis",
    "The detail panel will update again as soon as a matching mouse is visible.": "Das Detailfenster wird erneut aktualisiert, sobald wieder eine passende Maus sichtbar ist."
  });

  Object.assign(TRANSLATIONS.es, {
    "Reset all search filters": "Restablecer todos los filtros de busqueda",
    "No summary is available for this mouse yet.": "Todavia no hay un resumen disponible para este raton.",
    "Click a catalog card to open the full profile with image, summary, specs, and sources.": "Haz clic en una tarjeta del catalogo para abrir la ficha completa con imagen, resumen, especificaciones y fuentes.",
    "No visible result": "Ningun resultado visible",
    "The detail panel will update again as soon as a matching mouse is visible.": "El panel de detalle se actualizara de nuevo en cuanto haya un raton visible que coincida."
  });

  Object.assign(TRANSLATIONS.it, {
    "Reset all search filters": "Reimposta tutti i filtri di ricerca",
    "No summary is available for this mouse yet.": "Non e ancora disponibile un riepilogo per questo mouse.",
    "Click a catalog card to open the full profile with image, summary, specs, and sources.": "Fai clic su una scheda del catalogo per aprire il profilo completo con immagine, riepilogo, specifiche e fonti.",
    "No visible result": "Nessun risultato visibile",
    "The detail panel will update again as soon as a matching mouse is visible.": "Il pannello dei dettagli si aggiornera di nuovo non appena sara visibile un mouse corrispondente."
  });

  var DEFAULT_LANGUAGE = "en-us";
  CURRENT_LANGUAGE = DEFAULT_LANGUAGE;
  var LANGUAGE_ORDER = ["fr", "en-gb", "en-us", "de", "es", "it"];
  var LANGUAGE_ALIASES = {
    "en": "en-gb",
    "en-uk": "en-gb",
    "en-gb": "en-gb",
    "en-us": "en-us",
    "fr-fr": "fr",
    "de-de": "de",
    "es-es": "es",
    "it-it": "it"
  };
  LANGUAGE_CONFIG = {
    "fr": { country: "FR", name: "Français", htmlLang: "fr-FR", dictionary: "fr" },
    "en-gb": { country: "GB", name: "English (UK)", htmlLang: "en-GB", dictionary: "en" },
    "en-us": { country: "US", name: "English (US)", htmlLang: "en-US", dictionary: "en-us", fallbackDictionary: "en" },
    "de": { country: "DE", name: "Deutsch", htmlLang: "de-DE", dictionary: "de", fallbackDictionary: "en" },
    "es": { country: "ES", name: "Español", htmlLang: "es-ES", dictionary: "es", fallbackDictionary: "en" },
    "it": { country: "IT", name: "Italiano", htmlLang: "it-IT", dictionary: "it", fallbackDictionary: "en" }
  };

  function normalizeLanguageCode(value) {
    var normalized = String(value || "").toLowerCase().trim();

    if (LANGUAGE_ALIASES[normalized]) {
      return LANGUAGE_ALIASES[normalized];
    }

    if (LANGUAGE_CONFIG[normalized]) {
      return normalized;
    }

    return DEFAULT_LANGUAGE;
  }

  function getLanguageConfig(lang) {
    return LANGUAGE_CONFIG[normalizeLanguageCode(lang)] || LANGUAGE_CONFIG[DEFAULT_LANGUAGE];
  }

  function getLanguageFlagClass(lang) {
    return "fi fi-" + String(getLanguageConfig(lang).country || "").toLowerCase();
  }

  function flagEmojiFromCountry(countryCode) {
    return String(countryCode || "")
      .toUpperCase()
      .replace(/./g, function (character) {
        return String.fromCodePoint(character.charCodeAt(0) + 127397);
      });
  }

  function getLanguageOptionLabel(lang) {
    var config = getLanguageConfig(lang);
    return flagEmojiFromCountry(config.country) + " " + config.name;
  }

  var PRODUCT_TEXT_REPLACEMENTS = {
    "fr": [
      [/\bVersatile model that may lean toward gaming or office comfort depending on the exact reference\./gi, "Modele polyvalent pouvant s'orienter vers le gaming ou le bureau selon la reference exacte."],
      [/\bKnown or legacy reference that should be double-checked for generation and current availability\./gi, "Reference connue ou legacy a verifier pour sa generation et sa disponibilite actuelle."],
      [/\bPerformance- or MMO-oriented mouse, likely prioritizing sensor quality, buttons, and customization\./gi, "Souris orientee performance ou MMO, avec priorite au capteur, aux boutons et a la personnalisation."],
      [/\bGaming mouse entry that still needs confirmation on weight, sensor, and connection type\./gi, "Reference gaming qui demande encore confirmation sur le poids, le capteur et la connectique."],
      [/\bOffice-oriented reference for productivity, daily use, or classic desk setups\./gi, "Reference orientee bureautique pour la productivite, l'usage quotidien ou les setups classiques."],
      [/\bReference that may balance precision, comfort, and versatility\./gi, "Reference pouvant equilibrer precision, confort et polyvalence."],
      [/\bReference that still needs confirmation for the exact brand, image, and full spec sheet\./gi, "Reference qui demande encore confirmation sur la marque exacte, l'image et la fiche technique complete."],
      [/\bThis reference mainly serves as a historical marker or a comparison point against newer models\./gi, "Cette reference sert surtout de repere historique ou de point de comparaison face aux modeles plus recents."],
      [/\bThis profile gives a good buying direction, but some technical data is still estimated or needs confirmation\./gi, "Cette fiche donne deja une bonne direction d'achat, mais certaines donnees techniques restent estimees ou a confirmer."],
      [/\bThe spec sheet is complete enough to form a serious first opinion\./gi, "La fiche est assez complete pour se faire un premier avis serieux."],
      [/\bThe source mostly points to a brand catalog, so use this profile as a sorting aid, not absolute truth\./gi, "La source renvoie surtout vers un catalogue de marque, donc utilisez cette fiche comme aide au tri, pas comme verite absolue."],
      [/\bLegacy reference kept in the catalog\./gi, "Reference legacy conservee dans le catalogue."],
      [/\bActive reference currently included in the catalog\./gi, "Reference active actuellement incluse dans le catalogue."],
      [/\bLocal image stored in the project\./gi, "Image locale stockee dans le projet."],
      [/\bOfficial image available\./gi, "Image officielle disponible."],
      [/\bWeb image pulled from the associated source\./gi, "Image web recuperee depuis la source associee."],
      [/\bTemporary image harmonized while waiting for an official visual\./gi, "Image temporaire harmonisee en attendant un visuel officiel."],
      [/\bI would mostly look at it as a historical comparison point, not as the default buy\./gi, "Je le verrais surtout comme un point de comparaison historique, pas comme l'achat par defaut."],
      [/\bI would mainly recommend it if you want /gi, "Je le recommanderais surtout si vous cherchez "],
      [/\bThe profile is solid enough to form a real first opinion, but shape is still the final judge\./gi, "La fiche est assez solide pour se faire un vrai premier avis, mais la forme reste le juge final."],
      [/\bIt looks interesting, but I would still cross-check two or three technical points before deciding\./gi, "Le produit semble interessant, mais je verifierais encore deux ou trois points techniques avant de decider."],
      [/\bI would stay cautious before buying, because several details are still partial\./gi, "Je resterais prudent avant achat, car plusieurs details sont encore partiels."],
      [/\bGood fit for office work, mobility, or everyday comfort\./gi, "Bon choix pour le bureau, la mobilite ou le confort au quotidien."],
      [/\bMore neutral shape if you alternate claw, fingertip, or multiple grip styles\./gi, "Forme plus neutre si vous alternez claw, fingertip ou plusieurs styles de prise."],
      [/\bOften less supportive if you want strong palm support and plenty of comfort at rest\./gi, "Souvent moins soutenante si vous recherchez un fort appui paume et beaucoup de confort au repos."],
      [/\bVery low weight helps if you prefer fast movements and snappy resets\./gi, "Le poids tres bas aide si vous aimez les mouvements rapides et les remises en place nerveuses."],
      [/\bFairly heavy body for fast-paced FPS or if you want a very lively mouse\./gi, "Corps assez lourd pour du FPS rapide ou si vous voulez une souris tres vive."],
      [/\bHigh polling rate can be valuable for very competitive play\./gi, "Le polling eleve peut etre utile pour un jeu tres competitif."],
      [/\bLots of direct controls if you play MMOs, assign macros, or like keeping everything under your thumb\./gi, "Beaucoup de controles directs si vous jouez aux MMO, assignez des macros ou aimez tout garder sous le pouce."],
      [/\bBusier shape if you want a minimal, lightweight mouse that feels very simple in hand\./gi, "Forme plus chargee si vous voulez une souris minimaliste, legere et tres simple en main."],
      [/\bMore convincing for fast games than for macro-heavy or office-focused use\./gi, "Plus convaincant pour les jeux rapides que pour un usage charge en macros ou tres bureautique."],
      [/\bLess suitable if you mainly want desk comfort or a command-pad style mouse\./gi, "Moins adapte si vous cherchez surtout le confort au bureau ou une souris type pavet de commandes."],
      [/\bProfile is still partial: some technical values are estimated or still need confirmation\./gi, "La fiche reste partielle : certaines valeurs techniques sont estimees ou doivent encore etre confirmees."],
      [/\bAvailable source mostly points to a brand catalog, not always the exact product page\./gi, "La source disponible renvoie surtout vers un catalogue de marque, pas toujours vers la page produit exacte."],
      [/\bMore coherent format if you move often between devices or work on the go\./gi, "Format plus coherent si vous passez souvent d'un appareil a l'autre ou travaillez en deplacement."],
      [/\bThe final choice will still come down mainly to shape and real comfort in hand\./gi, "Le choix final dependra surtout de la forme et du vrai confort en main."],
      [/\bA partial profile does not mean the product is bad, but it does require a bit more checking before buying\./gi, "Une fiche partielle ne veut pas dire que le produit est mauvais, mais elle demande un peu plus de verification avant achat."],
      [/\bIf the grip already feels right to you, this profile is a good first filter before checking the sources\./gi, "Si la prise en main vous semble deja correcte, cette fiche constitue un bon premier filtre avant de verifier les sources."],
      [/\bIf you buy without trying it, shape and width matter more than the raw DPI number\./gi, "Si vous achetez sans essayer, la forme et la largeur comptent plus que le simple chiffre de DPI."],
      [/\bEven with a good profile, real comfort still depends on your grip, hand size, and main use\./gi, "Meme avec une bonne fiche, le confort reel depend toujours de votre prise, de la taille de votre main et de votre usage principal."],
      [/\bIf you hesitate between similar models, real weight, scroll wheel feel, and buttons often make the real difference\./gi, "Si vous hésitez entre des modeles proches, le poids reel, la sensation de molette et les boutons font souvent la vraie difference."],
      [/\bThis profile relies on a more direct product source and several confirmed technical values\./gi, "Cette fiche s'appuie sur une source produit plus directe et plusieurs valeurs techniques confirmees."],
      [/\bYou can already form a buying opinion, but part of the technical data is still estimated or needs cross-checking\./gi, "Vous pouvez deja vous faire un avis d'achat, mais une partie de la technique reste estimee ou demande un recoupement."],
      [/\bThis profile mainly helps position the product\. Before buying, verify the weight, polling rate, and exact manufacturer page\./gi, "Cette fiche aide surtout a situer le produit. Avant achat, verifiez le poids, le polling rate et la page constructeur exacte."],
      [/\blong office sessions, remote work, and everyday comfort\b/gi, "de longues sessions de bureau, le teletravail et un confort au quotidien"],
      [/\bmobile work, multi-device setups, and compact desks\b/gi, "le travail mobile, les setups multi-appareils et les bureaux compacts"],
      [/\bFPS or fast games with stronger palm support\b/gi, "les FPS ou jeux rapides avec un meilleur soutien de paume"],
      [/\bFPS, tracking, and claw \/ fingertip grips\b/gi, "les FPS, le tracking et les prises claw / fingertip"],
      [/\bMMO, MOBA, versatile gaming, and lots of direct controls\b/gi, "les MMO, MOBA, le gaming polyvalent et de nombreux controles directs"],
      [/\bcollection, nostalgia, or comparison with newer mice\b/gi, "la collection, la nostalgie ou la comparaison avec des souris plus recentes"],
      [/\bversatile use where shape matters more than the raw spec sheet\b/gi, "un usage polyvalent ou la forme compte plus que la fiche brute"],
      [/\bif you mainly want esports, the lowest possible weight, or very aggressive responsiveness\b/gi, "si vous cherchez surtout l'esport, le poids le plus bas possible ou une reactivite tres agressive"],
      [/\bif you mainly want macros, passive palm support, or a very office-oriented mouse\b/gi, "si vous cherchez surtout des macros, un soutien passif de la paume ou une souris tres orientee bureau"],
      [/\bif you want a light, minimal shell for pure FPS\b/gi, "si vous voulez une coque legere et minimaliste pour du pur FPS"],
      [/\bif you want the most rational buy and the best current performance-to-price value\b/gi, "si vous voulez l'achat le plus rationnel et le meilleur rapport performances / prix actuel"],
      [/\bif you want an ultra-specialized position with no compromises\b/gi, "si vous voulez un positionnement ultra specialise sans compromis"],
      [/\bWe position it here as a /gi, "On le positionne ici comme un profil "],
      [/\bshape /gi, "forme "],
      [/\bweight /gi, "poids "],
      [/\bpolling /gi, "polling "],
      [/\bestimated\b/gi, "estime"],
      [/\bprofile\./gi, "."]
    ],
    "de": [
      [/\bVersatile model that may lean toward gaming or office comfort depending on the exact reference\./gi, "Vielseitiges Modell, das je nach exakter Referenz eher auf Gaming oder Burokomfort ausgerichtet sein kann."],
      [/\bThe spec sheet is complete enough to form a serious first opinion\./gi, "Das Datenblatt ist vollstandig genug fur einen ernsthaften ersten Eindruck."],
      [/\bThis profile gives a good buying direction, but some technical data is still estimated or needs confirmation\./gi, "Dieses Profil gibt bereits eine gute Kauf-Richtung, aber einige technische Daten sind noch geschatzt oder zu bestatigen."],
      [/\bLegacy reference kept in the catalog\./gi, "Legacy-Referenz im Katalog behalten."],
      [/\bActive reference currently included in the catalog\./gi, "Aktive Referenz, die derzeit im Katalog enthalten ist."],
      [/\bOfficial image available\./gi, "Offizielles Bild verfugbar."],
      [/\bI would mainly recommend it if you want /gi, "Ich wurde sie vor allem empfehlen, wenn Sie "],
      [/\bThe profile is solid enough to form a real first opinion, but shape is still the final judge\./gi, "Das Profil ist solide genug fur einen echten ersten Eindruck, aber die Form bleibt der letzte Richter."],
      [/\blong office sessions, remote work, and everyday comfort\b/gi, "lange Buro-Sessions, Remote-Arbeit und Alltagskomfort suchen"],
      [/\bmobile work, multi-device setups, and compact desks\b/gi, "mobiles Arbeiten, Multi-Device-Setups und kompakte Schreibtische suchen"],
      [/\bFPS, tracking, and claw \/ fingertip grips\b/gi, "FPS, Tracking und Claw- / Fingertip-Grips suchen"],
      [/\bWe position it here as a /gi, "Wir ordnen es hier als Profil mit "],
      [/\bshape /gi, "Form "],
      [/\bweight /gi, "Gewicht "],
      [/\bpolling /gi, "Polling "],
      [/\bestimated\b/gi, "geschatzt"],
      [/\bprofile\./gi, "."],
      [/\bSources?\b/gi, "$&"]
    ],
    "es": [
      [/\bVersatile model that may lean toward gaming or office comfort depending on the exact reference\./gi, "Modelo versatil que puede inclinarse hacia el gaming o la comodidad de oficina segun la referencia exacta."],
      [/\bThe spec sheet is complete enough to form a serious first opinion\./gi, "La ficha es lo bastante completa como para formarse una primera opinion seria."],
      [/\bThis profile gives a good buying direction, but some technical data is still estimated or needs confirmation\./gi, "Esta ficha ya da una buena direccion de compra, pero algunos datos tecnicos siguen estimados o necesitan confirmacion."],
      [/\bLegacy reference kept in the catalog\./gi, "Referencia legacy conservada en el catalogo."],
      [/\bActive reference currently included in the catalog\./gi, "Referencia activa actualmente incluida en el catalogo."],
      [/\bOfficial image available\./gi, "Imagen oficial disponible."],
      [/\bI would mainly recommend it if you want /gi, "La recomendaria sobre todo si buscas "],
      [/\bThe profile is solid enough to form a real first opinion, but shape is still the final judge\./gi, "La ficha es lo bastante solida para hacerse una primera opinion real, pero la forma sigue siendo el juez final."],
      [/\blong office sessions, remote work, and everyday comfort\b/gi, "largas sesiones de oficina, teletrabajo y comodidad diaria"],
      [/\bmobile work, multi-device setups, and compact desks\b/gi, "trabajo movil, configuraciones multidispositivo y escritorios compactos"],
      [/\bFPS, tracking, and claw \/ fingertip grips\b/gi, "FPS, tracking y agarres claw / fingertip"],
      [/\bWe position it here as a /gi, "Lo situamos aqui como un perfil de "],
      [/\bshape /gi, "forma "],
      [/\bweight /gi, "peso "],
      [/\bpolling /gi, "polling "],
      [/\bestimated\b/gi, "estimado"],
      [/\bprofile\./gi, "."]
    ],
    "it": [
      [/\bVersatile model that may lean toward gaming or office comfort depending on the exact reference\./gi, "Modello versatile che puo orientarsi verso il gaming o il comfort da ufficio a seconda del riferimento esatto."],
      [/\bThe spec sheet is complete enough to form a serious first opinion\./gi, "La scheda tecnica e abbastanza completa per formarsi una prima opinione seria."],
      [/\bThis profile gives a good buying direction, but some technical data is still estimated or needs confirmation\./gi, "Questa scheda da gia una buona direzione d'acquisto, ma alcuni dati tecnici sono ancora stimati o da confermare."],
      [/\bLegacy reference kept in the catalog\./gi, "Riferimento legacy mantenuto nel catalogo."],
      [/\bActive reference currently included in the catalog\./gi, "Riferimento attivo attualmente incluso nel catalogo."],
      [/\bOfficial image available\./gi, "Immagine ufficiale disponibile."],
      [/\bI would mainly recommend it if you want /gi, "La consiglierei soprattutto se cerchi "],
      [/\bThe profile is solid enough to form a real first opinion, but shape is still the final judge\./gi, "Il profilo e abbastanza solido per formarsi una vera prima opinione, ma la forma resta il giudice finale."],
      [/\blong office sessions, remote work, and everyday comfort\b/gi, "lunghe sessioni d'ufficio, lavoro da remoto e comfort quotidiano"],
      [/\bmobile work, multi-device setups, and compact desks\b/gi, "lavoro mobile, setup multi-dispositivo e scrivanie compatte"],
      [/\bFPS, tracking, and claw \/ fingertip grips\b/gi, "FPS, tracking e impugnature claw / fingertip"],
      [/\bWe position it here as a /gi, "Lo posizioniamo qui come profilo di "],
      [/\bshape /gi, "forma "],
      [/\bweight /gi, "peso "],
      [/\bpolling /gi, "polling "],
      [/\bestimated\b/gi, "stimato"],
      [/\bprofile\./gi, "."]
    ]
  };

  function localizeGeneratedEnglishText(value, lang) {
    var normalizedLang = normalizeLanguageCode(lang);
    var text = String(value || "");
    var replacements = PRODUCT_TEXT_REPLACEMENTS[normalizedLang] || [];

    replacements.forEach(function (entry) {
      text = text.replace(entry[0], entry[1]);
    });

    return text;
  }

  function normalizeText(value) {
    return String(value || "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim();
  }

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
    var hasValidImage = typeof mouse.image === "string" && mouse.image.trim() !== "";

    return hasAllRequired && hasValidSpecs && hasValidImage;
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

  var EXACT_CATALOG_TRANSLATIONS = {
    "Gaming & bureautique": "Gaming & office",
    "Legacy & historiques": "Legacy & classics",
    "Bureautique & historique": "Office & legacy",
    "Bureautique & ergonomie": "Office & ergonomics",
    "Bureautique / santé": "Office / wellness",
    "Gaming & MMO": "Gaming & MMO",
    "Gaming": "Gaming",
    "Bureautique": "Office",
    "Productivité": "Productivity",
    "Legacy": "Legacy",
    "Divers": "Miscellaneous",
    "Autres marques": "Other brands",
    "La fiche s'appuie sur une source produit plus directe et sur plusieurs valeurs techniques confirmées.": "This profile relies on a more direct product source and several confirmed technical values.",
    "Tu peux déjà te faire un avis d'achat, mais une partie de la technique reste estimée ou mérite un recoupement.": "You can already form a buying opinion, but part of the technical data is still estimated or needs cross-checking.",
    "Cette fiche aide surtout à situer le produit. Avant achat, vérifie le poids, le polling et la fiche constructeur exacte.": "This profile mainly helps position the product. Before buying, verify the weight, polling rate, and exact manufacturer page."
  };

  EXACT_CATALOG_TRANSLATIONS["Bureautique & classique"] = "Office & classics";
  EXACT_CATALOG_TRANSLATIONS["Gaming & productivitÃ©"] = "Gaming & productivity";

  var CATALOG_TEXT_REPLACEMENTS = [
    [/\bPage combo MX officielle\b/gi, "Official MX combo page"],
    [/\bFiche officielle\b/gi, "Official page"],
    [/\bAnnonce officielle\b/gi, "Official announcement"],
    [/\bGuide officiel\b/gi, "Official guide"],
    [/\bCollection officielle\b/gi, "Official collection"],
    [/\bCatalogue officiel\b/gi, "Official catalog"],
    [/\bprise en main\b/gi, "grip feel"],
    [/\bcentre de gravité\b/gi, "center of gravity"],
    [/\bhaut de gamme\b/gi, "high-end"],
    [/\btrès légère\b/gi, "very lightweight"],
    [/\btrès léger\b/gi, "very lightweight"],
    [/\btrès légères\b/gi, "very lightweight"],
    [/\btrès légers\b/gi, "very lightweight"],
    [/\bultra légère\b/gi, "ultra-lightweight"],
    [/\bultra léger\b/gi, "ultra-lightweight"],
    [/\bmoins de\b/gi, "under"],
    [/\bjusqu'à\b/gi, "up to"],
    [/\bjusqu?a\b/gi, "up to"],
    [/\bà confirmer\b/gi, "to be confirmed"],
    [/\bà vérifier\b/gi, "to be verified"],
    [/\ben attendant de confirmer\b/gi, "while waiting to confirm"],
    [/\bconnue aussi sous le nom\b/gi, "also known as"],
    [/\bconnue pour\b/gi, "known for"],
    [/\bconnu pour\b/gi, "known for"],
    [/\bpensée pour\b/gi, "designed for"],
    [/\bpensé pour\b/gi, "designed for"],
    [/\bconçue pour\b/gi, "designed for"],
    [/\bconçu pour\b/gi, "designed for"],
    [/\best une souris\b/gi, "is a mouse"],
    [/\best une\b/gi, "is a"],
    [/\best un\b/gi, "is a"],
    [/\bsont des souris\b/gi, "are mice"],
    [/\bsont des\b/gi, "are"],
    [/\bc'est\b/gi, "it is"],
    [/\bs'adresse aux\b/gi, "is aimed at"],
    [/\bs'adresse à\b/gi, "is aimed at"],
    [/\bse place dans\b/gi, "sits in"],
    [/\baujourd'hui\b/gi, "today"],
    [/\brepr[eé]sente\b/gi, "represents"],
    [/\breste\b/gi, "remains"],
    [/\brestent\b/gi, "remain"],
    [/\bgarde\b/gi, "keeps"],
    [/\bgardent\b/gi, "keep"],
    [/\bcherche\b/gi, "aims for"],
    [/\bcherchent\b/gi, "look for"],
    [/\bveulent\b/gi, "want"],
    [/\bveut\b/gi, "wants"],
    [/\baiment\b/gi, "like"],
    [/\best\b/gi, "is"],
    [/\bsont\b/gi, "are"],
    [/\bmet en avant\b/gi, "highlights"],
    [/\bmise sur\b/gi, "focuses on"],
    [/\breprend\b/gi, "builds on"],
    [/\bajoute\b/gi, "adds"],
    [/\bcombine\b/gi, "combines"],
    [/\bvise\b/gi, "targets"],
    [/\bpropose\b/gi, "offers"],
    [/\bse distingue par\b/gi, "stands out for"],
    [/\bfait partie de\b/gi, "is part of"],
    [/\bpermet de\b/gi, "allows you to"],
    [/\bce qui en fait\b/gi, "which makes it"],
    [/\bce qui la rend\b/gi, "which makes it"],
    [/\bce qui le rend\b/gi, "which makes it"],
    [/\bpour les joueurs qui veulent\b/gi, "for players who want"],
    [/\bpour les utilisateurs qui veulent\b/gi, "for users who want"],
    [/\bpour les utilisateurs\b/gi, "for users"],
    [/\bpour les joueurs\b/gi, "for players"],
    [/\btravail et le jeu\b/gi, "work and gaming"],
    [/\btravail mobile\b/gi, "mobile work"],
    [/\bjeu solo\b/gi, "single-player gaming"],
    [/\bjeu compétitif\b/gi, "competitive play"],
    [/\bjeu compétitive\b/gi, "competitive play"],
    [/\bsans fil\b/gi, "wireless"],
    [/\bfilaire\b/gi, "wired"],
    [/\bambidextre\b/gi, "ambidextrous"],
    [/\bsymétrique\b/gi, "symmetrical"],
    [/\bsymetrique\b/gi, "symmetrical"],
    [/\bergonomique\b/gi, "ergonomic"],
    [/\bverticale\b/gi, "vertical"],
    [/\bdroitier\b/gi, "right-handed"],
    [/\bgaucher\b/gi, "left-handed"],
    [/\bproductivité\b/gi, "productivity"],
    [/\bbureautique\b/gi, "office"],
    [/\bcapteur\b/gi, "sensor"],
    [/\bboutons\b/gi, "buttons"],
    [/\bbouton\b/gi, "button"],
    [/\bmolette\b/gi, "scroll wheel"],
    [/\bclics\b/gi, "clicks"],
    [/\bconfort\b/gi, "comfort"],
    [/\bclairement\b/gi, "clearly"],
    [/\bsurtout\b/gi, "mainly"],
    [/\bavant tout\b/gi, "above all"],
    [/\bprécision\b/gi, "precision"],
    [/\bprecision\b/gi, "precision"],
    [/\bfiabilité\b/gi, "reliability"],
    [/\bfiabilite\b/gi, "reliability"],
    [/\bautonomie\b/gi, "battery life"],
    [/\bconnectivité\b/gi, "connectivity"],
    [/\bconnectivite\b/gi, "connectivity"],
    [/\bpersonnalisation\b/gi, "customization"],
    [/\bglisse\b/gi, "glide"],
    [/\blatence\b/gi, "latency"],
    [/\brécepteur\b/gi, "receiver"],
    [/\brecepteur\b/gi, "receiver"],
    [/\bsurface\b/gi, "surface"],
    [/\bforme\b/gi, "shape"],
    [/\bchâssis\b/gi, "shell"],
    [/\bchassis\b/gi, "shell"],
    [/\bcoque\b/gi, "shell"],
    [/\blignée\b/gi, "line"],
    [/\blignee\b/gi, "line"],
    [/\bfamille\b/gi, "family"],
    [/\bréférence\b/gi, "reference"],
    [/\breference\b/gi, "reference"],
    [/\btravail\b/gi, "work"],
    [/\bpoids\b/gi, "weight"],
    [/\bpoignet\b/gi, "wrist"],
    [/\bpetites mains\b/gi, "small hands"],
    [/\bmoyennes mains\b/gi, "medium hands"],
    [/\bgrandes mains\b/gi, "large hands"],
    [/\bconfortable\b/gi, "comfortable"],
    [/\bcompacte\b/gi, "compact"],
    [/\bcompact\b/gi, "compact"],
    [/\bpolyvalente\b/gi, "versatile"],
    [/\bpolyvalent\b/gi, "versatile"],
    [/\biconique\b/gi, "iconic"],
    [/\bsilencieux\b/gi, "quiet"],
    [/\bsilencieuse\b/gi, "quiet"],
    [/\blégère\b/gi, "lightweight"],
    [/\bléger\b/gi, "lightweight"],
    [/\blégeres\b/gi, "lightweight"],
    [/\blégers\b/gi, "lightweight"],
    [/\bjoueurs\b/gi, "players"],
    [/\bjoueur\b/gi, "player"],
    [/\butilisateurs\b/gi, "users"],
    [/\butilisateur\b/gi, "user"],
    [/\bles souris\b/gi, "mice"],
    [/\bdes souris\b/gi, "mice"],
    [/\bcette souris\b/gi, "this mouse"],
    [/\bune souris\b/gi, "a mouse"],
    [/\bla souris\b/gi, "the mouse"],
    [/\bsouris\b/gi, "mouse"],
    [/\bavec\b/gi, "with"],
    [/\bmais\b/gi, "but"],
    [/\bpour\b/gi, "for"],
    [/\bdans\b/gi, "in"],
    [/\bsur\b/gi, "on"],
    [/\bchez\b/gi, "at"],
    [/\bet\b/gi, "and"],
    [/\bou\b/gi, "or"],
    [/\bdu\b/gi, "of"],
    [/\bdes\b/gi, "of"],
    [/\bau quotidien\b/gi, "for everyday use"]
  ];

  var CATALOG_TEXT_SUPPLEMENTAL_REPLACEMENTS = [
    [/\bla famille\b/gi, "the family"],
    [/\bla philosophie\b/gi, "the philosophy"],
    [/\bla formule\b/gi, "the formula"],
    [/\bla g[ée]n[ée]ration\b/gi, "the generation"],
    [/\bla version\b/gi, "the version"],
    [/\bla gamme\b/gi, "the line"],
    [/\bla proposition\b/gi, "the proposition"],
    [/\bla portabilit[ée]\b/gi, "portability"],
    [/\bla page officielle\b/gi, "the official page"],
    [/\bla fiche\b/gi, "the profile"],
    [/\bla source\b/gi, "the source"],
    [/\bla pr[ée]cision\b/gi, "precision"],
    [/\bla fiabilit[ée]\b/gi, "reliability"],
    [/\bla vitesse\b/gi, "speed"],
    [/\ble quotidien\b/gi, "everyday use"],
    [/\ble voyage\b/gi, "travel"],
    [/\ble verre\b/gi, "glass"],
    [/\bles joueurs\b/gi, "players"],
    [/\bles utilisateurs\b/gi, "users"],
    [/\bles usages nomades\b/gi, "mobile use"],
    [/\bles petites et moyennes mains\b/gi, "small and medium hands"],
    [/\bles petites mains\b/gi, "small hands"],
    [/\bles environnements calmes\b/gi, "quiet environments"],
    [/\bles postes bureautiques\b/gi, "office setups"],
    [/\bles workflows intensifs\b/gi, "intensive workflows"],
    [/\bun capteur\b/gi, "a sensor"],
    [/\bun format\b/gi, "a format"],
    [/\bun bouton emoji personnalisable\b/gi, "a customizable emoji button"],
    [/\bune shape\b/gi, "a shape"],
    [/\bune liaison\b/gi, "a connection"],
    [/\bune compatibilit[ée]\b/gi, "compatibility"],
    [/\bune connectivit[ée]\b/gi, "connectivity"],
    [/\bune ergonomie\b/gi, "ergonomics"],
    [/\bune batterie\b/gi, "a battery"],
    [/\bune autonomie\b/gi, "battery life"],
    [/\bune coque\b/gi, "a shell"],
    [/\bune connexion\b/gi, "a connection"],
    [/\bune scroll wheel\b/gi, "a scroll wheel"],
    [/\bde derni[èe]re g[ée]n[ée]ration\b/gi, "latest-generation"],
    [/\bcharg[ée]e en fonctions\b/gi, "feature-packed"],
    [/Ergo Productivit[ée]/gi, "ergonomic productivity"],
    [/Productivit[ée]/gi, "productivity"],
    [/À confirmer/gi, "to be confirmed"],
    [/\bsans-fil\b/gi, "wireless"],
    [/\bproductivit[ée]\b/gi, "productivity"],
    [/\b[àa] confirmer\b/gi, "to be confirmed"],
    [/\bcompl[èe]te?\b/gi, "complete"],
    [/\bpile\b/gi, "battery"],
    [/\bpetit\b/gi, "small"],
    [/\bergo\b/gi, "ergonomic"],
    [/\bbeaucoup de\b/gi, "many"],
    [/\btr[eèé]s\b/gi, "very"],
    [/\bmodernis[ée]e?\b/gi, "modernized"],
    [/\bc[ée]l[èe]bre\b/gi, "iconic"],
    [/\bfaite?\b/gi, "made"],
    [/\bfaites\b/gi, "made"],
    [/\bcon[çc]ue?s?\b/gi, "designed"],
    [/\bpens[ée]e?s?\b/gi, "designed"],
    [/\borient[ée]e?s?\b/gi, "oriented"],
    [/\bconcentr[ée]e?s?\b/gi, "focused"],
    [/\bcomp[ée]tition\b/gi, "competition"],
    [/\bcomp[ée]titifs?\b/gi, "competitive"],
    [/\bprivil[ée]gient\b/gi, "prioritize"],
    [/\bprivil[ée]gier\b/gi, "prioritize"],
    [/\bpratique\b/gi, "practical"],
    [/\b[ée]norme\b/gi, "huge"],
    [/\bbien pens[ée]e\b/gi, "well thought out"],
    [/\bconfort longue dur[ée]e\b/gi, "long-session comfort"],
    [/\bposition plus naturelle\b/gi, "more natural position"],
    [/\bcoque plus arrondie\b/gi, "rounder shell"],
    [/\brev[êe]tement agr[ée]able\b/gi, "pleasant coating"],
    [/\bvaleur s[ûu]re\b/gi, "safe bet"],
    [/\bcompatibilit[ée] large\b/gi, "broad compatibility"],
    [/\bde nombreuses surfaces\b/gi, "many surfaces"],
    [/\bselon les r[ée]gions\b/gi, "depending on the region"],
    [/\ben apparence\b/gi, "in appearance"],
    [/\bde tout premier plan\b/gi, "top-tier"],
    [/\bsans surcharge\b/gi, "without unnecessary extras"],
    [/\bgrand public\b/gi, "mainstream"],
    [/\bquand on veut\b/gi, "when you want"],
    [/\bespace partag[ée]\b/gi, "shared space"],
    [/\bcontr[ôo]les\b/gi, "controls"],
    [/\bpersonnaliser\b/gi, "customize"],
    [/\bajuster\b/gi, "adjust"],
    [/\bajustable\b/gi, "adjustable"],
    [/\baffirm[ée]e\b/gi, "confident"],
    [/\brassurante\b/gi, "reassuring"],
    [/\bminimaliste\b/gi, "minimalist"],
    [/\bnomade\b/gi, "travel-friendly"],
    [/\b[ée]pur[ée]\b/gi, "clean"],
    [/\bvisible\b/gi, "visible"],
    [/\bpersonnalisable\b/gi, "customizable"],
    [/\bfatigue\b/gi, "fatigue"],
    [/\bdu confort\b/gi, "comfort"],
    [/\bde la personnalisation\b/gi, "customization"],
    [/\bdes performances\b/gi, "performance"],
    [/\bun maximum de commandes\b/gi, "maximum thumb-side controls"],
    [/\bqui\b/gi, "who"],
    [/\bson\b/gi, "its"],
    [/\bsa\b/gi, "its"],
    [/\bses\b/gi, "its"],
    [/\bleur\b/gi, "their"],
    [/\bleurs\b/gi, "their"],
    [/\bla\b/gi, "the"],
    [/\ble\b/gi, "the"],
    [/\bles\b/gi, "the"],
    [/\bun\b/gi, "a"],
    [/\bune\b/gi, "a"],
    [/\bde\b/gi, "of"],
    [/\bpetite\b/gi, "small"],
    [/\bpetites\b/gi, "small"],
    [/\bmoyennes\b/gi, "medium"],
    [/\bgrande\b/gi, "large"],
    [/\bgrandes\b/gi, "large"],
    [/\bhaute\b/gi, "high"],
    [/\bbasse\b/gi, "low"],
    [/\befficace\b/gi, "effective"],
    [/\bfacile\b/gi, "easy"],
    [/\bfonctions\b/gi, "features"],
    [/\bfonction\b/gi, "feature"],
    [/\bcommandes\b/gi, "controls"],
    [/\bcommande\b/gi, "control"]
  ];

  function capitalizeSentenceStarts(value) {
    return String(value)
      .replace(/^([^A-Za-z]*)([a-z])/, function (_, prefix, letter) {
        return prefix + letter.toUpperCase();
      })
      .replace(/([.!?]\s+)([a-z])/g, function (_, prefix, letter) {
        return prefix + letter.toUpperCase();
      })
      .replace(/(:\s+)([a-z])/g, function (_, prefix, letter) {
        return prefix + letter.toUpperCase();
      })
      .replace(/([\r\n]+\s*[-*•]?\s*)([a-z])/g, function (_, prefix, letter) {
        return prefix + letter.toUpperCase();
      });
  }

  function translateSentenceStarts(value) {
    return String(value)
      .replace(/^La\s/g, "The ")
      .replace(/^Le\s/g, "The ")
      .replace(/^Les\s/g, "The ")
      .replace(/^Cette\s/g, "This ")
      .replace(/^Ce\s/g, "This ")
      .replace(/^C'est\s/g, "It is ")
      .replace(/^Elle\s/g, "It ")
      .replace(/^Il\s/g, "It ")
      .replace(/^Elles\s/g, "They ")
      .replace(/^Ils\s/g, "They ")
      .replace(/([.!?]\s+)La\s/g, "$1The ")
      .replace(/([.!?]\s+)Le\s/g, "$1The ")
      .replace(/([.!?]\s+)Les\s/g, "$1The ")
      .replace(/([.!?]\s+)Cette\s/g, "$1This ")
      .replace(/([.!?]\s+)Ce\s/g, "$1This ")
      .replace(/([.!?]\s+)C'est\s/g, "$1It is ")
      .replace(/([.!?]\s+)Elle\s/g, "$1It ")
      .replace(/([.!?]\s+)Il\s/g, "$1It ")
      .replace(/([.!?]\s+)Elles\s/g, "$1They ")
      .replace(/([.!?]\s+)Ils\s/g, "$1They ");
  }

  function translateCatalogText(value) {
    var text;

    if (typeof value !== "string" || value.trim() === "") {
      return value;
    }

    if (Object.prototype.hasOwnProperty.call(EXACT_CATALOG_TRANSLATIONS, value)) {
      return EXACT_CATALOG_TRANSLATIONS[value];
    }

    text = translateSentenceStarts(value.replace(/’/g, "'"));

    CATALOG_TEXT_REPLACEMENTS.forEach(function (entry) {
      text = text.replace(entry[0], entry[1]);
    });

    CATALOG_TEXT_SUPPLEMENTAL_REPLACEMENTS.forEach(function (entry) {
      text = text.replace(entry[0], entry[1]);
    });

    return capitalizeSentenceStarts(
      text
        .replace(/\s{2,}/g, " ")
        .replace(/\s+([,.;:!?])/g, "$1")
        .replace(/([,.;:!?])([A-Za-z])/g, "$1 $2")
        .trim()
    );
  }

  function translateSourceLabel(label) {
    if (typeof label !== "string" || !label.trim()) {
      return label;
    }

    return translateCatalogText(label)
      .replace(/^Official page\s+(.+)$/i, "Official $1 page")
      .replace(/^Official announcement\s+(.+)$/i, "Official $1 announcement")
      .replace(/^Official guide\s+(.+)$/i, "Official $1 guide")
      .replace(/^Official collection\s+(.+)$/i, "Official $1 collection")
      .replace(/^Official catalog\s+(.+)$/i, "Official $1 catalog");
  }

  function translateReview(review) {
    if (!review || typeof review !== "object") {
      return review;
    }

    var whyBuyText = Array.isArray(review.whyBuy)
      ? review.whyBuy.filter(Boolean).join(" ")
      : (review.whyBuy || "");
    var whySkipSource = review.whySkip || review.whyAvoid || review.skipFor;
    var whySkipText = Array.isArray(whySkipSource)
      ? whySkipSource.filter(Boolean).join(" ")
      : (whySkipSource || "");

    return Object.assign({}, review, {
      verdict: translateCatalogText(review.verdict || ""),
      whyBuy: translateCatalogText(whyBuyText),
      whySkip: translateCatalogText(whySkipText),
      whyAvoid: translateCatalogText(whySkipText),
      bestFor: translateCatalogText(review.bestFor || ""),
      skipFor: translateCatalogText(review.skipFor || ""),
      confidence: review.confidence
        ? Object.assign({}, review.confidence, {
          label: translateCatalogText(review.confidence.label || ""),
          note: translateCatalogText(review.confidence.note || "")
        })
        : review.confidence
    });
  }

  function localizeMouse(mouse) {
    var translated = Object.assign({}, mouse);
    var preferredSummary = mouse.autoSummary || mouse.summary || "";
    var preferredHighlights = Array.isArray(mouse.autoHighlights) && mouse.autoHighlights.length
      ? mouse.autoHighlights
      : mouse.highlights;

    translated.segment = translateCatalogText(mouse.segment || "");
    translated.summary = translateCatalogText(preferredSummary);
    translated.highlights = Array.isArray(preferredHighlights)
      ? preferredHighlights.map(translateCatalogText)
      : preferredHighlights;
    translated.typeValue = translateCatalogText(mouse.typeValue || "");
    translated.shapeValue = translateCatalogText(mouse.shapeValue || "");
    translated.specs = Array.isArray(mouse.specs)
      ? mouse.specs.map(function (spec) {
        return Object.assign({}, spec, {
          value: translateCatalogText(spec.value || "")
        });
      })
      : mouse.specs;
    translated.review = translateReview(mouse.review);
    translated.sources = Array.isArray(mouse.sources)
      ? mouse.sources.map(function (source) {
        return Object.assign({}, source, {
          label: translateSourceLabel(source.label || source.url || "")
        });
      })
      : mouse.sources;

    return translated;
  }

  function specLabelForDisplay(label) {
    return SPEC_DISPLAY_LABELS[label] || label;
  }

  function translateText(text, targetLang) {
    if (!text || typeof text !== "string") {
      return text;
    }
    
    var translations = TRANSLATIONS[targetLang];
    if (!translations) {
      return text;
    }
    
    return translations[text] || text;
  }

  function updateLanguage(lang) {
    CURRENT_LANGUAGE = lang;
    var config = LANGUAGE_CONFIG[lang];
    
    // Mettre à jour l'interface du sélecteur de langue
    var currentFlag = document.getElementById("current-flag");
    var currentLanguage = document.getElementById("current-language");
    if (currentFlag && currentLanguage) {
      currentFlag.textContent = FLAG_DISPLAY[config.flag] || config.flag;
      currentLanguage.textContent = config.name;
    }
    
    // Mettre à jour la langue HTML
    document.documentElement.lang = config.htmlLang;
    
    // Mettre à jour le titre
    document.title = "MinSp - Electronic Product Comparison";
    
    // Traduire tous les éléments traduisibles
    translatePage(lang);
    
    // Re-render le catalogue pour mettre à jour les fiches produits
    if (typeof renderCatalog === "function") {
      renderCatalog();
    }
    
    // Re-render les détails si un produit est sélectionné
    if (typeof renderDetail === "function" && state.selectedId) {
      var selectedMouse = mice.find(function (mouse) {
        return mouse.id === state.selectedId;
      });
      if (selectedMouse) {
        renderDetail(selectedMouse);
      }
    }
    
    // Sauvegarder la langue dans localStorage
    localStorage.setItem("selectedLanguage", lang);
  }

  function translatePage(lang) {
    // Traduire tous les éléments avec data-translate
    var elements = document.querySelectorAll("[data-translate]");
    elements.forEach(function(element) {
      var key = element.getAttribute("data-translate");
      var translation = translateText(key, lang);
      if (element.tagName === "INPUT" && element.type === "search") {
        element.placeholder = translation;
      } else {
        element.textContent = translation;
      }
    });
    
    // Traduire les éléments spécifiques qui n'ont pas data-translate
    translateSpecificElements(lang);
    
    // Mettre à jour les labels des filtres
    updateFilterLabels(lang);
    
    // Re-render le catalogue pour mettre à jour les traductions
    if (typeof renderCatalog === "function") {
      renderCatalog();
    }
  }

  function translateSpecificElements(lang) {
    // Eyebrow
    var eyebrow = document.querySelector(".eyebrow");
    if (eyebrow) {
      eyebrow.textContent = translateText("Standardized mouse catalog", lang);
    }
    
    // Slogan
    var slogan = document.querySelector(".slogan");
    if (slogan) {
      var sloganText = translateText("choose, compare, play", lang);
      slogan.innerHTML = sloganText.replace(/play/, '<span class="highlight">play</span>');
    }
    
    // Hero text
    var heroText = document.querySelector(".hero-text");
    if (heroText) {
      var heroTextParts = heroText.innerHTML.split('<span id="standardized-count">');
      if (heroTextParts.length > 1) {
        var beforeCount = translateText("Each product includes an image, sources, and exactly", lang);
        var afterCount = translateText("profiles built around 5 core specs.", lang);
        heroText.innerHTML = beforeCount + '<span id="standardized-count">' + document.getElementById("standardized-count").textContent + '</span> ' + afterCount;
      }
    }
    
    // Field labels
    var searchLabel = document.getElementById("search-label");
    if (searchLabel) {
      searchLabel.textContent = translateText("Search", lang);
    }
    
    var brandLabel = document.getElementById("brand-label");
    if (brandLabel) {
      brandLabel.textContent = translateText("Brand", lang);
    }
    
    var typeLabel = document.getElementById("type-label");
    if (typeLabel) {
      typeLabel.textContent = translateText("Type", lang);
    }

    // Home page elements
    var homeTitle = document.getElementById("home-title");
    if (homeTitle) {
      homeTitle.textContent = translateText("Welcome to ElectronicsPalace", lang);
    }

    var homeSubtitle = document.getElementById("home-subtitle");
    if (homeSubtitle) {
      homeSubtitle.textContent = translateText("Choose your category", lang);
    }

    // Reset button
    var resetButton = document.getElementById("reset-filters");
    if (resetButton) {
      resetButton.textContent = translateText("Reset", lang);
    }
    
    // Stat labels
    var totalModelsLabel = document.querySelector("#total-models").previousElementSibling;
    if (totalModelsLabel) {
      totalModelsLabel.textContent = translateText("Models", lang);
    }
    
    var totalBrandsLabel = document.querySelector("#total-brands").previousElementSibling;
    if (totalBrandsLabel) {
      totalBrandsLabel.textContent = translateText("Brands", lang);
    }
    
    var officialImagesLabel = document.querySelector("#official-images").previousElementSibling;
    if (officialImagesLabel) {
      officialImagesLabel.textContent = translateText("Images", lang);
    }
    
    var visibleResultsLabel = document.querySelector("#visible-results").previousElementSibling;
    if (visibleResultsLabel) {
      visibleResultsLabel.textContent = translateText("Results", lang);
    }
    
    // Section headers
    var sectionKickers = document.querySelectorAll(".section-kicker");
    sectionKickers.forEach(function(kicker) {
      if (kicker.textContent === "Catalog") {
        kicker.textContent = translateText("Catalog", lang);
      } else if (kicker.textContent === "Product selection") {
        kicker.textContent = translateText("Product selection", lang);
      } else if (kicker.textContent === "Product details") {
        kicker.textContent = translateText("Product details", lang);
      }
    });
    
    var sectionTitles = document.querySelectorAll("h2");
    sectionTitles.forEach(function(title) {
      if (title.textContent === "Product selection") {
        title.textContent = translateText("Product selection", lang);
      } else if (title.textContent === "Choose a mouse") {
        title.textContent = translateText("Choose a mouse", lang);
      }
    });
  }

  function updateFilterLabels(lang) {
    var brandFilter = document.getElementById("brand-filter");
    var typeFilter = document.getElementById("type-filter");

    if (brandFilter) {
      var options = brandFilter.querySelectorAll("option");
      options.forEach(function(option) {
        if (option.value === "all") {
          option.textContent = translateText("All brands", lang);
        }
      });
    }

    if (typeFilter) {
      var options = typeFilter.querySelectorAll("option");
      options.forEach(function(option) {
        if (option.value === "all") {
          option.textContent = translateText("All types", lang);
        } else {
          option.textContent = localizeCatalogText(option.value, lang);
        }
      });
    }
  }

  function initializeLanguageSelector() {
    var languageToggle = document.getElementById("language-toggle");
    var languageDropdown = document.getElementById("language-dropdown");
    var languageOptions = document.querySelectorAll(".language-option");
    
    // Charger la langue sauvegardée ou utiliser l'anglais (US) par défaut
    var savedLanguage = localStorage.getItem("selectedLanguage") || "en-us";
    updateLanguage(savedLanguage);
    
    // Toggle dropdown
    if (languageToggle) {
      languageToggle.addEventListener("click", function() {
        var isActive = languageToggle.classList.contains("active");
        if (isActive) {
          languageToggle.classList.remove("active");
          languageDropdown.classList.remove("active");
        } else {
          languageToggle.classList.add("active");
          languageDropdown.classList.add("active");
        }
      });
    }
    
    // Language selection
    languageOptions.forEach(function(option) {
      option.addEventListener("click", function() {
        var lang = this.getAttribute("data-lang");
        updateLanguage(lang);
        
        // Fermer le dropdown
        languageToggle.classList.remove("active");
        languageDropdown.classList.remove("active");
      });
    });
    
    // Fermer le dropdown en cliquant ailleurs
    document.addEventListener("click", function(e) {
      // Allow CTA link to work normally
      if (e.target.closest('#catalog-bubble-cta')) {
        return;
      }
      if (!languageToggle.contains(e.target) && !languageDropdown.contains(e.target)) {
        languageToggle.classList.remove("active");
        languageDropdown.classList.remove("active");
      }
    });
  }

  function getTranslationDictionary(targetLang) {
    var config = getLanguageConfig(targetLang);
    return TRANSLATIONS[config.dictionary]
      || TRANSLATIONS[config.fallbackDictionary]
      || {};
  }

  function translateText(text, targetLang) {
    if (!text || typeof text !== "string") {
      return text;
    }

    var config = getLanguageConfig(targetLang);
    var dictionary = getTranslationDictionary(config.dictionary);

    if (Object.prototype.hasOwnProperty.call(dictionary, text)) {
      return dictionary[text];
    }

    if (config.fallbackDictionary && TRANSLATIONS[config.fallbackDictionary]) {
      return TRANSLATIONS[config.fallbackDictionary][text] || text;
    }

    return text;
  }

  function t(text) {
    return translateText(text, CURRENT_LANGUAGE);
  }

  function localizeCatalogText(value, lang) {
    var normalizedLang = normalizeLanguageCode(lang);
    var englishText;
    var translatedText;

    if (typeof value !== "string" || value.trim() === "") {
      return value;
    }

    if (normalizedLang === "fr") {
      translatedText = translateText(value, normalizedLang);
      return localizeGeneratedEnglishText(translatedText, normalizedLang);
    }

    translatedText = translateText(value, normalizedLang);
    if (translatedText !== value) {
      return translatedText;
    }

    englishText = translateCatalogText(value);

    if (normalizedLang === "en-gb" || normalizedLang === "en-us") {
      return englishText;
    }

    translatedText = translateText(englishText, normalizedLang);
    if (translatedText !== englishText) {
      return translatedText;
    }

    return localizeGeneratedEnglishText(englishText, normalizedLang);
  }

  function translateSourceLabel(label, lang) {
    if (typeof label !== "string" || !label.trim()) {
      return label;
    }

    return localizeCatalogText(label, lang)
      .replace(/^Official page\s+(.+)$/i, "Official $1 page")
      .replace(/^Official announcement\s+(.+)$/i, "Official $1 announcement")
      .replace(/^Official guide\s+(.+)$/i, "Official $1 guide")
      .replace(/^Official collection\s+(.+)$/i, "Official $1 collection")
      .replace(/^Official catalog\s+(.+)$/i, "Official $1 catalog");
  }

  function translateReview(review, lang) {
    if (!review || typeof review !== "object") {
      return review;
    }

    var whyBuyText = Array.isArray(review.whyBuy)
      ? review.whyBuy.filter(Boolean).join(" ")
      : (review.whyBuy || "");
    var whySkipSource = review.whySkip || review.whyAvoid || review.skipFor;
    var whySkipText = Array.isArray(whySkipSource)
      ? whySkipSource.filter(Boolean).join(" ")
      : (whySkipSource || "");

    return Object.assign({}, review, {
      verdict: localizeCatalogText(review.verdict || "", lang),
      whyBuy: localizeCatalogText(whyBuyText, lang),
      whySkip: localizeCatalogText(whySkipText, lang),
      whyAvoid: localizeCatalogText(whySkipText, lang),
      bestFor: localizeCatalogText(review.bestFor || "", lang),
      skipFor: localizeCatalogText(review.skipFor || "", lang),
      confidence: review.confidence
        ? Object.assign({}, review.confidence, {
          label: localizeCatalogText(review.confidence.label || "", lang),
          note: localizeCatalogText(review.confidence.note || "", lang)
        })
        : review.confidence
    });
  }

  function localizeMouse(mouse, lang) {
    var translated = Object.assign({}, mouse);
    var normalizedLang = normalizeLanguageCode(lang);
    var preferEnglishGenerated = normalizedLang === "en-gb" || normalizedLang === "en-us";
    var preferredSummary = preferEnglishGenerated
      ? (mouse.autoSummary || mouse.summary || "")
      : (mouse.summary || mouse.autoSummary || "");
    var preferredHighlights = preferEnglishGenerated
      ? (
        Array.isArray(mouse.autoHighlights) && mouse.autoHighlights.length
          ? mouse.autoHighlights
          : mouse.highlights
      )
      : (
        Array.isArray(mouse.highlights) && mouse.highlights.length
          ? mouse.highlights
          : mouse.autoHighlights
      );

    translated.segment = localizeCatalogText(mouse.segment || "", lang);
    translated.summary = localizeCatalogText(preferredSummary, lang);
    translated.highlights = Array.isArray(preferredHighlights)
      ? preferredHighlights.map(function (item) {
        return localizeCatalogText(item, lang);
      })
      : preferredHighlights;
    // typeValue et shapeValue sont spécifiques aux souris
    translated.typeValue = localizeCatalogText(mouse.typeValue || "", lang);
    translated.typeKey = mouse.typeValue ? normalizeText(mouse.typeValue) : "";
    translated.shapeValue = localizeCatalogText(mouse.shapeValue || "", lang);
    // Conserver la catégorie pour le filtrage
    translated.category = mouse.category || "mice";
    translated.specs = Array.isArray(mouse.specs)
      ? mouse.specs.map(function (spec) {
        return Object.assign({}, spec, {
          value: localizeCatalogText(spec.value || "", lang)
        });
      })
      : mouse.specs;
    translated.review = translateReview(mouse.review, lang);
    translated.sources = Array.isArray(mouse.sources)
      ? mouse.sources.map(function (source) {
        return Object.assign({}, source, {
          label: translateSourceLabel(source.label || source.url || "", lang)
        });
      })
      : mouse.sources;

    return translated;
  }

  function specLabelForDisplay(label) {
    return t(SPEC_DISPLAY_LABELS[label] || label);
  }

  function translatePage(lang) {
    translateSpecificElements(lang);
  }

  function translateSpecificElements(lang) {
    var slogan = document.getElementById("hero-slogan");
    var sloganText;
    var sloganParts;
    var highlightedText;
    var leadingText;
    var languageTrigger;
    var languageMenu;
    var toolbarPanel;
    var heroStats;

    if (document.getElementById("hero-eyebrow")) {
      document.getElementById("hero-eyebrow").textContent = translateText("Standardized mouse catalog", lang);
    }

    if (slogan) {
      sloganText = translateText("choose, compare, play", lang);
      sloganParts = sloganText.split(",");
      highlightedText = sloganParts.pop() || sloganText;
      leadingText = sloganParts.length ? sloganParts.join(",") + "," : "";
      slogan.innerHTML = escapeHtml(leadingText ? leadingText + " " : "")
        + '<span class="highlight">' + escapeHtml(String(highlightedText).trim()) + "</span>";
    }

    if (document.getElementById("hero-intro")) {
      document.getElementById("hero-intro").textContent = translateText(
        "A clean, standardized catalog to compare gaming and office mice.",
        lang
      );
    }

    if (document.getElementById("hero-count-prefix")) {
      document.getElementById("hero-count-prefix").textContent = translateText(
        "Each product includes an image, sources, and exactly",
        lang
      );
    }

    if (document.getElementById("hero-count-suffix")) {
      document.getElementById("hero-count-suffix").textContent = translateText(
        "profiles built around 5 core specs.",
        lang
      );
    }

    if (document.getElementById("search-label")) {
      document.getElementById("search-label").textContent = translateText("Search", lang);
    }

    if (document.getElementById("brand-label")) {
      document.getElementById("brand-label").textContent = translateText("Brand", lang);
    }

    if (document.getElementById("type-label")) {
      document.getElementById("type-label").textContent = translateText("Type", lang);
    }

    if (document.getElementById("language-trigger-kicker")) {
      document.getElementById("language-trigger-kicker").textContent = translateText("Language", lang);
    }

    if (searchInput) {
      searchInput.placeholder = translateText(
        "Search: gaming, office, wireless, color, weight, features...",
        lang
      );
    }

    if (document.getElementById("search-help")) {
      document.getElementById("search-help").textContent = translateText(
        "Use this field to search mice by name, brand, or features.",
        lang
      );
    }

    if (document.getElementById("brand-help")) {
      document.getElementById("brand-help").textContent = translateText("Filter results by mouse brand.", lang);
    }

    if (document.getElementById("type-help")) {
      document.getElementById("type-help").textContent = translateText("Filter results by mouse type, gaming or office.", lang);
    }

    languageTrigger = document.getElementById("language-trigger");
    if (languageTrigger) {
      languageTrigger.setAttribute("aria-label", translateText("Choose the catalog language.", lang));
    }

    languageMenu = document.getElementById("language-menu");
    if (languageMenu) {
      languageMenu.setAttribute("aria-label", translateText("Choose the catalog language.", lang));
    }

    if (resetFilters) {
      resetFilters.textContent = translateText("Reset", lang);
      resetFilters.setAttribute("aria-label", translateText("Reset all search filters", lang));
    }

    if (document.getElementById("models-label")) {
      document.getElementById("models-label").textContent = translateText("Models", lang);
    }

    if (document.getElementById("brands-label")) {
      document.getElementById("brands-label").textContent = translateText("Brands", lang);
    }

    if (document.getElementById("images-label")) {
      document.getElementById("images-label").textContent = translateText("Images", lang);
    }

    if (document.getElementById("results-label")) {
      document.getElementById("results-label").textContent = translateText("Results", lang);
    }

    toolbarPanel = document.querySelector(".toolbar-panel");
    if (toolbarPanel) {
      toolbarPanel.setAttribute("aria-label", translateText("Search and filters", lang));
    }

    heroStats = document.querySelector(".hero-stats");
    if (heroStats) {
      heroStats.setAttribute("aria-label", translateText("Catalog stats", lang));
    }

    if (document.getElementById("catalog-kicker")) {
      document.getElementById("catalog-kicker").textContent = translateText("Catalog", lang);
    }

    if (document.getElementById("catalog-title")) {
      document.getElementById("catalog-title").textContent = translateText("Product selection", lang);
    }

    if (catalogGrid) {
      catalogGrid.setAttribute("aria-label", translateText("Mouse product grid", lang));
    }

    if (detailView) {
      detailView.setAttribute("aria-label", translateText("Selected product details", lang));
    }

    if (closeBtn) {
      closeBtn.setAttribute("aria-label", translateText("Close product details", lang));
    }
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

  function triggerGoogleCombo(targetLang) {
    var combo = document.querySelector(".goog-te-combo");

    if (!combo) {
      return false;
    }

    combo.value = targetLang;
    combo.dispatchEvent(new Event("change"));
    return true;
  }

  function setLanguage(langCode) {
    var normalizedLang = normalizeLanguageCode(langCode);
    var googleLangMap = {
      "fr": "fr",
      "en-gb": "en",
      "en-us": "en",
      "it": "it",
      "es": "es",
      "de": "de"
    };
    var targetLang = googleLangMap[normalizedLang] || "en";
    var tries = 0;
    var maxTries = 40;
    var timerId;

    // On conserve la logique catalogue existante.
    updateLanguage(normalizedLang);

    if (targetLang === "en") {
      document.cookie = "googtrans=/en/en;path=/";
      window.location.reload();
      return;
    }

    if (triggerGoogleCombo(targetLang)) {
      return;
    }

    timerId = setInterval(function () {
      tries += 1;
      if (triggerGoogleCombo(targetLang) || tries >= maxTries) {
        clearInterval(timerId);
      }
    }, 250);
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

    CURRENT_LANGUAGE = normalizedLang;
    document.documentElement.lang = config.htmlLang;
    document.title = "MinSp - Electronic Product Comparison";

    syncLanguageTrigger(normalizedLang);
    renderLanguageMenu(normalizedLang);

    mice = buildLocalizedMice(normalizedLang);
    refreshFilterOptions();
    translatePage(normalizedLang);
    updateHeaderAuth();
    renderCatalog();

    if (state.selectedId) {
      selectedMouse = mice.find(function (mouse) {
        return mouse.id === state.selectedId;
      });
    }

    if (selectedMouse) {
      renderDetail(selectedMouse);
    } else {
      renderDetail(null);
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
            var englishVersion = localizeMouse(mouse, "en-gb");
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

            // Ajouter les specs à la recherche textuelle
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
              // Conserver price et rating pour le filtrage (avec valeurs par défaut sécurisées)
              price: typeof mouse.price === "number" ? mouse.price : null,
              rating: typeof mouse.rating === "number" ? mouse.rating : null,
              // Conserver la catégorie pour le filtrage par catalogue
              category: mouse.category || "mice",
              // Conserver l'ID et l'ordre
              id: mouse.id,
              order: mouse.order
            });
          } catch (mouseError) {
            console.error("Erreur lors du traitement de la souris:", mouse.id || "unknown", mouseError);
            return null;
          }
        }).filter(Boolean);
      } catch (error) {
        console.error("Erreur lors de la construction des souris localisées:", error);
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
    return DataLoader.localize(sourceMice, lang);
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
      var specValue = spec && spec.value ? spec.value : t("Not specified");

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

    populateSelect(brandFilter, brandValues, t("All brands"));
    populateSelect(typeFilter, typeOptions, t("All types"));

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
      // Priorité au format WebP pour optimiser le chargement
      var webpImage = getWebPPath(mouse.image);
      var originalFallback = mouse.placeholderImage || mouse.image;
      var productType = mouse.category === 'keyboard' ? 'clavier' : mouse.category === 'pc-component' ? 'composant PC' : 'souris';

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

  function sourceLinksMarkup(mouse) {
    var sources = getSources(mouse);

    if (!sources.length) {
      return (
        '<div class="source-empty">' +
          "<p>" + escapeHtml(t("No source has been added for this profile yet.")) + "</p>" +
        "</div>"
      );
    }

    return (
      '<ul class="source-list" role="list" aria-label="' + escapeHtml(t("Sources for " + mouse.name)) + '">' +
        sources.map(function (source, index) {
          var linkLabel = source.label || source.url;
          var ariaLabel = linkLabel + (source.url ? ' (opens in new tab)' : '');
          return (
            "<li role=\"listitem\">" +
              '<a href="' + escapeHtml(source.url) + '" target="_blank" rel="noreferrer noopener" aria-label="' + escapeHtml(ariaLabel) + '">' +
                escapeHtml(linkLabel) +
                '<span class="sr-only"> (opens in new tab)</span>' +
              "</a>" +
            "</li>"
          );
        }).join("") +
      "</ul>"
    );
  }

  function detailHighlightsMarkup(mouse) {
    var highlights = Array.isArray(mouse.highlights)
      ? mouse.highlights.filter(Boolean).slice(0, 4)
      : [];

    if (!highlights.length) {
      return (
        '<ul class="highlight-list">' +
          "<li>" + escapeHtml(t("Detailed highlights are still being refined for this mouse.")) + "</li>" +
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

  function specStatusLabel(status) {
    switch (status) {
      case "confirmed":
        return t("Confirmed");
      case "estimated":
        return t("Estimated");
      case "profile":
        return t("Inferred");
      default:
        return t("Needs review");
    }
  }

  function qualityLabelForLevel(level) {
    switch (level) {
      case "solid":
        return t("Reliable");
      case "partial":
        return t("Partial");
      default:
        return t("Needs review");
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
          '<h3>' + escapeHtml(t("Write a review")) + '</h3>' +
          '<p class="auth-message">' + escapeHtml(t("Sign in to leave a review")) + '</p>' +
          '<div class="auth-buttons">' +
            '<a href="login.html?return=index.html&mode=login" class="auth-btn login-btn">' + escapeHtml(t("Log in")) + '</a>' +
            '<a href="login.html?return=index.html&mode=register" class="auth-btn register-btn">' + escapeHtml(t("Create an account")) + '</a>' +
          '</div>' +
        '</section>'
      );
    }

    return (
      '<section class="detail-block add-review-section">' +
        '<div class="review-header-logged">' +
          '<h3>' + escapeHtml(t("Write a review")) + '</h3>' +
          '<span class="logged-user">' + escapeHtml(t("Welcome")) + ', ' + escapeHtml(currentUser.pseudo) + '</span>' +
          '<button type="button" class="logout-btn" id="logout-btn">' + escapeHtml(t("Log out")) + '</button>' +
        '</div>' +
        '<form class="review-form" id="review-form-' + escapeHtml(mouseId || "") + '">' +
          '<div class="form-group">' +
            '<label>' + escapeHtml(t("Your rating")) + '</label>' +
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
            '<label for="review-text">' + escapeHtml(t("Your review")) + '</label>' +
            '<textarea id="review-text" name="text" rows="4" required placeholder="' + escapeHtml(t("Share your experience with this mouse...")) + '"></textarea>' +
          '</div>' +
          '<button type="submit" class="submit-review-btn">' + escapeHtml(t("Submit review")) + '</button>' +
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
          '<h3>' + escapeHtml(t("User reviews")) + '</h3>' +
          '<p class="no-reviews">' + escapeHtml(t("No user reviews yet. Be the first to share your experience!")) + '</p>' +
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
          '<h3>' + escapeHtml(t("User reviews")) + '</h3>' +
          '<div class="average-rating">' +
            starRatingMarkup(averageRating, 5) +
            '<span class="reviews-count">(' + allComments.length + ' ' + escapeHtml(t("reviews")) + ')</span>' +
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
    var qualityNote = confidence.note || t("Some information should still be verified before buying.");

    // Note moyenne de la souris (si disponible)
    var averageRating = mouse.averageRating || (mouse.userComments ? 
      mouse.userComments.reduce(function(sum, c) { return sum + (c.rating || 0); }, 0) / mouse.userComments.length : 
      null);

    return (
      '<section class="detail-block">' +
        '<div class="review-head">' +
          '<div class="review-head-copy">' +
            "<h3>" + escapeHtml(t("Quick review")) + "</h3>" +
            '<p class="review-head-note">' + escapeHtml(qualityNote) + "</p>" +
          "</div>" +
          '<span class="quality-badge quality-' + escapeHtml(qualityLevel) + '">' + escapeHtml(qualityLabel) + "</span>" +
        "</div>" +
        (averageRating ? '<div class="product-rating">' + starRatingMarkup(averageRating, 5) + '</div>' : '') +
        '<p class="review-verdict">' + escapeHtml(review.verdict || t("Review notes are still being refined for this mouse.")) + "</p>" +
        '<div class="review-grid">' +
          '<article class="review-card review-card-positive">' +
            '<p class="review-card-kicker">' + escapeHtml(t("Why buy it")) + "</p>" +
            reviewListMarkup(review.whyBuy, t("Shape and real-world use are still the first things to check.")) +
          "</article>" +
          '<article class="review-card review-card-caution">' +
            '<p class="review-card-kicker">' + escapeHtml(t("Why skip it")) + "</p>" +
            reviewListMarkup(review.whySkip || review.whyAvoid || review.skipFor, t("Make sure the shape really fits your grip before deciding.")) +
          "</article>" +
          '<article class="review-card review-card-profile">' +
            '<p class="review-card-kicker">' + escapeHtml(t("Best for")) + "</p>" +
            '<p class="review-profile-line"><strong>' + escapeHtml(t("Yes if:")) + "</strong> " + escapeHtml(review.bestFor || t("you want a mouse that matches your grip style.")) + "</p>" +
            '<p class="review-profile-line"><strong>' + escapeHtml(t("Less relevant if:")) + "</strong> " + escapeHtml(review.skipFor || t("you are looking for the exact opposite shape or feel.")) + "</p>" +
          "</article>" +
          '<article class="review-card review-card-data">' +
            '<p class="review-card-kicker">' + escapeHtml(t("Profile reliability")) + "</p>" +
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
            '<span class="card-fav-btn" data-fav-id="' + escapeHtml(mouse.id) + '" role="button" aria-label="' + escapeHtml(t(Favorites.isFavorite(mouse.id) ? 'Remove from favorites' : 'Add to favorites')) + '">' + (Favorites.isFavorite(mouse.id) ? '★' : '☆') + '</span>' +
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
        '<p class="card-summary">' + escapeHtml(summary || t("Summary not available yet.")) + "</p>" +
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
        '<p class="error-message">' + escapeHtml(t("Erreur d'affichage")) + "</p>" +
      "</div>";
    }

    // Génère le HTML du panneau de détails avec onglets
    function generateDetailPanelHTML(mouse) {
      try {
        if (!mouse) {
          return generateEmptyDetailHTML(
            t("Choose a mouse"),
            t("Click a catalog card to open the full profile with image, summary, specs, and sources.")
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
                escapeHtml(t("Specifications")) +
              '</button>' +
              '<button class="detail-tab" role="tab" aria-selected="false" data-tab="review" id="tab-review">' +
                escapeHtml(t("Review")) +
              '</button>' +
              '<button class="detail-tab" role="tab" aria-selected="false" data-tab="compare" id="tab-compare">' +
                escapeHtml(t("Comparison")) +
              '</button>' +
            '</nav>' +
            '<div class="detail-tab-content">' +
              '<div class="tab-panel active" role="tabpanel" aria-labelledby="tab-specs" id="panel-specs">' +
                '<section class="detail-block">' +
                  "<h3>" + escapeHtml(t("Standardized specs")) + "</h3>" +
                  detailSpecMarkup(mouse) +
                "</section>" +
                '<section class="detail-block">' +
                  "<h3>" + escapeHtml(t("Key highlights")) + "</h3>" +
                  detailHighlightsMarkup(mouse) +
                "</section>" +
                '<section class="detail-block">' +
                  "<h3>" + escapeHtml(t("Sources")) + "</h3>" +
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
                  '<p>' + escapeHtml(t("Comparison feature coming soon. Select another mouse to compare side by side.")) + '</p>' +
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
            '<p class="section-kicker">' + escapeHtml(t("Product details")) + "</p>" +
            '<h2 class="notranslate" translate="no">' + escapeHtml(mouse.name) + "</h2>" +
          '</div>' +
          '<button type="button" class="fav-btn' + (isFav ? ' is-fav' : '') + '" id="fav-btn" data-id="' + escapeHtml(mouse.id) + '" aria-label="' + escapeHtml(t(isFav ? 'Remove from favorites' : 'Add to favorites')) + '">' +
            (isFav ? '★' : '☆') +
          '</button>' +
        '</div>' +
        '<p class="detail-summary">' + escapeHtml(mouse.summary || t("No summary is available for this mouse yet.")) + "</p>" +
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
        '<p class="section-kicker">' + escapeHtml(t("Product details")) + "</p>" +
        "<h2>" + escapeHtml(title) + "</h2>" +
        "<p>" + escapeHtml(text) + "</p>" +
      "</div>";
    }

    // Génère le HTML d'erreur du panneau de détails
    function generateErrorDetailHTML() {
      return '<div class="detail-empty detail-error">' +
        '<p class="section-kicker">' + escapeHtml(t("Product details")) + "</p>" +
        "<h2>" + escapeHtml(t("Erreur d'affichage")) + "</h2>" +
        "<p>" + escapeHtml(t("Impossible d'afficher les détails du produit.")) + "</p>" +
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
        "<h3>" + escapeHtml(t(noMatchKey)) + "</h3>" +
        "<p>" + escapeHtml(t("Try another search, brand, or type filter.")) + "</p>" +
        '<button class="reset-button show-all-button" type="button" id="show-all-btn" aria-label="' + escapeHtml(t("Show all")) + '">' +
          escapeHtml(t("Show all")) +
        "</button>" +
      "</div>";
    }

    // Génère le HTML du bouton "Charger plus"
    function generateLoadMoreButtonHTML() {
      return '<button class="load-more-button" type="button" id="load-more" aria-label="' + escapeHtml(t("Load more products")) + '">' +
        escapeHtml(t("Load more")) +
      "</button>";
    }

    // Génère une miniature de favori (image seulement, cliquable)
    function generateFavThumbnailHTML(mouse) {
      var brandColor = getBrandColor(mouse.brand);
      var brandGlow = hexToRgba(brandColor, 0.4);
      var customStyle = 'style="--brand-color: ' + brandColor + "; --brand-glow: " + brandGlow + ';"';
      var isFav = Favorites.isFavorite(mouse.id);

      return '<button class="fav-thumb" type="button" data-id="' + escapeHtml(mouse.id) + '" ' + customStyle + ' title="' + escapeHtml(mouse.name) + '">' +
        '<span class="fav-thumb-fav-btn" data-fav-id="' + escapeHtml(mouse.id) + '" role="button" aria-label="' + escapeHtml(t(isFav ? 'Remove from favorites' : 'Add to favorites')) + '">' + (isFav ? '★' : '☆') + '</span>' +
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

        // Tous les fallbacks ont échoué, marquer comme prêt (affichera l'icône cassée)
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
        t("No visible result"),
        t("The detail panel will update again as soon as a matching mouse is visible.")
      );
      resetDetailScroll();
      return;
    }

    if (!current) {
      lastRenderedDetailId = null;
      detailPanel.style.removeProperty("--brand-color");
      detailPanel.style.removeProperty("--brand-glow");
      detailPanel.innerHTML = emptyDetailMarkup(
        t("Choose a mouse"),
        t("Click a catalog card to open the full profile with image, summary, specs, and sources.")
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
        t("Choose a mouse"),
        t("Click a catalog card to open the full profile with image, summary, specs, and sources.")
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
      favBtn.setAttribute('aria-label', t(isFav ? 'Remove from favorites' : 'Add to favorites'));
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
        alert(t(result.error === 'not_logged_in' ? 'Sign in to leave a review' :
               result.error === 'invalid_rating' ? 'Please select a rating' :
               result.error === 'empty_text' ? 'All fields are required' : 'Error'));
        return;
      }

      alert(t('Review submitted successfully'));
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
        '<a href="login.html?return=' + encodeURIComponent(returnPage) + '&mode=login" class="header-auth-btn header-login-btn">' + escapeHtml(t('Log in')) + '</a>' +
        '<a href="login.html?return=' + encodeURIComponent(returnPage) + '&mode=register" class="header-auth-btn header-register-btn">' + escapeHtml(t('Create an account')) + '</a>';
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
        '<h2>' + escapeHtml(t(isLogin ? 'Log in' : 'Create an account')) + '</h2>' +
        '<form class="auth-modal-form" id="auth-form">' +
          (!isLogin ? '<div class="form-group"><label>' + escapeHtml(t('Username')) + '</label><input type="text" name="pseudo" required></div>' : '') +
          '<div class="form-group"><label>' + escapeHtml(t('Email')) + '</label><input type="email" name="email" required></div>' +
          '<div class="form-group"><label>' + escapeHtml(t('Password')) + '</label><input type="password" name="password" required></div>' +
          (!isLogin ? '<div class="form-group"><label>' + escapeHtml(t('Confirm password')) + '</label><input type="password" name="confirmPassword" required></div>' : '') +
          '<div class="form-error" id="auth-error"></div>' +
          '<button type="submit" class="submit-review-btn">' + escapeHtml(t(isLogin ? 'Log in' : 'Create account')) + '</button>' +
        '</form>' +
        '<p class="auth-switch">' +
          (isLogin ? '<button type="button" class="link-btn" id="switch-to-register">' + escapeHtml(t('No account? Create one')) + '</button>' :
                     '<button type="button" class="link-btn" id="switch-to-login">' + escapeHtml(t('Already have an account? Log in')) + '</button>') +
        '</p>' +
      '</div>'
    );

    document.body.appendChild(modal);

    // Fermer la modale
    modal.querySelector('#close-auth-modal').addEventListener('click', function() {
      modal.remove();
    });
    modal.addEventListener('click', function(e) {
      if (e.target === modal) modal.remove();
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
          errorDiv.textContent = t('All fields are required');
          return;
        }
        if (confirmPassword !== password) {
          errorDiv.textContent = t('Passwords do not match');
          return;
        }
        var result = UserAuth.register(pseudo, email, password);
        if (!result.success) {
          errorDiv.textContent = t(result.error === 'email_exists' ? 'Email already exists' :
                                   result.error === 'pseudo_exists' ? 'Username already exists' :
                                   result.error === 'empty_fields' ? 'All fields are required' : 'Error');
          return;
        }
        alert(t('Account created! Please log in.'));
        modal.remove();
        showAuthModal('login');
      } else {
        var loginResult = UserAuth.login(formData.get('email'), formData.get('password'));
        if (!loginResult.success) {
          errorDiv.textContent = t('Invalid email or password');
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
    var mouse = mice.find(function (item) {
      return item.id === id;
    });
    var detailAlreadyOpen = !detailView.classList.contains("hidden");

    if (!mouse) {
      return;
    }

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
    syncStats(filteredMice);

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
      ? visibleMice.length + ' ' + (state.catalog === 'keyboard' ? t('keyboard shown') : state.catalog === 'pc-component' ? t('pc component shown') : t('mouse shown'))
      : t('No results');
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
        btn.setAttribute('aria-label', t(isFav ? 'Remove from favorites' : 'Add to favorites'));
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
        announceToScreenReader(t('Loading more products') + '...');
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
    state.catalog = "all";
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
    var html = '<div class="search-history" role="region" aria-label="' + escapeHtml(t("Recent searches")) + '">' +
      '<div class="search-history-header">' +
        '<span class="search-history-title" id="search-history-title">' + escapeHtml(t("Recent searches")) + '</span>' +
        '<button type="button" class="search-history-clear" id="clear-search-history" aria-label="' + escapeHtml(t("Clear")) + ' ' + escapeHtml(t("Recent searches")) + '">' + escapeHtml(t("Clear")) + '</button>' +
      '</div>' +
      '<div class="search-history-list" role="list">';
    history.forEach(function(query) {
      html += '<button type="button" class="search-history-item" data-query="' + escapeHtml(query) + '" role="listitem" aria-label="' + escapeHtml(t("Search for")) + ' ' + escapeHtml(query) + '">' + escapeHtml(query) + '</button>';
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
    if (modelsLabel) modelsLabel.textContent = labels.models;
    if (brandsLabel) brandsLabel.textContent = labels.brands;
    if (imagesLabel) imagesLabel.textContent = labels.images;
    if (resultsLabel) resultsLabel.textContent = labels.results;
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
    var catalogName = state.catalog === 'all' ? t('All catalog') : t(state.catalog === 'pc-component' ? 'Pc Component' : state.catalog === 'keyboard' ? 'Keyboard' : 'Mice');
    announceToScreenReader(t('Catalog opened') + ': ' + catalogName);
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
        '<h3>' + escapeHtml(t("No favorites")) + '</h3>' +
        '<p>' + escapeHtml(t("Add mice to your favorites to see them here.")) + '</p>' +
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
        btn.setAttribute('aria-label', t(isFav ? 'Remove from favorites' : 'Add to favorites'));
        renderFavoritesGrid();
      });
    });
  }

  function bindEvents() {
    searchInput.addEventListener("input", debouncedSearch);

    brandFilter.addEventListener("change", function (event) {
      hideProduct();
      state.brand = event.target.value;
      state.visibleCount = INITIAL_LOAD_COUNT;
      state.selectedId = null;
      renderCatalog();
    });

    typeFilter.addEventListener("change", function (event) {
      hideProduct();
      state.type = event.target.value;
      state.visibleCount = INITIAL_LOAD_COUNT;
      state.selectedId = null;
      renderCatalog();
    });

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

    resetFilters.addEventListener("click", function () {
      resetAllFilters();
    });

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

    // CTA link works as standard HTML link - no event listener needed

    window.addEventListener('popstate', function(event) {
      var path = window.location.pathname;
      var hash = window.location.hash;
      handleRoute(path, hash);
    });

    catalogGrid.addEventListener("click", function (event) {
      var card = event.target.closest(".mouse-card[data-id]");

      if (!card) {
        return;
      }

      var newSelectedId = card.getAttribute("data-id");
      showProduct(newSelectedId);
    });

    closeBtn.addEventListener("click", function () {
      hideProduct();
    });

    // Click outside to close (for mobile bottom sheet)
    detailView.addEventListener("click", function (event) {
      // If clicking on the backdrop (not the shell content)
      if (event.target === detailView) {
        hideProduct();
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        closeLanguageMenu();
        hideProduct();
      }
    });

      }

  function init() {
    var initialLanguage;
    var requiredElements = [
      searchInput,
      brandFilter,
      typeFilter,
      resetFilters,
      catalogGrid,
      detailPanel,
      totalModels,
      totalBrands,
      officialImages,
      visibleResults
    ];

    if (requiredElements.some(function (element) { return !element; })) {
      console.error("Elements DOM requis manquants.");
      return;
    }

    catalogGrid.setAttribute("tabindex", "0");
    catalogGrid.setAttribute("aria-busy", "false");
    detailPanel.setAttribute("tabindex", "0");

    initializeLanguageSelector();
    bindEvents();
    updateHeaderAuth();
    initialLanguage = DEFAULT_LANGUAGE;
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
      }
    }

    setTimeout(loadInitialRoute, 0);

    console.log("MinSP initialisé avec", mice.length, "souris validées");
  }

  // Note: AI Recommendation feature moved to separate page: ai-recommend.html

  init();
}());
