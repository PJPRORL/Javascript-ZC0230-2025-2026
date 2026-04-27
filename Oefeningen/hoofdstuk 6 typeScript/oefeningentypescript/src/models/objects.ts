/* Creëren van functie met object als input */
function printName2 (cat: {first: string, last: string}) : void{
    console.log(`I have 2 cats, the first cat is ${cat.first}, the last cat is ${cat.last}`);
}

printName2({first: "Toulouse", last: "Marie"});

/* Creëren van object met random inputs */
let coördinaten: {x: number; y: number} = {x: 34, y: 2};

function randomCoördinaten() : { x: number; y: number }{
    return { x: Math.random(), y: Math.random() };
}

console.log(`${coördinaten.x } en ${coördinaten.y}`)