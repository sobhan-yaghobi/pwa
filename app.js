if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("sw.js")
    .then((registration) => {
      console.log("Service worker registered", registration)

      // 1. Check if Service Worker is in the installing phase
      if (registration.installing) {
        console.log("Service Worker installing")
      }

      // 2. Listen for updates to the Service Worker
      registration.onupdatefound = () => {
        const installingWorker = registration.installing
        if (installingWorker) {
          installingWorker.onstatechange = () => {
            switch (installingWorker.state) {
              case "installed":
                if (navigator.serviceWorker.controller) {
                  console.log("New or updated content is available.")
                } else {
                  console.log("Content is now available offline!")
                }
                break
              case "activating":
                console.log("Service Worker activating")
                break
              case "activated":
                console.log("Service Worker activated")
                break
              default:
                break
            }
          }
        }
      }

      // 3. Check if Service Worker is active
      if (registration.active) {
        console.log("Service Worker active")
      }

      // 4. Check if Service Worker is waiting (new version waiting to activate)
      if (registration.waiting) {
        console.log("Service Worker waiting")
      }
    })
    .catch((error) => console.log("Service worker is not registered", error))
}
