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
  // Le widget Google Translate gère automatiquement la traduction
  // Ce code garde juste le comportement du dropdown visuel si présent
  var langTrigger = document.getElementById('nav-lang-trigger');
  var langMenu = document.getElementById('nav-lang-menu');

  if (langTrigger && langMenu) {
    langTrigger.addEventListener('click', function (e) {
      e.stopPropagation();
      var isExpanded = langTrigger.getAttribute('aria-expanded') === 'true';
      langTrigger.setAttribute('aria-expanded', !isExpanded);
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
