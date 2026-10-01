const CACHE_NAME = 'field-notes-study-tools-v6';
const assets = [
  './',
  './index.html',
  './style.css',
  './script.js',
  './study-tools.js',
  './flashcards.html',
  './flashcard_data.js',
  './terminology-decks.html',
  './terminology-data.js',
  './card-catalog.js',
  './flashcard-study.js',
  './flashcard-study.css'
];

// Install Service Worker
self.addEventListener('install', evt => {
  evt.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(assets)).then(() => self.skipWaiting())
  );
});

// Fetch Assets
self.addEventListener('fetch', evt => {
  evt.respondWith(
    caches.match(evt.request).then(rec => {
      return rec || fetch(evt.request);
    })
  );
});


self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(
    keys.filter(key => key.startsWith('field-notes-') && key !== CACHE_NAME).map(key => caches.delete(key))
  )).then(() => self.clients.claim()));
});
