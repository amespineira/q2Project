var userInput1 = document.getElementById('inputBeer')
var button = document.getElementById('buttonBeer');
var col1= document.getElementById('col1')
var col2= document.getElementById('col2')
var col3= document.getElementById('col3')
var httpRequest = new XMLHttpRequest();
var largeContainer= document.getElementById('breweryContainer')
var desc
var div

button.addEventListener("click", function(event) {
    container.innerHTML = " ";
    breweryContainer.innerHTML = " "
    container.innerHTML = " ";
    col1.innerHTML = " ";
    col2.innerHTML = " ";
    col3.innerHTML = " ";
  httpRequest.onreadystatechange = function(){
  if(httpRequest.readyState === 4){
    if(httpRequest.status < 400){
      var object = JSON.parse(httpRequest.responseText)
      desc = document.createElement("h3")

      largeContainer.appendChild(desc)
      desc.innerHTML = object.data[0].style.description;

      var count=1
      for (var i = 0; i < object.data.length; i++) {
      var name = document.createElement("h1")
      var desc1 = document.createElement("h3")
      var fgMax = document.createElement("li")
      var fgMin = document.createElement("li")
      var ibuMax = document.createElement('li')
      var ibuMin = document.createElement('li')
      var abv = document.createElement('li')
      var glass = document.createElement('li')
      div = document.createElement('div')

      console.log("*****");
      var pictures =object.data[i].labels;

if

      div.appendChild(name)
      name.innerHTML = object.data[i].name;

      div.appendChild(desc1)
      desc1.innerHTML = object.data[i].description;


      div.appendChild(fgMax)
      fgMax.innerHTML = 'FgMax'+ " " + object.data[i].style.fgMax;
      div.appendChild(fgMin)
      fgMin.innerHTML = 'FgMin' + " " + object.data[i].style.fgMin;
      div.appendChild(ibuMax)
      ibuMax.innerHTML = 'Ibu Max' + " " + object.data[i].style.ibuMax;
      div.appendChild(ibuMin)
      ibuMin.innerHTML = 'Ibu Min' + " " + object.data[i].style.ibuMin;
      div.appendChild(abv)
      abv.innerHTML = 'ABV' + " " + object.data[i].abv;
      switch(count){
        case 1:
          col1.appendChild(div)
        break;
        case 2:
          col2.appendChild(div)
        break;
        case 3:
          col3.appendChild(div)
        break;
      }
      count++;
      if(count>3){
        count=1;
      }
          }

        }
      }
    }
      httpRequest.open('GET', 'http://api.brewerydb.com/v2/search?q='+ userInput1.value +'&type=beer&withingredients&key=72a6164778f5d2d0b5bf3858c894bbbf')
      httpRequest.send();
  });
