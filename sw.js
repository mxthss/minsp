/**
 * MinSp Service Worker
 * Stratégies de cache avancées pour contrer la lenteur de Render Cold Start
 * Version: 2.0.0
 */

const CACHE_VERSION = 'v2';
const STATIC_CACHE = `minsp-static-${CACHE_VERSION}`;
const DATA_CACHE = `minsp-data-${CACHE_VERSION}`;
const IMAGE_CACHE = `minsp-images-${CACHE_VERSION}`;
const PDF_CACHE = `minsp-pdf-${CACHE_VERSION}`;

// Timeout pour les requêtes réseau (ms)
const NETWORK_TIMEOUT = 8000;

// Ressources critiques à cacher immédiatement
const CRITICAL_ASSETS = [
  '/',
  '/index.html',
  '/mice.html',
  '/keyboards.html',
  '/pc-components.html',
  '/ai-recommend.html',
  '/ai-keyboards.html',
  '/ai-pc-components.html',
  '/ai-landing.html',
  '/login.html',
  '/styles.css',
  '/critical-ai-recommend.css',
  '/wcag-colors.css',
  '/app.js',
  '/i18n.js',
  '/theme-toggle.js',
  '/nav-header.js',
  '/app-optimizations.js',
  '/data/mice.js',
  '/data/keyboards.js',
  '/data/pc-components.js',
  '/ai-keyboard-engine.js',
  '/ai-pc-components-engine.js',
  '/favicon.ico',
  '/favicon.png'
];

// Requêtes sensibles qui ne doivent JAMAIS être cachées
const NO_CACHE_PATHS = [
  '/api/recommend',
  '/api/recommend/keyboards',
  '/api/recommend/pc-components',
  '/api/health',
  '/ping'
];

// Pages offline fallback HTML
const OFFLINE_PAGE = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>MinSp - Offline</title>
  <style>
    body { font-family: Inter, system-ui, sans-serif; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; background: #0f172a; color: #e2e8f0; }
    .offline-card { text-align: center; padding: 2rem; }
    h1 { font-size: 2rem; margin-bottom: 0.5rem; }
    p { color: #94a3b8; margin-bottom: 1.5rem; }
    button { padding: 12px 24px; border-radius: 12px; border: 1px solid rgba(56,189,248,0.4); background: rgba(56,189,248,0.1); color: #e2e8f0; font-size: 1rem; cursor: pointer; }
    button:hover { background: rgba(56,189,248,0.2); }
  </style>
</head>
<body>
  <div class="offline-card">
    <h1>📡 You're offline</h1>
    <p>Check your internet connection and try again.</p>
    <button onclick="window.location.reload()">Retry</button>
  </div>
</body>
</html>`;

// Installation - Pré-cacher les ressources critiques
self.addEventListener('install', (event) => {
  console.log('[SW v2] Installing...');
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('[SW v2] Caching critical assets');
        return cache.addAll(CRITICAL_ASSETS).catch(err => {
          console.warn('[SW v2] Some assets failed to cache:', err);
        });
      })
      .then(() => self.skipWaiting())
  );
});

// Activation - Nettoyer les anciens caches
self.addEventListener('activate', (event) => {
  console.log('[SW v2] Activating...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      const validCaches = [STATIC_CACHE, DATA_CACHE, IMAGE_CACHE, PDF_CACHE];
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!validCaches.includes(cacheName)) {
            console.log('[SW v2] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('[SW v2] Claiming clients');
      return self.clients.claim();
    })
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
  
  // Ignorer les requêtes chrome-extension et autres protocoles non HTTP
  if (!url.protocol.startsWith('http')) {
    return;
  }

  // 0. Requêtes sensibles (API POST, auth) - Network Only (jamais caché)
  if (NO_CACHE_PATHS.some(path => url.pathname.startsWith(path))) {
    event.respondWith(networkOnly(request));
    return;
  }

  // 1. PDF - Cache First
  if (url.pathname.endsWith('.pdf')) {
    event.respondWith(cacheFirst(request, PDF_CACHE));
    return;
  }
  
  // 2. Données JSON et API GET - Stale-while-revalidate
  if (url.pathname.endsWith('.json') || 
      url.pathname.startsWith('/data/')) {
    event.respondWith(staleWhileRevalidate(request, DATA_CACHE));
    return;
  }
  
  // 3. Images - Cache First avec expiration (30 jours)
  if (request.destination === 'image' || 
      url.pathname.match(/\.(jpg|jpeg|png|gif|webp|svg|ico)$/i)) {
    event.respondWith(cacheFirstWithExpiration(request, IMAGE_CACHE, 30));
    return;
  }
  
  // 4. Fonts - Cache First (longue durée)
  if (request.destination === 'font' || 
      url.hostname.includes('fonts.googleapis') ||
      url.hostname.includes('fonts.gstatic')) {
    event.respondWith(cacheFirst(request, STATIC_CACHE));
    return;
  }
  
  // 5. CSS et JS - Stale-while-revalidate
  if (request.destination === 'style' || 
      request.destination === 'script' ||
      url.pathname.match(/\.(css|js)$/i)) {
    event.respondWith(staleWhileRevalidate(request, STATIC_CACHE));
    return;
  }
  
  // 6. Pages HTML - Network First avec fallback offline personnalisé
  if (request.destination === 'document' || 
      url.pathname.endsWith('.html') ||
      url.pathname === '/') {
    event.respondWith(networkFirstWithOfflineFallback(request));
    return;
  }
  
  // 7. Default - Network with cache fallback
  event.respondWith(networkWithCacheFallback(request));
});

// ── Stratégies de Cache ──────────────────────────────────────────

// Network Only - Jamais caché (pour requêtes sensibles)
async function networkOnly(request) {
  try {
    const response = await fetchWithTimeout(request, NETWORK_TIMEOUT);
    return response;
  } catch (error) {
    console.warn('[SW v2] Network only failed:', request.url, error.message);
    return new Response(JSON.stringify({ error: 'Network unavailable' }), {
      status: 503,
      statusText: 'Service Unavailable',
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// Cache First - Retourne le cache si dispo, sinon fetch
async function cacheFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  
  if (cached) {
    console.log('[SW v2] Cache hit:', request.url);
    return cached;
  }
  
  try {
    const response = await fetchWithTimeout(request, NETWORK_TIMEOUT);
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    console.warn('[SW v2] Cache first fetch failed:', request.url, error.message);
    return new Response('Offline', { status: 503, statusText: 'Service Unavailable' });
  }
}

// Stale While Revalidate - Retourne le cache immédiatement, met à jour en arrière-plan
async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  
  // Fetch en arrière-plan pour mettre à jour le cache
  const fetchPromise = fetchWithTimeout(request, NETWORK_TIMEOUT).then((response) => {
    if (response.ok) {
      cache.put(request, response.clone());
      console.log('[SW v2] Cache updated:', request.url);
    }
    return response;
  }).catch((error) => {
    console.warn('[SW v2] SWR fetch failed:', request.url, error.message);
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
  
  return new Response('Offline', { status: 503, statusText: 'Service Unavailable' });
}

// Network First avec fallback offline personnalisé
async function networkFirstWithOfflineFallback(request) {
  const cache = await caches.open(STATIC_CACHE);
  
  try {
    const networkResponse = await fetchWithTimeout(request, NETWORK_TIMEOUT);
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
      return networkResponse;
    }
    // Si réponse non-ok (404, 500...), essayer le cache
    console.warn('[SW v2] Non-ok response:', networkResponse.status, request.url);
  } catch (error) {
    console.warn('[SW v2] Network failed, trying cache:', request.url, error.message);
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
  
  // Dernier recours : page offline personnalisée
  return new Response(OFFLINE_PAGE, {
    status: 503,
    statusText: 'Offline',
    headers: { 'Content-Type': 'text/html; charset=utf-8' }
  });
}

// Network with Cache Fallback
async function networkWithCacheFallback(request) {
  try {
    const networkResponse = await fetchWithTimeout(request, NETWORK_TIMEOUT);
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
    const cachedDate = cached.headers.get('sw-cached-date');
    if (cachedDate) {
      const age = (Date.now() - new Date(cachedDate).getTime()) / (1000 * 60 * 60 * 24);
      if (age < days) {
        return cached;
      }
      // Expiré : on supprime et re-fetch
      console.log('[SW v2] Cache expired, re-fetching:', request.url);
      cache.delete(request);
    } else {
      return cached;
    }
  }
  
  try {
    const response = await fetchWithTimeout(request, NETWORK_TIMEOUT);
    if (response.ok) {
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
    // Si réseau indisponible, retourner quand même l'ancien cache expiré
    if (cached) {
      console.log('[SW v2] Using expired cache as fallback:', request.url);
      return cached;
    }
    return new Response('Image unavailable', { status: 503, statusText: 'Service Unavailable' });
  }
}

// ── Utilitaires ──────────────────────────────────────────────────

// Fetch avec timeout pour éviter les requêtes qui traînent
function fetchWithTimeout(request, timeout) {
  return Promise.race([
    fetch(request),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error(`Timeout after ${timeout}ms`)), timeout)
    )
  ]);
}

// ── Message Handler ──────────────────────────────────────────────

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
        if (event.ports && event.ports[0]) {
          event.ports[0].postMessage(stats);
        }
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
        if (event.ports && event.ports[0]) {
          event.ports[0].postMessage({ cleared: true });
        }
      })
    );
  }

  // Nouveau : forcer la mise à jour du cache
  if (event.data === 'updateCache') {
    event.waitUntil(
      caches.open(STATIC_CACHE).then((cache) => {
        return cache.addAll(CRITICAL_ASSETS).catch(err => {
          console.warn('[SW v2] Update cache failed:', err);
        });
      }).then(() => {
        if (event.ports && event.ports[0]) {
          event.ports[0].postMessage({ updated: true });
        }
      })
    );
  }
});

// ── Background Sync ──────────────────────────────────────────────

self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-reviews') {
    event.waitUntil(syncPendingReviews());
  }
  
  // Nouveau : sync pour les recommandations en attente
  if (event.tag === 'sync-recommendations') {
    event.waitUntil(syncPendingRecommendations());
  }
});

async function syncPendingReviews() {
  console.log('[SW v2] Syncing pending reviews...');
  // TODO: Implémenter avec IndexedDB pour les reviews en attente
}

async function syncPendingRecommendations() {
  console.log('[SW v2] Syncing pending recommendations...');
  // TODO: Implémenter avec IndexedDB pour les recommandations en attente
}

// ── Push Notifications ───────────────────────────────────────────

self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json();
    event.waitUntil(
      self.registration.showNotification(data.title, {
        body: data.body,
        icon: '/favicon.png',
        badge: '/favicon.png',
        vibrate: [200, 100, 200],
        actions: data.actions || []
      })
    );
  }
});

// Gestion du clic sur notification
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    self.clients.matchAll({ type: 'window' }).then((clientList) => {
      if (clientList.length > 0) {
        return clientList[0].focus();
      }
      return self.clients.openWindow('/');
    })
  );
});
