import { CacheFirst, StaleWhileRevalidate } from 'workbox-strategies';
import { registerRoute } from 'workbox-routing';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';
import { ExpirationPlugin } from 'workbox-expiration';
import { precacheAndRoute } from 'workbox-precaching/precacheAndRoute';

precacheAndRoute(self.__WB_MANIFEST);

const pageCache = new StaleWhileRevalidate({
  cacheName: 'page-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60, 
    }),
  ],
});

registerRoute(({ request }) => request.mode === 'navigate', ({ event }) => {
  return pageCache.handle({ event });
});


registerRoute(({ request }) => {

  return /assets\//.test(request.url);
}, new CacheFirst());


offlineFallback({
  pageFallback: '/index.html',
  imageFallback: '/src/images/logo.png',
});
