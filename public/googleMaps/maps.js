var button = document.getElementById("buttonMap1");
var userInput = document.getElementById('inputMap1')
var userInput2 = document.getElementById('inputBeer')
var button2 = document.getElementById('buttonBeer');
var httpRequest = new XMLHttpRequest();
var long
var lat
var map
var contentString
var marker;
var localLat
var localLong

var shape;
var icon;
var image;


button.addEventListener("click", function(event) {
  httpRequest.onreadystatechange = function(){
  if(httpRequest.readyState === 4){
    if(httpRequest.status < 400){
      var object = JSON.parse(httpRequest.responseText)
      lat = (object.results[0].geometry.location.lat);
      long = (object.results[0].geometry.location.lng)
      getLocations(lat, long)
        }
      }    //here I am getting the latitude and Longitude from the location that requested.
    }
    httpRequest.open('GET', 'https://galvanize-cors-proxy.herokuapp.com/https://maps.googleapis.com/maps/api/geocode/json?address=' + userInput.value +'&key=AIzaSyA42x7FNCeCrCZZiLRep6SE2sVWjT_dDrA')
    httpRequest.send();
});

function getLocations(lat, long){
    httpRequest.onreadystatechange = function(){
    if(httpRequest.readyState === 4){
      if(httpRequest.status < 400){
        var object = JSON.parse(httpRequest.responseText)
        for (var i = 0; i < object.data.length; i++) {
          // console.log(object.data[i].name)
          localLat = object.data[i].latitude;
          localLong = object.data[i].longitude;
          console.log(localLat);
          console.log(localLong);
          localMarkers(map, localLat, localLong);
          // map.setZoom(9);

        }

      }
    }
  }
  httpRequest.open('GET', 'http://api.brewerydb.com/v2/search/geo/point?lat=' + lat + '&lng=' + long +'&key=72a6164778f5d2d0b5bf3858c894bbbf')
  httpRequest.send();
};












// button2.addEventListener("click", function(event) {
//   httpRequest.onreadystatechange = function(){
//   if(httpRequest.readyState === 4){
//     if(httpRequest.status < 400){
//       var object = JSON.parse(httpRequest.responseText)
//       console.log(object.data[0].name);
//       console.log(object.data[0].style.description);
//       console.log(object.data[0].style.ibuMax);
//       console.log(object.data[0].style.ibuMin);
//
//         }
//       }
//     }
//       httpRequest.open('GET', 'https://galvanize-cors-proxy.herokuapp.com/http://api.brewerydb.com/v2/beers?name='+userInput2.value+'&key=72a6164778f5d2d0b5bf3858c894bbbf')
//       httpRequest.send();
//   });





function initMap() {
 map = new google.maps.Map(document.getElementById('map'), {
    zoom: 9,
    center: {lat: 39.7392, lng: -104.9903}
  });
  setMarkers(map);
}


function setMarkers(map) {
    shape = {
    coords: [1, 1, 1, 20, 18, 20, 18, 1],
    type: 'poly'
  };
    icon = {
    url: "https://gettaphunter.com/wp-content/uploads/2016/02/The-Pint.jpg", // url
    scaledSize: new google.maps.Size(30, 30), // scaled size
    origin: new google.maps.Point(0,0), // origin
  };
}


function localMarkers(map, lat, long){
  console.log(lat+"******");
  console.log(long+"******");
  var infowindow = new google.maps.InfoWindow({
    // content: contentString
  });


  var marker = new google.maps.Marker({
      position: {lat: lat, lng: long},
      map: map,
      icon: image,
      shape: shape,
      icon: icon,
      draggable: false,
      animation: google.maps.Animation.DROP
    })
    console.log(marker);
  marker.addListener('click', function() {
    infowindow.open(map, marker);

  });
 // map.panTo(marker.position);
}
