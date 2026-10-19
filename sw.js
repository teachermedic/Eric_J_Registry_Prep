const CACHE_NAME = 'field-notes-study-tools-v44';
const assets = [
  './instructor-access.html',
  './instructor-access.js',
  './instructor-access-setup.js',
  './instructor-access-config.js',
  './instructor-access.css',
  './question-workshop.html',
  './question-workshop.css',
  './question-workshop.js',
  './question-author-engine.js',
  './question-modules.js',
  './authored-questions.js',
  './authored-question-loader.js',
  './instructor-music.js',
  './audio/bards-tale-loop.mp3',
  './hearthlands.html',
  './hearthlands.css',
  './hearthlands-engine.js',
  './assets/hearthlands/island-base.webp',
  './assets/hearthlands/building-atlas.webp',
  './hearthlands.js',
  './hearthlands-motion.js',
  './hearthlands-live.js',
  './anatomy-explorer.html',
  './heart-explorer.html',
  './heart-explorer.css',
  './heart-explorer.js',
  './connection-trails.html',
  './cellular-energy-ischemic-stroke.html',
  './mast-cells-anaphylaxis.html',
  './opioid-receptors-respiratory-depression.html',
  './glucose-hypoglycemia-brain.html',
  './hemoglobin-carbon-monoxide.html',
  './pulmonary-circulation-embolism.html',
  './alveolar-cells-surfactant-ards.html',
  './mitochondria-heart-failure.html',
  './endoplasmic-reticulum-heart-injury.html',
  './lysosomes-pancreatitis.html',
  './cell-membrane-rhabdomyolysis.html',
  './cytoplasm-sepsis.html',
  './golgi-cystic-fibrosis.html',
  './airway-resistance-asthma.html',
  './insulin-ketoacidosis.html',
  './connection-trails.css',
  './connection-trails.js',
  './hearth-theme.css',
  './hearth-emblem.svg',
  './hearth-scene.svg',
  './hearth-grain.svg',
  './home-dashboard.css',
  './home-dashboard.js',
  './study-streak.js',
  './study-streak.css',
  './progress-backup.js',
  './',
  './index.html',
  './style.css',
  './script.js',
  './study-tools.js',
  './study-badges.js',
  './study-badges.css',
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
  './study-plan.js',
  './instructor-corner.html',
  './instructor-corner.css',
  './instructor-corner.js',
  './instructor-boot.js',
  './instructor-corner-engine.js',
  './INSTRUCTOR-CORNER-NOTICE.txt'
];

// Install Service Worker
self.addEventListener('install', evt => {
  evt.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(assets)).then(() => self.skipWaiting())
  );
});

// Fetch Assets
self.addEventListener('fetch', evt => {
  // Published question additions must update without requiring a cache-version edit.
  const url = new URL(evt.request.url);
  if (evt.request.method === 'GET' && url.origin === self.location.origin && (url.pathname.endsWith('/authored-questions.js') || url.pathname.endsWith('/instructor-access-config.js'))) {
    evt.respondWith((async () => {
      try {
        const response = await fetch(new Request(evt.request, {cache:'no-cache'}));
        if (response.ok) { try { const cache = await caches.open(CACHE_NAME); await cache.put(evt.request, response.clone()); } catch { /* Fresh questions still work when caching is unavailable. */ } return response; }
        return (await caches.match(evt.request)) || response;
      } catch { return (await caches.match(evt.request)) || Response.error(); }
    })());
    return;
  }
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
