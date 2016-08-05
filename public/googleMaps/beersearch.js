var userInput2 = document.getElementById('inputBeer1')
var button2 = document.getElementById('buttonBeer1');
var container = document.getElementById('container')
var container2 = document.getElementById('container2')
var container3 = document.getElementById('container3')
var httpRequest = new XMLHttpRequest();


button2.addEventListener("click", function(event) {
    container.innerHTML = " "
  httpRequest.onreadystatechange = function(){
  if(httpRequest.readyState === 4){
    if(httpRequest.status < 400){
      var object = JSON.parse(httpRequest.responseText)
      for (var i = 0; i < object.data.length; i++) {
      var name = document.createElement("h1")
      var desc = document.createElement("h4")
      var fgMax = document.createElement("li")
      var fgMin = document.createElement("li")
      var ibuMax = document.createElement('li')
      var ibuMin = document.createElement('li')
      var abv = document.createElement('li')
      var glass = document.createElement('li')

      container.appendChild(name)
      name.innerHTML = object.data[i].style.name;
      container.appendChild(desc)
      desc.innerHTML = object.data[i].style.description;
      container.appendChild(fgMax)
      fgMax.innerHTML = 'FgMax'+ " " + object.data[i].style.fgMax;
      container.appendChild(fgMin)
      fgMin.innerHTML = 'FgMin' + " " + object.data[i].style.fgMin;
      container.appendChild(ibuMax)
      ibuMax.innerHTML = 'Ibu Max' + " " + object.data[i].style.ibuMax;
      container.appendChild(ibuMin)
      ibuMin.innerHTML = 'Ibu Min' + " " + object.data[i].style.ibuMin;
      container.appendChild(abv)
      abv.innerHTML = 'ABV' + " " + object.data[i].abv;
          }
        }
      }
    }
      httpRequest.open('GET', 'https://galvanize-cors-proxy.herokuapp.com/http://api.brewerydb.com/v2/beers?name='+userInput2.value+'&key=72a6164778f5d2d0b5bf3858c894bbbf')
      httpRequest.send();
  });
