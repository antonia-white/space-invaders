/* jshint esversion: 8, jquery: true */

// Phaser configuration
let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: 0
            },
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
    //offset aliens from canvas edge
    offset: {
        top: 100,
        left: 60
    },
    //padding between aliens
    padding: 10,
}

/** Preload assets into scene, e.g., images and sounds */
function preload() {
    this.load.image("spaceship", "assets/media/spaceship.svg");
    this.load.image("alien", "assets/media/alien.svg");
    this.load.image("laser", "assets/media/laser.svg");
    this.load.image("ufo", "assets/media/ufo.svg");
};

//Set variables for gameplay
let score = 0;
let lives = 3;
let isLive = false;
let ufoCount = 0;

/** Adds objects to game */
function create() {
    scene = this;
    //Processing DOM Keyboard Events
    cursors = scene.input.keyboard.createCursorKeys();
    keyA = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    keyD = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.input.keyboard.addCapture('SPACE');

    isShooting = false;
    attacker = scene.physics.add.staticGroup();

    //Add rectangles in game area that define where game objects are destroyed i.e., game stage edges
    spaceshipArea = scene.add.rectangle(0, 0, 800, 10, 0x000).setOrigin(0);
    alienArea = scene.add.rectangle(0, 590, 800, 10, 0x000).setOrigin(0)
    ufoArea = scene.add.rectangle(790, 0, 10, 600, 0x000).setOrigin(0);
    scene.physics.add.existing(spaceshipArea);
    scene.physics.add.existing(alienArea);
    scene.physics.add.existing(ufoArea);

    //Add spaceship - sprites can be animated. Set world bounds so unable to drive over edge of screen
    spaceship = scene.physics.add.sprite(400, 560, "spaceship").setCollideWorldBounds(true);

    //Add score and lives text
    scoreText = scene.add.text(16, 16, "Score: " + score, {
        fontSize: '18px',
        fill: '#FFF'
    });
    livesText = scene.add.text(696, 16, "Lives: " + lives, {
        fontSize: '18px',
        fill: '#FFF'
    });

    //Shoot event listner
    scene.input.keyboard.on('keydown-SPACE', shoot);

    /**Start game function activated on a pointerdown event */
    this.input.on('pointerdown', function () {
        if (isLive === false) {
            isLive = true;
            setInterval(makeUfo, 15000);

        } else {
            shoot()
        }
    });
    initAliens()
}

/**Updates game, this function runs constantly*/
function update() {
    if (isLive === true) {
        if (cursors.left.isDown || keyA.isDown) {
            spaceship.setVelocityX(-160);

        } else if (cursors.right.isDown || keyD.isDown) {
            spaceship.setVelocityX(160);

        } else {
            spaceship.setVelocityX(0);

        }
    }
};

/**Function to make shooting functionality */
function shoot() {
    if (isLive == true) {
        if (isShooting == false) { //Prevents rapid firing
            manageLaser(scene.physics.add.sprite(spaceship.x, spaceship.y + -40, "laser"))
            isShooting = true;
        }
    }

};

/**Establishes alien  attacker group */
function initAliens() {
    for (c = 0; c < alienInfo.count.col; c++) {
        for (r = 0; r < alienInfo.count.row; r++) {
            let attackerX = (c * (alienInfo.width + alienInfo.padding)) + alienInfo.offset.left;
            let attackerY = (r * (alienInfo.height + alienInfo.padding)) + alienInfo.offset.top;
            attacker.create(attackerX, attackerY, "alien").setOrigin(0.5);
        }
    }
};

//ALIEN MOVEMENT
//Set aliens to move every second
setInterval(moveAliens, 1000)

let xTimes = 0;
let yTimes = 0;
let dir = "right";

/**Periodically move alien attackers */
function moveAliens() {

}

//PLAYER FIRE
/**Manage player's spaceship laser shooter */
function manageLaser() {

}

//ALIEN FIRE
/**Manage alien attacker's laser shooter */
let alienLaserVelocity = 200;

function manageAlienLaserVelocity(laser, alien) {

}
//Set alien fire to every 3seconds
setInterval(alienFire, 3000);

function enemyFire() {

};

//UFO
let ufo = [];
/**Function to generate UFO into gameplay */
function makeUfo() {

};

setInterval(function () {

}, 2000)

function manageUfo(ufo) {

};

//https://phaser.discourse.group/t/check-collision-overlap-between-sprites-without-physics/6696/3
//https://photonstorm.github.io/phaser3-docs/Phaser.Geom.Intersects.html
/**Detects collision between two sprites, returns boolean in scene's update method */
function checkOverlap(spriteA, spriteB) {
    let boundsA = spriteA.getBounds();
    let boundsB = spriteB.getBounds();
    return Phaser.Geom.Intersects.RectangleToRectangle(boundsA, boundsB);
}