const SHELL_CACHE = 'al-quran-shell-v8';
const API_CACHE = 'al-quran-api-v1';
const SHELL = [
  '/',
  '/index.html',
  '/reader.html',
  '/video.html',
  '/admin.html',
  '/manifest.json',
  '/sw.js',
  '/icons/site-icon.svg',
  '/assets/css/variables.css',
  '/assets/css/base.css',
  '/assets/css/layout.css',
  '/assets/css/components.css',
  '/assets/css/home.css',
  '/assets/css/reader.css',
  '/assets/css/admin.css',
  '/assets/css/video.css',
  '/assets/js/app.js',
  '/assets/js/api.js',
  '/assets/js/theme.js',
  '/assets/js/i18n.js',
  '/assets/js/search.js',
  '/assets/js/audio.js',
  '/assets/js/storage.js',
  '/assets/js/home.js',
  '/assets/js/reader.js',
  '/assets/js/admin.js',
  '/assets/js/video.js',
  '/assets/icons/nq-icons.js',
  '/icons/site-icon-192.png',
  '/icons/site-icon-512.png'
];
const API_HOSTS = new Set(['api.alquran.cloud']);

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(SHELL_CACHE)
      .then(cache => cache.addAll(SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys
          .filter(key => ![SHELL_CACHE, API_CACHE].includes(key))
          .map(key => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);

  if (API_HOSTS.has(url.hostname)) {
    event.respondWith(networkFirst(req, API_CACHE));
    return;
  }

  if (url.origin !== self.location.origin) return;

  if (req.mode === 'navigate' || (req.headers.get('accept') || '').includes('text/html')) {
    event.respondWith(networkFirst(req, SHELL_CACHE, '/index.html'));
    return;
  }

  event.respondWith(cacheFirst(req, SHELL_CACHE));
});

async function networkFirst(req, cacheName, fallbackUrl = null) {
  try {
    const resp = await fetch(req);
    await cacheResponse(cacheName, req, resp);
    return resp;
  } catch (e) {
    const cached = await caches.match(req);
    if (cached) return cached;
    if (fallbackUrl) return caches.match(fallbackUrl);
    return Response.error();
  }
}

async function cacheFirst(req, cacheName) {
  const cached = await caches.match(req);
  if (cached) return cached;
  try {
    const resp = await fetch(req);
    await cacheResponse(cacheName, req, resp);
    return resp;
  } catch (e) {
    return Response.error();
  }
}

async function cacheResponse(cacheName, req, resp) {
  if (!resp || !resp.ok) return;
  const cache = await caches.open(cacheName);
  await cache.put(req, resp.clone());
}


