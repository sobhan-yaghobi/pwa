if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("sw.js")
    .then((data) => console.log("service worker registered", data))
    .catch((error) => console.log("service worker is not registered", error))
}
