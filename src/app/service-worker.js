const APP_PREFIX = 'Favorite_' // Identifier for this app (this needs to be consistent across every cache update)
const VERSION = 'version_01' // Version of the off-line cache (change this value every time you want to update cache)
const CACHE_NAME = APP_PREFIX + VERSION
const IMAGE_CACHE = 'IMAGE_CACHE'
const URLS = [
  '/src/app/index.html',
  '/src/app/index.js',
  '/src/app/styles.css',
  '/src/app/home/home.html',
  '/src/app/home/home.js',
  '/src/app/home/styles.css'
]

// Respond with cached resources
self.addEventListener('fetch', event => {
  let requestUrl = new URL(event.request.url)

  if (requestUrl.pathname.includes('/photo')) {
    event.respondWith(
      // Check the cache if a jpeg is cached already
      caches.match(event.request)
        .then(response => {
          if (response) {
            return response
          }
          // Fetch the jpeg from server and store it in cache

          // We should not touch the original request object that will used by browser
          // so we need to clone the request.
          let fetchRequest = event.request.clone()

          // Send request to server for resource
          return fetch(fetchRequest)
            .then(response => {
              // return when the request is not fulfilled or request is not a same origin
              if (!response) {
                return response
              }

              // we should not touch the original response object that will send to browser
              // so need to clone the response.
              let cacheResponse = response.clone()

              // open the cache and save the jpeg file against it's request
              caches.open(IMAGE_CACHE).then(cache => {
                cache.put(event.request, cacheResponse)
              })

              return response
            })
        })
    )
  }
  console.log('fetch request: ' + event.request.url)
  event.respondWith(
    caches.match(event.request).then(request => {
      if (request) { // if cache is available, respond with cache
        console.log('responding with cache: ' + event.request.url)
        return request
      } else { // if there are no cache, try fetching request
        console.log('file is not cached, fetching: ' + event.request.url)
        return fetch(event.request)
      }
    })
  )
})

// Cache resources
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('installing website cache: ' + CACHE_NAME)
      return cache.addAll(URLS)
    })
  )
})

// Delete outdated caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keyList => {
      // `keyList` contains all cache names under your username.github.io
      // filter out ones that has this app prefix to create white list
      var cacheWhitelist = keyList.filter(key => {
        return key.indexOf(APP_PREFIX)
      })
      // add current cache name to white list
      cacheWhitelist.push(CACHE_NAME)

      return Promise.all(keyList.map((key, i) => {
        if (cacheWhitelist.indexOf(key) === -1) {
          console.log('deleting cache: ' + keyList[i])
          return caches.delete(keyList[i])
        }
      }))
    })
  )
})
