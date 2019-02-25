// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see the error "The Geolocation service
// failed.", it means you probably did not give permission for the browser to
// locate you.
var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var labelIndex = 0;
var coordenadasmias = [];
var directionsService;
var directionsDisplay;
//registrar
map = null;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -3.996089, lng: -79.205697},
        zoom: 17
    });
    directionsService = new google.maps.DirectionsService;
    directionsDisplay = new google.maps.DirectionsRenderer;
    directionsDisplay.setMap(map);
    var infoWindow = new google.maps.InfoWindow({map: map});
    var coordsDiv = document.getElementById('coords');

    var geocoder = new google.maps.Geocoder;
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            coordenadasmias = pos;

            //infoWindow.setPosition(pos);
            //infoWindow.setContent('Location found.');
            //aqyui estaba el market
            map.setCenter(pos);
            crearMarker(pos, map, geocoder);
        }, function () {
            //handleLocationError(true, infoWindow, map.getCenter());
            var pos1 = {lat: -3.996089, lng: -79.205697};
            crearMarker(pos1, map, geocoder);
        });
    } else {
        // Browser doesn't support Geolocation
        //handleLocationError(false, infoWindow, map.getCenter());
        var pos1 = {lat: -3.996089, lng: -79.205697};
        crearMarker(pos1, map, geocoder);
    }

    // This event listener calls addMarker() when the map is clicked.
    google.maps.event.addListener(map, 'click', function (event) {
        //addMarker(event.latLng, map);
    });

    // Add a marker at the center of the map.


}

function toggleBounce() {
    if (marker.getAnimation() !== null) {
        marker.setAnimation(null);
    } else {
        marker.setAnimation(google.maps.Animation.BOUNCE);
    }
}

function crearMarker(pos, map, geocoder) {
    cargarDireccion(geocoder, pos, map);
    marker = new google.maps.Marker({
        map: map,
        draggable: true,
        animation: google.maps.Animation.DROP,
        position: pos
    });
    marker.addListener('click', toggleBounce);

    marker.addListener('dragend', function (event) {
        cargarDireccion(geocoder, event.latLng, map);
        console.log(event.latLng);
        /*coordsDiv.textContent =
         'lat: ' + event.latLng.lat() + ', ' +
         'lng: ' + event.latLng.lng();*/
    });
    return marker;
}

function cargarDireccion(geocoder, latlng, map) {

    geocoder.geocode({'location': latlng}, function (results, status) {
        console.log(results + "   xxxxxx");
        if (status === 'OK') {
            if (results[0] && results[1]) {
                //var direccion = document.getElementById('txt_direccion');
                var txt_long = document.getElementById('txt_long');
                var txt_lat = document.getElementById('txt_lat');
                //var txt_ciudad = document.getElementById('txt_ciudad');
                /*map.setZoom(11);
                 var marker = new google.maps.Marker({
                 position: latlng,
                 map: map
                 });*/

                //direccion.value = results[0].formatted_address;
                console.log(results);
                //if(latlng['lat'] == 'function(){return a}' || latlng['lat'] == 'function(){return b}') {
                if(txt_lat!=null && txt_long!=null){
                    if (isNaN(latlng['lat']) || isNaN(latlng['lat'])) {
                        txt_lat.value = latlng.lat();
                        txt_long.value = latlng.lng();
                    } else {
                        txt_lat.value = latlng['lat'];
                        txt_long.value = latlng['lng'];
                    }
                }
                //console.log(results[1].formatted_address);
                //txt_ciudad.value = (results[2].formatted_address);
                //infowindow.setContent(results[1].formatted_address);
                //infowindow.open(map, marker);
            } else {
                window.alert('No results found');
            }
        } else {
            window.alert('Geocoder failed due to: ' + status);
        }
    });
}

var marcadores = [];

function deleteMarkers(map) {
    for (var i = 0; i < marcadores.length; i++) {
        marcadores[i].setMap(map);
    }
}

function pintar(puntos) {    
    //console.log("xxxx "+map);
    deleteMarkers(null);
    for (var i = 0; i < puntos.length; i++) {
        var url_icono = 'http://maps.google.com/mapfiles/ms/icons/blue-pushpin.png';
        var punto = puntos[i];
        var pos = {
                lat: punto["lat"]*1,
                lng: punto["lng"]*1,
            };
        marker = new google.maps.Marker({
            map: map,
            draggable: false,            
            position: pos,
            icon: {
                url: url_icono
            }
        });
        marcadores.push(marker);
    }
    map.setZoom(14);
}

// Adds a marker to the map.
// Add the marker at the clicked location, and add the next-available label
// from the array of alphabetical characters.
/*function addMarker(location, map) {
 
 var marker = new google.maps.Marker({
 position: location,
 label: labels[labelIndex++ % labels.length],
 map: map
 });
 }*/

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
            'Error: The Geolocation service failed.' :
            'Error: Your browser doesn\'t support geolocation.');
}
