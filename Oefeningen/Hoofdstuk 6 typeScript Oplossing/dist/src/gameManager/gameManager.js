import { randomUUID } from 'node:crypto';
export class GameManager {
    characters;
    constructor(characters) {
        // Kopieer de array om te voorkomen dat de originele array wordt gewijzigd
        this.characters = [...characters];
    }
    // Toon menu
    showMenu() {
        console.log('\n===== GAME MENU =====');
        console.log('1: Filter characters');
        console.log('2: Add character');
        console.log('3: Attack');
        console.log('0: Exit');
    }
    // Toon karakters:
    // standaard wordt de parameter characters opgevuld met de volledige characters array, maar je kunt ook een gefilterde lijst doorgeven
    showCharacters(characters = this.characters) {
        console.log('\n--- Characters ---');
        if (characters.length === 0) {
            console.log('No characters found.');
            return;
        }
        for (const char of characters) {
            console.log(`ID: ${char.id}`);
            console.log(`  Name: ${char.name}`);
            console.log(`  Class: ${char.class}`);
            console.log(`  Health: ${char.health}`);
            console.log(`  Mana: ${char.mana}`);
            console.log(`  Last Strike: ${char.lastStrike ? char.lastStrike.toLocaleString() : 'Never'}`);
            console.log('');
        }
    }
    // Filter karakters op class, health of mana
    filter() {
        const stat = prompt('Filter on which stat? (class, health, mana): ') ?? '';
        let filtered = [];
        if (stat.toLowerCase() === 'class') {
            filtered = this.filterOnClass(filtered);
        }
        else if (stat.toLowerCase() === 'health' || stat.toLowerCase() === 'mana') {
            filtered = this.filterOnStat(stat) ?? [];
        }
        else {
            console.log("Unknown stat. Choose 'class', 'health', or 'mana'.");
            return;
        }
        this.showCharacters(filtered);
    }
    filterOnClass(filtered) {
        const className = prompt('Which class? ') ?? '';
        filtered = this.characters.filter(c => c.class.toLowerCase() === className.toLowerCase());
        return filtered;
    }
    filterOnStat(stat) {
        // Vraag minimum waarde:
        const minValue = prompt(`Minimum value for ${stat}? `) ?? '';
        const min = parseInt(minValue, 10);
        // Check geldige invoer:
        if (Number.isNaN(min)) {
            console.log('Invalid number.');
            return null;
        }
        // Filter:
        if (stat.toLowerCase() === 'health') {
            return this.characters.filter(c => c.health >= min);
        }
        else {
            return this.characters.filter(c => c.mana >= min);
        }
    }
    // Voeg nieuw karakter toe
    addCharacter() {
        console.log('\n--- Add New Character ---');
        // Vraag details van de gebruiker:
        const name = prompt('Name: ') ?? '';
        const characterClass = prompt('Class: ') ?? '';
        const healthStr = prompt('Health (1-15): ') ?? '';
        const manaStr = prompt('Mana (1-5): ') ?? '';
        const health = parseInt(healthStr, 10);
        const mana = parseInt(manaStr, 10);
        if (Number.isNaN(health) || Number.isNaN(mana)) {
            console.log('Invalid number for health or mana.');
            return;
        }
        // Maak nieuw karakter aan:
        const newCharacter = {
            id: randomUUID(),
            name,
            class: characterClass,
            health,
            mana,
            lastStrike: null,
        };
        // Voeg toe aan de characters array:
        this.characters.push(newCharacter);
        // Toon bijgewerkte lijst:
        this.showCharacters();
    }
    // Zoek karakter op naam (case insensitive)
    findCharacterByName(name) {
        return this.characters.find(c => c.name.toLowerCase() === name.toLowerCase()) ?? null;
    }
    // Verwijder karakter uit de array (wordt aangeroepen als een karakter sterft)
    removeCharacter(character) {
        // Zoek index van het karakter in de array
        const index = this.characters.indexOf(character);
        // Verwijder karakter indien gevonden
        if (index > -1) {
            this.characters.splice(index, 1);
        }
    }
    // Aanval uitvoeren (na keuzes gebruiker)
    performAttack(attackPair) {
        const [attacker, defender] = attackPair;
        // Check mana
        if (attacker.mana < 2) {
            console.log(`\n${attacker.name} doesn't have enough mana to attack! (needs 2, has ${attacker.mana})`);
            return;
        }
        // Genereer schade (1-10)
        const damage = Math.floor(Math.random() * 10) + 1;
        // Pas de aanval toe
        attacker.mana -= 2;
        defender.health -= damage;
        attacker.lastStrike = new Date();
        // Check if defender is dead
        if (defender.health <= 0) {
            console.log(`\n${defender.name} has died!`);
            this.removeCharacter(defender);
        }
    }
    // Aanval (keuzes gebruiker + uitvoeren aanval oproepen)
    attack() {
        console.log('\n--- Attack ---');
        // Toon karakters zodat gebruiker weet wie er is
        this.showCharacters();
        // Vraag aanvaller
        const attackerName = prompt('Who is attacking? (name): ') ?? '';
        const attacker = this.findCharacterByName(attackerName);
        if (!attacker) {
            console.log(`Character "${attackerName}" not found.`);
            return;
        }
        // Vraag verdediger
        const defenderName = prompt('Who is being attacked? (name): ') ?? '';
        const defender = this.findCharacterByName(defenderName);
        if (!defender) {
            console.log(`Character "${defenderName}" not found.`);
            return;
        }
        // Maak attack pair aan
        const attackPair = [attacker, defender];
        // Voer de aanval uit
        this.performAttack(attackPair);
    }
    // Verwerk keuze van de gebruiker in het menu, retourneert false als het spel moet stoppen
    processChoice(choice) {
        switch (choice) {
            case '1':
                this.filter();
                break;
            case '2':
                this.addCharacter();
                break;
            case '3':
                this.attack();
                break;
            case '0':
                console.log('\nGoodbye!');
                return false; // Exit the loop
            default:
                console.log('Invalid choice. Please try again.');
        }
        return true; // Continue the loop
    }
    // Start van het spel
    start() {
        console.log('Welcome to the Character Game!');
        console.log(`Starting with ${this.characters.length} characters.\n`);
        // Lus:
        let continueRun = true;
        while (continueRun) {
            this.showMenu();
            const choice = prompt('Your choice: ') ?? '';
            continueRun = this.processChoice(choice);
        }
    }
}
//# sourceMappingURL=gameManager.js.map