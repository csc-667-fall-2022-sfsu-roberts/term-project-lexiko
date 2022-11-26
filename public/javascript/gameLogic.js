/* 
1) Get Board from Server
2) initialize local board
3) 

/* 1) Place Tiles
/*    a) Calculate potential Score */


const tilesPlaced = new Array();


// Board is a class that is changed only by websocket updates
class Board {
    constructor(){
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
        for(let i = 0; i < 15; i++){
            for(let j = 0; j < 15; j++){
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

function validateMove() {

    var xvalid = true;
    var yvalid = true;

    let tempx = tilesPlaced[0].xcoord;
    let tempy = tilesPlaced[0].ycoord;

    for(const e of tilesPlaced) {
        if(tempx != parseInt(e.xcoord)) {
            xvalid = false;
            console.log("not aligned in the x direction");
        }

        if(tempy != parseInt(e.ycoord)) {
            yvalid = false;
            console.log("not aligned in the y direction");
        }
    }

    return (xvalid || yvalid);
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