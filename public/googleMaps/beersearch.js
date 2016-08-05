var userInput2 = document.getElementById('inputBeer1')
var button2 = document.getElementById('buttonBeer1');
var httpRequest = new XMLHttpRequest();


button2.addEventListener("click", function(event) {
  httpRequest.onreadystatechange = function(){
  if(httpRequest.readyState === 4){
    if(httpRequest.status < 400){
      var object = JSON.parse(httpRequest.responseText)
      console.log(object.data);

      // console.log(object.data[0].name);
      // console.log(object.data[0].style.description);
      // console.log(object.data[0].style.ibuMax);
      // console.log(object.data[0].style.ibuMin);

        }
      }
    }
      httpRequest.open('GET', 'https://galvanize-cors-proxy.herokuapp.com/http://api.brewerydb.com/v2/beers?name='+userInput2.value+'&key=72a6164778f5d2d0b5bf3858c894bbbf')
      httpRequest.send();
  });
