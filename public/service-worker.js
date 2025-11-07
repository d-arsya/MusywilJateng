const CACHE_NAME = 'musywill-pwa-1';
const DYNAMIC_CACHE_NAME = 'musywill-pwa-1-cache';

// These URLs represent the static "Application Shell" (the wrapper HTML and non-hashed assets).
// NOTE: If your main JS/CSS files (e.g., app.js, app.css) are hashed by Vite/Mix,
// you MUST inject their full, hashed paths into this array dynamically from your Blade file
// before the Service Worker registers, or they will only be cached on the first network fetch.
const urlsToCache = ['/', '/login', '/dashboard', '/card', '/denah', '/jadwal', '/materi', '/panginapan', '/profile', '/logo.png'];

// 2. Install Event: Cache static assets
self.addEventListener('install', (event) => {
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

                    // IMPORTANT: Clone the response to cache, as the original is used by the browser
                    const responseToCache = networkResponse.clone();

                    // Determine which cache to use: Static or Dynamic (chunks/pages)
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
                    // Fallback logic for completely failed network requests
                    // For a PWA, you might return a generic offline page here
                    return new Response('Offline and resource not found in cache.', { status: 503 });
                });
        }),
    );
});

// 4. Activate Event: Clean up old caches
self.addEventListener('activate', (event) => {
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
