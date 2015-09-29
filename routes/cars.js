var express = require('express')
var router = express.Router()
var db = require('monk')('localhost/car-rental')
var Cars = db.get('cars')

router.get('/', function (req, res, next){
  Cars.find({}, function (err, data) {
    res.render('cars/index', { title: 'List of Cars',
                               allCars: data
                              })
  })
})

router.get('/new', function (req, res, next){
  res.render('cars/new', { title: "Add a Car"})
})

router.post('/new', function (req, res, next){
  Cars.insert({ make: req.body.carmake,
                model: req.body.carmodel,
                year: req.body.caryear
              })
  res.redirect('/cars')
})

router.get('/:id', function (req, res, next){
  Cars.findOne({_id: req.params.id}, function (err, data){
    res.render('cars/show', { theCar: data });
  })
})

module.exports = router;