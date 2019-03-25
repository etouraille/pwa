importScripts('workbox/workbox-sw.js');

const VERSION = 'v7';

console.log( VERSION );


workbox.setConfig({
    debug: true,
    modulePathPrefix: 'workbox/'
});

if(workbox) {
    console.log('INFO Workbox loaded');
}
console.log('SW');
//workbox.skipWaiting();
//workbox.clientsClaim();
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
async function eventToObject(event, response ) {
    const request = event.request.clone();
    return { url : request.url , method : request.method , body : await response.json() };
}

async function send_message_to_all_clients(event, response ){
    // From service-worker.js:
    const channel = new BroadcastChannel('sw-messages');
    channel.postMessage(JSON.stringify(await eventToObject(event, response )));
}
replayRequests = async function (object) {
    let entry;
    const queue = object.queue;
    while (entry = await queue.shiftRequest()) {
        try {

            const _fetch = await fetch(entry.request.clone());
            send_message_to_all_clients(entry, _fetch);


            console.log('Request for ' , entry.request.url,
                    `has been replayed in queue '${queue._name}'`);

        } catch (error) {
            console.log('error', error);
            await queue.unshiftRequest(entry);

            console.log('Request for ' ,entry.request.url,
                    `failed to replay, putting it back in queue '${queue._name}'`);

            throw new Error('queue-replay-failed', {name: queue._name});
        }
    }

    console.log(`All requests in queue '${queue.name}' have successfully ` +
            `replayed; the queue is now empty!`);

}

const maxRetentionTime = 60 * 24 * 7;

const queue = new workbox.backgroundSync.Queue('myQueueName', { onSync: replayRequests , maxRetentionTime: maxRetentionTime });

self.addEventListener('fetch', (event) => {
    // Clone the request to ensure it's save to read when
    // adding to the Queue.
    if( event.request.clone().url.match(/api/) ) {
        const promiseChain = fetch(event.request.clone())
            .then((data) => {
                console.log(data);
                send_message_to_all_clients(event, data );
            })
            .catch((err) => {
                console.log(err, event.request);

                return queue.pushRequest(event);
            });

        event.waitUntil(promiseChain);
    }
})
