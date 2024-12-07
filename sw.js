const staticCacheName = "static-cache-v3"
const dynamicCacheName = "dynamic-cache-v1"
const assets = ["/", "/index.html", "/app.js", "/offline.html"]

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(staticCacheName).then((cache) => cache.addAll(assets))
  )
})

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      console.log("keys : ", keys)
      return Promise.all(
        keys
          .filter((key) => key !== staticCacheName && key !== dynamicCacheName)
          .map((key) => caches.delete(key))
      )
    })
  )
})

// Fetch Event
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches
      .match(event.request)
      .then(
        (cacheRes) =>
          cacheRes ||
          fetch(event.request).then(async (fetchRes) => {
            return caches.open(dynamicCacheName).then((cache) => {
              cache.put(event.request.url, fetchRes.clone())

              return fetchRes
            })
          })
      )
      .catch(() => {
        if (event.request.url.indexOf(".html") > -1) {
          return caches.match("/offline.html")
        }
      })
  )
})
