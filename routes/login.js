var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Login' });
});



// Send login info somewhere?
router.post('/', function(req, res, next) {
  console.log(req.body);
  res.send("response sent")
});

module.exports = router;
