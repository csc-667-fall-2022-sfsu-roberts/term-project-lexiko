const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/", (req, res, ) => {
  const {username} = req.session;
  const {sessionID} = req
  res.render('public/index', { username, sessionID });
});

module.exports = router;
