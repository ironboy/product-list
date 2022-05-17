// 'Globals'
let cache; // holder for open cache
let missingImageUrl = 'images/missing-image.png';

// EVENTS:

// The install event runs when the service worker
// is registrered and we call onInstall
self.addEventListener('install', e => onInstall());

// The activate event runs when the install is done
self.addEventListener('activate', e => onActivate());

// The fetch event runs every time
// the web page requests a resource
self.addEventListener('fetch',
  e => e.respondWith(cacher(e.request)));

async function onInstall() {
  // IMPORTANT! - Faster activation:
  self.skipWaiting();

  // Open the cache, if not done already
  cache = cache || await caches.open('cache');

  // Since we have a network first cache strategy
  // only cache a few important files initially
  // (the index.html file and "missing-image"-image)
  return cache.addAll(['/', missingImageUrl]);
}

async function onActivate() {
  // IMPORTANT! - Faster activation:
  self.clients.claim();
}

// Cache strategy: 
// Network first (get from cache only if no network)
async function cacher(request) {
  // Open the cache, if not done already
  cache = cache || await caches.open('cache');

  // If we are online fetch from the server
  let response;
  if (navigator.onLine) {
    // Get from internet/network
    response = await fetch(request).catch(e => response = null);
  }

  // If we failed to get a server response, use the cache
  if (!response) {
    response = await cache.match(request);
    // failed to get it from cache too?
    response = response || await fallbackResponses(request);
  }

  // Otherwise cache the response, if it is a GET request
  else if (request.method === 'GET') {
    cache.put(request, response.clone()); // no await needed!
  }

  return response;
}

// Try to generate som fallback responses
async function fallbackResponses(request) {

  let response, key, cacheKeys = await cache.keys();
  let base = location.protocol + '//' + location.host + '/';
  let route = request.url.split(base)[1] || '';
  let extension = request.url.slice(-4);

  if (route && !route.includes('/') && !route.includes('.')) {
    // Could be a hard reload of a frontend route in a SPA
    // so send our 'start page' (the frontend router should manage)
    key = cacheKeys.find(({ url }) => url == base);
  }

  if (['.jpg', '.png', '.gif'].includes(extension)) {
    // Probably an image we are missing
    // so send our 'missing image' image ;)
    let img = base + missingImageUrl;
    key = cacheKeys.find(({ url }) => url === img);
  }

  // if we are in React and using frontend routing with React router
  // and nothing else is found in the cache try returning index.html
  // (i.e. the content cached on the route "/")
  // because it could work with the frontend routing
  if (!key) {
    key = cacheKeys.find(({ url }) => url === '/');
  }

  response = key && await cache.match(key);
  return response;
}