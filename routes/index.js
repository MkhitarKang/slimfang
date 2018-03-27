var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // 20180324 Mkhitaryan
  //res.render('index', { title: 'Express' });
  res.render('index'); 
});

module.exports = router;
