var userInput = document.getElementById('inputBeer')
var button = document.getElementById('buttonBeer');
var httpRequest = new XMLHttpRequest();
var col1= document.getElementById('col1')
var col2= document.getElementById('col2')
var col3= document.getElementById('col3')

button.addEventListener("click", function(event) {
  col1.innerHTML="";
  col2.innerHTML="";
  col3.innerHTML="";
  httpRequest.onreadystatechange = function(){
    if(httpRequest.readyState === 4){
      if(httpRequest.status < 400){
        var object = JSON.parse(httpRequest.responseText)
        console.log(object);
        addStyles(uniqueStyles(object.data))

      }
    }
  }
      httpRequest.open('GET', 'https://galvanize-cors-proxy.herokuapp.com/http://api.brewerydb.com/v2/beers?name='+userInput.value+'&key=72a6164778f5d2d0b5bf3858c894bbbf')
      httpRequest.send();
  });
function uniqueStyles(recipeJson){
  var styles={};
  recipeJson.forEach(function(beer){
    console.log(beer);
    if(beer.style){
      if(!styles[beer.style.id]){
        console.log("style not found");
        console.log(beer.style);
        console.log("*****");
        styles[beer.style.id]={style:beer.style, beerid:beer.id};
      }
    }
  })
  console.log("logging styles");
  console.log(styles);
  return styles;
}
function addStyles(styles){
  var count=1;
  var style;
  var id;
  for(var key in styles){
    id=styles[key].beerid
    style=styles[key].style
    var div=document.createElement('div');
    console.log(div);
    var name=document.createElement('a');
    name.setAttribute('href', '/beer/create/'+id);
    name.innerHTML=style.name
    div.appendChild(name);
    var description=document.createElement('p');
    description.innerHTML=style.description
    div.appendChild(description);
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
