/**
 * @jest-environment jsdom
 */

 let setAudioImage;
 
 beforeAll(() => {
     let fs = require("fs");
     let fileContents = fs.readFileSync("index.html", "utf-8");
     document.open();
     document.write(fileContents);
     document.close();
     setAudioImage = require('../modals.js').setAudioImage;
 });
 
 // Modal navigation
 describe("modals open and buttons navigate to the correct modal", () => {
     test("modals exist", () => {
         expect("homeModal" in document).toBeDefined();
         expect("instructionsModal" in document).toBeDefined();
         expect("scoreboardModal" in document).toBeDefined();
         expect("endGameModal" in document).toBeDefined();
     });
     test("instructios modal shows when instruction button is clicked", () => {
 
     });
 });
 
 // Audio toggle
 describe("audio checkbox toggles, returning a boolean value as expected", () => {
     test("button exists", () => {
         expect("audio-check" in document).toBeDefined();
     });
     test("audio checkbox is not ticked", () => {
         expect("audio-check" in document).toBeFalsy();
     });
 });
 
 // Audio image
 describe("audio image displays correctly", () => {
     beforeAll(() => {
         let checkbox = document.getElementById("audio-check");
         checkbox.checked = true;
         setAudioImage(checkbox);
     });
     test("expect setAudioImage function works correctly", () => {
         const audioOffImage = window.getComputedStyle(document.getElementById("audio-off-img")).getPropertyValue('display');
         const audioOnImage = window.getComputedStyle(document.getElementById("audio-on-img")).getPropertyValue('display');
         expect(audioOffImage).toEqual("none");
         expect(audioOnImage).toEqual("block");
     });
 });
 