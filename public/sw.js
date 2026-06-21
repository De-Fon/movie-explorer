/**
 * 📦 sw.js — "The Offline Cache"
 * A Service Worker script that saves the main page so the app works even if
 * you lose your internet connection (PWA feature). It caches the homepage on
 * install, clears old caches on activation, and serves cached pages when
 * the network is unavailable.
 */
const CACHE_NAME = 'movie-explorer-cache-v1'
const ASSETS = [
  '/',
  '/index.html',
]

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)))
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.map((k) => (k === CACHE_NAME ? null : caches.delete(k)))))
  )
})

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request).catch(() => caches.match('/index.html')))
  )
})
