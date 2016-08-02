var express = require('express');
var router = express.Router();
var Equipment = require('../queries/equipment')

router.get('/', function(req, res, next){
    Equipment.getAllEquipment(req.session.id).then(function(equipment){
        res.render('equipment', {equipment: equipment.rows});
    })
});

router.get('/add', function(req, res, next){
      res.render('equipment/add')
})
router.post('/', function(req, res, next) {
    Equipment.createEquipment(req.body, req.session.id).then(function() {
        res.redirect('/');
    })
})
router.get('/:id', function(req, res, next){
    res.render('equipment/show')
})
router.get('/:id/edit', function(req, res, next){
    res.render('equipment/edit')
})
router.post('/:id/edit', function(req, res, next){
    res.redirect('/')
})
router.get('/:id/delete', function(req, res, next){
    res.redirect('/')
})
module.exports = router;
