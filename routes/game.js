var express = require('express');
var router = express.Router();

function getRandom(arr, n) {
  var result = new Array(n),
      len = arr.length,
      taken = new Array(len);
  while (n--) {
      var x = Math.floor(Math.random() * len);
      result[n] = arr[x in taken ? taken[x] : x];
      taken[x] = --len in taken ? taken[len] : len;
  }
  return result;
}

var rawTileList = {
    "a": { "points":  1, "tiles":  9 },
    "b": { "points":  3, "tiles":  2 },
    "c": { "points":  3, "tiles":  2 },
    "d": { "points":  2, "tiles":  4 },
    "e": { "points":  1, "tiles": 12 },
    "f": { "points":  4, "tiles":  2 },
    "g": { "points":  2, "tiles":  3 },
    "h": { "points":  4, "tiles":  2 },
    "i": { "points":  1, "tiles":  9 },
    "j": { "points":  8, "tiles":  1 },
    "k": { "points":  5, "tiles":  1 },
    "l": { "points":  1, "tiles":  4 },
    "m": { "points":  3, "tiles":  2 },
    "n": { "points":  1, "tiles":  6 },
    "o": { "points":  1, "tiles":  8 },
    "p": { "points":  3, "tiles":  2 },
    "q": { "points": 10, "tiles":  1 },
    "r": { "points":  1, "tiles":  6 },
    "s": { "points":  1, "tiles":  4 },
    "t": { "points":  1, "tiles":  6 },
    "u": { "points":  1, "tiles":  4 },
    "v": { "points":  4, "tiles":  2 },
    "w": { "points":  4, "tiles":  2 },
    "x": { "points":  8, "tiles":  1 },
    "y": { "points":  4, "tiles":  2 },
    "z": { "points": 10, "tiles":  1 },
    //" ": { "tiles": 2}
}

var fullTileList = new Array();

let tileId = 0;
for(const [key, val] of Object.entries(rawTileList)) {
  for(let multiples = 0; multiples < val["tiles"]; multiples++) {
    fullTileList[tileId] = [key.toUpperCase(), val["points"], tileId];
    tileId++;
  }
}

//console.log(getRandom(fullTileList, 7));


/* GET home page. */
router.get('/', function(req, res, next) {

  let randomHand = getRandom(fullTileList, 7);

  var someData = {
    gameBoardTiles: {},
    handTiles: randomHand, //[["X", 10, 1],["E", 5, 2],["C", 7, 3],["S", 3, 4],["P", 4, 5],["L", 8, 6],["A", 10, 7]],
    playerScores: [["person", 54], ["player", 40], ["guy", 30]]
  }

  res.render('game-lobby', someData);
  });

module.exports = router;