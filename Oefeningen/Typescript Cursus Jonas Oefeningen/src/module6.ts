console.log("Hier beginnen de oefeningen!!!")
console.log("\nOefening 1:")
class Hond {
    naam: string;

    constructor(naam: string) {
        this.naam = naam;
    }

    blaf(): void {
        console.log(`${this.naam} zegt: Woef!`);
    }
}

const princess = new Hond("Princess");
princess.blaf();
console.log("\nOefening 2:")

class Rechthoek {
    breedte: number;
    hoogte: number;

    constructor(breedte: number, hoogte: number) {
        this.breedte = breedte;
        this.hoogte = hoogte;
    }

    oppervlakte(): number {
        return this.breedte * this.hoogte;
    }
}

let rechthoek: Rechthoek = new Rechthoek(3, 4)
console.log(`De rechthoek heeft een oppervlakte van: ${rechthoek.oppervlakte()} vierkante meter.`);

console.log("\nOefening 3:")

class Teller{
    stand: number;

    constructor() {
        this.stand = 0;
    }

    verhoog(): void {
        this.stand += 1;
    }

    toon(): void {
        console.log(`De huidige stand is: ${this.stand}`);
    }
}

const teller = new Teller();

teller.verhoog();
teller.verhoog();
teller.verhoog();

teller.toon();