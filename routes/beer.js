var express = require('express');
var router = express.Router();
var Beer=require('../queries/beer.js')
var Ing=require('../queries/ingredients.js')
var Batch=require('../queries/batch.js')
var http=require('http')
var defaults=[ //these are the default beers to display on the page, the ingredients refrence ids in the ingredients table, these are used as templates for the user to edit
  {
    type:'ale',
    style:'dark',
    description:'what a thing',
    ingredients:[1,2],
    amounts:[10,10]
  },
  {
    type:'Lager',
    style:'Light',
    description:'Light bodied, pale, fizzy lagers made popular by the large macro-breweries (large breweries) of America after prohibition. Low bitterness,thin malts, and moderate alcohol. Focus is less on flavor and more on mass-production and consumption, cutting flavor and sometimes costs with adjunct cereal grains, like rice and corn.',
    ingredients:[1,2],
    amounts:[10,10]

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
  var ingredients=[];
  var ingredients2=[];
  if(Array.isArray(req.body.ingredientName)){
    for(var i=0; i<req.body.ingredientName.length; i++){
      ingredients.push({
        name:req.body.ingredientName[i],
        type:req.body.ingredientType[i],
        units:req.body.ingredientUnits[i]
      })
      ingredients2.push({
        name:req.body.ingredientName[i],
        type:req.body.ingredientType[i],
        units:req.body.ingredientUnits[i],
        amount:req.body.ingredientAmount[i],
      })
    }
  }
  else{
    ingredients.push({
      name:req.body.ingredientName,
      type:req.body.ingredientType,
      units:req.body.ingredientUnits
    })
    ingredients2.push({
      name:req.body.ingredientName,
      type:req.body.ingredientType,
      units:req.body.ingredientUnits,
      amount:req.body.ingredientAmount,
    })
  }
  Ing.createIfMissing(ingredients).then(function(){
    var specs={
      user_id:req.session.id,
      name:req.body.name,
      type:req.body.type,
      style:req.body.style
    }
    Beer.create(specs).then(function(){
      Beer.getLatestBeer(req.session.id).then(function(userBeer){
        Ing.createBITest2(ingredients2, userBeer.rows[0].max).then(function(result){
          Batch.add_notes(req.session.id, userBeer.rows[0].max, req.body.notes).then(function(){
          res.redirect('/beer')
          })
        })

      })
    })
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
  console.log(res);
  console.log("******************");
  var ingredients;
  http.get('http://api.brewerydb.com/v2/style/'+req.params.id+'?key=72a6164778f5d2d0b5bf3858c894bbbf', (htres) => {
    htres.setEncoding('utf8')
    htres.on('data', (chunk) =>{
      ingredients=JSON.parse(chunk);
      console.log(typeof(ingredients));
      style=ingredients.data
      var type='';
      res.render('beer/create', {style:style, type:type})
    })
    htres.resume();
    }).on('error', (e) => {
    console.log(`Got error: ${e.message}`);
  });
  console.log(ingredients);
})
router.get('/:id/delete', function(req, res, next){
  Promise.all([Beer.getOne(req.params.id),Beer.getBatchesUsingBeer(req.params.id)]).then(function(results){
    if(results[0].rows[0].user_id===req.session.id){
      if(results[1].rows.length===0){
        Beer.deleteBeersIng(req.params.id).then(function(){
          Beer.deleteBeersNotes(req.params.id).then(function(){
            Beer.deleteOne(req.params.id).then(function(){
              res.redirect('/beer')
            })
          })
        })
      }
      else{
        res.send('This beer is in a batch')
      }
    }
    else{
      res.send('not your beer, get out of here')
    }
  })
})
router.get('/:id', function(req, res, next){
  Promise.all([Beer.getOne(req.params.id),Ing.getBeersIng(req.params.id)]).then(function(results){
    if(results[0].rows[0].user_id===req.session.id){
    res.render('beer/showbeer', {beers:results[0].rows, ingredients:results[1].rows})
    }
    else{
      res.send('not your beer, get out of here')
    }
  })
})

module.exports = router;
