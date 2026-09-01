import * as readline from 'readline/promises';
import { stdin as input, stdout as output } from 'process';

async function main() {
    const rl = readline.createInterface({input, output});

    let voornaam = await rl.question('Wat is je voornaam: ');
    let achternaam = await rl.question('Wat is je familienaam: ');
    let leeftijdInput = await rl.question('Wat is je leeftijd: ');

    const leeftijd = Number(leeftijdInput);

    rl.close();

    let volledigeNaam = `${voornaam} ${achternaam}`;
    console.log(`Ik ben ${volledigeNaam} en ik ben ${leeftijd} jaar oud!`)
}

main();