var express = require('express');
var router = express.Router();
const db = require('../db');


/* GET home page. */
router.get('/', function(request, response) {
  response.render('login', { title: 'Login' });
});



// Send login info somewhere?
router.post('/', function(request, response) {
  var username = request.body.username
  console.log(username)
  db.query(`SELECT * FROM users where username = '?'`,username)
  .then(results => response.json(results))
  .catch(error => {
      console.log(error)
      response.json({ error })
  })
  
});

module.exports = router;
