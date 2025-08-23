const CACHE_NAME = 'ai-gallery-v1';
const urlsToCache = [
    '/index.html',
    '/styles.css',
    '/gallery.js',
    '/config.js',
    '/demo.js',
    '/manifest.json',
    '/preview.html',
    // External fonts and CDNs may be blocked by CORS when caching; we'll try but ignore failures
    'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css'
];

self.addEventListener('install', event => {
    event.waitUntil((async () => {
        const cache = await caches.open(CACHE_NAME);
        // Try to cache each URL individually and tolerate failures
        const results = await Promise.allSettled(urlsToCache.map(async (url) => {
            try {
                // Prefer cache.add for same-origin resources
                if (new URL(url, location.href).origin === location.origin) {
                    await cache.add(url);
                    return { url, status: 'cached' };
                }

                // For cross-origin assets, try fetch with no-cors to obtain an opaque response
                const response = await fetch(url, { mode: 'no-cors' });
                if (response) {
                    try {
                        await cache.put(url, response);
                        return { url, status: 'cached-opaque' };
                    } catch (putErr) {
                        // Some responses cannot be put in cache; ignore
                        console.warn('SW: could not cache (put) ', url, putErr);
                        return { url, status: 'put-failed', error: putErr };
                    }
                }
            } catch (err) {
                console.warn('SW: failed to cache', url, err);
                return { url, status: 'failed', error: err };
            }
        }));

        // Optional: log summary for debugging
        const cached = results.filter(r => r.status === 'fulfilled' && r.value && (r.value.status === 'cached' || r.value.status === 'cached-opaque'));
        console.log('SW: cache install attempt finished - successes:', cached.length, 'of', urlsToCache.length);
    })());
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Cache hit - return response
                if (response) {
                    return response;
                }
                return fetch(event.request);
            }
        )
    );
});
