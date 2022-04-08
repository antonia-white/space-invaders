/* jshint esversion: 8, jquery: true */

// Phaser configuration
let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: true
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


//Preload assets into scene, e.g., images and sounds
function preload() {
    this.load.image("spaceship", "assets/media/spaceship.svg");
    this.load.image("alien", "assets/media/alien.svg");
    this.load.image("laser", "assets/media/laser.svg");
    this.load.image("ufo", "assets/media/ufo.svg");
};

//Set some variables for gameplay
let score = 0;
let lives = 3;
let isLive = false;
let barriers = [];
let ufoCount = 0;

//Adds objects to game
function create() {
    scene = this;
    //Processing DOM Keyboard Events
    cursors = scene.input.keyboard.createCursorKeys();
    keyA = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    keyD = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.input.keyboard.addCapture('SPACE');
    
    isShooting = false;
    attacker = scene.physics.add.staticGroup();

    //Add rectangles in game area that define where game objects are destroyed
    spaceshipArea = scene.add.rectangle(0, 0, 800, 10, 0x000).setOrigin(0);
    alienArea = scene.add.rectangle(0, 590, 800, 10, 0x000).setOrigin(0)
    ufoArea = scene.add.rectangle(790, 0, 10, 600, 0x000).setOrigin(0);
    scene.physics.add.existing(spaceshipArea);
    scene.physics.add.existing(alienArea);
    scene.physics.add.existing(ufoArea);

};

//Updates game, this function runs constantly
function update() {
    if (isLive === true) {
        if (cursors.left.isDown || keyA.isDown) {
            spaceship.setVelocityX(-160);

        }
        else if (cursors.right.isDown || keyD.isDown) {
            spaceship.setVelocityX(160);

        }
        else {
            spaceship.setVelocityX(0);

        }
    }
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