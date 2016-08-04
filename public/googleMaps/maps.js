var button = document.getElementById("buttonMap1");
// var userInput = document.getElementsByTagName('input')[0]
var userInput = document.getElementById('inputMap1')
var userInput2 = document.getElementById('inputBeer')
var button2 = document.getElementById('buttonBeer');
var httpRequest = new XMLHttpRequest();
var long
var lat

button.addEventListener("click", function(event) {
  httpRequest.onreadystatechange = function(){
  if(httpRequest.readyState === 4){
    if(httpRequest.status < 400){
      var object = JSON.parse(httpRequest.responseText)
      console.log(object);
      long = (object.results[0].geometry.location.lng);
      lat = (object.results[0].geometry.location.lat);
      // getLocations(lat, long)
      console.log(long);
      console.log(lat);
        }
      }    //here I am getting the latitude and Longitude from the location that requested.
    }
    httpRequest.open('GET', 'https://maps.googleapis.com/maps/api/geocode/json?address=' + userInput.value +'&key=AIzaSyA42x7FNCeCrCZZiLRep6SE2sVWjT_dDrA')
    httpRequest.send();
});

// button2.addEventListener("click", function(event) {
//   httpRequest.onreadystatechange = function(){
//   if(httpRequest.readyState === 4){
//     if(httpRequest.status < 400){
//       var object = JSON.parse(httpRequest.responseText)
//       // console.log(object.data[0].name);
//       // console.log(object.data[0].style.description);
//       // console.log(object.data[0].style.ibuMax);
//       // console.log(object.data[0].style.ibuMin);
//
//         }
//       }
//     }
//       httpRequest.open('GET', 'https://galvanize-cors-proxy.herokuapp.com/http://api.brewerydb.com/v2/beers?name='+userInput2.value+'&key=72a6164778f5d2d0b5bf3858c894bbbf')
//       httpRequest.send();
//   });
// function getLocations(lat, long){
//     httpRequest.onreadystatechange = function(){
//     if(httpRequest.readyState === 4){
//       if(httpRequest.status < 400){
//         var object = JSON.parse(httpRequest.responseText)
//         console.log(object);
//       }
//     }
//   }
//   httpRequest.open('GET', 'https://galvanize-cors-proxy.herokuapp.com/http://api.brewerydb.com/v2/search/geo/point?=lat=' + lat  +'&lng=' + long +'&key=72a6164778f5d2d0b5bf3858c894bbbf')
//   httpRequest.send();
// };
