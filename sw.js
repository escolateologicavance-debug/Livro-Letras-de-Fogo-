const CACHE_NAME = 'letras-de-fogo-v1';
const assetsToCache = [
'index.html',
'manifest.json',
'assets/images/capa.jpg',
'assets/audio/hatikvah.mp3',
'assets/pdfs/introducao.pdf',
'assets/pdfs/capitulo1.pdf'
];

// Instalação do Service Worker e cache dos arquivos para uso offline
self.addEventListener('install', event => {
event.waitUntil(
caches.open(CACHE_NAME)
.then(cache => {
return cache.addAll(assetsToCache);
})
.then(() => self.skipWaiting())
);
});

// Ativação e limpeza de caches antigos
self.addEventListener('activate', event => {
event.waitUntil(
caches.keys().then(cacheNames => {
return Promise.all(
cacheNames.map(cache => {
if (cache !== CACHE_NAME) {
return caches.delete(cache);
}
})
);
}).then(() => self.clients.claim())
);
});

// Intercepta as requisições de rede para servir os arquivos do cache (modo offline)
self.addEventListener('fetch', event => {
event.respondWith(
caches.match(event.request)
.then(response => {
return response || fetch(event.request);
})
);
});