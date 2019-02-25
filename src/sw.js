
importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.1/workbox-sw.js');

const VERSION = 'v5';

console.log( VERSION );

/*
workbox.setConfig({
    debug: false,
    modulePathPrefix: 'workbox-3.6.3/'
});
*/

if(workbox) {
    console.log('INFO Workbox loaded');
}
console.log('SW');
//workbox.skipWaiting();
workbox.clientsClaim();
//workbox.precaching.precacheAndRoute([]);

workbox.routing.registerRoute(
    new RegExp('index\\.html'),
    workbox.strategies.cacheFirst()
);

workbox.routing.registerRoute(
    new RegExp('(.*)\\.js'),
    workbox.strategies.cacheFirst()
);
workbox.routing.registerRoute(
    new RegExp('(.*)\\.css'),
    workbox.strategies.cacheFirst()
);
workbox.routing.registerRoute(
    new RegExp('assets'),
    workbox.strategies.cacheFirst()
);
workbox.routing.registerRoute(
    new RegExp('svg'),
    workbox.strategies.cacheFirst()
);

workbox.routing.registerRoute(
    new RegExp('/$'),
    workbox.strategies.cacheFirst()
);


/*
const bgSyncPlugin = new workbox.backgroundSync.Plugin('myQueueName', {
    maxRetentionTime: 24 * 60 // Retry for max of 24 Hours
});

workbox.routing.registerRoute(
    /\/api/,
    workbox.strategies.networkOnly({
        plugins: [bgSyncPlugin]
    }),
    'POST'
);
*/
const queue = new workbox.backgroundSync.Queue('myQueueName');

self.addEventListener('fetch', (event) => {
    // Clone the request to ensure it's save to read when
    // adding to the Queue.
    const promiseChain = fetch(event.request.clone())
        .then(( data ) => {
            console.log( data );
            console.log( event.request );
        })
        .catch((err) => {
            console.log( err );
            return queue.addRequest(event.request);
        });

    event.waitUntil(promiseChain);
})
