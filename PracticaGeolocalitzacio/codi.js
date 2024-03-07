let map;

async function initMap() {
  const { Map } = await google.maps.importLibrary("maps");
  const myLatLng = { lat: 41.390205, lng: 2.154007 };

  map = new Map(document.getElementById("map"), {
    center: myLatLng,
    zoom: 8,
  });

  new google.maps.Marker({
    position: myLatLng,
    map,
    title: "Hola!",
  });


}

initMap();

function direccio() {
    let direccio = document.getElementById("adreca").value;
    trobaLloc(direccio);
    initMap(LatLon)
}


function trobaLloc(address) {
    let geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'address': address }, function (results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        let latitude = results[0].geometry.location.lat();
        let longitude = results[0].geometry.location.lng();
        document.getElementById("latitude").value = latitude;
        document.getElementById("longitude").value = longitude;
  
        map.setCenter({ lat: latitude, lng: longitude });

        let center = new google.maps.LatLng(latitude, longitude);
        map.setCenter(center);
        map.setZoom(16);

        new google.maps.Marker({
            position: center,
            map,
            title: "Hola!",
          });

      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  }