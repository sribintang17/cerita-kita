const CACHE_NAME = "cerita-kita-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/src/manifest.json",
  "/src/public/logo.png",

];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      )
    )
  );
});

self.addEventListener("push", (event) => {
  const data = event.data ? event.data.text() : "Push message tanpa payload";
  const options = {
    body: data,
    icon: "/src/public/logo.png",
    vibrate: [100, 50, 100],
  };
  event.waitUntil(
    self.registration.showNotification("Notifikasi Cerita Kita", options)
  );
});
