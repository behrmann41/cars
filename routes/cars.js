var express = require('express')
var router = express.Router()
var db = require('monk')('localhost/all-cars')
var Cars = db.get('cars')

router.get('/', function (req, res, next){
  res.render('cars/index', { title: "List of Cars"})
})

module.exports = router;