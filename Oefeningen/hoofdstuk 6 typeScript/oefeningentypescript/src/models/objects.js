"use strict";
/* Creëren van functie met object als input */
function printName2(cat) {
    console.log(`I have 2 cats, the first cat is ${cat.first}, the last cat is ${cat.last}`);
}
printName2({ first: "Toulouse", last: "Marie" });
/* Creëren van object met random inputs */
let coördinaten = { x: 34, y: 2 };
function randomCoördinaten() {
    return { x: Math.random(), y: Math.random() };
}
console.log(`${coördinaten.x} en ${coördinaten.y}`);
