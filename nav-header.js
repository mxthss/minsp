/* ═══════════════════════════════════════════════════════════
   MinSp Premium Sticky Nav — Interactions
   Scroll detection · Mobile toggle · Language picker · Favorites
   ═══════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  function initNav() {
  const nav = document.getElementById('site-nav');
  if (!nav) return;

  /* ── 1. Scroll detection → is-scrolled class ── */
  let ticking = false;
  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(function () {
        nav.classList.toggle('is-scrolled', window.scrollY > 10);
        ticking = false;
      });
      ticking = true;
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ── 2. Mobile menu toggle ── */
  var mobileToggle = document.getElementById('nav-mobile-toggle');
  if (mobileToggle) {
    mobileToggle.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('is-mobile-open');
      mobileToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');

      // Swap hamburger ↔ X icon
      var svg = mobileToggle.querySelector('svg');
      if (svg) {
        if (isOpen) {
          svg.innerHTML = '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>';
        } else {
          svg.innerHTML = '<line x1="4" y1="7" x2="20" y2="7"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="17" x2="20" y2="17"/>';
        }
      }
    });

    // Close mobile menu when clicking a nav link
    var mobileLinks = nav.querySelectorAll('.nav-link');
    mobileLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('is-mobile-open');
        mobileToggle.setAttribute('aria-expanded', 'false');
        var svg = mobileToggle.querySelector('svg');
        if (svg) {
          svg.innerHTML = '<line x1="4" y1="7" x2="20" y2="7"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="17" x2="20" y2="17"/>';
        }
      });
    });
  }

  /* ── 3. Language picker (Google Translate Widget) ── */
  var langTrigger = document.getElementById('nav-lang-trigger');
  var langMenu = document.getElementById('nav-lang-menu');
  var langFlag = document.getElementById('nav-lang-flag');
  var langLabel = document.getElementById('nav-lang-label');
  var langOptions = document.querySelectorAll('.nav-lang-option');

  var STORAGE_KEY = 'minsp_language';

  var langConfig = {
    'en': { flag: 'fi-us', label: 'EN', name: 'English (US)' },
    'fr': { flag: 'fi-fr', label: 'FR', name: 'Français (FR)' },
    'es': { flag: 'fi-es', label: 'ES', name: 'Español (ES)' },
    'de': { flag: 'fi-de', label: 'DE', name: 'Deutsch (DE)' },
    'it': { flag: 'fi-it', label: 'IT', name: 'Italiano (IT)' },
    'pt': { flag: 'fi-pt', label: 'PT', name: 'Português (PT)' }
  };

  // Read googtrans cookie
  function getLangFromCookie() {
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
      var c = cookies[i].trim();
      if (c.startsWith('googtrans=')) {
        var val = c.substring('googtrans='.length);
        var parts = val.split('/');
        if (parts.length >= 3) {
          var lang = parts[2].split('-')[0].toLowerCase();
          return lang;
        }
      }
    }
    return null;
  }

  // Get current language from cookie, localStorage, or browser
  function getCurrentLanguage() {
    var cookieLang = getLangFromCookie();
    if (cookieLang && langConfig[cookieLang]) return cookieLang;
    try {
      var stored = localStorage.getItem(STORAGE_KEY);
      if (stored && langConfig[stored]) return stored;
    } catch (e) {}
    var browserLang = navigator.language || navigator.userLanguage || 'en';
    var shortLang = browserLang.split('-')[0].toLowerCase();
    if (langConfig[shortLang]) return shortLang;
    return 'en';
  }

  // Update UI for selected language
  function updateLanguageUI(lang) {
    var config = langConfig[lang];
    if (!config) return;
    if (langFlag) langFlag.className = 'fi ' + config.flag;
    if (langLabel) langLabel.textContent = config.label;
    langOptions.forEach(function (opt) {
      var isSelected = opt.getAttribute('data-lang') === lang;
      opt.classList.toggle('is-active', isSelected);
      opt.setAttribute('aria-selected', isSelected ? 'true' : 'false');
    });
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}
  }

  // Trigger Google Translate with retry mechanism
  function triggerGoogleTranslate(lang) {
    if (lang === 'en') {
      clearGoogleTranslateCookies();
      window.location.reload();
      return;
    }

    // Try to use Google Translate combo (wait for it to be ready)
    var attempts = 0;
    var maxAttempts = 50; // 5 seconds total

    function tryTranslate() {
      var combo = document.querySelector('.goog-te-combo');
      if (combo) {
        combo.value = lang;
        combo.dispatchEvent(new Event('change', { bubbles: true }));
        return;
      }

      // Also try direct Google Translate API if available
      if (window.google && google.translate && google.translate.TranslateElement) {
        var gtElement = document.getElementById('google_translate_element');
        if (gtElement && gtElement._gtElement) {
          gtElement._gtElement.showBanner(lang);
          return;
        }
      }

      attempts++;
      if (attempts < maxAttempts) {
        setTimeout(tryTranslate, 100);
      } else {
        // Final fallback: cookie method
        setGoogleTranslateCookie(lang);
        window.location.reload();
      }
    }

    tryTranslate();
  }

  // Clear GT cookies (for returning to English)
  function clearGoogleTranslateCookies() {
    var domain = window.location.hostname;
    var expires = 'expires=Thu, 01 Jan 1970 00:00:01 GMT';
    // Clear all possible domain variations
    document.cookie = 'googtrans=; path=/; ' + expires;
    document.cookie = 'googtrans=; path=/; domain=' + domain + '; ' + expires;
    document.cookie = 'googtrans=; path=/; domain=.' + domain + '; ' + expires;
    document.cookie = 'googtrans=; path=/; domain=www.' + domain + '; ' + expires;
    // Also clear without domain
    document.cookie = 'googtrans=; path=/; ' + expires;
  }

  // Set GT cookie for translation
  function setGoogleTranslateCookie(lang) {
    var domain = window.location.hostname;
    var cookieValue = '/en/' + lang;
    var cookieOptions = 'path=/; max-age=86400'; // 24 hours
    // Set for multiple domain variations to be safe
    document.cookie = 'googtrans=' + cookieValue + '; ' + cookieOptions;
    if (domain && domain !== 'localhost') {
      document.cookie = 'googtrans=' + cookieValue + '; domain=' + domain + '; ' + cookieOptions;
      document.cookie = 'googtrans=' + cookieValue + '; domain=.' + domain + '; ' + cookieOptions;
    }
  }

  if (langTrigger && langMenu) {
    langTrigger.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      var isExpanded = langTrigger.getAttribute('aria-expanded') === 'true';
      langTrigger.setAttribute('aria-expanded', isExpanded ? 'false' : 'true');
      langMenu.classList.toggle('is-open', !isExpanded);
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (!langTrigger.contains(e.target) && !langMenu.contains(e.target)) {
        langTrigger.setAttribute('aria-expanded', 'false');
        langMenu.classList.remove('is-open');
      }
    });

    // Close on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        langTrigger.setAttribute('aria-expanded', 'false');
        langMenu.classList.remove('is-open');
      }
    });

    // Language option clicks
    langOptions.forEach(function (option) {
      option.addEventListener('click', function () {
        var selectedLang = this.getAttribute('data-lang');
        updateLanguageUI(selectedLang);
        langTrigger.setAttribute('aria-expanded', 'false');
        langMenu.classList.remove('is-open');

        // Show loading state on button
        var originalLabel = langLabel ? langLabel.textContent : '';
        if (langLabel) langLabel.textContent = '...';
        if (langTrigger) langTrigger.style.opacity = '0.6';

        triggerGoogleTranslate(selectedLang);

        // Restore button after a delay
        setTimeout(function() {
          if (langLabel && originalLabel) langLabel.textContent = originalLabel;
          if (langTrigger) langTrigger.style.opacity = '1';
        }, 2000);
      });
    });

    // Initialize UI
    var currentLang = getCurrentLanguage();
    updateLanguageUI(currentLang);
  }

  // Initialize Google Translate widget if element exists
  function initGoogleTranslate() {
    var el = document.getElementById('google_translate_element');
    if (el && typeof google !== 'undefined' && google.translate) {
      new google.translate.TranslateElement({
        pageLanguage: 'en',
        includedLanguages: 'en,fr,es,de,it,pt,nl,pl,sv,uk,ru,zh-CN,ja,ko,ar,hi',
        layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
        autoDisplay: false
      }, 'google_translate_element');
    }
  }

  // Make init function globally available for the Google Translate script callback
  window.googleTranslateElementInit = function () {
    initGoogleTranslate();
  };

  // If Google Translate script already loaded, init now
  if (typeof google !== 'undefined' && google.translate) {
    initGoogleTranslate();
  }

  /* ── 4. Favorites button → scroll to / show favorites ── */
  var favBtn = document.getElementById('nav-fav-btn');
  if (favBtn) {
    favBtn.addEventListener('click', function () {
      // Try to trigger the existing favorites view
      var existingFavBtn = document.getElementById('fav-view-btn');
      if (existingFavBtn) {
        existingFavBtn.click();
      }

      // Update has-favorites state
      function updateFavState() {
        try {
          var favs = JSON.parse(localStorage.getItem('minsp-favorites') || '[]');
          favBtn.classList.toggle('has-favorites', favs.length > 0);
        } catch (e) {
          // ignore
        }
      }
      updateFavState();
    });

    // Initial state
    try {
      var favs = JSON.parse(localStorage.getItem('minsp-favorites') || '[]');
      favBtn.classList.toggle('has-favorites', favs.length > 0);
    } catch (e) {
      // ignore
    }

    // Listen for storage changes
    window.addEventListener('storage', function () {
      try {
        var favs = JSON.parse(localStorage.getItem('minsp-favorites') || '[]');
        favBtn.classList.toggle('has-favorites', favs.length > 0);
      } catch (e) {
        // ignore
      }
    });
  }

  /* ── 5. AI Button Category Handling ──
     On catalog pages (mice.html, keyboards.html, pc-components.html),
     the AI button links directly to the category-specific recommendation page.
     On other pages, it links to the AI landing page. */
  var aiBtn = document.querySelector('.nav-ai-btn');
  if (aiBtn) {
    var currentPage = window.location.pathname.split('/').pop() || 'index.html';
    var category = aiBtn.getAttribute('data-category');

    // If we're on a catalog page with a category, update the href
    if (category) {
      var targetPage = 'ai-recommend.html';
      if (category === 'mice') {
        targetPage = 'ai-recommend.html';
      } else if (category === 'keyboards') {
        targetPage = 'ai-keyboards.html';
      } else if (category === 'pc-components') {
        targetPage = 'ai-pc-components.html';
      }
      aiBtn.setAttribute('href', targetPage);
    }
  }

  /* ── 6. Stats Animation on Page Load ── */
  function animateStats() {
    var statValues = document.querySelectorAll('.stats-section .stat-value');
    statValues.forEach(function(stat) {
      var statId = stat.id;
      // Get actual values from window.statsData if available, or from data-value attribute
      var finalValue = '';
      if (window.statsData && window.statsData[statId]) {
        finalValue = window.statsData[statId].toString();
      } else {
        finalValue = stat.getAttribute('data-value') || '';
      }
      
      // Also try to get value from textContent if data-value is empty
      if (!finalValue && stat.textContent) {
        finalValue = stat.textContent;
      }
      
      var numericValue = parseInt(finalValue.replace(/[^0-9]/g, '')) || 0;
      if (numericValue > 0) {
        // Animate from 0 to final value
        var duration = 1000;
        var startTime = null;
        function animate(currentTime) {
          if (!startTime) startTime = currentTime;
          var progress = Math.min((currentTime - startTime) / duration, 1);
          var current = Math.floor(progress * numericValue);
          stat.textContent = current.toLocaleString();
          if (progress < 1) {
            requestAnimationFrame(animate);
          } else {
            stat.textContent = finalValue;
          }
        }
        // Start with 0 for animation
        stat.textContent = '0';
        requestAnimationFrame(animate);
      } else {
        // If no value yet, show 0 and wait for data
        stat.textContent = '0';
      }
    });
  }

  // Re-animate when stats data is updated
  window.addEventListener('statsUpdated', function() {
    animateStats();
  });

  // Run stats animation when page loads
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', animateStats);
  } else {
    animateStats();
  }

  } // end initNav function

  // Run nav initialization when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNav);
  } else {
    initNav();
  }

})();
