// Asignar nombre y version de la cache
const CACHE_NAME = 'v1_cache_TecNM_ITQ';

// Archivos que se guardarán en cache
var urlsToCache = [
	'./',
	'./css/styles.css',
	'img/faviconTecNM.png',
	'img/1.png',
	'img/2.png',
	'img/3.png',
	'img/twitter.png',
	'img/facebook.png',
	'img/instagram.png'
];

// Evento Install
// Instalar serviceWorker y guardar en cache
// "self" es la referencia al serviceWorker
self.addEventListener('install', e => {			
	e.waitUntil(										// Esperar hasta que...
		caches.open(CACHE_NAME)							// Cargue la caché
			  .then(cache => {
			  	return cache.addAll(urlsToCache)		// Agregamos todas las urls
			  				.then(() => {
			  					self.skipWaiting();		// Esperar que carguen todos
			  				});
			  })
			  .catch(err => console.log('No se ha registrado el cache',err))
	);
});

// Evento Activate
// Para que la App funcione sin conexión
self.addEventListener('activate', e => {
	const cacheWhiteList = [CACHE_NAME];			// Guardamos los elementos de la cache
	e.waitUntil(									// Esperar hasta que...
		caches.keys()								// Se tomen todos los elementos (del navegador)
			  .then(cacheNames => {
			  	return Promise.all(					// Regresar todos
			  		cacheNames.map(cacheName => {	// el método "map" nos permite recorrer el array
			  			if(cacheWhiteList.indexOf(cacheName) === -1){
			  				// Borrar elementos que no se necesitan (tomados desde el keys)
			  				return caches.delete(cacheName);
			  			}
			  		})
			  	);
			  })
			  .then(() => {
			  	// Activar cache
			  	self.clients.claim();
			  })
	);
});

// Evento Fetch
// Para recuperar datos de la cache
self.addEventListener('fetch', e => {
	e.respondWith(						// Escogerá datos de la caché o del servidor
		caches.match(e.request) 		// Verifica si los datos ya están en la caché
			  .then(res => {
			  	if(res){
			  		// devolver datos desde cache
			  		return res;
			  	}  // En caso contrario, se recuperan los datos del servidor
			  	return fetch(e.request);
			  })
	);
});
