let geboortedatum = new Date(prompt("Geef je geboortedatum in (YYYY-MM-DD): "));

const datum = Date.now();
let huidigeDatum = new Date(datum);

const days = ["zondag", "maandag", "dinsdag", "woensdag", "donderdag", "vrijdag", "zaterdag"];
let dayOfTheWeek = days[huidigeDatum.getDay()];

let datumsObject = {
    verjaardag: {
        jaar: geboortedatum.getFullYear(),
        maand: geboortedatum.getMonth() + 1,
        dag: geboortedatum.getDate()
    },
    huidigeDatum: {
        jaar: huidigeDatum.getFullYear(),
        maand: huidigeDatum.getMonth() + 1,
        dag: huidigeDatum.getDate()
    }
}

console.log(`Je geboortedatum is: ${datumsObject.verjaardag.dag}/${datumsObject.verjaardag.maand}/${datumsObject.verjaardag.jaar}`);
console.log(`Vandaag is het ${dayOfTheWeek} ${datumsObject.huidigeDatum.dag} ${datumsObject.huidigeDatum.maand} ${datumsObject.huidigeDatum.jaar}`);

const leeftijd = Math.floor((huidigeDatum - geboortedatum) / (1000 * 60 * 60 * 24));
console.log(`Je bent ${leeftijd} dagen oud.`);