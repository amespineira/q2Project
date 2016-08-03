var userInput = document.getElementById('inputBeer')
var button = document.getElementById('buttonBeer');
var httpRequest = new XMLHttpRequest();
var container= document.getElementById('style-container')
button.addEventListener("click", function(event) {
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
        styles[beer.style.id]=beer.style;
      }
    }
  })
  console.log("logging styles");
  console.log(styles);
  return styles;
}
function addStyles(styles){
  console.log(styles);
}
function addRecipe(recipeJson){
  var div=document.createElement('div');
  console.log(div);
  var name=document.createElement('a');
  name.setAttribute('href', '/#');
  name.innerHTML=recipeJson.style.name
  div.appendChild(name);
  var type=document.createElement('p');
  type.innerHTML=recipeJson.name;
  div.appendChild(type);
  var description=document.createElement('p');
  description.innerHTML=recipeJson.style.description
  div.appendChild(description);
  container.appendChild(div);

}
