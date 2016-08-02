var button = document.getElementById("buttonMap1")
var input = document.getElementById('inputMap1')
var userInput = document.getElementsByTagName('input')[0]
var httpRequest = new XMLHttpRequest();
var long
var lat
console.log(input);
button.addEventListener("click", function(event) {
  httpRequest.onreadystatechange = function(){
  if(httpRequest.readyState === 4){
    if(httpRequest.status < 400){
      var object = JSON.parse(httpRequest.responseText)
      console.log(httpRequest.repsonseText);
      long = (object.results[0].geometry.location.lng)
      lat = (object.results[0].geometry.location.lat);
      getDiveSites(lat, long);

        }
      }    //here I am getting the latitude and Longitude from the location that requested.
    }

    httpRequest.open('GET', 'https://maps.googleapis.com/maps/api/geocode/json?address=' + userInput.value +'&key=AIzaSyA42x7FNCeCrCZZiLRep6SE2sVWjT_dDrA')
    httpRequest.send();
})


function getDiveSites(lat, long){


}
