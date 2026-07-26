const CACHE_NAME = "dans-buldak-v1";

const urlsToCache = [

"/",

"/index.html",

"/menu.html",

"/cart.html",

"/assets/css/style.css",

"/assets/js/app.js",

"/assets/images/logo/logo.png"

];

/* INSTALL */

self.addEventListener("install",event=>{

event.waitUntil(

caches.open(CACHE_NAME)

.then(cache=>{

return cache.addAll(urlsToCache);

})

);

});

/* FETCH */

self.addEventListener("fetch",event=>{

event.respondWith(

caches.match(event.request)

.then(response=>{

return response || fetch(event.request);

})

);

});

/* UPDATE CACHE */

self.addEventListener("activate",event=>{

event.waitUntil(

caches.keys()

.then(keys=>{

return Promise.all(

keys.map(key=>{

if(key!==CACHE_NAME){

return caches.delete(key);

}

})

);

})

);

});
