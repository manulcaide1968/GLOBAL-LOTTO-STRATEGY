const CACHE_NAME = 'lotto-pro-cache-v2'; // ¡IMPORTANTE! Cambia el nombre de la caché para forzar la actualización

// Lista de archivos que queremos cachear
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  // Tailwind CSS CDN (se mantiene):
  'https://cdn.tailwindcss.com', 
  // Archivos de iconos: RUTA AJUSTADA A LA RAÍZ (sin /icons/)
  '/icon-72.png',
  '/icon-96.png',
  '/icon-128.png',
  '/icon-144.png',
  '/icon-152.png',
  '/icon-192.png',
  '/icon-384.png',
  '/icon-512.png'
];

// 1. Instalar y Cachear Archivos
self.addEventListener('install', event => {
  event.waitUntil(
    // Abrir la nueva caché (v2)
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache v2');
        // Esto fallará si las rutas no son correctas.
        return cache.addAll(urlsToCache); 
      })
  );
});

// 2. Servir Archivos desde la Caché (Estrategia Cache-First)
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});

// 3. Limpiar Caché Vieja (v1)
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME]; // Ahora solo permite 'lotto-pro-cache-v2'
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            // Elimina los cachés antiguos (como 'lotto-pro-cache-v1')
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
