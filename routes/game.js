const express = require("express");

const router = express.Router();

router.get("/:id", (req, res) => {
  const { id } = req.params;
  res.render("protected/game", { id });
});

// router.get("/:id/:message", (req, res) => {
//   const { id, message } = req.params;

//   res.render("protected/game", { id, message });
// });

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

var rawTileList = [
    { "letter": "a", "points":  1, "tiles":  9 },
    { "letter": "b", "points":  3, "tiles":  2 },
    { "letter": "c", "points":  3, "tiles":  2 },
    { "letter": "d", "points":  2, "tiles":  4 },
    { "letter": "e", "points":  1, "tiles": 12 },
    { "letter": "f", "points":  4, "tiles":  2 },
    { "letter": "g", "points":  2, "tiles":  3 },
    { "letter": "h", "points":  4, "tiles":  2 },
    { "letter": "i", "points":  1, "tiles":  9 },
    { "letter": "j", "points":  8, "tiles":  1 },
    { "letter": "k", "points":  5, "tiles":  1 },
    { "letter": "l", "points":  1, "tiles":  4 },
    { "letter": "m", "points":  3, "tiles":  2 },
    { "letter": "n", "points":  1, "tiles":  6 },
    { "letter": "o", "points":  1, "tiles":  8 },
    { "letter": "p", "points":  3, "tiles":  2 },
    { "letter": "q", "points": 10, "tiles":  1 },
    { "letter": "r", "points":  1, "tiles":  6 },
    { "letter": "s", "points":  1, "tiles":  4 },
    { "letter": "t", "points":  1, "tiles":  6 },
    { "letter": "u", "points":  1, "tiles":  4 },
    { "letter": "v", "points":  4, "tiles":  2 },
    { "letter": "w", "points":  4, "tiles":  2 },
    { "letter": "x", "points":  8, "tiles":  1 },
    { "letter": "y", "points":  4, "tiles":  2 },
    { "letter": "z", "points": 10, "tiles":  1 },
    //" ": { "tiles": 2}
]

var fullTileList = new Array();

let tileId = 0;
for(const tileData of rawTileList) {
  for(let multiples = 0; multiples < tileData["tiles"]; multiples++) {
    fullTileList[tileId] = [tileData["letter"], tileData["points"], tileId];
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

  res.render('protected/game', someData);
  });

module.exports = router;