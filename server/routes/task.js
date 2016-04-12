var express = require('express');
var router = express.Router();
import Tasks from '../services/tasks';

router.get('/create', function(req, res, next) {
  res.render('task/create', {tasks: Tasks.list});
});

router.post('/create', function(req, res, next) {

  Tasks.create(req.body.name, req.body.type);
  res.redirect('/');
});

router.post('/:id/run', function(req, res, next) {

  Tasks.create(req.body.name, req.body.type);
  res.redirect('/');
});

router.post('/:id/stop', function(req, res, next) {

  Tasks.create(req.body.name, req.body.type);
  res.redirect('/');
});

module.exports = router;
