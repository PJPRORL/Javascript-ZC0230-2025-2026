# Module 2 — Het Type Systeem

*JavaScripts kracht*
*Komt van flexibiliteit*
*Wees daar voorzichtig mee!*

In Module 1 hebben we kort gesproken over de "type checker" in TypeScript. Maar hoe werkt zo'n type checker eigenlijk? Dat ontdek je in deze module.

## Wat zit er in een type?

Een **type** is een beschrijving van welke "vorm" een JavaScript-waarde kan hebben. Met "vorm" bedoelen we: welke eigenschappen en methodes erop bestaan, en wat de ingebouwde `typeof`-operator erover zou zeggen.

Wanneer je bijvoorbeeld een variabele aanmaakt met de beginwaarde `"Aretha"`:

```typescript
let zanger = "Aretha";
```

Dan kan TypeScript **afleiden** (infereren) dat de variabele `zanger` van het type `string` is.

### De basistypen

De meest fundamentele types in TypeScript komen overeen met de zeven primitieve typen in JavaScript:

| Type | Voorbeeld | Beschrijving |
|------|-----------|--------------|
| `null` | `null` | Bewust lege waarde |
| `undefined` | `undefined` | Niet-toegekende waarde |
| `boolean` | `true`, `false` | Waar/onwaar |
| `string` | `"Hallo"`, `'wereld'` | Tekst |
| `number` | `42`, `3.14`, `-7` | Getal |
| `bigint` | `0n`, `100n` | Heel groot getal |
| `symbol` | `Symbol("id")` | Uniek symbool |

TypeScript begrijpt het type van elk van deze waarden:

```typescript
null;               // type: null
undefined;          // type: undefined
true;               // type: boolean
"Louise";           // type: string
1337;               // type: number
1337n;              // type: bigint
Symbol("Franklin"); // type: symbol
```

> **💡 Tip:** Als je ooit de naam van een type vergeet, typ dan een `let`-variabele met een primitieve waarde in VS Code en beweeg je muis over de variabelenaam. TypeScript laat het type zien in een pop-up.

TypeScript is slim genoeg om ook het type van **berekende waarden** af te leiden:

```typescript
// Afgeleid type: string
let besteLied = Math.random() > 0.5
  ? "Chain of Fools"
  : "Respect";
```

TypeScript weet dat de ternary-expressie altijd een `string` oplevert, dus `besteLied` is van het type `string`.

## Het type systeem

Een **type systeem** is de set regels waarmee een programmeertaal begrijpt welke types de constructies in een programma mogen hebben.

In de kern werkt TypeScripts type systeem als volgt:

1. **Lees** al je code in en begrijp alle types en waarden
2. **Bekijk** voor elke waarde wat het initiële type is bij declaratie
3. **Bekijk** voor elke waarde hoe die later in de code wordt gebruikt
4. **Klaag** als het gebruik niet overeenkomt met het type

Laten we dit stap voor stap doorlopen. Neem het volgende stukje code:

```typescript
let voornaam = "Whitney";
voornaam.length();
//        ~~~~~~
// Error: This expression is not callable.
//   Type 'Number' has no call signatures.
```

TypeScript kwam tot deze klacht door:

1. De code inlezen en begrijpen dat er een variabele `voornaam` bestaat
2. Concluderen dat `voornaam` van het type `string` is (beginwaarde is `"Whitney"`)
3. Zien dat de code `.length` probeert aan te roepen als een functie
4. Klagen dat `.length` van een string een `number` is, geen functie

## Soorten fouten

Bij het schrijven van TypeScript kom je twee soorten fouten tegen:

### Syntaxfouten

Een syntaxfout ontstaat wanneer TypeScript de structuur van je code niet begrijpt. Dit **blokkeert** de compilatie naar correcte JavaScript.

```typescript
let let wat;
//      ~~~
// Error: ',' expected.
```

> **💡 Tip:** TypeScript probeert altijd JavaScript te genereren, zelfs bij syntaxfouten. Maar de output is waarschijnlijk niet wat je wilt. Los syntaxfouten altijd eerst op.

### Type-fouten

Een type-fout ontstaat wanneer je code syntactisch correct is, maar TypeScript een probleem detecteert met de types. Dit blokkeert de compilatie **niet**, maar waarschuwt je dat er waarschijnlijk iets misgaat.

```typescript
console.blub("Niets is meer waard dan lachen.");
//      ~~~~
// Error: Property 'blub' does not exist on type 'Console'.
```

> **⚠️ Belangrijk:** TypeScript genereert wél JavaScript-output bij type-fouten. Het is aan jou om de waarschuwingen serieus te nemen.

## Toewijsbaarheid (Assignability)

TypeScript leest de beginwaarde van een variabele om te bepalen welk type die variabele mag zijn. Als je later een nieuwe waarde toekent, controleert TypeScript of het type overeenkomt.

**Zelfde type toewijzen** — geen probleem:

```typescript
let voornaam = "Carole";
voornaam = "Joan"; // OK — beide zijn strings
```

**Ander type toewijzen** — foutmelding:

```typescript
let achternaam = "King";
achternaam = true;
// Error: Type 'boolean' is not assignable to type 'string'.
```

Dit concept heet **toewijsbaarheid** (assignability): TypeScript controleert of een waarde **toewijsbaar** is aan het verwachte type.

### Toewijsbaarheidsfouten lezen

Foutmeldingen in het formaat `"Type ... is not assignable to type ..."` zijn de **meest voorkomende** fouten in TypeScript. Lees ze altijd zorgvuldig:

- Het **eerste** type is wat je probeert toe te wijzen (de waarde)
- Het **tweede** type is wat verwacht wordt (de variabele/parameter)

Bijvoorbeeld: `Type 'boolean' is not assignable to type 'string'` betekent: je probeert een `boolean` te stoppen in iets dat een `string` verwacht.

## Type-annotaties

Soms heeft een variabele geen beginwaarde. Dan kan TypeScript het type niet afleiden en beschouwt het als het type `any` — wat betekent "het kan van alles zijn".

### Het probleem met `any`

```typescript
let rocker; // Type: any

rocker = "Joan Jett";     // Type wordt: string
rocker.toUpperCase();     // OK

rocker = 19.58;           // Type wordt: number
rocker.toPrecision(1);    // OK

rocker.toUpperCase();
//     ~~~~~~~~~~~
// Error: 'toUpperCase' does not exist on type 'number'.
```

TypeScript kon de fout met `toUpperCase()` wel opvangen, maar het kon niet eerder waarschuwen dat je misschien per ongeluk een string naar een number veranderde. Dit heet een **evolving any** — TypeScript past het type aan bij elke nieuwe toewijzing.

> **🔴 Let op:** `any` gebruiken verslaat het hele doel van TypeScript! Vermijd het zoveel mogelijk.

### De oplossing: type-annotaties

Je kunt TypeScript **expliciet** vertellen welk type een variabele moet zijn, ook als er geen beginwaarde is:

```typescript
let rocker: string;
rocker = "Joan Jett"; // OK
```

Een type-annotatie zet je na de variabelenaam: een **dubbele punt** gevolgd door het **type**.

```typescript
let variabele: type;
```

Type-annotaties bestaan **alleen in TypeScript** — ze zijn geen geldige JavaScript. Bij compilatie worden ze verwijderd:

```typescript
// TypeScript
let rocker: string;
rocker = "Joan Jett";
```

```javascript
// Gecompileerde JavaScript
let rocker;
rocker = "Joan Jett";
```

Als je een waarde toekent die niet past bij de annotatie, krijg je een fout:

```typescript
let rocker: string;
rocker = 19.58;
// Error: Type 'number' is not assignable to type 'string'.
```

### Overbodige type-annotaties

Je **kunt** ook annotaties toevoegen aan variabelen die al een beginwaarde hebben, maar dat is overbodig — TypeScript leidt het type al af:

```typescript
let voornaam: string = "Tina";  // Overbodig — TypeScript weet al dat het een string is
```

Dit is **niet verkeerd**, maar ook niet nodig. De meeste TypeScript-ontwikkelaars laten overbodige annotaties weg om de code korter en leesbaarder te houden.

> **💡 Tip:** Gebruik type-annotaties wanneer TypeScript het type niet kan afleiden, of wanneer je expliciet wilt documenteren wat een variabele moet zijn. In alle andere gevallen kun je ze weglaten.

## Type Shapes

TypeScript controleert niet alleen of types overeenkomen bij toewijzing — het weet ook welke **eigenschappen** en **methodes** op een type bestaan.

```typescript
let rapper = "Queen Latifah";
rapper.length; // OK — strings hebben een 'length' eigenschap
```

```typescript
rapper.push('!');
//     ~~~~
// Error: Property 'push' does not exist on type 'string'.
```

`push` is een array-methode, geen string-methode. TypeScript weet dat.

Dit werkt ook met objecten:

```typescript
let cher = {
  voornaam: "Cherilyn",
  achternaam: "Sarkisian",
};

cher.tweedeNaam;
//   ~~~~~~~~~~
// Error: Property 'tweedeNaam' does not exist on type
// '{ voornaam: string; achternaam: string; }'.
```

TypeScript begrijpt de "vorm" (shape) van je objecten en laat je geen eigenschappen gebruiken die niet bestaan.

## Modules vs Scripts

JavaScript heeft twee soorten bestanden:

- **Module** — een bestand met een `import` of `export` statement op het hoogste niveau
- **Script** — elk bestand dat geen module is

Dit verschil is belangrijk in TypeScript:

### Modules zijn geïsoleerd

Variabelen in een module zijn alleen beschikbaar **binnen dat bestand**, tenzij je ze exporteert:

```typescript
// a.ts
export const gedeeld = "Cher"; // OK

// b.ts
export const gedeeld = "Cher"; // OK — geen conflict, ander bestand
```

### Scripts delen scope

Variabelen in scripts worden als **globaal** beschouwd. Twee scripts met dezelfde variabelenaam botsen:

```typescript
// a.ts (geen import/export = script)
const gedeeld = "Cher";
//    ~~~~~~~
// Error: Cannot redeclare block-scoped variable 'gedeeld'.

// b.ts (geen import/export = script)
const gedeeld = "Cher";
//    ~~~~~~~
// Error: Cannot redeclare block-scoped variable 'gedeeld'.
```

> **💡 Tip:** Zie je `Cannot redeclare...` fouten? Voeg dan `export {};` toe aan je bestand om het een module te maken, ook als je niets exporteert.

---

## Samenvatting

- Een **type** beschrijft welke vorm een waarde kan hebben (eigenschappen, methodes)
- De **basistypen** in TypeScript zijn: `null`, `undefined`, `boolean`, `string`, `number`, `bigint`, `symbol`
- TypeScript **leidt types af** (inferentie) op basis van beginwaarden
- Er zijn twee soorten fouten: **syntaxfouten** (blokkeren compilatie) en **type-fouten** (waarschuwingen)
- **Toewijsbaarheid** controleert of een waarde past bij het verwachte type
- **Type-annotaties** (`let x: string`) vertellen TypeScript expliciet welk type een variabele heeft
- Vermijd `any` — het verslaat het doel van TypeScript
- TypeScript kent de **vorm** (shape) van types en controleert toegang tot eigenschappen
- **Modules** (met import/export) zijn geïsoleerd; **scripts** delen globale scope

---

## Oefeningen

Maak deze in een bestand `module2.ts`. Schrijf eerst pseudocode, dan code. Kijk in de console.

1. **Type-inferentie.** Maak de volgende variabelen aan **zonder** type-annotaties en hover erover in VS Code. Schrijf in een commentaar welk type TypeScript afleidt:
   ```typescript
   let stad = "Amsterdam";
   let inwoners = 872757;
   let isHoofdstad = true;
   let onbekend = null;
   ```

2. **Toewijsbaarheid.** Maak een variabele `temperatuur` met de waarde `20`. Probeer daarna `temperatuur = "warm"` toe te wijzen. Lees de foutmelding en schrijf die in een commentaar. Leg uit waarom TypeScript klaagt.

3. **Type-annotaties.** Maak drie variabelen **met** type-annotaties maar **zonder** beginwaarde. Wijs daarna correcte waarden toe:
   ```typescript
   let productNaam: string;
   let prijs: number;
   let opVoorraad: boolean;
   ```

4. **Type shape.** Maak een object `persoon` met de eigenschappen `naam` (string) en `leeftijd` (number). Probeer daarna `persoon.email` te benaderen. Wat zegt TypeScript?

5. **Module maken.** Maak twee bestanden `a.ts` en `b.ts`, beide met `const test = 42;`. Compileer ze. Wat gebeurt er? Voeg nu `export {};` toe aan beide bestanden en compileer opnieuw. Schrijf in een commentaar het verschil.

Klaar en gecontroleerd? Top. In **Module 3 (Unions en Literals)** leer je hoe TypeScript omgaat met variabelen die meer dan één type kunnen zijn.
