//  Service Worker

if('serviceWorker' in navigator){
	console.log('Puedes usar los serviceWorker en tu navegador');

	navigator.serviceWorker.register('./sw.js')   // Enviamos la configuración 
							.then(res => console.log('serviceWorker cargado correctamente',res))
							.catch(err => console.log('serviceWorker no se ha podido registrar', err));
}
else{
	console.log('No puedes usar los serviceWorker en tu navegador'); 
}

// Scroll Suavizado

$(document).ready(function(){				// Preparamos el JQuery en nuestro proyecto
	$("#menu a").click(function(e){			// En el objeto "#menu a" con el método click, llamamos al evento e
		e.preventDefault();					// Inhabilita la función del enlace
		$("html, body").animate({			// Ejecuta una animación
			scrollTop: $($(this).attr('href')).offset().top 	// Hacemos el recorrido al enlace desde el "top"
		});
		return false;
	});
});


