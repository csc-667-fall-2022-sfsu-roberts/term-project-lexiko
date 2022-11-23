var express = require('express');
var router = express.Router();

/* GET home page. */
router.get("/", (req, res, ) => {
  const {username} = req.session;
  const {sessionID} = req
  res.render('index', { username, sessionID });
});

module.exports = router;
