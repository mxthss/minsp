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

  /* ── 3. Language picker (local i18n) ── */
  var i18n = window.MinSPI18n;
  var picker = document.getElementById('nav-lang-picker') || nav.querySelector('.nav-lang-picker');
  var langTrigger;
  var langMenu;
  var langFlag;
  var langLabel;

  function closeLanguageMenu() {
    if (!langTrigger || !langMenu) {
      return;
    }

    langTrigger.setAttribute('aria-expanded', 'false');
    langMenu.classList.remove('is-open');
  }

  function ensureLanguagePicker() {
    if (!picker || !i18n) {
      return;
    }

    if (!picker.id) {
      picker.id = 'nav-lang-picker';
    }

    picker.setAttribute('data-minsp-no-auto-translate', 'true');
    picker.innerHTML =
      '<button class="nav-lang-trigger" id="nav-lang-trigger" type="button" aria-haspopup="listbox" aria-expanded="false" aria-label="Choose language">' +
        '<span class="nav-lang-flag-emoji" id="nav-lang-flag" aria-hidden="true"></span>' +
        '<span class="nav-lang-label" id="nav-lang-label">EN</span>' +
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9"/></svg>' +
      '</button>' +
      '<div class="nav-lang-menu" id="nav-lang-menu" role="listbox" aria-label="Choose language" data-minsp-no-auto-translate="true"></div>';

    langTrigger = document.getElementById('nav-lang-trigger');
    langMenu = document.getElementById('nav-lang-menu');
    langFlag = document.getElementById('nav-lang-flag');
    langLabel = document.getElementById('nav-lang-label');
  }

  function renderLanguageMenu(activeLang) {
    var currentLanguage = i18n.normalizeLanguageCode(activeLang);

    if (!langMenu) {
      return;
    }

    langMenu.innerHTML = i18n.getLanguageOrder().map(function (lang) {
      var config = i18n.getLanguageConfig(lang);
      var isActive = currentLanguage === lang;

      return (
        '<button class="nav-lang-option' + (isActive ? ' is-active' : '') + '" type="button" role="option" aria-selected="' + (isActive ? 'true' : 'false') + '" data-lang="' + lang + '">' +
          '<span class="nav-lang-option-emoji" aria-hidden="true">' + config.emoji + '</span>' +
          '<span>' + config.name + '</span>' +
        '</button>'
      );
    }).join('');
  }

  function updateLanguageUI(activeLang) {
    var currentLanguage = i18n.normalizeLanguageCode(activeLang);
    var config = i18n.getLanguageConfig(currentLanguage);

    if (langFlag) {
      langFlag.textContent = config.emoji;
    }

    if (langLabel) {
      langLabel.textContent = config.label;
    }

    if (langTrigger) {
      langTrigger.setAttribute('aria-label', window.translateText ? window.translateText('Choose language', currentLanguage) : 'Choose language');
    }

    if (langMenu) {
      langMenu.setAttribute('aria-label', window.translateText ? window.translateText('Choose language', currentLanguage) : 'Choose language');
    }

    renderLanguageMenu(currentLanguage);
  }

  ensureLanguagePicker();

  if (langTrigger && langMenu && i18n) {
    langTrigger.addEventListener('click', function (event) {
      event.preventDefault();
      event.stopPropagation();
      var isExpanded = langTrigger.getAttribute('aria-expanded') === 'true';
      langTrigger.setAttribute('aria-expanded', isExpanded ? 'false' : 'true');
      langMenu.classList.toggle('is-open', !isExpanded);
    });

    langMenu.addEventListener('click', function (event) {
      var option = event.target.closest('.nav-lang-option[data-lang]');

      if (!option) {
        return;
      }

      i18n.setLanguage(option.getAttribute('data-lang'));
      closeLanguageMenu();
    });

    document.addEventListener('click', function (event) {
      if (!picker.contains(event.target)) {
        closeLanguageMenu();
      }
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') {
        closeLanguageMenu();
      }
    });

    updateLanguageUI(i18n.getCurrentLanguage());

    window.addEventListener('minsp:languagechange', function (event) {
      if (event && event.detail && event.detail.language) {
        updateLanguageUI(event.detail.language);
      }
    });
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
