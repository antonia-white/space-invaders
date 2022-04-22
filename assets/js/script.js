/* jshint esversion: 8 */

//MODALS
// Get the modals
let homeModal = document.getElementById("homeModal");
let instructionsModal = document.getElementById("instructionsModal");
let scoreboardModal = document.getElementById("scoreboardModal");
let endGameModal = document.getElementById("endGameModal");

//Get the buttons
let startBtn = document.getElementById("startBtn");
let instructionsBtn = document.getElementById("instructionsBtn");
let scoreboardBtn = document.getElementById("scoreboardBtn");
let instructionsBackBtn = document.getElementById("instructionsBackBtn");
let scoreboardBackBtn = document.getElementById("scoreboardBackBtn");
let homeScreenBtn = document.getElementById("homeScreenBtn");

// When the user loads open the homeModal
window.onload = function () {
    homeModal.style.display = "block";
};

// When the user clicks on the instructions button, open the instructions modal
instructionsBtn.onclick = function () {
    homeModal.style.display = "none";
    instructionsModal.style.display = "block";
};

//When scoreboard button clicked show scoreboard
scoreboardBtn.onclick = function () {
    homeModal.style.display = "none";
    scoreboardModal.style.display = "block";
    makeScoreboard();
};

//When back button clicked hide instructions modal and show homeModal
instructionsBackBtn.onclick = function () {
    instructionsModal.style.display = "none";
    homeModal.style.display = "block";
};

//When scoreboards back button clicked hide scoreboard modal and show homeModal
scoreboardBackBtn.onclick = function () {
    scoreboardModal.style.display = "none";
    homeModal.style.display = "block";
};

// When home button clicked hide end game modal and show home modal
homeScreenBtn.onclick = function () {
    endGameModal.style.display = "none";
    location.reload();
};

//GAME
// Phaser configuration
let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'game',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: 0
            },
            debug: false
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

    this.load.audio("gameOver", ["assets/media/game-end-sound.wav"]);
    this.load.audio("hitAlien", ["assets/media/hit-hostile-sound.wav"]);
    this.load.audio("lostLife", ["assets/media/lost-life-sound.wav"]);
    this.load.audio("spaceshipLaser", ["assets/media/spaceship-laser-sound.wav"]);
    this.load.audio("ufoSound", ["assets/media/ufo-sound.wav"])
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
    spaceship = scene.physics.add.sprite(400, 560, "spaceship").setCollideWorldBounds(true).setInteractive({
        draggable: true
    });

    // Controls for Mobile device
    spaceship.on('drag', function (pointer, dragX) {
        this.x = dragX;
    });

    this.input.addPointer(2);

    pointer1 = this.input.pointer1;
    pointer2 = this.input.pointer2;

    //Add score and lives text
    scoreText = scene.add.text(16, 16, "Score: " + score, {
        fontSize: '18px',
        fill: '#FFF'
    });
    livesText = scene.add.text(696, 16, "Lives: " + lives, {
        fontSize: '18px',
        fill: '#FFF'
    });

    //Add sounds
    gameOver = this.sound.add("gameOver", {loop: false});
    hitAlien = this.sound.add("hitAlien", {loop: false});
    lostLife = this.sound.add("lostLife", {loop: false});
    spaceshipLaser = this.sound.add("spaceshipLaser", {loop: false});
    ufoSound = this.sound.add("ufoSound", {loop: true});


    //Shoot event listner
    //Keyboard
    scene.input.keyboard.on('keydown-SPACE', shoot);
    //Touchscreen
    scene.input.on('pointerdown', shoot);

    /**Start game function activated when start game button clicked */
    startBtn.onclick = function () {
        //Remove home screen
        homeModal.style.display = "none";
        if (isLive === false) {
            isLive = true;
            setInterval(makeUfo, 15000);

        } else {
            shoot();
        }
    };
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
            spaceshipLaser.play();
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

//ALIEN FIRE

let alienLaserVelocity = 200;

/**Finds the angle and velocity of enemy fire and stores it in the laser */
function manageAlienLaser(laser, enemy) {

    //Find angle of fire between spaceship and alien
    let angleOfFire = Phaser.Math.Angle.BetweenPoints(enemy, spaceship);

    //Calculate the velocity when given rotation and speed. Laser body stores the velocity
    scene.physics.velocityFromRotation(angleOfFire, alienLaserVelocity, laser.body.velocity);

    //Increases velocity after every shot
    alienLaserVelocity = alienLaserVelocity + 2;

    let i = setInterval(function () {
            if (checkCollision(laser, spaceship)) {
                //destroy laser on impact with spaceship
                laser.destroy();
                takenDamange();
                clearInterval(i);
                //reduce lives by 1
                lives--;
                //play lost life sound
                lostLife.play();
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

//Taken damage to make spaceship flash red
function takenDamange() {
spaceship.tint = 0xb80404;
this.scene.time.addEvent({
    delay: 150,
    callback: function(){ spaceship.clearTint(); },
    callbackScope: spaceship,
 });
}

//Set alien fire to every 3seconds
setInterval(alienFire, 3000);


function alienFire() {
    if (isLive === true) {
        let enemy = attacker.children.entries[Phaser.Math.Between(0, attacker.children.entries.length - 1)];
        manageAlienLaser(scene.physics.add.sprite(enemy.x, enemy.y, "laser"), enemy);
    }

}

//UFOS

let ufos = [];

/**Function to generate UFO into gameplay */
function makeUfo() {
    if (isLive === true) {
        manageUfo(scene.physics.add.sprite(0, 60, "ufo"));
    }
}

/**set ufo interval to 2secs */
setInterval(function () {
    if (isLive === true) {
        for (let i = 0; i < ufos.length; i++) {
            let ufo = ufos[i];
            if (ufo.isDestroyed == false) {
                manageAlienLaser(scene.physics.add.sprite(ufo.x, ufo.y, "laser"), ufo);
            } else {
                ufos.splice(i, 1);
            }
        }
    }
}, 2000);

/**Manages action of ufo in gameplay */
function manageUfo(ufo) {
    ufos.push(ufo);
    ufo.isDestroyed = false;
    ufo.setVelocityX(100);
    scene.physics.add.overlap(ufo, ufoArea, function () {
        ufo.destroy();
        ufo.isDestroyed = true;
        ufoSound.stop();
    });
    ufoSound.play();
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
                    //Play sound
                    hitAlien.play();
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
                let ufo = ufos[step];
                //check collision between ufo and laser
                if (checkCollision(laser, ufo)) {
                    laser.destroy();
                    clearInterval(i);
                    //allow next shot
                    isFiring = false;

                    //define game win
                    if ((score - ufoCount) === (alienInfo.count.col * alienInfo.count.row)) {
                        end("Win");
                    }

                    ufo.destroy();
                    ufo.isDestroyed = true;
                    //Stop ufo sound
                    ufoSound.stop();
                    //Play hit sound
                    hitAlien.play();
                    //Increment score
                    score++;
                    ufoCount++;
                    //upate score display
                    scoreText.setText("Score: " + score);
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

//COLLISIONS

/**Detects collision between two sprites, returns boolean in scene's update method */
function checkCollision(spriteA, spriteB) {
    let edgeA = spriteA.getBounds();
    let edgeB = spriteB.getBounds();
    return Phaser.Geom.Intersects.RectangleToRectangle(edgeA, edgeB);
}

//End game

/**Ends game */
function endGame(con) {
    //Pauses scene
    scene.scene.pause();
    //Stops gameplay
    isLive = false;
    //Stops sounds
    spaceshipLaser.stop();
    hitAlien.stop();
    lostLife.stop();
    ufoSound.stop();
    //Plays end game sound
    gameOver.play();
    //Display end game screen
    endGameModal.style.display = "block";
    //Adds outcome and score to display
    document.getElementById("end-game-message").innerHTML += `You ${con}! Score: ${score}`;
    createHighScores(score);
}

// CREATE HIGH SCORES ARRAY FOR SCOREBOARD
// Set variable to limit high scores to 10
function createHighScores(score) {
    // let numberOfHighscore = 10;
    // Convert score from number into string for local storage (no numbers)
    let stringScore = score.toString();
    //Add score to local storage - only accepts strings
    localStorage.setItem('score', stringScore);
    //Access previous local storage highscores array or create a new array if it's the first time
    let highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    //Push score from local storage onto highscores array
    highScores.push(localStorage.getItem('score'));
    //Convert string array into number array for sorting
    JSON.parse(localStorage.getItem("highScores"));
    //Sort highscores into descending value
    highScores.sort(function (a, b) {
        return a - b;
    }).reverse();
    //Splice highscores array at the 10th index
    highScores.splice(10);
    //Save highscores into local storage
    localStorage.setItem('highScores', JSON.stringify(highScores));
}

// Change scoreboard HTML to list of 10 ordered highscores
function makeScoreboard() {
    let list = "<li>" + JSON.parse(localStorage.getItem("highScores")).join("</li><li>") + "</li>";
    document.getElementById("scoreboard-list").innerHTML = list;
    console.log("This is the list item:", list);
    console.log("This is the type of data the list item is:", typeof list);
}

// Alter modal content styling if playing on chrome or edge browsers for a perfect overlay - else do nothing
if ((window.navigator.userAgent.indexOf("Chrome") > -1) || (window.navigator.userAgent.indexOf("Edge/") > -1)) {
    let modalContent = document.getElementsByClassName("modal-content");
    for (var i = 0; i < modalContent.length; i++) {
        modalContent[i].style.margin = "186px auto";
    }
}