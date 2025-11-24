const CACHE_NAME = 'gls-v1';
const urlsToCache = [
  '/',
  '/icon-192.png',
  '/icon-512.png'
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
```

**Estructura de archivos final:**
```
/
├── index.html (tu archivo HTML)
├── icon-192.png (imagen 1 o 2)
├── icon-512.png (imagen 1 o 2, tamaño 512x512)
├── manifest.json
└── service-worker.js
