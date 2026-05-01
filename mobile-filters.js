/**
 * MinSp Mobile Filters - Drawer et Chips
 * Design moderne pour filtres mobile faciles à utiliser
 * Version: 1.0.0
 */
(function() {
  'use strict';

  const MobileFilters = {
    isOpen: false,
    currentFilters: {
      search: '',
      brand: 'all',
      type: 'all'
    },

    // Initialiser
    init() {
      // Vérifier si mobile
      if (!this.isMobile()) return;
      
      this.createDrawer();
      this.createChipsBar();
      this.bindEvents();
      this.hideDesktopFilters();
    },

    // Détecter mobile
    isMobile() {
      return window.matchMedia('(max-width: 768px)').matches;
    },

    // Cacher les filtres desktop sur mobile
    hideDesktopFilters() {
      const toolbar = document.getElementById('toolbar-panel');
      if (toolbar) {
        toolbar.classList.add('desktop-only');
      }
    },

    // Créer la barre de chips
    createChipsBar() {
      const existing = document.getElementById('mobile-chips-bar');
      if (existing) existing.remove();

      const chipsBar = document.createElement('div');
      chipsBar.id = 'mobile-chips-bar';
      chipsBar.className = 'mobile-chips-bar';
      chipsBar.innerHTML = `
        <div class="chips-scroll">
          <button class="filter-chip filter-chip--filters" id="open-filters-btn">
            <span class="chip-icon">⚙️</span>
            <span class="chip-label">Filtres</span>
          </button>
          <button class="filter-chip" data-filter="brand" data-value="all">
            <span class="chip-label">Toutes marques</span>
          </button>
          <button class="filter-chip" data-filter="type" data-value="all">
            <span class="chip-label">Tous types</span>
          </button>
          <button class="filter-chip filter-chip--search" id="open-search-btn">
            <span class="chip-icon">🔍</span>
            <span class="chip-label">Recherche</span>
          </button>
        </div>
      `;

      // Insérer après le header
      const heroPanel = document.querySelector('.hero-panel');
      if (heroPanel) {
        heroPanel.insertAdjacentElement('afterend', chipsBar);
      }

      // Ajouter les styles si pas déjà présents
      this.injectChipsStyles();
    },

    // Créer le drawer de filtres
    createDrawer() {
      const existing = document.getElementById('mobile-filter-drawer');
      if (existing) existing.remove();

      const drawer = document.createElement('div');
      drawer.id = 'mobile-filter-drawer';
      drawer.className = 'mobile-filter-drawer';
      drawer.innerHTML = `
        <div class="drawer-backdrop" id="drawer-backdrop"></div>
        <div class="drawer-content">
          <div class="drawer-header">
            <h3>Filtres</h3>
            <button class="drawer-close" id="close-drawer-btn">&times;</button>
          </div>
          
          <div class="drawer-search">
            <div class="search-input-wrapper">
              <span class="search-icon">🔍</span>
              <input type="search" id="mobile-search-input" placeholder="Rechercher..." autocomplete="off">
              <button class="clear-search hidden" id="clear-search">&times;</button>
            </div>
          </div>
          
          <div class="drawer-section">
            <h4>Marque</h4>
            <div class="chips-group" id="brand-chips">
              <button class="drawer-chip is-active" data-filter="brand" data-value="all">Toutes</button>
            </div>
          </div>
          
          <div class="drawer-section">
            <h4>Type</h4>
            <div class="chips-group" id="type-chips">
              <button class="drawer-chip is-active" data-filter="type" data-value="all">Tous</button>
              <button class="drawer-chip" data-filter="type" data-value="gaming">Gaming</button>
              <button class="drawer-chip" data-filter="type" data-value="office">Bureau</button>
              <button class="drawer-chip" data-filter="type" data-value="wireless">Sans fil</button>
            </div>
          </div>
          
          <div class="drawer-footer">
            <button class="btn-reset" id="reset-mobile-filters">Réinitialiser</button>
            <button class="btn-apply" id="apply-filters">Appliquer (${document.getElementById('visible-results')?.textContent || 0})</button>
          </div>
        </div>
      `;

      document.body.appendChild(drawer);
      this.injectDrawerStyles();
    },

    // Injecter les styles des chips
    injectChipsStyles() {
      if (document.getElementById('mobile-chips-styles')) return;

      const styles = document.createElement('style');
      styles.id = 'mobile-chips-styles';
      styles.textContent = `
        /* Mobile Chips Bar - Above the fold */
        .mobile-chips-bar {
          display: none;
          padding: 12px 16px;
          background: linear-gradient(180deg, rgba(10,10,10,0.98) 0%, rgba(17,17,17,0.95) 100%);
          border-bottom: 1px solid rgba(255,255,255,0.08);
          position: sticky;
          top: 0;
          z-index: 100;
          backdrop-filter: blur(12px);
        }

        @media (max-width: 768px) {
          .mobile-chips-bar { display: block; }
          .toolbar-panel.desktop-only { display: none !important; }
        }

        .chips-scroll {
          display: flex;
          gap: 8px;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
          padding-bottom: 4px;
        }

        .chips-scroll::-webkit-scrollbar { display: none; }

        .filter-chip {
          flex-shrink: 0;
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 10px 16px;
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 24px;
          background: rgba(26,26,26,0.7);
          color: #a1a1aa;
          font-size: 0.85rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          scroll-snap-align: start;
          white-space: nowrap;
        }

        .filter-chip:hover {
          border-color: #38bdf8;
          background: rgba(56,189,248,0.12);
          color: #fff;
        }

        .filter-chip.is-active {
          border-color: #38bdf8;
          background: linear-gradient(135deg, rgba(56,189,248,0.25) 0%, rgba(45,212,191,0.15) 100%);
          color: #fff;
          box-shadow: 0 4px 15px rgba(56,189,248,0.25);
        }

        .filter-chip--filters {
          background: linear-gradient(135deg, rgba(139,92,246,0.2) 0%, rgba(56,189,248,0.15) 100%);
          border-color: rgba(139,92,246,0.35);
        }

        .filter-chip--search {
          background: rgba(5,12,22,0.8);
        }

        .chip-icon { font-size: 0.9rem; }

        /* Hide desktop elements on mobile */
        @media (max-width: 768px) {
          .search-field { display: none; }
          .filter-field { display: none; }
          .reset-button { display: none; }
        }
      `;
      document.head.appendChild(styles);
    },

    // Injecter les styles du drawer
    injectDrawerStyles() {
      if (document.getElementById('mobile-drawer-styles')) return;

      const styles = document.createElement('style');
      styles.id = 'mobile-drawer-styles';
      styles.textContent = `
        /* Mobile Filter Drawer */
        .mobile-filter-drawer {
          position: fixed;
          inset: 0;
          z-index: 1000;
          pointer-events: none;
          visibility: hidden;
        }

        .mobile-filter-drawer.is-open {
          pointer-events: auto;
          visibility: visible;
        }

        .drawer-backdrop {
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.7);
          opacity: 0;
          transition: opacity 0.3s ease;
          backdrop-filter: blur(4px);
        }

        .mobile-filter-drawer.is-open .drawer-backdrop {
          opacity: 1;
        }

        .drawer-content {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(180deg, #111111 0%, #0a0a0a 100%);
          border-radius: 24px 24px 0 0;
          max-height: 85vh;
          transform: translateY(100%);
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          flex-direction: column;
          box-shadow: 0 -10px 60px rgba(0,0,0,0.5);
          border-top: 1px solid rgba(56,189,248,0.3);
        }

        .mobile-filter-drawer.is-open .drawer-content {
          transform: translateY(0);
        }

        .drawer-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 24px 16px;
          border-bottom: 1px solid rgba(148,163,184,0.1);
        }

        .drawer-header h3 {
          margin: 0;
          font-size: 1.2rem;
          font-weight: 600;
          color: #fff;
        }

        .drawer-close {
          width: 36px;
          height: 36px;
          border: none;
          background: rgba(148,163,184,0.1);
          border-radius: 50%;
          color: #94a3b8;
          font-size: 1.5rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }

        .drawer-close:hover {
          background: rgba(239,68,68,0.2);
          color: #fca5a5;
        }

        .drawer-search {
          padding: 16px 24px;
        }

        .search-input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .search-icon {
          position: absolute;
          left: 16px;
          color: #94a3b8;
          font-size: 0.9rem;
        }

        .drawer-search input {
          width: 100%;
          padding: 14px 40px 14px 44px;
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 12px;
          background: rgba(20,20,20,0.9);
          color: #fff;
          font-size: 0.95rem;
          transition: all 0.2s ease;
        }

        .drawer-search input:focus {
          outline: none;
          border-color: #38bdf8;
          box-shadow: 0 0 0 3px rgba(56,189,248,0.15);
        }

        .clear-search {
          position: absolute;
          right: 12px;
          width: 24px;
          height: 24px;
          border: none;
          background: rgba(148,163,184,0.2);
          border-radius: 50%;
          color: #94a3b8;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1rem;
        }

        .drawer-section {
          padding: 16px 24px;
          border-bottom: 1px solid rgba(148,163,184,0.1);
        }

        .drawer-section h4 {
          margin: 0 0 12px;
          font-size: 0.75rem;
          font-weight: 600;
          color: #38bdf8;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .chips-group {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .drawer-chip {
          padding: 10px 18px;
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 20px;
          background: rgba(26,26,26,0.7);
          color: #a1a1aa;
          font-size: 0.85rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .drawer-chip:hover {
          border-color: rgba(56,189,248,0.5);
          background: rgba(56,189,248,0.12);
          color: #fff;
        }

        .drawer-chip.is-active {
          border-color: #38bdf8;
          background: linear-gradient(135deg, rgba(56,189,248,0.3) 0%, rgba(45,212,191,0.15) 100%);
          color: #fff;
          box-shadow: 0 4px 12px rgba(56,189,248,0.2);
        }

        .drawer-footer {
          display: flex;
          gap: 12px;
          padding: 16px 24px 24px;
          margin-top: auto;
        }

        .drawer-footer button {
          flex: 1;
          padding: 14px 24px;
          border-radius: 12px;
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .btn-reset {
          border: 1px solid rgba(148,163,184,0.3);
          background: transparent;
          color: #94a3b8;
        }

        .btn-reset:hover {
          border-color: #fca5a5;
          color: #fca5a5;
          background: rgba(239,68,68,0.08);
        }

        .btn-apply {
          border: none;
          background: linear-gradient(135deg, #38bdf8 0%, #0ea5e9 100%);
          color: #fff;
          box-shadow: 0 4px 15px rgba(56,189,248,0.3);
        }

        .btn-apply:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(99,102,241,0.4);
        }

        /* Drawer handle */
        .drawer-content::before {
          content: '';
          position: absolute;
          top: 8px;
          left: 50%;
          transform: translateX(-50%);
          width: 40px;
          height: 4px;
          background: rgba(148,163,184,0.3);
          border-radius: 2px;
        }
      `;
      document.head.appendChild(styles);
    },

    // Binding des événements
    bindEvents() {
      // Ouvrir le drawer
      document.addEventListener('click', (e) => {
        const openBtn = e.target.closest('#open-filters-btn');
        if (openBtn) {
          e.preventDefault();
          this.openDrawer();
        }
      });

      // Fermer le drawer
      document.addEventListener('click', (e) => {
        const closeBtn = e.target.closest('#close-drawer-btn');
        const backdrop = e.target.closest('#drawer-backdrop');
        if (closeBtn || backdrop) {
          this.closeDrawer();
        }
      });

      // Clic sur les chips du drawer
      document.addEventListener('click', (e) => {
        const chip = e.target.closest('.drawer-chip');
        if (chip) {
          const filter = chip.dataset.filter;
          const value = chip.dataset.value;
          
          // Mise à jour visuelle
          document.querySelectorAll(`.drawer-chip[data-filter="${filter}"]`).forEach(c => {
            c.classList.remove('is-active');
          });
          chip.classList.add('is-active');
          
          // Mise à jour des filtres
          this.currentFilters[filter] = value;
          this.updateChipsFromDrawer();
        }
      });

      // Recherche
      document.addEventListener('input', (e) => {
        if (e.target.id === 'mobile-search-input') {
          this.currentFilters.search = e.target.value;
          const clearBtn = document.getElementById('clear-search');
          if (clearBtn) {
            clearBtn.classList.toggle('hidden', !e.target.value);
          }
        }
      });

      // Clear search
      document.addEventListener('click', (e) => {
        if (e.target.closest('#clear-search')) {
          const input = document.getElementById('mobile-search-input');
          if (input) {
            input.value = '';
            this.currentFilters.search = '';
            e.target.closest('#clear-search').classList.add('hidden');
          }
        }
      });

      // Appliquer les filtres
      document.addEventListener('click', (e) => {
        if (e.target.closest('#apply-filters')) {
          this.applyFilters();
          this.closeDrawer();
        }
      });

      // Réinitialiser
      document.addEventListener('click', (e) => {
        if (e.target.closest('#reset-mobile-filters')) {
          this.resetFilters();
        }
      });

      // Fermer avec Escape
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.isOpen) {
          this.closeDrawer();
        }
      });

      // Touch events pour swipe down
      const drawer = document.getElementById('mobile-filter-drawer');
      if (drawer) {
        let startY = 0;
        drawer.addEventListener('touchstart', (e) => {
          startY = e.touches[0].clientY;
        }, { passive: true });

        drawer.addEventListener('touchmove', (e) => {
          const currentY = e.touches[0].clientY;
          const diff = currentY - startY;
          if (diff > 100) {
            this.closeDrawer();
          }
        }, { passive: true });
      }
    },

    // Mettre à jour les chips depuis le drawer
    updateChipsFromDrawer() {
      const chipsBar = document.getElementById('mobile-chips-bar');
      if (!chipsBar) return;

      // Mettre à jour les chips visuels
      const brandChip = chipsBar.querySelector('[data-filter="brand"]');
      const typeChip = chipsBar.querySelector('[data-filter="type"]');

      if (brandChip) {
        const brandText = this.currentFilters.brand === 'all' 
          ? 'Toutes marques' 
          : this.currentFilters.brand;
        brandChip.querySelector('.chip-label').textContent = brandText;
        brandChip.classList.toggle('is-active', this.currentFilters.brand !== 'all');
      }

      if (typeChip) {
        const typeLabels = { all: 'Tous types', gaming: 'Gaming', office: 'Bureau', wireless: 'Sans fil' };
        typeChip.querySelector('.chip-label').textContent = typeLabels[this.currentFilters.type] || this.currentFilters.type;
        typeChip.classList.toggle('is-active', this.currentFilters.type !== 'all');
      }
    },

    // Ouvrir le drawer
    openDrawer() {
      const drawer = document.getElementById('mobile-filter-drawer');
      if (drawer) {
        this.isOpen = true;
        drawer.classList.add('is-open');
        document.body.style.overflow = 'hidden';
        
        // Focus sur la recherche
        setTimeout(() => {
          const searchInput = document.getElementById('mobile-search-input');
          if (searchInput) searchInput.focus();
        }, 100);
      }
    },

    // Fermer le drawer
    closeDrawer() {
      const drawer = document.getElementById('mobile-filter-drawer');
      if (drawer) {
        this.isOpen = false;
        drawer.classList.remove('is-open');
        document.body.style.overflow = '';
      }
    },

    // Appliquer les filtres
    applyFilters() {
      // Synchroniser avec les filtres desktop
      const searchInput = document.getElementById('search-input');
      const brandFilter = document.getElementById('brand-filter');
      const typeFilter = document.getElementById('type-filter');

      if (searchInput) searchInput.value = this.currentFilters.search;
      if (brandFilter) brandFilter.value = this.currentFilters.brand;
      if (typeFilter) typeFilter.value = this.currentFilters.type;

      // Déclencher l'événement pour app.js
      [searchInput, brandFilter, typeFilter].forEach(el => {
        if (el) el.dispatchEvent(new Event('change', { bubbles: true }));
      });

      // Mettre à jour le compteur
      this.updateResultCount();
    },

    // Réinitialiser les filtres
    resetFilters() {
      this.currentFilters = { search: '', brand: 'all', type: 'all' };
      
      // Réinitialiser les chips du drawer
      document.querySelectorAll('.drawer-chip').forEach(chip => {
        chip.classList.remove('is-active');
        if (chip.dataset.value === 'all') {
          chip.classList.add('is-active');
        }
      });

      // Réinitialiser la recherche
      const searchInput = document.getElementById('mobile-search-input');
      if (searchInput) {
        searchInput.value = '';
        document.getElementById('clear-search')?.classList.add('hidden');
      }

      this.updateChipsFromDrawer();
      this.applyFilters();
    },

    // Mettre à jour le compteur de résultats
    updateResultCount() {
      const visibleCount = document.getElementById('visible-results')?.textContent || '0';
      const applyBtn = document.getElementById('apply-filters');
      if (applyBtn) {
        applyBtn.textContent = `Appliquer (${visibleCount})`;
      }
    }
  };

  // Exposer globalement
  window.MinSpMobileFilters = MobileFilters;

  // Initialiser au chargement
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => MobileFilters.init());
  } else {
    MobileFilters.init();
  }

  // Ré-initialiser au redimensionnement (desktop <-> mobile)
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      MobileFilters.init();
    }, 250);
  });
})();
