/**
 * Created by prakashn on 22/06/2017.
 */
var cacheName = 'my-dynamic-site-v' + '3';

self.addEventListener('install', function(event) {
    "use strict";
    console.log('installing service worker');
    self.skipWaiting();
    event.waitUntil(
        caches.open(cacheName).then(function(cache) {
            return cache.addAll(
                [
                    '/css/fonts.css',
                    '/css/material.grey-red.min.css',
                    '/js/material.min.js',
                    '/images/favicon.png'
                ]
            );
        }).catch(function() {
            console.log('error in opening cache...');
        })
    );
});

self.addEventListener('activate', function(event) {
    "use strict";
    console.log('activating service worker');
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.filter(function(c) {
                    if(c !== cacheName) return true;
                    else false;
                }).map(function(cacheName) {
                    console.log('deleing cache ' + cacheName);
                    return caches.delete(cacheName);
                })
            );
        })
    );

});

self.addEventListener('fetch', function(event) {
    "use strict";
    console.log('fetching service worker');
    event.respondWith(
        caches.open(cacheName).then(function(cache) {
            return cache.match(event.request).then(function (response) {
                return response || fetch(event.request).then(function(response) {
                        cache.put(event.request, response.clone());
                        return response;
                    });
            });
        })
    );

});
