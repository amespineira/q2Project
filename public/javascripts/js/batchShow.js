var addButton=document.getElementById('addIng');
var tbody=document.getElementById('form-table')
var noteCon=document.getElementById('note-con')
var noteButton=document.getElementById('addNote')
var ingForm=document.getElementById('ing-form')
$("#ing-button").hide()

addButton.addEventListener('click', function(){

  var count = $("table tr").length;
  var row=document.createElement("tr")
  var th1=document.createElement("td")
  var input1=document.createElement('input')
  input1.setAttribute("class", "batch-input");
  input1.setAttribute("type", "text");
  input1.setAttribute("name", 'ingredientName');
  th1.appendChild(input1);
  row.appendChild(th1);
  var th2=document.createElement("td")
  var input2=document.createElement('input')
  input2.setAttribute("class", "batch-input");
  input2.setAttribute("type", "text");
  input2.setAttribute("name", 'ingredientType');
  th2.appendChild(input2);
  row.appendChild(th2);
  var th3=document.createElement("td")
  var input3=document.createElement('input')
  input3.setAttribute("class", "batch-input");
  input3.setAttribute("type", "number");
  input3.setAttribute("name", 'ingredientAmount');
  th3.appendChild(input3);
  row.appendChild(th3);
  var th4=document.createElement("td")
  var input4=document.createElement('input')
  input4.setAttribute("class", "batch-input");
  input4.setAttribute("type", "text");
  input4.setAttribute("name", 'ingredientUnits');
  th4.appendChild(input4);
  row.appendChild(th4);
  tbody.appendChild(row);
  $("#addIng").hide()
  $("#ing-button").show()

})
