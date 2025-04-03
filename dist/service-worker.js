// 这个文件会被workbox覆盖，仅作为后备service worker使用
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    }).catch(() => {
      // 如果网络请求和缓存都失败，返回离线页面
      return caches.match('/offline.html');
    })
  );
}); 