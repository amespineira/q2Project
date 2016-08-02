var express = require('express');
var router = express.Router();
var Beer=require('../queries/beer.js')
var Ing=require('../queries/ingredients.js')
var defaults=[ //these are the default beers to display on the page, the ingredients refrence ids in the ingredients table, these are used as templates for the user to edit
  {
    type:'ale',
    style:'dark',
    description:'what a thing',
    ingredients:[1,2],
    amounts:[10,10]
  },
  {
    type:'lager',
    style:'dark',
    description:'what a lager',
    ingredients:[1,2]
  }
]
/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('logged in as '+req.session.id);
  Beer.getUsersBeers(req.session.id).then(function(beers){
    console.log(beers);
    res.render('beer/userbeers', {beers:beers.rows})
  })
})
router.post('/', function(req, res, next){
  //check ingredients, add any not found
  var ingredients=[];
  var ingredients2=[];
  for(var i=0; i<req.body.ingredientName.length; i++){
    ingredients.push({
      name:req.body.ingredientName[i],
      type:req.body.ingredientType[i],
      units:req.body.ingredientUnits[i]
    })
    ingredients2.push({
      name:req.body.ingredientName[i],
      type:req.body.ingredientType[i],
      units:req.body.ingredientUnits[i]
    })
  }
  var create=Ing.createIfMissing(ingredients).then(function(){
    
  })

})


// ingredientName: [ 'citra', 'ipa', 'water', 'chocolate' ],
// ingredientType: [ 'hop', 'grain', 'water', 'misc' ],
// ingredientAmount: [ '10', '10', '20', '10' ],
// ingredientUnits: [ 'ounces', 'grams', 'liters', 'ounces' ] }
router.get('/create', function(req, res, next){
  res.render('beer/select', {defaults:defaults})
})
router.get('/create/:id', function(req, res, next){
  Ing.getDefaultIng(defaults[req.params.id].ingredients).then(function(ingredients){
    console.log(defaults[req.params.id]);
    console.log(ingredients.rows);
    console.log(ingredients.rows[1].ingredient_name);
    res.render('beer/create', {template:defaults[req.params.id], ingredients:ingredients.rows})
  })
})
router.get('/:id', function(req, res, next){
  Beer.getOne(req.params.id).then(function(beers){
    if(beers.rows[0].user_id===req.session.id){
    res.render('beer/showbeer', {beers:beers.rows})
    }
    else{
      res.send('not your beer, get out of here')
    }
  })
})

module.exports = router;
