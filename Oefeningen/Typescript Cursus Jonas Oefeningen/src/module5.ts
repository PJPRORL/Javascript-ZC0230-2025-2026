/*console.log("Hier begint de leerstof!!!\n")

let id: string | number;

id = 123;
id = "abc-123";
//id = true; - Dit geeft een foutmelding omdat id enkel van het type string of number mag zijn.
*/
console.log("Hier beginnen de oefeningen!!!\n")
console.log("\nOefening 1:")

let iD: string | number;
iD = 123;
console.log(`${iD}`);
iD = "hallo";
console.log(`${iD}`);

console.log("\nOefening 2:")

function toonId(id: string | number): void {
    if (typeof id === "string") {
        console.log(id.toUpperCase());
    } else {
        console.log(id.toFixed(0));
    }
}

toonId("32");

console.log("\nOefening 3:");

type Richting = "noord" | "oost" | "zuid" | "west";

let richting: Richting = "noord"; // TS2322: Type "omhoog" is not assignable to type Richting
console.log(`${richting}: TS2322: Type "omhoog" is not assignable to type Richting`);

console.log("\nOefening 4:");

function beweeg(richting: Richting): void {
    if (richting === "noord") {
        console.log(`Je gaat op dit moment naar het ${richting}en`);
    }
}

beweeg("noord");

console.log("\nOefening 5:");

