const CACHE='world-kitchen-v02-1';
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(c=>c.addAll(['./','./index.html','./manifest.webmanifest','./icon.svg']))));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('world-kitchen-')&&k!==CACHE).map(k=>caches.delete(k))))));
self.addEventListener('fetch',event=>{const req=event.request;if(req.method!=='GET'||new URL(req.url).origin!==self.location.origin)return;
 event.respondWith(fetch(req).then(res=>{if(res.ok){const copy=res.clone();event.waitUntil(caches.open(CACHE).then(c=>c.put(req,copy)));}return res}).catch(async()=>{const cached=await caches.match(req);if(cached)return cached;if(req.mode==='navigate')return(await caches.match(new URL('./index.html',self.location.href).href))||Response.error();return Response.error()}));});
