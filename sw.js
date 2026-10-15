const V='noctis-web-v1';
self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{const r=e.request,u=new URL(r.url);
 if(r.method!=='GET'||(u.origin!==location.origin&&u.hostname!=='cdnjs.cloudflare.com'))return;
 e.respondWith(caches.open(V).then(async c=>{const hit=await c.match(r);
  const net=fetch(r).then(res=>{if(res.ok||res.type==='opaque')c.put(r,res.clone());return res}).catch(()=>hit||(r.mode==='navigate'?c.match(self.registration.scope):Response.error()));
  return hit||net}))});
