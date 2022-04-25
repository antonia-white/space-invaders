/**
 * @jest-environment jsdom
 */

 beforeAll(() => {
    let fs = require("fs");
    let fileContents = fs.readFileSync("index.html", "utf-8");
    document.open();
    document.write(fileContents);
    document.close();
})

// Modal navigation
describe("modals open and buttons navigate to the correct modal", () => {
    test("modals exist", () =>{
        expect("homeModal" in document).toBeDefined();
        expect("instructionsModal" in document).toBeDefined();
        expect("scoreboardModal" in document).toBeDefined();
        expect("endGameModal" in document).toBeDefined();
    });
    test("modals contain correct ids")
})