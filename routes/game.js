var express = require('express');
var router = express.Router();

var someData = {
  gameBoardTiles: {},
  handTiles: [["X", 10],["E", 5],["C", 7],["S", 3],["P", 4],["L", 8],["A", 10]],
  playerScores: [["person", 54], ["player", 40], ["guy", 30]]
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('game-lobby', someData);
  });

module.exports = router;