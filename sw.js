const CACHE_NAME = 'field-notes-study-tools-v17';
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
  './flashcard-study.css',
  './study-resource-data.js',
  './study-resources.js',
  './study-resources.css',
  './change-finding.html',
  './change-finding.css',
  './change-finding-data.js',
  './change-finding.js',
  './quick-study.html',
  './quick-study.css',
  './quick-study-data.js',
  './quick-study.js',
  './what-first.html',
  './what-first.css',
  './what-first-data.js',
  './what-first.js',
  './vendor/Sortable.min.js',
  './vendor/Sortable-LICENSE.txt',
  './study-plan.html',
  './study-plan.css',
  './study-plan-engine.js',
  './study-plan.js'
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
