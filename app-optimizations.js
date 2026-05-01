/**
 * MinSp Performance Optimizations
 * Optimisations pour éviter les manipulations DOM coûteuses
 * Version: 1.0.0
 */
(function() {
  'use strict';

  // ==========================================
  // 1. VIRTUAL SCROLLING - Pour les grandes listes
  // ==========================================
  const VirtualScroller = {
    container: null,
    items: [],
    itemHeight: 320, // Hauteur estimée d'une carte
    viewportHeight: 0,
    scrollTop: 0,
    renderBuffer: 5, // Nombre d'éléments à rendre en dehors du viewport
    renderedItems: new Map(), // Cache des éléments DOM
    
    init(containerId, items) {
      this.container = document.getElementById(containerId);
      if (!this.container) return this;
      
      this.items = items || [];
      this.viewportHeight = window.innerHeight;
      this.container.style.position = 'relative';
      
      // Créer le spacer pour la hauteur totale
      this.updateSpacer();
      
      // Écouter le scroll
      this.container.addEventListener('scroll', this.onScroll.bind(this), { passive: true });
      window.addEventListener('resize', this.onResize.bind(this), { passive: true });
      
      // Rendu initial
      this.render();
      
      return this;
    },
    
    updateSpacer() {
      let spacer = this.container.querySelector('.virtual-spacer');
      if (!spacer) {
        spacer = document.createElement('div');
        spacer.className = 'virtual-spacer';
        spacer.style.width = '100%';
        spacer.style.visibility = 'hidden';
        this.container.appendChild(spacer);
      }
      spacer.style.height = (this.items.length * this.itemHeight) + 'px';
    },
    
    onScroll() {
      this.scrollTop = this.container.scrollTop;
      requestAnimationFrame(() => this.render());
    },
    
    onResize() {
      this.viewportHeight = window.innerHeight;
      this.render();
    },
    
    getVisibleRange() {
      const start = Math.floor(this.scrollTop / this.itemHeight);
      const visibleCount = Math.ceil(this.viewportHeight / this.itemHeight);
      const end = start + visibleCount;
      
      return {
        start: Math.max(0, start - this.renderBuffer),
        end: Math.min(this.items.length, end + this.renderBuffer)
      };
    },
    
    render() {
      if (!this.container) return;
      
      const range = this.getVisibleRange();
      const visibleIds = new Set();
      
      // Créer/mettre à jour les éléments visibles
      for (let i = range.start; i < range.end; i++) {
        const item = this.items[i];
        if (!item) continue;
        
        visibleIds.add(item.id);
        
        let el = this.renderedItems.get(item.id);
        if (!el) {
          el = this.createItem(item, i);
          this.container.appendChild(el);
          this.renderedItems.set(item.id, el);
        }
        
        // Positionner
        el.style.position = 'absolute';
        el.style.top = (i * this.itemHeight) + 'px';
        el.style.left = '0';
        el.style.right = '0';
        el.style.display = '';
      }
      
      // Cacher les éléments non visibles
      this.renderedItems.forEach((el, id) => {
        if (!visibleIds.has(id)) {
          el.style.display = 'none';
        }
      });
    },
    
    createItem(item, index) {
      // Utiliser la fonction de génération HTML existante
      const div = document.createElement('div');
      div.innerHTML = window.HTMLGenerator?.card?.(item, index, false) || '';
      return div.firstElementChild || div;
    },
    
    updateItems(newItems) {
      this.items = newItems || [];
      this.updateSpacer();
      this.render();
    },
    
    destroy() {
      this.container?.removeEventListener('scroll', this.onScroll);
      window.removeEventListener('resize', this.onResize);
      this.renderedItems.clear();
    }
  };

  // ==========================================
  // 2. DOM DELEGATION - Gestionnaire d'événements unifié
  // ==========================================
  const DOMDelegate = {
    listeners: new Map(),
    
    init(root = document) {
      this.root = root;
      
      // Délégation des événements courants
      this.delegate('click', '.mouse-card', this.handleCardClick.bind(this));
      this.delegate('click', '.card-fav-btn', this.handleFavClick.bind(this));
      this.delegate('click', '.load-more-button', this.handleLoadMore.bind(this));
      this.delegate('click', '#fav-btn', this.handleDetailFav.bind(this));
      this.delegate('click', '#reset-filters', this.handleReset.bind(this));
      
      return this;
    },
    
    delegate(eventType, selector, handler) {
      if (!this.listeners.has(eventType)) {
        this.listeners.set(eventType, new Map());
        this.root.addEventListener(eventType, this.createDelegatedHandler(eventType));
      }
      
      this.listeners.get(eventType).set(selector, handler);
    },
    
    createDelegatedHandler(eventType) {
      return (event) => {
        const selectors = this.listeners.get(eventType);
        if (!selectors) return;
        
        selectors.forEach((handler, selector) => {
          const target = event.target.closest(selector);
          if (target && !event.target.closest('[data-prevent-delegate]')) {
            handler(event, target);
          }
        });
      };
    },
    
    // Handlers
    handleCardClick(event, card) {
      const id = card.dataset.id;
      if (id && window.selectItem) {
        event.preventDefault();
        window.selectItem(id);
      }
    },
    
    handleFavClick(event, btn) {
      event.stopPropagation();
      const id = btn.dataset.favId;
      if (id && window.Favorites) {
        const isFav = window.Favorites.toggleFavorite(id);
        btn.textContent = isFav ? '★' : '☆';
        btn.setAttribute('aria-label', isFav ? 'Retirer des favoris' : 'Ajouter aux favoris');
        btn.classList.toggle('is-fav', isFav);
      }
    },
    
    handleLoadMore(event, btn) {
      event.preventDefault();
      if (window.loadMoreItems) {
        window.loadMoreItems();
      }
    },
    
    handleDetailFav(event, btn) {
      const id = btn.dataset.id;
      if (id && window.Favorites) {
        const isFav = window.Favorites.toggleFavorite(id);
        btn.classList.toggle('is-fav', isFav);
        btn.textContent = isFav ? '★' : '☆';
        
        // Mettre à jour la carte correspondante
        document.querySelectorAll(`[data-fav-id="${id}"]`).forEach(el => {
          el.textContent = isFav ? '★' : '☆';
          el.classList.toggle('is-fav', isFav);
        });
      }
    },
    
    handleReset(event) {
      event.preventDefault();
      const searchInput = document.getElementById('search-input');
      const brandFilter = document.getElementById('brand-filter');
      const typeFilter = document.getElementById('type-filter');
      
      if (searchInput) searchInput.value = '';
      if (brandFilter) brandFilter.value = 'all';
      if (typeFilter) typeFilter.value = 'all';
      
      if (window.updateFilters) {
        window.updateFilters();
      }
    }
  };

  // ==========================================
  // 3. JSON-LD STRUCTURED DATA - Injection dynamique
  // ==========================================
  const StructuredData = {
    // Injecter ItemPage pour une fiche produit
    injectProductPage(mouse) {
      if (!mouse) return;
      
      const data = {
        '@context': 'https://schema.org',
        '@type': 'ItemPage',
        name: `${mouse.brand} ${mouse.name}`,
        description: mouse.summary || `Fiche produit de ${mouse.name}`,
        url: `https://minsp.onrender.com/?product=${encodeURIComponent(mouse.id)}`,
        mainEntity: {
          '@type': 'Product',
          name: `${mouse.brand} ${mouse.name}`,
          brand: {
            '@type': 'Brand',
            name: mouse.brand
          },
          description: mouse.summary,
          image: mouse.image?.url || mouse.image,
          offers: {
            '@type': 'AggregateOffer',
            availability: 'https://schema.org/InStock'
          }
        },
        breadcrumb: {
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Accueil',
              item: 'https://minsp.onrender.com/'
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: mouse.category === 'keyboard' ? 'Claviers' : 
                    mouse.category === 'pc-component' ? 'Composants PC' : 'Souris',
              item: `https://minsp.onrender.com/${mouse.category === 'keyboard' ? 'keyboards' : mouse.category === 'pc-component' ? 'pc-components' : 'mice'}.html`
            },
            {
              '@type': 'ListItem',
              position: 3,
              name: `${mouse.brand} ${mouse.name}`,
              item: `https://minsp.onrender.com/?product=${encodeURIComponent(mouse.id)}`
            }
          ]
        }
      };
      
      this.injectJSONLD(data, 'product-jsonld');
    },
    
    // Injecter ItemList pour une liste de produits
    injectProductList(items, listName) {
      if (!items || !items.length) return;
      
      const data = {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: listName,
        itemListElement: items.slice(0, 10).map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          item: {
            '@type': 'Product',
            name: `${item.brand} ${item.name}`,
            url: `https://minsp.onrender.com/?product=${encodeURIComponent(item.id)}`
          }
        }))
      };
      
      this.injectJSONLD(data, 'list-jsonld');
    },
    
    // Fonction utilitaire pour injecter le JSON-LD
    injectJSONLD(data, id) {
      // Supprimer l'ancien script s'il existe
      const existing = document.getElementById(id);
      if (existing) existing.remove();
      
      // Créer le nouveau script
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = id;
      script.textContent = JSON.stringify(data);
      
      document.head.appendChild(script);
    },
    
    // Supprimer les données structurées
    clear() {
      ['product-jsonld', 'list-jsonld'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.remove();
      });
    }
  };

  // ==========================================
  // 4. SERVICE WORKER REGISTRATION
  // ==========================================
  const SWManager = {
    registration: null,
    
    async register() {
      if (!('serviceWorker' in navigator)) {
        console.log('[SW] Service Worker not supported');
        return null;
      }
      
      try {
        this.registration = await navigator.serviceWorker.register('/sw.js', {
          scope: '/',
          updateViaCache: 'imports'
        });
        
        console.log('[SW] Registered successfully');
        
        // Gestion des mises à jour
        this.registration.addEventListener('updatefound', () => {
          const newWorker = this.registration.installing;
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // Nouvelle version disponible
              this.showUpdateNotification(newWorker);
            }
          });
        });
        
        return this.registration;
      } catch (error) {
        console.error('[SW] Registration failed:', error);
        return null;
      }
    },
    
    showUpdateNotification(worker) {
      // Créer une notification de mise à jour discrète
      const notification = document.createElement('div');
      notification.className = 'sw-update-notification';
      notification.innerHTML = `
        <span>Nouvelle version disponible</span>
        <button id="sw-update-btn">Mettre à jour</button>
        <button id="sw-dismiss-btn">&times;</button>
      `;
      
      document.body.appendChild(notification);
      
      document.getElementById('sw-update-btn')?.addEventListener('click', () => {
        worker.postMessage('skipWaiting');
        window.location.reload();
      });
      
      document.getElementById('sw-dismiss-btn')?.addEventListener('click', () => {
        notification.remove();
      });
    },
    
    // Statistiques de cache
    async getCacheStats() {
      if (!this.registration) return null;
      
      return new Promise((resolve) => {
        const channel = new MessageChannel();
        channel.port1.onmessage = (event) => resolve(event.data);
        
        navigator.serviceWorker.controller?.postMessage('getCacheStats', [channel.port2]);
      });
    },
    
    // Vider le cache
    async clearCache() {
      if (!this.registration) return false;
      
      return new Promise((resolve) => {
        const channel = new MessageChannel();
        channel.port1.onmessage = (event) => resolve(event.data?.cleared);
        
        navigator.serviceWorker.controller?.postMessage('clearCache', [channel.port2]);
      });
    }
  };

  // ==========================================
  // 5. REQUEST IDLE CALLBACK Polyfill
  // ==========================================
  const IdleScheduler = {
    schedule(callback, timeout = 2000) {
      if ('requestIdleCallback' in window) {
        return requestIdleCallback(callback, { timeout });
      } else {
        return setTimeout(callback, 1);
      }
    },
    
    cancel(id) {
      if ('cancelIdleCallback' in window) {
        cancelIdleCallback(id);
      } else {
        clearTimeout(id);
      }
    }
  };

  // ==========================================
  // 6. BATCHED DOM OPERATIONS
  // ==========================================
  const BatchDOM = {
    queue: [],
    scheduled: false,
    
    add(operation) {
      this.queue.push(operation);
      this.schedule();
    },
    
    schedule() {
      if (this.scheduled) return;
      this.scheduled = true;
      
      requestAnimationFrame(() => {
        this.flush();
      });
    },
    
    flush() {
      this.scheduled = false;
      
      // Exécuter toutes les opérations en une seule passe
      const operations = this.queue.splice(0, this.queue.length);
      
      // Lire d'abord tout ce qui doit être lu
      operations.forEach(op => {
        if (op.read) op.read();
      });
      
      // Puis écrire
      operations.forEach(op => {
        if (op.write) op.write();
      });
    }
  };

  // ==========================================
  // INITIALISATION
  // ==========================================
  function init() {
    // 1. Enregistrer le Service Worker
    if (document.readyState === 'complete') {
      SWManager.register();
    } else {
      window.addEventListener('load', () => SWManager.register());
    }
    
    // 2. Initialiser la délégation d'événements
    DOMDelegate.init();
    
    // 3. Exposer les optimisations globalement
    window.MinSpOptimizations = {
      VirtualScroller,
      DOMDelegate,
      StructuredData,
      SWManager,
      IdleScheduler,
      BatchDOM
    };
    
    console.log('[MinSp] Optimizations loaded');
  }

  // Démarrer
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Exposer immédiatement pour utilisation
  window.MinSpOptimizations = window.MinSpOptimizations || {};
  window.MinSpOptimizations.StructuredData = StructuredData;
  window.MinSpOptimizations.SWManager = SWManager;
})();
