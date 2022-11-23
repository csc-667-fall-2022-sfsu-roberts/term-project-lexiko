var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  const {username} = req.session;
  res.render('index', { username });
});

module.exports = router;
