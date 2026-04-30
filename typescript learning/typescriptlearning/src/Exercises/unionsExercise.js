"use strict";
// **********************************************
// ******************* PART 1 *******************
// **********************************************
// Create a variable called highScore that can be a number OR a boolean
// @ts-ignore
let highScore;
// **********************************************
// ******************* PART 2 *******************
// **********************************************
// create an array called stuff
// it can be an array of numbers OR an array of strings
// it cannot be an array of numbers and strings (mixed together)
// @ts-ignore
let stuff = [];
// Create an array called colors that can hold a mixture of RGB and HSL color types
let colors = [];
colors.push({ r: 255, h: 43, l: 33, b: 33, g: 44 });
// **********************************************
// ******************* PART 6 *******************
// **********************************************
// Write a function called greet that accepts a single string OR an array of strings
// It should print "Hello, <name>" for that single person OR greet each person in the array with the same format
function greet(names) {
    if (typeof names === "string") {
        console.log(`Hello, ${names}`);
    }
    else {
        for (const name of names) {
            console.log(`Hello, ${name}`);
        }
    }
}
greet("Jeroen");
greet(["Jeroen", "Annabelle", "Manon", "Marie", "Toulouse"]);
