const CACHE_NAME = 'field-notes-study-tools-v33';
const assets = [
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
