var express = require('express');
var router = express.Router();
var db = require('monk')('localhost/car-rental')
var Rentals = db.get('rentals')

router.get('/', function (req, res, next) {
  res.render('rentals/index', { title: "Rentals"})
})


module.exports = router;