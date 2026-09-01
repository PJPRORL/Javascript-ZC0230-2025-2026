let leeftijd: number = 30;
let naam: string = "Jeroen"
let isLeuk = true;

if (isLeuk) {
    let leuk = "leuk";
    console.log(`Ik ben ${naam}. Mijn leeftijd is: ${leeftijd}. Ik vindt Typescript: ${leuk}`)
}

let punten = 100;
let tekst = "Typescript geeft automatisch het type number mee."
// Typescript geeft automatisch het type number mee.
console.log(`${punten} ${tekst}`);

let mysterie;
// Het krijgt automatish het type any, omdat er niets is toegewezen aan het variabelen, waardoor het eender welk type kan zijn.
mysterie = 5;
// Typescript klaagt niet omdat het nooit een type heeft gekregen, waardoor er alles in gestoken kan worden.
// Omdat je telkens enkel mysterie aanspreekt kan je meerdere mysteries opvullen met verschillende datatypes en geen foutmelding krijgen.
