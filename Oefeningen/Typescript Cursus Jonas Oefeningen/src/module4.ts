// Leerstof objecten - Hoe het niet moet
let persoon: { naam: string; leeftijd: number } = {
    naam: "Jeroen",
    leeftijd: 30,
};

console.log(`Hallo, ik ben ${persoon.naam} en ben ${persoon.leeftijd} jaar oud!`);

// Leerstof objecten - Hoe het wel moet
type Mens = {
    naam: string;
    leeftijd: number;
    email?: string;
};

let Jeroen: Mens = { naam: "Jeroen", leeftijd: 30 };
let Jeroen2: Mens = { naam: "Jeroen", leeftijd: 30, email: "piussi-jeroen@hotmail.com"};
let Annabelle: Mens = { naam: "Annabelle", leeftijd: 30 };

if (Jeroen2.email){
    console.log(`Hallo, ik ben ${Jeroen2.naam}. Ik ben ${Jeroen2.leeftijd} en mijn mailadres is: ${Jeroen2.email} `);
}

console.log(`Hallo, ik ben ${Jeroen.naam}. Ik ben ${Jeroen.leeftijd} jaar oud!`);

// Leerstof Interface
interface Persoon {
    naam: string;
    leeftijd: number;
    email?: string;
}

let Manon: Persoon = { naam: "Manon", leeftijd: 25 };
console.log("\nHier beginnen de oefeningen!!!")
//Oefeningen
console.log("\nOefening 1:")
type Boek = { titel: string; paginas: number }
let boek: Boek = { titel: "Harry Potter", paginas: 723 };
console.log(`Het gekozen boek is: ${boek.titel}`);

console.log("\nOefening 2:")
type Medewerker = {naam: string; leeftijd: number};
let medeweker1: Medewerker = { naam: "Jeroen", leeftijd: 30 };
let medeweker2: Medewerker = { naam: "Manon", leeftijd: 25 };

console.log(`Medewerker 1: ${medeweker1.naam}`);
console.log(`Medewerker 2: ${medeweker2.naam}`);

console.log("\nOefening 3:")
type Contact = {
    email?: string;
} & Medewerker

let medewerker3: Contact = { naam: "Annabelle", leeftijd: 30 };
let medewerker4: Contact = { naam: "Bart", leeftijd: 35, email: "bart@hotmail.com" };

if (medewerker4.email) {
    console.log(`Medewerker 4: ${medewerker4.email}`);
}

if (medewerker3.email) {
    console.log(`Medewerker 3: ${medewerker3.email}`);
}

console.log("\nOefening 4 & 5:")
interface Person {
    naam: string;
    voornaam: string;
    leeftijd: number;
    email?: string;
}

let person: Person = {naam: "Piussi", voornaam: "Jeroen", leeftijd: 30};

let persons: Person[] = [
    {
        naam: "Looyens",
        voornaam: "Manon",
        leeftijd: 25,
    },
    {
        naam: "Looyens",
        voornaam: "Annabelle",
        leeftijd: 30,
    },
    {
        naam: "Piussi",
        voornaam: "Jeroen",
        leeftijd: 30,
    }
];

for (let person of persons) {
    console.log(`Persoon ${person.voornaam} heeft als leeftijd ${person.leeftijd}`);
}

console.log("\nOefening 7: Uitbreiding op Oefening 5")
interface Werknemer extends Person{
    bedrijf: string;
    volledigeNaam?: string;
}

let werknemer: Werknemer = {
    naam: "Piussi",
    voornaam: "Jeroen",
    leeftijd: 30,
    bedrijf: "Alternate België",
    volledigeNaam: "Jeroen Piussi"
}

console.log(`Werknemer ${werknemer.volledigeNaam} werkt bij ${werknemer.bedrijf}`);