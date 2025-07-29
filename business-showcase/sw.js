/**
 * Service Worker for BusinessPro Showcase
 * Handles caching, offline functionality, and performance optimization
 */

const CACHE_NAME = 'businesspro-v1.0.0';
const STATIC_CACHE = 'businesspro-static-v1.0.0';
const DYNAMIC_CACHE = 'businesspro-dynamic-v1.0.0';

// Files to cache immediately
const STATIC_ASSETS = [
    './',
    './index.html',
    './css/main.css',
    './css/themes.css',
    './css/animations.css',
    './js/app.js',
    './js/utils.js',
    './js/themeManager.js',
    './js/animations.js',
    './js/components/header.js',
    './js/components/hero.js',
    './js/components/services.js',
    './js/components/footer.js',
    './manifest.json'
];

// Files to cache dynamically
const DYNAMIC_CACHE_PATTERNS = [
    /^https:\/\/fonts\.googleapis\.com/,
    /^https:\/\/fonts\.gstatic\.com/,
    /^https:\/\/cdnjs\.cloudflare\.com/,
    /\.(?:png|jpg|jpeg|svg|gif|webp)$/i,
    /\.(?:css|js)$/i
];

// Cache strategies
const CACHE_STRATEGIES = {
    CACHE_FIRST: 'cache-first',
    NETWORK_FIRST: 'network-first',
    STALE_WHILE_REVALIDATE: 'stale-while-revalidate',
    NETWORK_ONLY: 'network-only',
    CACHE_ONLY: 'cache-only'
};

// Route strategies
const ROUTE_STRATEGIES = [
    {
        pattern: /\.(?:png|jpg|jpeg|svg|gif|webp|ico)$/i,
        strategy: CACHE_STRATEGIES.CACHE_FIRST,
        cacheName: STATIC_CACHE,
        expiration: {
            maxEntries: 100,
            maxAgeSeconds: 30 * 24 * 60 * 60 // 30 days
        }
    },
    {
        pattern: /\.(?:css|js)$/i,
        strategy: CACHE_STRATEGIES.STALE_WHILE_REVALIDATE,
        cacheName: STATIC_CACHE,
        expiration: {
            maxEntries: 50,
            maxAgeSeconds: 7 * 24 * 60 * 60 // 7 days
        }
    },
    {
        pattern: /^https:\/\/fonts\./,
        strategy: CACHE_STRATEGIES.CACHE_FIRST,
        cacheName: 'fonts-cache',
        expiration: {
            maxEntries: 30,
            maxAgeSeconds: 365 * 24 * 60 * 60 // 1 year
        }
    },
    {
        pattern: /\/api\//,
        strategy: CACHE_STRATEGIES.NETWORK_FIRST,
        cacheName: DYNAMIC_CACHE,
        expiration: {
            maxEntries: 50,
            maxAgeSeconds: 5 * 60 // 5 minutes
        }
    }
];

// ===== INSTALLATION =====

self.addEventListener('install', (event) => {
    console.log('🔧 Service Worker installing...');
    
    event.waitUntil(
        caches.open(STATIC_CACHE)
            .then(cache => {
                console.log('📦 Caching static assets...');
                return cache.addAll(STATIC_ASSETS);
            })
            .then(() => {
                console.log('✅ Static assets cached successfully');
                return self.skipWaiting();
            })
            .catch(error => {
                console.error('❌ Failed to cache static assets:', error);
            })
    );
});

// ===== ACTIVATION =====

self.addEventListener('activate', (event) => {
    console.log('🚀 Service Worker activating...');
    
    event.waitUntil(
        Promise.all([
            // Clean up old caches
            cleanupOldCaches(),
            // Take control of all pages
            self.clients.claim()
        ]).then(() => {
            console.log('✅ Service Worker activated');
        })
    );
});

async function cleanupOldCaches() {
    const cacheNames = await caches.keys();
    const currentCaches = [STATIC_CACHE, DYNAMIC_CACHE, 'fonts-cache'];
    
    const deletePromises = cacheNames
        .filter(cacheName => !currentCaches.includes(cacheName))
        .map(cacheName => {
            console.log('🗑️ Deleting old cache:', cacheName);
            return caches.delete(cacheName);
        });
    
    return Promise.all(deletePromises);
}

// ===== FETCH HANDLING =====

self.addEventListener('fetch', (event) => {
    // Skip non-GET requests
    if (event.request.method !== 'GET') {
        return;
    }
    
    // Skip Chrome extensions and other schemes
    if (!event.request.url.startsWith('http')) {
        return;
    }
    
    event.respondWith(handleFetch(event.request));
});

async function handleFetch(request) {
    try {
        // Find matching route strategy
        const route = findMatchingRoute(request.url);
        
        if (route) {
            return await executeStrategy(request, route);
        }
        
        // Default to network first for unmatched routes
        return await networkFirst(request, DYNAMIC_CACHE);
        
    } catch (error) {
        console.error('Fetch failed:', error);
        return await handleFetchError(request, error);
    }
}

function findMatchingRoute(url) {
    return ROUTE_STRATEGIES.find(route => route.pattern.test(url));
}

async function executeStrategy(request, route) {
    switch (route.strategy) {
        case CACHE_STRATEGIES.CACHE_FIRST:
            return await cacheFirst(request, route.cacheName);
            
        case CACHE_STRATEGIES.NETWORK_FIRST:
            return await networkFirst(request, route.cacheName);
            
        case CACHE_STRATEGIES.STALE_WHILE_REVALIDATE:
            return await staleWhileRevalidate(request, route.cacheName);
            
        case CACHE_STRATEGIES.NETWORK_ONLY:
            return await fetch(request);
            
        case CACHE_STRATEGIES.CACHE_ONLY:
            return await cacheOnly(request, route.cacheName);
            
        default:
            return await networkFirst(request, route.cacheName);
    }
}

// ===== CACHE STRATEGIES =====

async function cacheFirst(request, cacheName) {
    const cache = await caches.open(cacheName);
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
        console.log('📋 Serving from cache:', request.url);
        return cachedResponse;
    }
    
    console.log('🌐 Fetching from network:', request.url);
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
        cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
}

async function networkFirst(request, cacheName) {
    try {
        console.log('🌐 Trying network first:', request.url);
        const networkResponse = await fetch(request);
        
        if (networkResponse.ok) {
            const cache = await caches.open(cacheName);
            cache.put(request, networkResponse.clone());
        }
        
        return networkResponse;
        
    } catch (error) {
        console.log('📋 Network failed, trying cache:', request.url);
        const cache = await caches.open(cacheName);
        const cachedResponse = await cache.match(request);
        
        if (cachedResponse) {
            return cachedResponse;
        }
        
        throw error;
    }
}

async function staleWhileRevalidate(request, cacheName) {
    const cache = await caches.open(cacheName);
    const cachedResponse = await cache.match(request);
    
    // Fetch fresh version in background
    const fetchPromise = fetch(request).then(networkResponse => {
        if (networkResponse.ok) {
            cache.put(request, networkResponse.clone());
        }
        return networkResponse;
    }).catch(error => {
        console.warn('Background fetch failed:', error);
    });
    
    // Return cached version immediately if available
    if (cachedResponse) {
        console.log('📋 Serving stale from cache:', request.url);
        // Don't await the fetch promise
        fetchPromise;
        return cachedResponse;
    }
    
    // If no cache, wait for network
    console.log('🌐 No cache, waiting for network:', request.url);
    return await fetchPromise;
}

async function cacheOnly(request, cacheName) {
    const cache = await caches.open(cacheName);
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
        return cachedResponse;
    }
    
    throw new Error('Resource not in cache');
}

// ===== ERROR HANDLING =====

async function handleFetchError(request, error) {
    console.error('Fetch error for:', request.url, error);
    
    // Try to serve from any cache
    const cacheNames = await caches.keys();
    
    for (const cacheName of cacheNames) {
        const cache = await caches.open(cacheName);
        const cachedResponse = await cache.match(request);
        
        if (cachedResponse) {
            console.log('📋 Serving fallback from cache:', request.url);
            return cachedResponse;
        }
    }
    
    // Return offline page for navigation requests
    if (request.mode === 'navigate') {
        return await getOfflinePage();
    }
    
    // Return offline image for image requests
    if (request.destination === 'image') {
        return await getOfflineImage();
    }
    
    // Return generic error response
    return new Response('Service Unavailable', {
        status: 503,
        statusText: 'Service Unavailable',
        headers: {
            'Content-Type': 'text/plain'
        }
    });
}

async function getOfflinePage() {
    const cache = await caches.open(STATIC_CACHE);
    const offlinePage = await cache.match('/index.html');
    
    if (offlinePage) {
        return offlinePage;
    }
    
    // Create basic offline page
    const offlineHTML = `
        <!DOCTYPE html>
        <html lang="it">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Offline - BusinessPro</title>
            <style>
                body {
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    min-height: 100vh;
                    margin: 0;
                    background: #f8fafc;
                    color: #334155;
                    text-align: center;
                    padding: 2rem;
                }
                .offline-icon {
                    font-size: 4rem;
                    margin-bottom: 1rem;
                }
                h1 {
                    font-size: 2rem;
                    margin-bottom: 1rem;
                    color: #1e293b;
                }
                p {
                    font-size: 1.1rem;
                    margin-bottom: 2rem;
                    max-width: 600px;
                    line-height: 1.6;
                }
                .retry-btn {
                    background: #3b82f6;
                    color: white;
                    border: none;
                    padding: 0.75rem 1.5rem;
                    border-radius: 0.5rem;
                    font-size: 1rem;
                    cursor: pointer;
                    transition: background 0.2s;
                }
                .retry-btn:hover {
                    background: #2563eb;
                }
            </style>
        </head>
        <body>
            <div class="offline-icon">📡</div>
            <h1>Sei Offline</h1>
            <p>
                Non è possibile connettersi a Internet in questo momento. 
                Controlla la connessione e riprova.
            </p>
            <button class="retry-btn" onclick="window.location.reload()">
                Riprova
            </button>
        </body>
        </html>
    `;
    
    return new Response(offlineHTML, {
        headers: {
            'Content-Type': 'text/html'
        }
    });
}

async function getOfflineImage() {
    // Return a simple SVG placeholder
    const offlineSVG = `
        <svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
            <rect width="100%" height="100%" fill="#f1f5f9"/>
            <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="18" 
                  fill="#64748b" text-anchor="middle" dy="0.3em">
                📷 Immagine non disponibile offline
            </text>
        </svg>
    `;
    
    return new Response(offlineSVG, {
        headers: {
            'Content-Type': 'image/svg+xml'
        }
    });
}

// ===== BACKGROUND SYNC =====

self.addEventListener('sync', (event) => {
    console.log('🔄 Background sync:', event.tag);
    
    if (event.tag === 'background-sync') {
        event.waitUntil(handleBackgroundSync());
    }
});

async function handleBackgroundSync() {
    // Handle any pending form submissions or data sync
    try {
        const pendingData = await getPendingData();
        
        for (const data of pendingData) {
            await syncData(data);
        }
        
        console.log('✅ Background sync completed');
        
    } catch (error) {
        console.error('❌ Background sync failed:', error);
    }
}

async function getPendingData() {
    // Retrieve pending data from IndexedDB or localStorage
    // This would be implemented based on your specific needs
    return [];
}

async function syncData(data) {
    // Sync data with server
    // This would be implemented based on your specific needs
    console.log('Syncing data:', data);
}

// ===== PUSH NOTIFICATIONS =====

self.addEventListener('push', (event) => {
    console.log('📱 Push notification received');
    
    const options = {
        body: 'You have new updates from BusinessPro!',
        icon: '/images/icon-192.png',
        badge: '/images/badge-72.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        },
        actions: [
            {
                action: 'explore',
                title: 'Explore',
                icon: '/images/checkmark.png'
            },
            {
                action: 'close',
                title: 'Close',
                icon: '/images/xmark.png'
            }
        ]
    };
    
    if (event.data) {
        const pushData = event.data.json();
        options.body = pushData.message;
        options.data = pushData.data;
    }
    
    event.waitUntil(
        self.registration.showNotification('BusinessPro', options)
    );
});

self.addEventListener('notificationclick', (event) => {
    console.log('🔔 Notification clicked');
    
    event.notification.close();
    
    if (event.action === 'explore') {
        event.waitUntil(
            clients.openWindow('/')
        );
    } else if (event.action === 'close') {
        // Notification closed
    } else {
        // Default action
        event.waitUntil(
            clients.openWindow('/')
        );
    }
});

// ===== CACHE MANAGEMENT =====

async function cleanupExpiredCaches() {
    const cacheNames = await caches.keys();
    
    for (const cacheName of cacheNames) {
        const cache = await caches.open(cacheName);
        const keys = await cache.keys();
        
        for (const request of keys) {
            const response = await cache.match(request);
            
            if (response) {
                const dateHeader = response.headers.get('date');
                if (dateHeader) {
                    const responseDate = new Date(dateHeader);
                    const age = Date.now() - responseDate.getTime();
                    const maxAge = 7 * 24 * 60 * 60 * 1000; // 7 days
                    
                    if (age > maxAge) {
                        console.log('🗑️ Removing expired cache entry:', request.url);
                        await cache.delete(request);
                    }
                }
            }
        }
    }
}

// Cleanup expired caches periodically
setInterval(cleanupExpiredCaches, 24 * 60 * 60 * 1000); // Every 24 hours

// ===== MESSAGE HANDLING =====

self.addEventListener('message', (event) => {
    console.log('💬 Message received:', event.data);
    
    if (event.data && event.data.type) {
        switch (event.data.type) {
            case 'SKIP_WAITING':
                self.skipWaiting();
                break;
                
            case 'CLEANUP_CACHES':
                cleanupExpiredCaches();
                break;
                
            case 'GET_CACHE_SIZE':
                getCacheSize().then(size => {
                    event.ports[0].postMessage({ size });
                });
                break;
                
            default:
                console.log('Unknown message type:', event.data.type);
        }
    }
});

async function getCacheSize() {
    const cacheNames = await caches.keys();
    let totalSize = 0;
    
    for (const cacheName of cacheNames) {
        const cache = await caches.open(cacheName);
        const keys = await cache.keys();
        
        for (const request of keys) {
            const response = await cache.match(request);
            if (response) {
                const blob = await response.blob();
                totalSize += blob.size;
            }
        }
    }
    
    return totalSize;
}

console.log('✅ Service Worker loaded successfully');
