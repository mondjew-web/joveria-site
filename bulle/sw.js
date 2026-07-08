self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (e) => e.waitUntil(self.clients.claim()));
self.addEventListener("fetch", () => {});

self.addEventListener("push", (event) => {
  let data = { title: "JOVERIA Bulle", body: "Nouveau message." };
  try { data = event.data.json(); } catch (e) {}
  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: "icon-192.png",
      badge: "icon-192.png",
    })
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(
    self.clients.matchAll({ type: "window" }).then((clients) => {
      for (const client of clients) {
        if (client.url.includes("dashboard.html") && "focus" in client) return client.focus();
      }
      if (self.clients.openWindow) return self.clients.openWindow("dashboard.html");
    })
  );
});
