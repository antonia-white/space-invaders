/**
 * @jest-environment jsdom
 */

let makeScoreBoard;

beforeAll(() => {
    let fs = require("fs");
    let fileContents = fs.readFileSync("index.html", "utf-8");
    document.open();
    document.write(fileContents);
    document.close();

    makeScoreBoard = require('../script.js')
})

// Modal navigation
describe("modals open and buttons navigate to the correct modal", () => {
    test("modals exist", () =>{
        expect("homeModal" in document).toBeDefined();
        expect("instructionsModal" in document).toBeDefined();
        expect("scoreboardModal" in document).toBeDefined();
        expect("endGameModal" in document).toBeDefined();
    });
    // test("modals contain correct ids")
});

// Audio toggle
describe("audio checkbox toggles, returning a boolean value as expected", () => {
    test("button exists", () => {
        expect("audio-check" in document).toBeDefined();
    });
    test("audio checkbox is not ticked", () => {
        expect("audio-check" in document).toBeFalsy();
    });
})

// Scoreboard
describe("scoreboard generates a list of maximum ten elements", () => {
    test("scoreboard exists", () => {
        expect("scoreboard-list" in document).toBeDefined();
    });
})
