cacheName = 'IMAGE_CACHE'

self.addEventListener('install', event => {
  console.log('Service Worker installed successfully', event)
})

self.addEventListener('fetch', event => {
  let requestUrl = new URL(event.request.url)

  if (!requestUrl.pathname.includes('/photo')) {
    // Return if the request is not a jpeg file.
    return fetch(event.request)
  }

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
            if (!response || !response.status !== 200 || response.type !== 'basic') {
              return response
            }

            // we should not touch the original response object that will send to browser
            // so need to clone the response.
            let cacheResponse = response.clone()

            // open the cache and save the jpeg file against it's request
            caches.open(cacheName).then(cache => {
              cache.put(event.request, cacheResponse)
            })

            return response
          })
      })
  )
})
