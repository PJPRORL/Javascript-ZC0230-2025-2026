// Oefening 1
function oppervlakte(breedte: number, hoogte: number): number {
    let berekening: number = breedte * hoogte;

    return berekening;
}

console.log(oppervlakte(34, 33));

// Oefening 2
function verdubbel(getal: number) {
    return getal * 2; // Het systeem geeft automatisch het type number terug als return type.
}

// Oefening 3
function toon(tekst: string): void {
    console.log(tekst);
}

toon("Deze functie is van het type void.");

// Oefening 4
function begroet(naam: string, titel?: string) {
    if (titel) {
        return `Hallo, ${titel} ${naam}!`;
    }
    return `hallo, ${naam}!`;
}

// Test 1: Zonder titel
console.log(begroet("Jeroen")); // Output: Hallo, Sara!

// Test 2: Met titel
console.log(begroet("Jeroen", "dr.")); // Output: Hallo, dr. Sara!

// Oefening 5
function prijsMetBtw(prijs: number, btw: number = 1.21): number {
    return prijs * btw;
}

console.log(prijsMetBtw(100));
console.log(prijsMetBtw(100, 1.06));

// Oefening 6


// Oefening 7
