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

// Set audio image
function setAudioImage(checkbox) {
    if (checkbox.checked === true) {
        document.getElementById("audio-off-img").style.display = "none";
        document.getElementById("audio-on-img").style.display = "block";
    } else if (checkbox.checked === false) {
        document.getElementById("audio-off-img").style.display = "block";
        document.getElementById("audio-on-img").style.display = "none";
    }
}

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

// Export make scoreboard function for jest testing
if (typeof module !== "undefined") module.exports = {
    setAudioImage
};

// module.exports = { setAudioImage };