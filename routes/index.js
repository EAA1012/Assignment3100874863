const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home' });
});

router.get('/Parts/add', function(req, res, next) {
  res.render('add', { title: 'Add'});
});
module.exports = router;
