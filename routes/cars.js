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

router.get('/:id/edit', function (req, res, next) {
  Cars.findOne({_id: req.params.id}, function (err, data){
    res.render('cars/edit', { theCar: data });
  })
})

router.post('/:id/edit', function (req, res, next) {
  Cars.updateById(req.params.id, {  make: req.body.carmake,
                                    model: req.body.carmodel,
                                    year: req.body.caryear
                                  }, function (err, data) {
    res.redirect('/cars/' + req.params.id)
  })
})

router.post('/:id/delete', function (req, res, next) {
  Cars.remove({_id: req.params.id}, function (err, data) {
    res.redirect('/cars')
  })
})

module.exports = router;