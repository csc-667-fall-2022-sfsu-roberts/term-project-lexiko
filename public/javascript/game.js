/*
json of data: hopefully
gameInfo = {
    game-id:
    player-id:
}
 */

//let hand 

let tiles = document.querySelectorAll(".tile");
const handSpaces = document.querySelectorAll(".hand-space");
const boardSpaces = document.querySelectorAll(".board-space");

for(const tile of tiles) {
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
    setTimeout(() => (this.className = "invisible"), 0);
    console.log("start");
}

function dragEnd() {
    this.className = "tile";
    //check if hand tile or board tile
    this.className += " hand-tile";
    console.log("end");
}

function dragOver(e) {
    e.preventDefault();
    console.log("over");
}

function dragEnter(e) {
    e.preventDefault();
    this.className += " hovered";
    console.log("enter");
}

function dragLeave(e) {
    if(this.className.startsWith("hand-space")) {
        this.className = "hand-space";
    } else if(this.className.startsWith("board-space")) {
        this.className = "board-space";
    }
    console.log("leave");
}

function dragDrop() {
    if(this.className.startsWith("hand-space")) {
        this.className = "hand-space";
    } else if(this.className.startsWith("board-space")) {
        this.className = "board-space";
    }
    this.append(tiles);
    console.log("drop");
}