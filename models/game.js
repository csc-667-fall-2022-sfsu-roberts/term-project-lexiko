//const Sequelize = require('sequelize')

class Space { //board space

    constructor(id) {
        this.id = id;
        this.tile = null;
    }

    hasTile() {
        return this.tile != null;
    }

}

class Tile {

    constructor(id, letter) {
        this.id = id;
        this.letter = letter;
    }

}

class Player {

    constructor(id) {
        this.id = id;
        this.name = "";
        this.score = 0;
        this.hand = [];
        for(let i = 0;i < 7;i++) {
            this.hand[i] = null;
        }
    }

    shuffleHand() {
        for (var i = this.hand.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = this.hand[i];
            this.hand[i] = this.hand[j];
            this.hand[j] = temp;
        }
    }

}

class Game {

    setupBoard() {
        this.board = [];
        for (let i = 0; i < 255; i++) {
            this.board[i] = new Space(i);
        }
    }
    setupTiles() {
        this.tiles = new Map();
        this.tiles.set("a", { "points": 1, "quantity": 9 });
        this.tiles.set("b", { "points": 3, "quantity": 2 });
        this.tiles.set("c", { "points": 3, "quantity": 2 });
        this.tiles.set("d", { "points": 2, "quantity": 4 });
        this.tiles.set("e", { "points": 1, "quantity": 12 });
        this.tiles.set("f", { "points": 4, "quantity": 2 });
        this.tiles.set("g", { "points": 2, "quantity": 3 });
        this.tiles.set("h", { "points": 4, "quantity": 2 });
        this.tiles.set("i", { "points": 1, "quantity": 9 });
        this.tiles.set("j", { "points": 8, "quantity": 1 });
        this.tiles.set("k", { "points": 5, "quantity": 1 });
        this.tiles.set("l", { "points": 1, "quantity": 4 });
        this.tiles.set("m", { "points": 3, "quantity": 2 });
        this.tiles.set("n", { "points": 1, "quantity": 6 });
        this.tiles.set("o", { "points": 1, "quantity": 8 });
        this.tiles.set("p", { "points": 3, "quantity": 2 });
        this.tiles.set("q", { "points": 10, "quantity": 1 });
        this.tiles.set("r", { "points": 1, "quantity": 6 });
        this.tiles.set("s", { "points": 1, "quantity": 4 });
        this.tiles.set("t", { "points": 1, "quantity": 6 });
        this.tiles.set("u", { "points": 1, "quantity": 4 });
        this.tiles.set("v", { "points": 4, "quantity": 2 });
        this.tiles.set("w", { "points": 4, "quantity": 2 });
        this.tiles.set("x", { "points": 8, "quantity": 1 });
        this.tiles.set("y", { "points": 4, "quantity": 2 });
        this.tiles.set("z", { "points": 10, "quantity": 1 });
    }
    shuffleBag() {
        for (var i = this.bag.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = this.bag[i];
            this.bag[i] = this.bag[j];
            this.bag[j] = temp;
        }
    }
    setupBag() {
        this.bag = [];
        var n = 0;
        for (const key of this.tiles.keys()) {
            for (let i = 0; i < this.tiles.get(key).quantity; i++) {
                this.bag[n] = new Tile(n, key);
                n++;
            }
        }
        this.shuffleBag();
        this.shuffleBag();
        this.shuffleBag();
        this.shuffleBag();
        this.shuffleBag();
        this.shuffleBag();
        this.shuffleBag();
        this.shuffleBag();
    }
    setupPlayers() {
        this.players = [];
        for(let i = 0;i < 4;i++) {
            this.players[i] = new Player(i);
            this.replaceHand(i);
        }
        this.sessionPlayer = 0;
    }
    gameSetup() {
        this.setupBoard();
        this.setupTiles();
        this.setupBag();
        this.setupPlayers();
    }

    replaceHand(player) {
        var n = 0;
        for(let i = 0;i < 7;i++) {
            if(this.players[player].hand[i] == null) {
                this.players[player].hand[i] = this.bag[n];
                this.bag[n] = null;
                n++;
            }
        }
        this.bag = this.bag.filter(tile => {
            return tile !== null;
        });
        this.shuffleBag();
        this.shuffleBag();
        this.shuffleBag();
    }
    validateMove() {
        
    }
    updateBoard() {

    }
    updatePlayers() {

    }

}

module.exports = Game;