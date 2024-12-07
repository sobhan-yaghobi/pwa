const staticCacheName = "static-cache-v3"
const assets = ["/", "/index.html", "/app.js"]

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
          .filter((key) => key !== staticCacheName)
          .map((key) => caches.delete(key))
      )
    })
  )
})
