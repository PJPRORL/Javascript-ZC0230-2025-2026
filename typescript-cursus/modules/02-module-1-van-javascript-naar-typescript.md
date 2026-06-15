# Module 1 — Van JavaScript naar TypeScript

*Wiens types zijn dit?*
*JavaScript vertrouwt jou blind.*
*TypeScript checkt mee.*

## De geschiedenis van JavaScript

JavaScript werd in **1995** in slechts 10 dagen geschreven door Brendan Eich voor de Netscape-browser. Het was bedoeld als een simpele scripttaal om webpagina's interactief te maken — een paar knoppen, wat validatie op formulieren, meer niet.

Niemand had verwacht dat JavaScript decennia later de **meest gebruikte programmeertaal ter wereld** zou worden. Het draait nu in elke browser, op servers (Node.js), in mobiele apps, en zelfs in desktop-applicaties.

Het probleem? JavaScript werd ontworpen voor **kleine scripts**, niet voor de enorme applicaties die we er vandaag mee bouwen. En dat merk je.

## De tekortkomingen van JavaScript

### 1. Kostbare vrijheid

JavaScript is ontzettend **flexloos** — het laat je bijna alles doen zonder te klagen. Dat klinkt fijn, maar het betekent ook dat fouten pas opvallen **wanneer je code draait**, niet wanneer je hem schrijft.

```javascript
// JavaScript klaagt hier niet over — maar het crasht wel!
function berekenOppervlakte(breedte, hoogte) {
  return breedte * hoogte;
}

// Oeps — we geven een string mee in plaats van een getal
berekenOppervlakte("vijf", 10); // NaN (Not a Number)
```

JavaScript voert dit gewoon uit en geeft `NaN` terug. Geen foutmelding, geen waarschuwing. In een grote applicatie kun je dit soort bugs uren of zelfs dagen kwijt zijn.

### 2. Onduidelijke documentatie

Stel je voor dat je in een team werkt en een collega heeft deze functie geschreven:

```javascript
function paintPainting(painter, painting) {
  // ...
}
```

Wat is `painter`? Een string met een naam? Een object met eigenschappen? Welke eigenschappen dan? Je moet de hele implementatie doorlezen om het te snappen — of hopen dat er een commentaar bij staat.

### 3. Beperkte editor-ondersteuning

Omdat JavaScript geen type-informatie heeft, kan je editor je maar beperkt helpen. Autocompletion werkt alleen voor ingebouwde dingen. Bij je eigen code moet je alles zelf onthouden.

## Wat is TypeScript?

**TypeScript** is een programmeertaal die bovenop JavaScript is gebouwd. Het is gemaakt door Microsoft (specifiek door Anders Hejlsberg, die ook C# heeft ontworpen) en werd in **2012** voor het eerst uitgebracht.

TypeScript voegt **types** toe aan JavaScript. In de kern is TypeScript vier dingen:

### 1. Een programmeertaal
TypeScript bevat alle JavaScript-functionaliteit plus extra syntax voor types. Alle geldige JavaScript is automatisch ook geldige TypeScript.

### 2. Een type checker
TypeScript analyseert je code en vertelt je waar er problemen zijn — **voordat je de code uitvoert**. Het is als een extra paar ogen dat je code controleert.

### 3. Een compiler
De TypeScript-compiler (`tsc`) zet je TypeScript-code om naar gewoon JavaScript. Browsers en Node.js begrijpen geen TypeScript, dus deze stap is nodig.

### 4. Een taaldienst (language service)
TypeScript integreert met je editor (VS Code) en geeft je slimme suggesties, foutmeldingen, en autocompletion terwijl je typt.

## De voordelen van TypeScript

### Vrijheid door beperking

TypeScript laat je specificeren welke types waarden mogen hebben. Dat klinkt beperkend, maar het geeft je juist **vertrouwen** dat je code correct is.

```typescript
function berekenOppervlakte(breedte: number, hoogte: number): number {
  return breedte * hoogte;
}

berekenOppervlakte("vijf", 10);
//                 ~~~~~~
// Error: Argument of type 'string' is not assignable to parameter of type 'number'.
```

TypeScript vangt de fout **meteen** op — je hoeft niet te wachten tot de code draait.

Een ander voorbeeld: als je het aantal parameters van een functie wijzigt, vertelt TypeScript je meteen overal waar je de functie nog op de oude manier aanroept:

```typescript
// Voorheen: zegMijnNaam(voornaam, achternaam)
function zegMijnNaam(volledigeNaam: string) {
  console.log(`Je gedraagt je verdacht, noem me ${volledigeNaam}`);
}

zegMijnNaam("Beyoncé", "Knowles");
//                      ~~~~~~~~
// Error: Expected 1 argument, but got 2.
```

### Precieze documentatie

Met TypeScript documenteert je code **zichzelf**. Kijk naar dit voorbeeld:

```typescript
interface Schilder {
  klaar(): boolean;
  eigenMaterialen: Materiaal[];
  schilder(schilderij: string, materialen: Materiaal[]): boolean;
}

function maakSchilderij(schilder: Schilder, schilderij: string): boolean {
  // ...
}
```

Een andere ontwikkelaar die dit voor het eerst leest, begrijpt meteen dat `schilder` minstens drie eigenschappen heeft, waarvan twee methodes zijn. Geen extra commentaar nodig.

### Betere editor-ondersteuning

Dankzij TypeScript kan je editor (VS Code) veel slimmere suggesties geven. Als je `schilder.` typt, verschijnt er een dropdown met alle beschikbare eigenschappen en methodes — met hun types erbij.

## TypeScript compileren

De TypeScript-compiler zet je code om naar JavaScript. Alle type-annotaties worden verwijderd — ze bestaan alleen tijdens het ontwikkelen.

```typescript
// TypeScript (bron)
const artiest: string = "Augusta Savage";
console.log({ artiest });
```

Wordt gecompileerd naar:

```javascript
// JavaScript (output)
const artiest = "Augusta Savage";
console.log({ artiest });
```

De `: string` annotatie is verdwenen. **TypeScript-types beïnvloeden je runtime code niet** — ze zijn puur voor ontwikkeltijd.

## Getting Started: de TypeScript Playground

De makkelijkste manier om TypeScript uit te proberen is via de **TypeScript Playground**: [typescriptlang.org/play](https://www.typescriptlang.org/play).

Dit is een online editor waar je TypeScript kunt schrijven en direct kunt zien:
- Welke fouten TypeScript vindt
- Hoe de gecompileerde JavaScript eruit ziet
- Welke types TypeScript afleidt

> **💡 Tip:** De Playground is geweldig om snel iets uit te testen. Je hoeft niets te installeren — alles draait in je browser.

## Lokaal aan de slag

Als je Module 0 al hebt afgerond, heb je TypeScript al lokaal geïnstalleerd. Zo niet, installeer het met:

```bash
npm install -g typescript
```

Maak een `tsconfig.json` aan:

```bash
tsc --init
```

En maak een testbestand `index.ts`:

```typescript
console.blub("Niets is meer waard dan lachen.");
```

Compileer met `tsc index.ts`. Je krijgt een foutmelding:

```
index.ts:1:9 - error TS2339: Property 'blub' does not exist on type 'Console'.
```

Inderdaad, `blub` bestaat niet op `console`. Fix het naar `console.log` en compileer opnieuw — geen klachten meer.

> **⚠️ Belangrijk:** Zelfs als er type-fouten zijn, maakt TypeScript nog steeds een `.js` bestand aan. TypeScript waarschuwt je, maar blokkeert je niet. De gegenereerde JavaScript is syntactisch correct, maar doet misschien niet wat je verwacht.

## Wat TypeScript NIET is

### Geen oplossing voor slechte code
TypeScript helpt je je code te structureren, maar het schrijft geen goede code voor je. Als je slechte architectuur hebt, verandert TypeScript daar niets aan.

### Geen uitbreiding op JavaScript (grotendeels)
TypeScript probeert JavaScript **niet** te veranderen. Het voegt alleen types toe. De runtime-uitvoer is gewoon JavaScript. Er zijn een paar historische uitzonderingen (zoals enums), maar die worden steeds minder gebruikt.

### Niet trager dan JavaScript
Soms hoor je dat TypeScript trager is. Dat klopt niet — de **output** is gewoon JavaScript en draait even snel. TypeScript voegt wel een compilatie-stap toe, maar die is in de praktijk verwaarloosbaar.

### Niet af
TypeScript evolueert continu. Met elke nieuwe versie komen er betere foutmeldingen, nieuwe features, en verbeterde editor-integratie.

---

## Samenvatting

- JavaScript werd ontworpen voor kleine scripts, maar wordt nu gebruikt voor enorme applicaties
- De drie grote tekortkomingen van JavaScript: **kostbare vrijheid**, **onduidelijke documentatie**, en **beperkte editor-ondersteuning**
- TypeScript is JavaScript **met types**: een programmeertaal, type checker, compiler, en taaldienst
- De voordelen: **vrijheid door beperking**, **precieze documentatie**, en **betere editor-ondersteuning**
- TypeScript-types bestaan alleen tijdens het ontwikkelen — ze worden verwijderd bij compilatie
- TypeScript is **geen** oplossing voor slechte code, geen uitbreiding op JavaScript, niet trager, en niet af

---

## Oefeningen

1. **Playground verkennen.** Ga naar [typescriptlang.org/play](https://www.typescriptlang.org/play) en typ het volgende:
   ```typescript
   let naam = "TypeScript";
   naam.lenght;
   ```
   Wat zegt TypeScript over de fout? (Hint: het is een typfout in `lenght`.) Hover over de rode lijn en schrijf de foutmelding op.

2. **Eerste type-fout.** Maak lokaal een bestand `module1.ts` met:
   ```typescript
   let score = 100;
   score = "honderd";
   ```
   Compileer met `tsc module1.ts`. Wat is de foutmelding? Waarom klaagt TypeScript?

3. **Functie-parameters.** Schrijf een functie `vermenigvuldig` die twee getallen vermenigvuldigt. Geef de parameters type-annotaties (`number`). Probeer de functie aan te roepen met een string als argument en lees de foutmelding.

4. **JavaScript vs TypeScript.** Schrijf in een commentaarblok in je eigen woorden: wat zijn de drie grootste voordelen van TypeScript ten opzichte van JavaScript?

Klaar? Mooi! In **Module 2 (Het Type Systeem)** gaan we dieper in op hoe TypeScript types begrijpt en afleidt.
