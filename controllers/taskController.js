var express = require('express');
var router = express.Router();
var Task = require('../models');


router.get('/', function (req, res) {
  res.redirect('/index');
});



router.get('/index', function (req, res) {
  Task.task.selectAll(function(data) {
    var hbsObject = { taskBadger: data };


    res.render('index', hbsObject);
  });
});



router.post('/task/create', function (req, res) {
  Task.task.insertOne(req.body.name, function() {
    res.redirect('/index');
  });
});




router.post('/task/complete/:id', function (req, res) {
  Task.task.updateOne(req.params.id, function() {
    res.redirect('/index');
  });
});


module.exports = router;