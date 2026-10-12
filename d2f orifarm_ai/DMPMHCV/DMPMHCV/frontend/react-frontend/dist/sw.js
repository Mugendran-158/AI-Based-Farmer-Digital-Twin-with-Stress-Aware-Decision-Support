const CACHE_NAME = 'farmer-twin-v2';
const urlsToCache = [
    '/',
    '/index.html',
    '/manifest.json',
    '/favicon.svg'
];

// Install Event - Cache Core Assets
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

// Fetch Event - Serve from Cache, then Network
self.addEventListener('fetch', event => {
    // Skip cross-origin requests
    if (!event.request.url.startsWith(self.location.origin)) return;

    // specific strategy for API calls: Network first, don't cache
    if (event.request.url.includes('/api/')) {
        return;
    }

    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Cache hit - return response
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
    );
});

// Activate Event - Clean old caches
self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Push Notifications (Existing Logic Preserved)
self.addEventListener('push', function (event) {
    if (event.data) {
        const data = event.data.json();
        console.log('Push event!! ', data);

        const options = {
            body: data.body,
            icon: data.icon || '/icon-192.png',
            badge: '/badge.png',
            vibrate: [100, 50, 100],
            data: {
                dateOfArrival: Date.now(),
                primaryKey: '2',
                url: data.data?.url || '/'
            }
        };

        event.waitUntil(
            self.registration.showNotification(data.title, options)
        );
    } else {
        console.log('Push event but no data');
    }
});

self.addEventListener('notificationclick', function (event) {
    console.log('Notification click received.');
    event.notification.close();

    event.waitUntil(
        clients.openWindow(event.notification.data.url)
    );
});
