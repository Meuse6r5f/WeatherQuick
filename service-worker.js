if ('serviceWorker' in navigator) {
   navigator.serviceWorker.register('/service-worker.js')
      .then((registration) => {
         console.log('Service Worker registered with scope:', registration.scope);
      })
      .catch((error) => {
         console.error('Service Worker registration failed:', error);
      });

   // Ensure the new service worker takes control immediately after it's installed.
   navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (navigator.serviceWorker.controller) {
         console.log('New service worker activated.');
      }
   });
}

self.addEventListener('install', (event) => {
   event.waitUntil(
      caches.open('weatherquick-cache').then((cache) => {
         return cache.addAll([
            '/',
            '/index.html',
            '/manifest.json',
            '/logo.png',
            '/style.css'
            // Add other assets you want to cache
         ]);
      })
   );
});

self.addEventListener('fetch', (event) => {
   event.respondWith(
      caches.match(event.request).then((response) => {
         if (response) {
            return response;
         }
         console.log('Fetching from network:', event.request.url);
         return fetch(event.request).catch(() => {
            console.log('You\'re offline!);
            return new Response('You\'re offline!');
         });
      })
   );
});
