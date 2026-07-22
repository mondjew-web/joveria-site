// Service worker minimal pour la CRM JOVERIA.
// Objectif : rendre l'app installable (bureau Mac / écran d'accueil iPhone) et utilisable
// hors-ligne pour la coquille de l'app. Ne touche jamais aux appels réseau externes
// (Airtable, Cloudflare) : ceux-ci passent toujours directement par le réseau.

const CACHE_NAME = 'joveria-crm-v1';
const APP_SHELL = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './icon-180.png',
  './icon-32.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)).catch(()=>{})
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const req = event.request;

  // On ne gère que les requêtes GET de même origine (la coquille de l'app).
  // Tout le reste (API Airtable, Worker Cloudflare, Google Fonts, POST...) part directement au réseau.
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) {
    return;
  }

  event.respondWith(
    caches.match(req).then((cached) => {
      const network = fetch(req).then((res) => {
        if (res && res.ok) {
          const copy = res.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(req, copy));
        }
        return res;
      }).catch(() => cached);
      return cached || network;
    })
  );
});
