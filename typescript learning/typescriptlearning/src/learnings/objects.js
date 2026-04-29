"use strict";
/* Creëren van functie met object als input */
function printName2(cat) {
    console.log(`I have 2 cats, the first cat is ${cat.first}, the last cat is ${cat.last}`);
}
printName2({ first: "Toulouse", last: "Marie" });
function randomCoordinaten() {
    return { x: Math.random(), y: Math.random() };
}
console.log(randomCoordinaten());
function doublePoint(point) {
    return { x: point.x * 2, y: point.y * 2 };
}
console.log(doublePoint);
function calculatePayout(song) {
    return song.numStreams * 0.0033;
}
//
function printSong(song) {
    console.log(`${song.title} - ${song.artist}`);
}
const mySong = {
    title: "Unchained Melodyt",
    artist: "Righteous Brothers",
    numStreams: 76756788,
    credits: {
        producer: "Phil Spector",
        writer: "Alex North"
    }
};
const earnings = calculatePayout(mySong);
console.log(earnings);
printSong(mySong);
const myPoint = { x: 1, y: 3 };
console.log(myPoint);
const user = {
    id: 22,
    username: "PJPRO"
};
console.log(user.id);
const happyFace = {
    radius: 4,
    color: "yellow",
};
const christy = {
    numLives: 7,
    breed: "Husky",
    age: 9
};
console.log(happyFace);
console.log(christy);
