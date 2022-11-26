var boardButton = document.getElementById("show-debugger-board");
var board = document.getElementById("debugger-board");

boardButton.onclick = () => {
    if(board.style.display == "block") {
        board.style.display = "none";
    } else {
        board.style.display = "block";
    }
}

var bagButton = document.getElementById("show-debugger-bag");
var bag = document.getElementById("debugger-bag");

bagButton.onclick = () => {
    if(bag.style.display == "block") {
        bag.style.display = "none";
    } else {
        bag.style.display = "block";
    }
}

var playersButton = document.getElementById("show-debugger-players");
var players = document.getElementById("debugger-players");

playersButton.onclick = () => {
    if(players.style.display == "block") {
        players.style.display = "none";
    } else {
        players.style.display = "block";
    }
}

//TODO pick player