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

async function fetchAsync(url) {
    let response = await fetch(url);
    let data = await response.json();
    return data;
}

async function isValidWord(word) {
    let dictAPI = "https://api.dictionaryapi.dev/api/v2/entries/en/";

    fetchAsync(dictAPI + word)
    .then(data => {
        if('title' in data) {
            console.log(word+" is not a word");
            return false;
        }
        //return true if there ARE definitions
        console.log(word+" is a word");
        return true;
    });
}

/*
Get all .tiles under .board-space
Return false if not in a row
Return false if not connected
Return false if not connected to an existing word
Return false if not a word
*/
async function validateMove() {
    
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

    if (xvalid) {
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
            console.log("START WORD new word end: "+newWordEnd);
            wordStart = space.id;
            if (space.firstChild.getAttribute("draggable") == "true") {        //start of a valid word
                newWordStart = wordStart;
            }
        }
        if (wordStart >= 0 && newWordEnd < 0) {                      //ongoing word
            if (!space.firstChild) {                                 //set end of valid word
                console.log("RESET WORD; newWordEnd: "+newWordEnd);
                wordStart = -1;
                if (newWordStart >= 0) {
                    newWordEnd = space.id - 1;
                } else if(newWordEnd < 0) {
                    word = "";
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
    //check if all words are valid
    //validate word

    const validWord = isValidWord(word);
    if(await validWord) return false;

    var allWords = [];
    allWords[0] = {
        "word": word,
        "start": newWordStart,
        "end": newWordEnd
    };

    //check perpendicular words
    if (xvalid) {
        console.log("COLUMNS");
        //check each column
        loop1:
        for (let i = 0; i < 15; i++) {
            const row = i;
            console.log("row: "+row);

            activeRow = [...document.querySelectorAll(".board-space")];
            activeRow = activeRow.filter(space => {
                return parseInt(space.id) % 15 == row;
            }).sort((a, b) => {
                return parseInt(a.id) - parseInt(b.id);
            });
            //validate words with new tiles
            //iterate through each space
            var wordStart = -1;
            var newWordStart = -1;
            var newWordEnd = -1;
            var word = "";
            loop2:
            for (const space of activeRow) {
                console.log((space.firstChild ? space.firstChild.firstChild.innerHTML : "."));
                //while no tiles
                //if tile, start word
                if (wordStart < 0 && space.firstChild) {
                    wordStart = space.id;
                    if (space.firstChild.getAttribute("draggable") == "true") {
                        newWordStart = wordStart;
                    }
                }
                //while tiles
                //if new tile, set word to new word
                //find end of word
                //if no tile
                //if new word, validate new word
                //else, reset word
                if (wordStart >= 0 && newWordEnd < 0) { //while word but not new word
                    if (!space.firstChild) {                                            //no tile
                        wordStart = -1;
                        if (newWordStart >= 0) {        //is new word
                            newWordEnd = space.id - 1;
                            //TODO validate word
                            //if word, break loop2
                            //else return false;
                            console.log("WORD: " + word);
                            if(word.length <= 1) break loop2;
                            allWords.push({
                                "word": word,
                                "start": newWordStart,
                                "end": newWordEnd
                            });
                        } else if(newWordEnd < 0) {
                            word = "";
                        }
                    } else if (space.firstChild.getAttribute("draggable") == "true") {  //new tile
                        //set new word
                        newWordStart = wordStart;
                        word += space.firstChild.firstChild.innerHTML;
                    } else {                                                            //regular tile
                        word += space.firstChild.firstChild.innerHTML;
                    }
                }
            }
        }
    } else {
        console.log("ROWS");
        //check each row
        loop1:
        for (let i = 0; i < 15; i++) {
            const row = i * 15;

            activeRow = [...document.querySelectorAll(".board-space")];
            activeRow = activeRow.filter(space => {
                return parseInt(space.id) >= row && parseInt(space.id) < row + 15;
            }).sort((a, b) => {
                return parseInt(a.id) - parseInt(b.id);
            });
            //validate words with new tiles
            //iterate through each space
            var wordStart = -1;
            var newWordStart = -1;
            var newWordEnd = -1;
            var word = "";
            loop2:
            for (const space of activeRow) {
                console.log((space.firstChild ? space.firstChild.firstChild.innerHTML : "."));
                //while no tiles
                //if tile, start word
                if (wordStart < 0 && space.firstChild) {
                    wordStart = space.id;
                    if (space.firstChild.getAttribute("draggable") == "true") {
                        newWordStart = wordStart;
                    }
                }
                //while tiles
                //if new tile, set word to new word
                //find end of word
                //if no tile
                //if new word, validate new word
                //else, reset word
                if (wordStart >= 0 && newWordEnd < 0) { //while word but not new word
                    if (!space.firstChild) {                                            //no tile
                        wordStart = -1;
                        if (newWordStart >= 0) {        //is new word
                            newWordEnd = space.id - 1;
                            //TODO validate word
                            //if word, break loop2
                            //else return false;
                            console.log("WORD: " + word);
                            if(word.length <= 1) break loop2;
                            allWords.push({
                                "word": word,
                                "start": newWordStart,
                                "end": newWordEnd
                            });
                        } else if(newWordEnd < 0) {
                            word = "";
                        }
                    } else if (space.firstChild.getAttribute("draggable") == "true") {  //new tile
                        //set new word
                        newWordStart = wordStart;
                        word += space.firstChild.firstChild.innerHTML;
                    } else {                                                            //regular tile
                        word += space.firstChild.firstChild.innerHTML;
                    }
                }
            }
        }
    }

    for(const word of allWords) {
        console.log("valid word: "+word.word);
        const validWord = isValidWord(word.word);
        if(await validWord) return false;
    }

    console.log("PASSED");
    return true;
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