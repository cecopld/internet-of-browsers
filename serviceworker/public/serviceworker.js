// The SW will be shutdown when not in use to save memory,
// be aware that any global state is likely to disappear
var CACHE_NAME = 'my-site-cache-v1';

var urlsToCache = [
  "/content.htm"
];

console.log("SW startup");

self.addEventListener("install", function(event) {
  console.log("Installing…");

  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache - Installed');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener("activate", function(event) {
  console.log("SW activated");
});

self.addEventListener('fetch', function(event) {
  console.log("Caught a fetch!", event);
  /* respondWith ->
   * hijack call and fabricate different response
   * must be called synchronously
   * passing in a response or a promise that resolves to one
   * if you don't call it, you get normal browser behaviour
   */

  //event.respondWith(new Response("Hello world!"));

  console.log("Fetch: ",event);

  //event.respondWith(
  //  caches.match(event.request).then(function(response) {
  //    // Cache hit - return response
  //    console.log("Response: ", response);
  //    if (response) {
  //      return response;
  //    }
  //    return fetch("content.html");
  //  })
  //)
});

