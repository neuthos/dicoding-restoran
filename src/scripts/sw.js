import 'regenerator-runtime'
import CacheHelper from './utils/cache-helper'

const { assets } = global.ServiceWorker

self.addEventListener('install', (event) => {
  event.waitUntil(CacheHelper.cachingAppShell([...assets, './']))
})

self.addEventListener('activate', (event) => {
  event.waitUntil(CacheHelper.deleteOldCache())
})

self.addEventListener('fetch', (event) => {
  event.respondWith(CacheHelper.revalidateCache(event.request))
})

self.addEventListener('fetch', (event) => {
  console.log(event.request)

  event.respondWith(fetch(event.request))
  // TODO: Add/get fetch request to/from caches
})
