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

let game = new Phaser.Game(config);

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
};

/** Preload assets into scene, e.g., images and sounds */
function preload() {
    this.load.image("spaceship", "assets/media/spaceship.svg");
    this.load.image("alien", "assets/media/alien.svg");
    this.load.image("laser", "assets/media/laser.svg");
    this.load.image("ufo", "assets/media/ufo.svg");
}

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

    isFiring = false;
    attacker = scene.physics.add.staticGroup();

    //Add rectangles in game area that define where game objects are destroyed i.e., game stage edges
    spaceshipArea = scene.add.rectangle(0, 0, 800, 10, 0x000).setOrigin(0);
    alienArea = scene.add.rectangle(0, 590, 800, 10, 0x000).setOrigin(0);
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
            shoot();
        }
    });
    initAliens();
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
}

/**Function to make shooting functionality */
function shoot() {
    if (isLive == true) {
        if (isFiring == false) { //Prevents rapid firing
            manageLaser(scene.physics.add.sprite(spaceship.x, spaceship.y + -40, "laser"));
            isFiring = true;
        }
    }

}

/**Establishes alien  attacker group */
function initAliens() {
    for (c = 0; c < alienInfo.count.col; c++) {
        for (r = 0; r < alienInfo.count.row; r++) {
            let attackerX = (c * (alienInfo.width + alienInfo.padding)) + alienInfo.offset.left;
            let attackerY = (r * (alienInfo.height + alienInfo.padding)) + alienInfo.offset.top;
            attacker.create(attackerX, attackerY, "alien").setOrigin(0.5);
        }
    }
}

//ALIEN MOVEMENT
//Set aliens to move every 0.75 seconds
setInterval(moveAliens, 750);

let xTimes = 0;
let yTimes = 0;
//Set starting direction to right
let dir = "right";

/**Periodically move alien attackers */
function moveAliens() {
    if (isLive === true) {
        //Set direction of movement -- this could be switch
        if (xTimes === 20) {
            if (dir === "right") {
                dir = "left";
                xTimes = 0;
            } else {
                dir = "right";
                xTimes = 0;
            }
        }
        if (dir === "right") {
            //movement in the right direction
            attacker.children.each(function (enemy) {
                enemy.x = enemy.x + 10; //increase position on x anxis by 10
                enemy.body.reset(enemy.x, enemy.y);
            }, this);
            //increment xTimes
            xTimes++;
        } else {
            //movement in the left direction
            attacker.children.each(function (enemy) {
                enemy.x = enemy.x - 10; //decrease position on x axis by 10
                enemy.body.reset(enemy.x, enemy.y);
            }, this);
            //increment xTimes
            xTimes++;
        }
    }

}


//UFOS
let ufos = [];
/**Function to generate UFO into gameplay */
function makeUfo() {
    if (isLive === true) {
        manageUfo(scene.physics.add.sprite(0, 60, "ufo"))
    }
}

/**set ufo interval to 2secs */
setInterval(function () {
    if (isLive === true) {
        for (let i = 0; i < ufos.length; i++) {
            let ufo = ufos[i];
            if (ufo.isDestroyed == false) {
                manageAlienLaser(scene.add.sprite(ufo.x, ufo.y, "laser"), ufo)
            } else {
                ufos.splice(i, 1);
            }
        }
    }
}, 2000);

/** */
function manageUfo(ufo) {
    ufos.push(ufo);
    ufo.isDestroyed = false;
    ufo.setVelocityX(100);
    scene.physics.add.overlap(ufo, ufoArea, function(){
        ufo.destroy();
        ufo.isDestroyed = true;
    })
}

//PLAYER FIRE
/**Manage player's spaceship laser shooter */
function manageLaser(laser) {
    laser.setVelocityY(-380);
    let i = setInterval(function () {
            attacker.children.each(function (enemy) {
                if (checkCollision(laser, enemy)) {
                    //destroy laser on impact with alien attacker
                    laser.destroy();
                    clearInterval(i);
                    isFiring = false;
                    //destroy alien on impact
                    enemy.destroy();
                    //increment score
                    score++;
                    //display new score
                    scoreText.setText("Score: " + score);

                    //define game win as 
                    if ((score - ufoCount) === alienInfo.count.col * alienInfo.count.row) {
                        endGame("Win");
                    }

                }

            }, this);

            //iterate through UFOs
            for (let step = 0; step < ufos.length; step++) {
                let ufo = ufo[step];
                //check collision between ufo and bullet
                if (checkCollision(laser, ufo)) {
                    laser.destroy();
                    clearInterval(i);
                    //allow next shot
                    isFiring = false;
                    //upate score display
                    scoreText.setText("Score: " + score);

                    //define game win
                    if ((score - ufoCount) === (alienInfo.count.col * alienInfo.count.row)) {
                        end("Win");
                    }

                    ufo.destroy();
                    ufo.isDestroyed = true;
                    score++;
                    ufoCount++;
                }
            }
        },
        //set time to 10ms
        10);
    scene.physics.add.overlap(laser, spaceshipArea, function () {
        laser.destroy();
        clearInterval(i);
        isFiring = false;
    });

}

//ALIEN FIRE
let alienLaserVelocity = 200;

/**Finds the angle and velocity of enemy fire and stores it in the laser */
function manageAlienLaser(laser, enemy) {
    //Find angle of fire between spaceship and alien
    let angleOfFire = Phaser.Math.Angle.BetweenPoints(enemy, spaceship);
    //Calculate the velocity when given rotation and speed. Laser body stores the velocity
    //https://newdocs.phaser.io/docs/3.55.2/focus/Phaser.Physics.Arcade.ArcadePhysics-velocityFromRotation
    scene.physics.velocityFromRotation(angleOfFire, alienLaserVelocity, laser.body.velocity);
    //Increases velocity after every shot
    alienLaserVelocity = alienLaserVelocity + 2;

    let i = setInterval(function () {
            if (checkCollision(laser, spaceship)) {
                //destroy laser on impact with spaceship
                laser.destroy();
                clearInterval(i);
                //reduce lives by 1
                lives--;
                //display new lives text
                livesText.setText("Lives: " + lives);

                //define lost game as 
                if (lives === 0) {
                    endGame("Lose");
                }

            }

        },
        //set time to 10ms
        10);
    scene.physics.add.overlap(laser, alienArea, function () {
        laser.destroy();
        clearInterval(i);
    });

}

//Set alien fire to every 3seconds
setInterval(alienFire, 3000);


function alienFire() {
    if (isLive === true) {
        let enemy = attacker.children.entries[Phaser.Math.Between(0, attacker.children.entries.length - 1)];
        manageAlienLaser(scene.physics.add.sprite(enemy.x, enemy.y, "laser"), enemy)
    }

}

//COLLISIONS
//https://phaser.discourse.group/t/check-collision-overlap-between-sprites-without-physics/6696/3
//https://photonstorm.github.io/phaser3-docs/Phaser.Geom.Intersects.html
/**Detects collision between two sprites, returns boolean in scene's update method */
function checkCollision(spriteA, spriteB) {
    let edgeA = spriteA.getBounds();
    let edgeB = spriteB.getBounds();
    return Phaser.Geom.Intersects.RectangleToRectangle(edgeA, edgeB);
}



/**Ends game */
function endGame(con) {
    alert(`You ${con}! Score: ${score}`); //change to modal
    //reloads current page to restart
    location.reload();
}