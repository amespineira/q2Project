var button = document.getElementById("buttonMap1");
var userInput = document.getElementById('inputMap1')
var httpRequest = new XMLHttpRequest();
var long
var lat
var map

var marker;
var localLat
var localLong
var shape;
var icon;
var image;
//content string information for gooogle maps
var contentString
var brewName
var brewDescription
var brewWeb
var brewAddress
//end

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
          brewAddress = object.data[i].streetAddress;
          brewName = object.data[i].brewery.name;
          brewDescription =object.data[i].brewery.description;
          brewWeb =object.data[i].brewery.website;
          localLat = object.data[i].latitude;
          localLong = object.data[i].longitude;
          contentString = brewName + " " + brewAddress + " " + brewWeb + " " + brewDescription;
          localMarkers(map, localLat, localLong, contentString);
          map.setZoom(11);

        }

      }
    }
  }
  httpRequest.open('GET', 'http://api.brewerydb.com/v2/search/geo/point?lat=' + lat + '&lng=' + long +'&key=72a6164778f5d2d0b5bf3858c894bbbf')
  httpRequest.send();
};


function initMap() {
 map = new google.maps.Map(document.getElementById('map'), {
    zoom: 11,
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
    scaledSize: new google.maps.Size(25, 25), // scaled size
    origin: new google.maps.Point(0,0), // origin
  };
}


function localMarkers(map, lat, long){
  var infowindow = new google.maps.InfoWindow({
    content: contentString,


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
  marker.addListener('click', function() {
    infowindow.open(map, marker);

  });
 map.panTo(marker.position);
}
