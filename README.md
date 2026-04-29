# Welkom in de Uitgebreide Wereld van JavaScript (en TypeScript)

Welkom bij deze diepgaande cursus! We gaan in deze gids stap-voor-stap door de wonderlijke, en soms complexe, wereld van het web. Van het bijhouden van simpele lijstjes tot geavanceerd asynchroon data-management. We bouwen dit op vanuit het perspectief van *wat* we doen, en vooral *waarom* we het doen. 

Neem gerust een kop koffie, en laten we beginnen.

---

## Hoofdstuk 1: Lijsten, Arrays en Loops

### Korte Theorie: Wat is een Array?
In programmeren heb je vaak te maken met meerdere waarden. Denk aan een boodschappenlijstje, een lijst met gebruikers, of alle temperaturen van de afgelopen week. In plaats van voor elke waarde een aparte variabele te maken, groeperen we deze in een **Array**.

*Analogie:* Zie een array als een grote ladekast. De kast zelf is de array. Elke lade heeft een nummertje (de *index*, beginnend bij `0`) en in de lade ligt de inhoud (de *value*).

```javascript
// Een array met namen (lades 0, 1 en 2)
const studenten = ["Jan", "Piet", "Klaas"];

// De eerste lade uitlezen (index 0)
console.log(studenten[0]); // Resultaat: "Jan"

// Data toevoegen aan het einde van de kast
studenten.push("Marie"); 

// De laatste data verwijderen
studenten.pop(); 

// Data verwijderen of toevoegen in het midden
// splice(vanaf index, aantal verwijderen, optioneel: toevoegen)
studenten.splice(1, 1); // Verwijdert "Piet"
```

### Korte Theorie: Itereren (Loops)
Als je een grote kast met 100 lades hebt, ga je niet 100 keer `console.log()` typen. Je wilt de computer de opdracht geven: *"Ga elke lade af, en doe er iets mee."* Dit noemen we itereren (er doorheen lopen).

**1. De klassieke manier (`for`-loop):**
```javascript
for (let i = 0; i < studenten.length; i++) {
    console.log("Hallo " + studenten[i]);
}
```

**2. De moderne manier (`forEach` en `map`):**
Tegenwoordig gebruiken we in JavaScript vrijwel altijd de ingebouwde methodes van de array. Deze zijn beter leesbaar en voorkomen foutjes met index-nummers.

```javascript
// forEach: Voer een functie uit voor elk element in de lijst
studenten.forEach(function(student) {
    console.log("Hallo " + student);
});

// map: Maak een nieuwe lijst, gebaseerd op de oude lijst
// (Bijvoorbeeld: we willen alle namen in HOOFDLETTERS)
const schreeuwendeStudenten = studenten.map(function(student) {
    return student.toUpperCase();
});
// schreeuwendeStudenten is nu ["JAN", "KLAAS"]
```

---

## Hoofdstuk 2: Objecten (Basis & Verdieping)

### Korte Theorie: Wat is een Object?
Waar een Array een genummerde ladekast is, is een **Object** een kast met *gelabelde* lades. Je gebruikt een object als je informatie logisch wilt groeperen. Een auto is een perfect voorbeeld: het heeft **eigenschappen** (kleur, merk) en **acties** (methoden zoals starten).

```javascript
const mijnAuto = {
    merk: "Toyota",
    kleur: "Rood",
    starten: function() {
        // 'this' verwijst naar het object zelf
        console.log("De " + this.merk + " start! Vroem!");
    }
};

console.log(mijnAuto.kleur); // Resultaat: "Rood"
mijnAuto.starten();
```

### De Valkuil: Primitieve types vs Referentietypes
Dit is een van de belangrijkste concepten in JavaScript! 
*   **Primitieve types** (zoals `number`, `string`, `boolean`) passen letterlijk in een variabele. Als je ze kopieert, maak je een *echte kopie*.
*   **Referentietypes** (Objecten en Arrays) zijn zo groot dat de variabele alleen een *verwijzing (adres)* bewaart naar de plek in het geheugen waar het object staat.

```javascript
// Primitief: Echte kopie
let a = 5;
let b = a; 
b = 10;
console.log(a); // 'a' is nog steeds 5!

// Referentie: Kopie van het adres!
const auto1 = { kleur: "rood" };
const auto2 = auto1; // auto2 wijst nu naar het ZELFDE object als auto1

auto2.kleur = "blauw"; // We veranderen de auto via adres auto2
console.log(auto1.kleur); // Resultaat: "blauw" !! auto1 is ook veranderd!
```
> [!WARNING]
> Pas dus extreem goed op met het kopiëren van Arrays of Objecten. Wijzigingen in de kopie hebben invloed op het origineel.

### Korte Theorie: Lopen door Objecten en Destructuring
Net als bij een array, kun je door de lades van een object lopen met een `for...in` loop:
```javascript
for (const label in mijnAuto) {
    console.log("Eigenschap:", label, "Waarde:", mijnAuto[label]);
}
```

**Object Destructuring** is een superkrachtige, moderne feature om eigenschappen direct uit een object te "trekken" in losse variabelen:
```javascript
const user = { naam: "Karel", leeftijd: 30, rol: "Admin" };

// Oude manier:
// const naam = user.naam;
// const leeftijd = user.leeftijd;

// Nieuwe manier (Destructuring):
const { naam, leeftijd } = user;
console.log(naam); // "Karel"
```

---

## Hoofdstuk 3: De Browser Laten Leven: DOM & Events

### Korte Theorie: De DOM
De HTML die je schrijft is passief. Zodra de browser de HTML leest, maakt hij er een levende structuur van in het geheugen: de **Document Object Model (DOM)**. JavaScript gebruikt de DOM om de pagina "on the fly" aan te passen.

### Elementen Selecteren
We kunnen de browser (`document`) vragen om elementen op te zoeken.
*   `querySelector`: Geeft altijd het **eerste** element terug dat voldoet.
*   `querySelectorAll`: Geeft een **NodeList** (soort array) terug van **alle** elementen die voldoen.

```javascript
// Eén specifiek element pakken en aanpassen
const titel = document.querySelector("#hoofdtitel");
titel.innerText = "Nieuwe Titel";

// Meerdere elementen pakken (bijv. alle items in een lijst)
const lijstItems = document.querySelectorAll(".lijst-item");
lijstItems.forEach(item => {
    item.style.color = "blue";
});
```

### Elementen Dynamisch Aanmaken
Je hoeft elementen niet in je HTML te schrijven. Je kunt JavaScript vragen om ze uit het niets te bouwen en in de pagina te injecteren.
```javascript
// 1. Creëer het element in het geheugen van de browser
const nieuweAlinea = document.createElement("p");

// 2. Vul het met data
nieuweAlinea.textContent = "Dit is dynamisch toegevoegd!";
nieuweAlinea.classList.add("text-bold");

// 3. Plak het vast aan een bestaand element op de pagina
const container = document.querySelector("#nieuwsContainer");
container.appendChild(nieuweAlinea);
```

### Geavanceerde Events (Bubbling & Delegation)
Acties van een gebruiker (klikken, typen) heten *Events*. Als je op een knop klikt, gebeurt er iets magisch: het event begint bij de knop, maar borrelt daarna omhoog naar zijn parent (de `div`), dan naar de `body`, en dan naar de `html`. Dit heet **Event Bubbling**.

Dankzij Bubbling kunnen we **Event Delegation** gebruiken. Stel je hebt een lijst met 100 verwijder-knoppen. Je kunt 100 "luistervinkjes" (`addEventListener`) maken, maar het is veel sneller om 1 luistervinkje op de hele lijst te zetten, en te checken wáár er precies geklikt werd.

```html
<ul id="takenlijst">
    <li>Taak 1 <button class="delete-btn">Verwijder</button></li>
    <li>Taak 2 <button class="delete-btn">Verwijder</button></li>
</ul>
```

```javascript
const lijst = document.querySelector("#takenlijst");

// We luisteren op de UL (parent), niet op de individuele knoppen!
lijst.addEventListener("click", function(event) {
    // Het 'event' object (vaak afgekort als 'e') bevat alle info over de klik
    
    // Zat er op het daadwerkelijk geklikte element de class 'delete-btn'?
    if (event.target.classList.contains("delete-btn")) {
        // e.target is de knop. parentElement is de <li>. Die verwijderen we.
        event.target.parentElement.remove();
    }
});
```

> [!TIP]
> Het event-object bevat ook de methode `event.preventDefault()`. Dit voorkomt het standaardgedrag van de browser. Het wordt cruciaal gebruikt bij het versturen van formulieren, zodat de pagina niet uit zichzelf ververst!

---

## Hoofdstuk 4: Asynchroon Werken: Fetch & Promises

### Korte Theorie: De Event Loop
JavaScript is *single-threaded*, wat betekent dat hij maar 1 ding tegelijk kan. 
Stel je moet 1 seconde wachten op data van een server. Als we *synchroon* zouden wachten, bevriest de browser letterlijk 1 seconde lang. Je kunt niet eens meer scrollen.

Daarom werkt JavaScript met een **Event Loop**. Code die lang duurt (zoals `fetch`), wordt naar de "Web API" van de browser gestuurd. JavaScript gaat gewoon verder met de volgende regel code. Pas als de Web API klaar is, stuurt hij het resultaat terug in de wachtrij van de Event Loop, om verwerkt te worden. Dit noemen we *Asynchroon*.

### Korte Theorie: Promises
Omdat `fetch` asynchroon is, kan het niet direct het antwoord teruggeven. In plaats daarvan geeft het een **Promise** (belofte). Een promise heeft 3 staten:
1.  **Pending:** We zijn aan het wachten.
2.  **Fulfilled:** De data is binnen!
3.  **Rejected:** Er ging iets mis (geen internet, server in brand).

### Data Ophalen en Fouten Afhandelen
We gebruiken `async` en `await` om de code toch leesbaar te houden alsof het synchroon is.

```javascript
async function haalDataOp() {
    try {
        // await pauzeert de functie tot de Promise 'Fulfilled' of 'Rejected' is
        const response = await fetch("https://api.voorbeeld.nl/data");
        
        // LET OP HTTP ERRORS!
        // fetch geeft alleen een 'Rejected' bij netwerkfouten. 
        // Als de server een "404 Not Found" teruggeeft, is het resultaat tóch Fulfilled!
        if (!response.ok) {
            // response.ok is true voor codes in de 200 reeks, en false voor 400/500
            throw new Error(`HTTP Fout: ${response.status}`);
        }
        
        const data = await response.json();
        console.log(data);

    } catch (error) {
        // Hier belanden we als het netwerk uitvalt, OF als we hierboven zelf een error opgooien (throw)
        console.error("Fout opgetreden:", error.message);
    }
}
```

### Data Versturen (POST, PUT, DELETE)
Om data *naar* een server te sturen, moeten we `fetch` een configuratie-object (options) meegeven.

```javascript
async function maakGebruikerAan() {
    const nieuweGebruiker = { naam: "Eva", leeftijd: 25 };

    const options = {
        method: "POST", // We sturen iets op, in plaats van GET
        headers: {
            "Content-Type": "application/json" // We vertellen de server: 'Dit is JSON tekst'
        },
        body: JSON.stringify(nieuweGebruiker) // We pakken ons object in als platte tekst
    };

    const response = await fetch("https://api.voorbeeld.nl/users", options);
    // ... zelfde afhandeling als hierboven ...
}
```

---

## Hoofdstuk 5: De Kracht van TypeScript

### Korte Theorie: Waarom TypeScript?
JavaScript is vergevingsgezind. Te vergevingsgezind. Je mag gerust `5 + "appel"` typen, of een functie aanroepen die niet bestaat op een object. Dat merk je pas als je de site test en hij crasht.

TypeScript is een *superset* over JavaScript. Je schrijft gewone JavaScript, maar je dwingt **types** af. Je editor (VS Code) fungeert nu als een hele strenge spellingscontrole en waarschuwt je als blokjes niet in elkaar passen, *voordat* de browser eraan te pas komt.

### Voorbeeld: Interfaces en DOM Casting

```typescript
// We definiëren een blauwdruk
interface User {
    id: number;
    username: string;
    isActive: boolean;
}

// TypeScript zal nu gaan klagen als we een User proberen te maken zónder 'isActive'.
const me: User = {
    id: 1,
    username: "coder123",
    isActive: true
};

// ========================
// TypeScript en de DOM
// ========================

// "domme" HTML parser: de code weet niet wat "#mijnInput" is. Het is een generiek 'Element'.
// We gebruiken '<HTMLInputElement>' (een Generic) om TypeScript expliciet te vertellen:
// "Dit element is echt een invoerveld, dus het is veilig om .value te gebruiken."
const inputVeld = document.querySelector<HTMLInputElement>("#mijnInput");

// Het uitroepteken (!) zegt: "Negeer de waarschuwing dat dit null kan zijn, ik ben zeker dat hij bestaat".
const waarde = inputVeld!.value; 
```

---

## Hoofdstuk 6: Je Project Bouwen met Vite

### Korte Theorie: De Noodzaak van een Bundler
In een groot project heb je tientallen TypeScript bestanden, CSS modules, en afbeeldingen. Browsers kunnen geen TypeScript uitvoeren. En 50 losse `<script>` tags inladen is verschrikkelijk traag.

**Vite** is onze keukenmachine (een bundler). Vite pakt al je losse bestanden, vertaalt de TypeScript naar JavaScript, minificeert (verkleint) de bestanden, en perst ze samen tot een handvol bestanden die de browser bliksemsnel kan ophalen.

### De Commando's
*   `npm run dev`: Je ontwikkelomgeving. Het start een lokale server die supersnel de pagina herlaadt telkens je opslaat (Hot Module Replacement).
*   `npm run build`: Dit maakt de "production build". Vite gaat aan de slag en genereert een `dist` (distribution) mapje. Dit mapje bevat de geoptimaliseerde eindbestanden die je op een echte webserver uploadt.

---

## Hoofdstuk 7: Multipage Apps in Vite

Soms heb je gewoon behoefte aan meerdere klassieke HTML-pagina's in plaats van één massieve Single Page Application. 

In Vite plaats je gewoon meerdere HTML bestanden in de root map (bijv. `index.html` en `over-ons.html`). 
Elke HTML pagina krijgt zijn eigen "start"-script in de tag:
`<script type="module" src="/src/main.ts"></script>`

Dankzij het `type="module"` systeem kunnen we logica feilloos scheiden en hergebruiken. We kunnen een bestand `utils.ts` maken met handige functies, en deze *importeren* in zowel de homepagina als de "over ons" pagina.

```typescript
// utils.ts
export function begroet(naam: string) {
    console.log(`Hallo, ${naam}`);
}

// main.ts
import { begroet } from './utils.ts';
begroet("Student");
```

---

## Hoofdstuk 8: Data Bewaren (Data Management)

### Korte Theorie: Opslag in de Browser
Om instellingen, profielkeuzes of de inhoud van een winkelwagentje op te slaan zonder direct een database nodig te hebben, biedt de browser twee handige opslagkluizen:
1.  **sessionStorage:** Data wordt bewaard totdat het tabblad gesloten wordt.
2.  **localStorage:** Data wordt voor onbepaalde tijd bewaard. (Zelfs als je de PC herstart).

### De Spelregel: Alleen Tekst (JSON)
De browserkluis accepteert **uitsluitend strings (tekst)**. Probeer je de Array `[1,2,3]` op te slaan, dan maakt de browser er de rare tekst `"1,2,3"` van, en verlies je de array-structuur.
De oplossing? **JSON (JavaScript Object Notation)**. We pakken ons object in als een nette, leesbare tekst-string, en pakken het later weer uit.

```javascript
const favorieteKleuren = ["Rood", "Groen", "Blauw"];

// 1. DATA OPSLAAN (Inpakken via stringify)
const ingepakteKleuren = JSON.stringify(favorieteKleuren); // Resultaat: '["Rood","Groen","Blauw"]'
localStorage.setItem("userColors", ingepakteKleuren);

// ==========================================

// 2. DATA OPHALEN (Uitpakken via parse)
const dataUitKluis = localStorage.getItem("userColors");

// Controleer altijd of er wel iets bewaard was! (Anders geeft parse een error op 'null')
if (dataUitKluis !== null) {
    // We pakken de string uit en veranderen hem feilloos terug in de echte Array
    const echteArray = JSON.parse(dataUitKluis);
    
    // Omdat het nu weer een échte array is, werken methodes zoals forEach weer!
    echteArray.forEach(kleur => console.log(kleur));
}
```

> [!CAUTION]
> Gebruik deze opslagmethode **nooit** voor tokens, wachtwoorden of bankgegevens! De opslag is niet versleuteld en kan door slimme hackers of malafide browserextensies eenvoudig worden uitgelezen.

---

**Succes met het programmeren! Deze gids is je fundament. Door deze code snippets in de praktijk uit te proberen, zul je zien dat al deze "moeilijke" concepten al snel een tweede natuur worden.**
