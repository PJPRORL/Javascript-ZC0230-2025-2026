"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gedeeld = void 0;
let zanger = "Koen Wouters";
// Afgeleid type: string
let besteLied = Math.random() > 0.5
    ? "Chain of Fools"
    : "Respect";
// Het type systeem
let voornaam = "Whitney";
voornaam.length();
//        ~~~~~~
// Error: This expression is not callable.
//   Type 'Number' has no call signatures.
// Syntax fouten
let let, wat;
//      ~~~
// Error: ',' expected.
// Type-fouten
console.blub("Niets is meer waard dan lachen.");
//      ~~~~
// Error: Property 'blub' does not exist on type 'Console'.
// Toewijsbaarheid (Assignability)
// Zelfde type toewijzen — geen probleem:
let voornaam = "Carole";
voornaam = "Joan"; // OK — beide zijn strings
// Ander type toewijzen — foutmelding:
let achternaam = "King";
achternaam = true;
//Error: Type 'boolean' is not assignable to type 'string'.
// Type-annotaties
let rocker; // Type: any
rocker = "Joan Jett"; // Type wordt: string
rocker.toUpperCase(); // OK
rocker = 19.58; // Type wordt: number
rocker.toPrecision(1); // OK
rocker.toUpperCase();
//     ~~~~~~~~~~~
// Error: 'toUpperCase' does not exist on type 'number'.
// De oplossing: type-annotaties
let rocker;
rocker = "Joan Jett"; // OK
// Voorbeeld
let variabele;
// TypeScript
let rocker;
rocker = "Joan Jett";
// Gecompileerde JavaScript
let rocker;
rocker = "Joan Jett";
let rocker;
rocker = 19.58;
// Error: Type 'number' is not assignable to type 'string'.
// Overbodige type-annotaties
let voornaam = "Tina"; // Overbodig — TypeScript weet al dat het een string is
// Type Shapes
let rapper = "Queen Latifah";
rapper.length; // OK — strings hebben een 'length' eigenschap
rapper.push('!');
//     ~~~~
// Error: Property 'push' does not exist on type 'string'.
// Dit werkt ook met objecten:
let cher = {
    voornaam: "Cherilyn",
    achternaam: "Sarkisian",
};
cher.tweedeNaam;
//   ~~~~~~~~~~
// Error: Property 'tweedeNaam' does not exist on type
// '{ voornaam: string; achternaam: string; }'.
// Modules vs Scripts
// a.ts
exports.gedeeld = "Cher"; // OK
// b.ts
exports.gedeeld = "Cher"; // OK — geen conflict, ander bestand
// Scripts delen scope
// a.ts (geen import/export = script)
const gedeeld = "Cher";
//    ~~~~~~~
// Error: Cannot redeclare block-scoped variable 'gedeeld'.
// b.ts (geen import/export = script)
const gedeeld = "Cher";
//    ~~~~~~~
// Error: Cannot redeclare block-scoped variable 'gedeeld'.
