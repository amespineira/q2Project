var userInput1 = document.getElementById('inputBeer')
var button = document.getElementById('buttonBeer');
var col1= document.getElementById('col1')
var col2= document.getElementById('col2')
var col3= document.getElementById('col3')
var httpRequest = new XMLHttpRequest();

button.addEventListener("click", function(event) {
    container.innerHTML = " ";
  httpRequest.onreadystatechange = function(){
  if(httpRequest.readyState === 4){
    if(httpRequest.status < 400){
      var object = JSON.parse(httpRequest.responseText)
      var count=1
      for (var i = 0; i < object.data.length; i++) {
        console.log(object.data[i].name);

      var name = document.createElement("h1")
      var desc = document.createElement("h4")
      var fgMax = document.createElement("li")
      var fgMin = document.createElement("li")
      var ibuMax = document.createElement('li')
      var ibuMin = document.createElement('li')
      var abv = document.createElement('li')
      var glass = document.createElement('li')
      var div = document.createElement('div')



      div.appendChild(name)
      name.innerHTML = object.data[i].style.name;
      div.appendChild(desc)
      desc.innerHTML = object.data[i].style.description;
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
      httpRequest.open('GET', 'http://api.brewerydb.com/v2/search?q='+ userInput1.value +'&key=72a6164778f5d2d0b5bf3858c894bbbf')
      httpRequest.send();
  });
