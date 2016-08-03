var express = require('express');
var router = express.Router();
var Equipment = require('../queries/equipment')

router.get('/', function(req, res, next){
    Equipment.getAllEquipment(req.session.id).then(function(equipment){
        res.render('equipment/index', {equipment: equipment.rows});
    })
});

router.get('/add', function(req, res, next){
      res.render('equipment/add')
})
router.post('/', function(req, res, next) {
    Equipment.createEquipment(req.body, req.session.id).then(function() {
        res.redirect('/equipment');
    })
})
router.get('/:id', function(req, res, next){
    Equipment.findOneEquipment(req.params.id).then(function(equipment){
        res.render('equipment/show', {equipment: equipment.rows});
    })
})
router.get('/:id/edit', function(req, res, next){
    console.log(req.params.id)
    Equipment.findOneEquipment(req.params.id).then(function(equipment){
        console.log(equipment.rows[0])
        res.render('equipment/edit', {equipment: equipment.rows[0]})

    })
})
router.post('/:id/edit', function(req, res, next){
    console.log("Here we go")
    Equipment.updateOneEquipment(req.body, req.params.id).then(function(){
        res.redirect('/equipment')

    })
})
router.get('/:id/delete', function(req, res, next){
    Equipment.deleteOneEquipment(req.params.id).then(function(){
        res.redirect('/equipment')

    })
})
module.exports = router;
