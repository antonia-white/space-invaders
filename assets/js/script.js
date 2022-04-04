/* jshint esversion: 8, jquery: true */

// Phaser configuration
var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

alienInfo = {
    //height and width of each alien
    width: 40,
    height: 20,
    //how many rows and collumns of aliens
    count: {
        row: 4,
        col: 9
    },
    //offset aliens from canvas
    offset: {
        top: 100,
        left: 60
    },
    //padding between aliens
    padding: 5
}

function preload() {

};

function create() {

};

function update() {

};

// set initial variables

// event listeners for game input
    // start game
    // keydown move ship
    // keydown shoot

// function startGame() {

// };

// function endGame() {

// };

// function resetGame() {

// };

// function moveShipLeft() {

// };

// function moveShipRight() {

// };

// function shoot() {

// };

// function generateAlienInvasion() {

// };

// function aliensMove() {

// };

// function aliensDescend() {

// };