var express = require('express');
var router = express.Router();
var db = require('monk')('localhost/car-rental')
var Drivers = db.get('drivers')

/* GET users listing. */
router.get('/', function (req, res, next) {
  Drivers.find({}, function (err, data){  
    res.render('drivers/index', { title: "List of Drivers",
                                  allDrivers: data
                                });
  })
});

router.get('/new', function (req, res, next) {
  res.render('drivers/new', { title: "Add a Driver"})
})

router.post('/new', function (req, res, next) {
  Drivers.insert({  firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    age: req.body.driverage,
                    city: req.body.city,
                    state: req.body.state
                  })
  res.redirect('/drivers')
})

router.get('/:id', function (req, res, next){
  Drivers.findOne({_id: req.params.id}, function (err, data){
    res.render('drivers/show', { theDriver: data })
  })
})

router.get('/:id/edit', function (req, res, next) {
  Drivers.findOne({_id: req.params.id}, function (err, data){
    res.render('drivers/edit', { theDriver: data })
  })
})

router.post('/:id/edit', function (req, res, next){
  Drivers.updateById(req.params.id, { firstname: req.body.firstname,
                                      lastname: req.body.lastname,
                                      age: req.body.driverage,
                                      city: req.body.city,
                                      state: req.body.state
                                    }, function (err, data){
    res.redirect('/drivers/' + req.params.id);
  })
})

router.post('/:id/delete', function (req, res, next){
  Drivers.remove({_id: req.params.id}, function (err, data){
    res.redirect('/drivers')
  })
})

module.exports = router;
