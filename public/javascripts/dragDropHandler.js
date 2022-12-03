/*
json of data: hopefully
gameInfo = {
    game-id:
    player-id:
}
 */

let tiles = document.querySelectorAll(".tile"); //TODO
const handSpaces = document.querySelectorAll(".hand-space");
const boardSpaces = document.querySelectorAll(".board-space");
var currentTile;

for(const tile of tiles) {
    //console.log(tile.firstElementChild.innerText)
    tile.addEventListener("dragstart", dragStart);
    tile.addEventListener("dragend", dragEnd);
}

for(const boardSpace of boardSpaces) {
    boardSpace.addEventListener("dragover", dragOver);
    boardSpace.addEventListener("dragenter", dragEnter);
    boardSpace.addEventListener("dragleave", dragLeave);
    boardSpace.addEventListener("drop", dragDrop);
}

for(const handSpace of handSpaces) {
    handSpace.addEventListener("dragover", dragOver);
    handSpace.addEventListener("dragenter", dragEnter);
    handSpace.addEventListener("dragleave", dragLeave);
    handSpace.addEventListener("drop", dragDrop);
}

function dragStart() {
    this.className += " hold";
    currentTile = this;
    console.log("Picked up tile " + currentTile.firstElementChild.innerText);

    //removeTile();

    setTimeout(() => (this.className = "invisible"), 0);
    //console.log("start");
}

function dragEnd() {
    this.className = "tile";
    //check if hand tile or board tile
    this.className += " hand-tile";
    //console.log("end");
}

function dragOver(e) {
    e.preventDefault();
    //console.log("over");
}

function dragEnter(e) {
    e.preventDefault();
    this.className += " hovered";
    //console.log("enter");
}

function dragLeave(e) {
    if(this.className.startsWith("hand-space")) {
        this.className = "hand-space";
    } else if(this.className.startsWith("board-space")) {
        this.className = "board-space";
    }
    //console.log("leave");
}

function dragDrop() {
    if(this.className.startsWith("hand-space")) {
        this.className = "hand-space";
    } else if(this.className.startsWith("board-space")) {
        this.className = "board-space";
        placeTile(currentTile.firstElementChild.innerText, (this.id % 15), Math.round(Math.floor(this.id / 15)));
    }
    this.append(currentTile);
    console.log(currentTile.firstElementChild.innerText + " was dropped at ["+ (this.id % 15) + ", " + Math.round(Math.floor(this.id / 15)) + "]");
    return this.id;
}