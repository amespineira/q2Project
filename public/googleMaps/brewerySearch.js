var userInput6 = document.getElementById('brewerySearch')
var button2 = document.getElementById('breweryButton');
var col1A= document.getElementById('col1')
var col2A= document.getElementById('col2')
var col3A= document.getElementById('col3')
var largeContainer= document.getElementById('breweryContainer')
var httpRequest = new XMLHttpRequest();
button2.addEventListener("click", function(event) {
    breweryContainer.innerHTML = " "
    container.innerHTML = " ";
  httpRequest.onreadystatechange = function(){
  if(httpRequest.readyState === 4){
    if(httpRequest.status < 400){
      var object = JSON.parse(httpRequest.responseText)
        for (var i = 0; i < object.data.length; i++) {
          console.log(object.data[i].images);
          var div = document.createElement('div')
          var brewname = document.createElement("h1")
          var brewdesc = document.createElement("h3")
          var brewest = document.createElement("p")
          var website = document.createElement('a')
          var picture = document.createElement("img")

          largeContainer.appendChild(picture)
          picture.setAttribute('src',  object.data[i].images.squareMedium)

          largeContainer.appendChild(brewname)
          brewname.innerHTML = object.data[i].name;

          largeContainer.appendChild(website)
          website.innerHTML = object.data[i].website;

          largeContainer.appendChild(brewest)
          brewest.innerHTML = "Establish in" + " " + object.data[i].established;

          largeContainer.appendChild(brewdesc)
          brewdesc.innerHTML = object.data[i].description;














      var count=1
      for (var i = 0; i < object.data.length; i++) {
        switch(count){
          case 1:
            col1A.appendChild(div)
          break;
          case 2:
            col2A.appendChild(div)
          break;
          case 3:
            col3A.appendChild(div)
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
      }
        httpRequest.open('GET', 'http://api.brewerydb.com/v2/search?q='+ userInput6.value +'&key=72a6164778f5d2d0b5bf3858c894bbbf')
        httpRequest.send();
    });
