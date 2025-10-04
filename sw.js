const CACHE = 'zeitreise-tribschen-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './orte.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './Bilder/zeppelin_tribschen.jpg',
  './Bilder/platz1.jpg'
  // Tipp: Füge hier weitere Bilder/Audios hinzu, z. B. './Bilder/platz2.jpg', './Audio/platz1.mp3'
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    )
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  e.respondWith(
    fetch(req).then((res) => {
      const copy = res.clone();
      caches.open(CACHE).then((c) => c.put(req, copy));
      return res;
    }).catch(() => caches.match(req))
  );
});
