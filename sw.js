/**
 * MinSp Service Worker
 * Stratégie de cache pour contrer la lenteur de Render Cold Start
 * Version: 1.0.0
 */

const CACHE_NAME = 'minsp-v1';
const STATIC_CACHE = 'minsp-static-v1';
const DATA_CACHE = 'minsp-data-v1';
const IMAGE_CACHE = 'minsp-images-v1';

// Ressources critiques à cacher immédiatement
const CRITICAL_ASSETS = [
  '/',
  '/index.html',
  '/mice.html',
  '/keyboards.html',
  '/pc-components.html',
  '/ai-recommend.html',
  '/styles.css',
  '/app.js',
  '/i18n.js',
  '/theme-toggle.js',
  '/data/mice.js',
  '/data/keyboards.js',
  '/data/pc-components.js',
  '/favicon.ico',
  '/favicon.png'
];

// Installation - Pré-cacher les ressources critiques
self.addEventListener('install', (event) => {
  console.log('[SW] Installing...');
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('[SW] Caching critical assets');
        return cache.addAll(CRITICAL_ASSETS).catch(err => {
          console.warn('[SW] Some assets failed to cache:', err);
        });
      })
      .then(() => self.skipWaiting())
  );
});

// Activation - Nettoyer les anciens caches
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== STATIC_CACHE && 
              cacheName !== DATA_CACHE && 
              cacheName !== IMAGE_CACHE) {
            console.log('[SW] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Stratégies de fetch
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Ignorer les requêtes non GET
  if (request.method !== 'GET') {
    return;
  }
  
  // Ignorer les requêtes chrome-extension et autres
  if (!url.protocol.startsWith('http')) {
    return;
  }
  
  // 1. Données JSON et API - Stale-while-revalidate
  if (url.pathname.endsWith('.json') || 
      url.pathname.includes('/api/') ||
      url.pathname.startsWith('/data/')) {
    event.respondWith(staleWhileRevalidate(request, DATA_CACHE));
    return;
  }
  
  // 2. Images - Cache First avec expiration
  if (request.destination === 'image' || 
      url.pathname.match(/\.(jpg|jpeg|png|gif|webp|svg|ico)$/i)) {
    event.respondWith(cacheFirstWithExpiration(request, IMAGE_CACHE, 30));
    return;
  }
  
  // 3. Fonts - Cache First
  if (request.destination === 'font' || 
      url.hostname.includes('fonts.googleapis') ||
      url.hostname.includes('fonts.gstatic')) {
    event.respondWith(cacheFirst(request, STATIC_CACHE));
    return;
  }
  
  // 4. CSS et JS - Stale-while-revalidate
  if (request.destination === 'style' || 
      request.destination === 'script' ||
      url.pathname.match(/\.(css|js)$/i)) {
    event.respondWith(staleWhileRevalidate(request, STATIC_CACHE));
    return;
  }
  
  // 5. Pages HTML - Network First avec fallback
  if (request.destination === 'document' || 
      url.pathname.endsWith('.html')) {
    event.respondWith(networkFirstWithOfflineFallback(request));
    return;
  }
  
  // 6. Default - Network with cache fallback
  event.respondWith(networkWithCacheFallback(request));
});

// Stratégie: Cache First
async function cacheFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  
  if (cached) {
    return cached;
  }
  
  try {
    const response = await fetch(request);
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    return new Response('Offline', { status: 503, statusText: 'Service Unavailable' });
  }
}

// Stratégie: Stale While Revalidate
async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  
  // Fetch en arrière-plan pour mettre à jour le cache
  const fetchPromise = fetch(request).then((response) => {
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  }).catch((error) => {
    console.warn('[SW] Fetch failed:', error);
    return null;
  });
  
  // Retourner immédiatement si cache dispo, sinon attendre le fetch
  if (cached) {
    return cached;
  }
  
  const response = await fetchPromise;
  if (response) {
    return response;
  }
  
  return new Response('Offline', { status: 503 });
}

// Stratégie: Network First avec offline fallback
async function networkFirstWithOfflineFallback(request) {
  const cache = await caches.open(STATIC_CACHE);
  
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
      return networkResponse;
    }
  } catch (error) {
    console.warn('[SW] Network failed, trying cache:', error);
  }
  
  const cached = await cache.match(request);
  if (cached) {
    return cached;
  }
  
  // Fallback vers index.html pour les pages
  const fallback = await cache.match('/index.html');
  if (fallback) {
    return fallback;
  }
  
  return new Response('Page not cached', { 
    status: 503, 
    statusText: 'Service Unavailable',
    headers: { 'Content-Type': 'text/plain' }
  });
}

// Stratégie: Network with Cache Fallback
async function networkWithCacheFallback(request) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(STATIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    const cache = await caches.open(STATIC_CACHE);
    const cached = await cache.match(request);
    if (cached) {
      return cached;
    }
    throw error;
  }
}

// Cache First avec expiration (pour les images)
async function cacheFirstWithExpiration(request, cacheName, days) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  
  if (cached) {
    // Vérifier si pas expiré
    const cachedDate = cached.headers.get('sw-cached-date');
    if (cachedDate) {
      const age = (Date.now() - new Date(cachedDate).getTime()) / (1000 * 60 * 60 * 24);
      if (age < days) {
        return cached;
      }
    } else {
      return cached;
    }
  }
  
  try {
    const response = await fetch(request);
    if (response.ok) {
      // Ajouter date de cache
      const headers = new Headers(response.headers);
      headers.set('sw-cached-date', new Date().toISOString());
      
      const cachedResponse = new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: headers
      });
      
      cache.put(request, cachedResponse);
    }
    return response;
  } catch (error) {
    if (cached) {
      return cached;
    }
    return new Response('Image unavailable', { status: 503 });
  }
}

// Message handler pour communication avec la page
self.addEventListener('message', (event) => {
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
  }
  
  if (event.data === 'getCacheStats') {
    event.waitUntil(
      caches.keys().then(async (cacheNames) => {
        const stats = {};
        for (const name of cacheNames) {
          const cache = await caches.open(name);
          const keys = await cache.keys();
          stats[name] = keys.length;
        }
        event.ports[0].postMessage(stats);
      })
    );
  }
  
  if (event.data === 'clearCache') {
    event.waitUntil(
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((name) => caches.delete(name))
        );
      }).then(() => {
        event.ports[0].postMessage({ cleared: true });
      })
    );
  }
});

// Sync background pour les requêtes différées (reviews, etc)
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-reviews') {
    event.waitUntil(syncPendingReviews());
  }
});

async function syncPendingReviews() {
  // Récupérer les reviews en attente dans IndexedDB et les envoyer
  console.log('[SW] Syncing pending reviews...');
}

// Push notifications (pour futur usage)
self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json();
    event.waitUntil(
      self.registration.showNotification(data.title, {
        body: data.body,
        icon: '/favicon.png',
        badge: '/favicon.png'
      })
    );
  }
});
