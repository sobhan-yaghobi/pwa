if ("serviceWorker" in navigator) {
  try {
    navigator.serviceWorker
      .register("sw.js")
      .then((registration) => {
        console.log("Service worker registered", registration)

        // 1. Check if Service Worker is in the installing phase
        if (registration.installing) {
          console.log("Service Worker installing")
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
  } catch (error) {
    console.log("Error in registration of service worker ", error)
  }
}
