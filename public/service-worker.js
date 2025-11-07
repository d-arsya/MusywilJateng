const CACHE_NAME = 'laravel-inertia-pwa-cache-v4'; // *** BUMPED VERSION TO V4 ***
const DYNAMIC_CACHE_NAME = 'inertia-chunks-cache-v2';

const urlsToCache = ['/', '/login', '/card', '/denah', '/jadwal', '/materi', '/panginapan', '/profile', '/logo.png'];
// 2. Install Event: Cache static assets
self.addEventListener('install', (event) => {
    // CRITICAL FIX: Skip waiting and activate immediately
    self.skipWaiting();

    // Wait until the promise is resolved (all files cached)
    event.waitUntil(
        caches
            .open(CACHE_NAME)
            .then((cache) => {
                console.log('Opened static cache, adding application shell assets');
                // The main shell files are cached here
                return cache.addAll(urlsToCache);
            })
            .catch((err) => {
                console.error('Failed to cache shell assets:', err);
            }),
    );
});

// 3. Fetch Event: Runtime Caching for Dynamic Chunks and Data
self.addEventListener('fetch', (event) => {
    // Only intercept GET requests
    if (event.request.method !== 'GET') {
        return;
    }

    const requestUrl = new URL(event.request.url);

    // Skip caching external resources (e.g., Google Fonts, APIs)
    if (requestUrl.origin !== location.origin) {
        return;
    }

    event.respondWith(
        caches.match(event.request).then((response) => {
            // 1. Cache Hit (for static shell files or previously loaded chunks)
            if (response) {
                return response;
            }

            // 2. Cache Miss: Go to Network, then Cache the response for future use
            return fetch(event.request)
                .then((networkResponse) => {
                    // Check if we received a valid response
                    if (!networkResponse || networkResponse.status !== 200) {
                        return networkResponse;
                    }
                    const responseToCache = networkResponse.clone();
                    const cacheToOpen = urlsToCache.includes(requestUrl.pathname) ? CACHE_NAME : DYNAMIC_CACHE_NAME;

                    // Cache the new response
                    caches.open(cacheToOpen).then((cache) => {
                        // Only cache requests originating from the same domain
                        cache.put(event.request, responseToCache);
                    });

                    return networkResponse;
                })
                .catch((error) => {
                    console.error('Fetching failed (Offline?):', error);
                    return new Response('Offline and resource not found in cache.', { status: 503 });
                });
        }),
    );
});

// 4. Activate Event: Clean up old caches
self.addEventListener('activate', (event) => {
    // CRITICAL FIX: Take control of all open windows immediately
    self.clients.claim();

    const cacheWhitelist = [CACHE_NAME, DYNAMIC_CACHE_NAME];
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    // Delete old caches not in the whitelist
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        console.log('Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                }),
            );
        }),
    );
});
