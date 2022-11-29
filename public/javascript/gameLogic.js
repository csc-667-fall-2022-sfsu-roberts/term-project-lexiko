/* 
1) Get Board from Server
2) initialize local board
3) 

/* 1) Place Tiles
/*    a) Calculate potential Score */


const tilesPlaced = new Array();


// Board is a class that is changed only by websocket updates
class Board {
    constructor() {
        this.table = new Array();
        //this.blank();
    }

    fromTable(gameBoard) {
        this.table = gameBoard;
    }

    at(x, y) {
        return table[y][x]
    }

    blank() {
        for (let i = 0; i < 15; i++) {
            for (let j = 0; j < 15; j++) {
                this.table[i][j] = "EMPTY";
            }
        }
    }

    refresh() {

    }
}

class Tile {
    constructor(letter, points, id) {
        this.letter = letter;
        this.points = points;
        this.id = id;
    }
}

function placeTile(tile, x, y) {
    tilesPlaced.push({
        "tile": tile,
        "xcoord": x,
        "ycoord": y
    });
    console.log(tilesPlaced);
    emitPlacedTile(tile, x, y);
}

function removeTile(x, y) {
    /*
    for(let i = 0; i < tilesPlaced.length; i++) {
        if(tilesPlaced[i].x == x && tilesPlaced[i].y == y)
            tilesPlaced.re
    }
    */

    tilesPlaced.filter((e) => !(e.x == x && e.y == y));
    console.log(tilesPlaced);
    emitPlacedTile(tile, x, y);
}

/*
function calculateScore() {
}

*/

/*
Get all .tiles under .board-space
Return false if not in a row
Return false if not connected
Return false if not a word
*/
function validateMove() {

    //get all placed tiles
    var tiles = [...document.querySelectorAll(".tile")];
    tiles = tiles.filter(tile => {
        return tile.parentElement.className == "board-space";
    });
    var placedTiles = tiles.filter(tile => {
        return tile.getAttribute('draggable') == "true";
    });

    //return false if not in a row or column
    var xvalid = true;
    var yvalid = true;

    let basex = Math.floor(parseInt(placedTiles[0].parentElement.id) / 15);
    let basey = parseInt(placedTiles[0].parentElement.id) % 15;
    // console.log("x:"+basex+", y:"+basey);
    for (const tile of placedTiles) {
        let tilex = Math.floor(parseInt(tile.parentElement.id) / 15);
        let tiley = parseInt(tile.parentElement.id) % 15;
        // console.log(tile.parentElement.id+":   x:"+tilex+", y:"+tiley);

        if (tilex != basex) {
            xvalid = false;
            // console.log("x");
        }
        if (tiley != basey) {
            yvalid = false;
            // console.log("y");
        }
    }

    if (xvalid) {
        console.log("Aligned in the x direction");
    }
    if (yvalid) {
        console.log("Aligned in the y direction");
    }

    if (!(xvalid || yvalid)) {
        console.log("Not aligned");
        return false;
    }

    //return false if not connected
    //if xvalid get row, if yvalid get column
    var activeRow = [...document.querySelectorAll(".board-space")];

    if(xvalid) {
        const row = basex * 15;

        activeRow = activeRow.filter(space => {
            return parseInt(space.id) >= row && parseInt(space.id) < row + 15;
        }).sort((a, b) => {
            return parseInt(a.id) - parseInt(b.id);
        });
    } else {
        const row = basey;

        activeRow = activeRow.filter(space => {
            return parseInt(space.id) % 15 == row;
        }).sort((a, b) => {
            return parseInt(a.id) - parseInt(b.id);
        });
    }

    var wordStart = -1;
    var newWordStart = -1;
    var newWordEnd = -1;
    var word = "";
    for (const space of activeRow) {
        console.log((space.firstChild ? space.firstChild.firstChild.innerHTML : "."));
        if (wordStart < 0 && space.firstChild) {                     //start of a word
            wordStart = space.id;
            if (space.firstChild.getAttribute("draggable") == "true") {        //start of a valid word
                newWordStart = wordStart;
            }
        }
        if (wordStart >= 0 && newWordEnd < 0) {                      //ongoing word
            if (!space.firstChild) {                                 //set end of valid word
                wordStart = -1;
                if (newWordStart >= 0) {
                    newWordEnd = space.id - 1;
                }
            } else if (space.firstChild.getAttribute("draggable") == "true") { //set word to valid word
                newWordStart = wordStart;
                word += space.firstChild.firstChild.innerHTML;
            } else {
                word += space.firstChild.firstChild.innerHTML;
            }
        }
        if (newWordEnd >= 0 && space.firstChild && space.firstChild.getAttribute("draggable") == "true") {
            console.log("Word not connected");
            return false;
        }
    }

    //get word
    console.log(word);
    //check if word is valid
    //TODO read dictionary into set

}

const localBoard = new Board();

/* 2) End Turn
/*    a) check if it is a valid move (server, client)
/*    b) check valid word (server, client)
/*    c) check if words are from hand (server)
/*    else) reset turn
/* 3) update score (server)
/* 4) broadcast new game data
    - player scores
    - board state
    - whose turn
*/