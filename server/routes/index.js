var express = require('express');
var router = express.Router();
import Tasks from '../services/tasks';
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {tasks: Tasks.list});
});

router.get('/createTask', function(req, res, next) {
  res.render('createTask', {tasks: Tasks.list});
});

router.post('/task/create', function(req, res, next) {

  Tasks.create(req.body.name, req.body.type);
  res.redirect('/');
});

router.post('/task/:id/run', function(req, res, next) {

  Tasks.create(req.body.name, req.body.type);
  res.redirect('/');
});

router.post('/task/:id/stop', function(req, res, next) {

  Tasks.create(req.body.name, req.body.type);
  res.redirect('/');
});

module.exports = router;
