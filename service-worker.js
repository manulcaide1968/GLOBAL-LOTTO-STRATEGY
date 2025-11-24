const CACHE_NAME = 'lotto-pro-cache-v1';

// Lista de archivos que queremos cachear
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  // Asegúrate de que los iconos y scripts externos estén en caché
  // Tailwind CSS CDN:
  'https://cdn.tailwindcss.com', 
  // Archivos de iconos:
  '/icons/icon-72.png',
  '/icons/icon-96.png',
  '/icons/icon-128.png',
  '/icons/icon-144.png',
  '/icons/icon-152.png',
  '/icons/icon-192.png',
  '/icons/icon-384.png',
  '/icons/icon-512.png'
];

// 1. Instalar y Cachear Archivos
self.addEventListener('install', event => {
  // Realiza la instalación y cachea los archivos estáticos
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// 2. Servir Archivos desde la Caché (Estrategia Cache-First)
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Devuelve el recurso en caché si existe
        if (response) {
          return response;
        }
        // Si no está en caché, continúa con la red
        return fetch(event.request);
      })
  );
});

// 3. Limpiar Caché Vieja
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            // Elimina los cachés que no están en la lista blanca
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});