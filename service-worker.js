const CACHE_NAME = 'gls-v1';
const urlsToCache = [
  '/GLOBAL-LOTTO-STRATEGY/',
  '/GLOBAL-LOTTO-STRATEGY/index.html',
  '/GLOBAL-LOTTO-STRATEGY/manifest.json',
  '/GLOBAL-LOTTO-STRATEGY/icon-192.png',
  '/GLOBAL-LOTTO-STRATEGY/icon-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
