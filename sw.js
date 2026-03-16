const CACHE_NAME = 'relevapp-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './icono-192.png',
  './icono-512.png'
  // Si tienes un archivo CSS o un JS principal, agrégalos aquí también, ej: './style.css'
];

// Instalar el Service Worker y guardar en caché
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Interceptar las peticiones para que funcione offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});