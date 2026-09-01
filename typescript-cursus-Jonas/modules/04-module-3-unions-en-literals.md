# Module 3 — Unions en Literals

*Niets is constant*
*Waarden veranderen soms*
*(behalve constanten)*

In Module 2 hebben we het type systeem leren kennen en hoe het types afleidt van waarden. Nu introduceren we twee krachtige concepten waarmee TypeScript slim met variabelen omgaat:

- **Unions** — het type van een waarde uitbreiden tot twee of meer mogelijke types
- **Narrowing** — het type van een waarde beperken tot één specifiek type

Samen vormen unions en narrowing een krachtig duo waarmee TypeScript dingen kan begrijpen die veel andere talen niet kunnen.

## Union Types

Bekijk deze variabele:

```typescript
let wiskundige = Math.random() > 0.5
    ? undefined
    : "Mark Goldberg";
```

Welk type heeft `wiskundige`? Het is niet alleen `undefined` en ook niet alleen `string`. Het kan **allebei** zijn. Dit soort "of-of" type noemen we een **union**.

TypeScript noteert union types met de `|` (pipe) operator:

```typescript
// Type: string | undefined
let wiskundige = Math.random() > 0.5
    ? undefined
    : "Mark Goldberg";
```

### Union types declareren

Je kunt een union type ook **expliciet** aangeven met een type-annotatie. Dit is handig als een variabele begint als `null` maar later een waarde krijgt:

```typescript
let denker: string | null = null;

if (Math.random() > 0.5) {
    denker = "Susanne Langer"; // OK
}
```

> **📝 Opmerking:** De volgorde in een union maakt niet uit. `boolean | number` is hetzelfde als `number | boolean`.

### Union Properties

Wanneer een waarde een union type heeft, laat TypeScript je alleen eigenschappen gebruiken die op **alle** mogelijke types bestaan.

```typescript
let fysicus = Math.random() > 0.5
    ? "Marie Curie"
    : 84;

fysicus.toString(); // OK — bestaat op zowel string als number

fysicus.toUpperCase();
//      ~~~~~~~~~~~
// Error: Property 'toUpperCase' does not exist on type 'string | number'.

fysicus.toFixed();
//      ~~~~~~~
// Error: Property 'toFixed' does not exist on type 'string | number'.
```

`toString()` werkt omdat het op zowel `string` als `number` bestaat. Maar `toUpperCase()` bestaat alleen op strings, en `toFixed()` alleen op numbers. TypeScript blokkeert ze allebei — want het weet niet welk type het op dat moment is.

Om toch type-specifieke methodes te gebruiken, moet je TypeScript helpen het type te **verfijnen**. Dat heet **narrowing**.

## Narrowing

Narrowing is wanneer TypeScript uit je code afleidt dat een waarde een **specifieker** type heeft dan eerder bekend. Er zijn drie veelgebruikte manieren:

### 1. Assignment Narrowing

Als je direct een waarde toekent, weet TypeScript het type:

```typescript
let admiraal: number | string;

admiraal = "Grace Hopper";

admiraal.toUpperCase(); // OK — TypeScript weet dat het een string is

admiraal.toFixed();
//       ~~~~~~~
// Error: Property 'toFixed' does not exist on type 'string'.
```

### 2. Conditional Checks

Een `if`-statement dat checkt op een specifieke waarde:

```typescript
let wetenschapper = Math.random() > 0.5
    ? "Rosalind Franklin"
    : 51;

if (wetenschapper === "Rosalind Franklin") {
    // Hier weet TypeScript: type is string
    wetenschapper.toUpperCase(); // OK
}

// Hier weer: type is string | number
wetenschapper.toUpperCase();
//            ~~~~~~~~~~~
// Error!
```

### 3. Typeof Checks

De `typeof`-operator werkt ook voor narrowing:

```typescript
let onderzoeker = Math.random() > 0.5
    ? "Rosalind Franklin"
    : 51;

if (typeof onderzoeker === "string") {
    onderzoeker.toUpperCase(); // OK — TypeScript weet: string
}

if (typeof onderzoeker === "number") {
    onderzoeker.toFixed(); // OK — TypeScript weet: number
}
```

Dit werkt ook met `else` en de ternary operator:

```typescript
typeof onderzoeker === "string"
    ? onderzoeker.toUpperCase() // OK: string
    : onderzoeker.toFixed();    // OK: number
```

> **💡 Tip:** `typeof` checks zijn de meest praktische en veelgebruikte manier van narrowing. Je zult ze vaak gebruiken.

## Literal Types

Nu we unions en narrowing kennen, gaan we de andere kant op: **literal types** zijn specifiekere versies van primitieve types.

Bekijk deze variabele:

```typescript
const filosoof = "Hypatia";
```

Welk type is `filosoof`? Je zou zeggen `string` — en dat klopt. Maar TypeScript is preciezer: het type is niet zomaar elke string, het is specifiek `"Hypatia"`.

Dit is een **literal type**: het type van een waarde die exact één specifieke waarde kan zijn.

### const vs let

Het verschil zit hem in `const` vs `let`:

```typescript
const filosoof = "Hypatia"; // Type: "Hypatia" (literal)
let dichter = "Sappho";     // Type: string (algemeen)
```

- Een `const` kan nooit veranderen → TypeScript geeft het het **literal type**
- Een `let` kan later veranderen → TypeScript geeft het het **primitieve type**

### Literals en primitieven mixen

Je kunt literal types combineren met primitieve types in een union:

```typescript
let levensduur: number | "lopend" | "onzeker";

levensduur = 89;       // OK
levensduur = "lopend";  // OK
levensduur = "onzeker"; // OK

levensduur = true;
// Error: Type 'true' is not assignable to type 'number | "lopend" | "onzeker"'.
```

### Literal toewijsbaarheid

Letterlijke types zijn niet aan elkaar toewijsbaar, zelfs niet binnen hetzelfde primitieve type:

```typescript
let specifiekAda: "Ada";

specifiekAda = "Ada";    // OK
specifiekAda = "Byron";
// Error: Type '"Byron"' is not assignable to type '"Ada"'.
```

Maar een literal type is wél toewijsbaar aan zijn bijbehorende primitieve type:

```typescript
let tekst: string = "Hallo"; // OK — "Hallo" (literal) is een string
```

## Strict Null Checking

### De Miljard-Dollar-Fout

In 2009 noemde Tony Hoare zijn uitvinding van de `null`-referentie (in 1965) zijn "miljard-dollar-fout". Het probleem: in veel talen kun je `null` gebruiken waar je eigenlijk een ander type verwacht.

TypeScript lost dit op met **strict null checking**. Wanneer de optie `strictNullChecks` is ingeschakeld (aanbevolen!), zijn `null` en `undefined` **niet** automatisch toewijsbaar aan andere types.

**Zonder** strict null checking:

```typescript
let naamMisschien = Math.random() > 0.5
    ? "Tony Hoare"
    : undefined;

naamMisschien.toLowerCase(); // Geen fout — maar crasht als het undefined is!
```

**Met** strict null checking:

```typescript
let naamMisschien = Math.random() > 0.5
    ? "Tony Hoare"
    : undefined;

naamMisschien.toLowerCase();
// Error: Object is possibly 'undefined'.
```

> **⚠️ Belangrijk:** Zet `strictNullChecks` altijd aan. Het voorkomt een hele categorie bugs.

### Truthiness Narrowing

Je kunt narrowen op basis van "truthiness" — of een waarde `true` zou zijn in een boolean-context:

```typescript
let geneticus = Math.random() > 0.5
    ? "Barbara McClintock"
    : undefined;

if (geneticus) {
    geneticus.toUpperCase(); // OK — als we hier zijn, is het een string
}

geneticus.toUpperCase();
// Error: Object is possibly 'undefined'.
```

De **falsy** waarden in JavaScript zijn: `false`, `0`, `-0`, `0n`, `""`, `null`, `undefined`, en `NaN`. Alles anders is **truthy**.

Je kunt ook de `&&` en `?.` operators gebruiken:

```typescript
geneticus && geneticus.toUpperCase(); // OK
geneticus?.toUpperCase();             // OK
```

### Variabelen zonder beginwaarde

Als je een variabele declareert zonder waarde, begrijpt TypeScript dat het `undefined` is totdat je iets toekent:

```typescript
let wiskundige: string;

wiskundige?.length;
// Error: Variable 'wiskundige' is used before being assigned.

wiskundige = "Mark Goldberg";
wiskundige.length; // OK
```

## Type Aliases

Wanneer union types lang en complex worden, kun je een **type alias** maken. Dit is een herbruikbare naam voor een type:

```typescript
type RuweData = boolean | number | string | null | undefined;

let dataEerste: RuweData;
let dataTweede: RuweData;
let dataDerde: RuweData;
```

Veel handiger dan drie keer dezelfde lange union uit te schrijven!

### Regels voor type aliases

- Begin de naam met een **hoofdletter** (PascalCase conventie): `type MijnType = ...`
- Type aliases bestaan **alleen in TypeScript** — ze verdwijnen na compilatie
- Je kunt type aliases **niet** gebruiken als runtime-waarden:

```typescript
type EenType = string | undefined;

console.log(EenType);
//          ~~~~~~~
// Error: 'EenType' only refers to a type, but is being used as a value here.
```

### Type aliases combineren

Type aliases kunnen naar elkaar verwijzen:

```typescript
type Id = number | string;
type IdMisschien = Id | undefined | null;
// Equivalent aan: number | string | undefined | null
```

---

## Samenvatting

- **Union types** (`string | number`) staan toe dat een waarde één van meerdere types kan zijn
- Je kunt unions expliciet aangeven met type-annotaties
- **Narrowing** verfijnt het type door middel van assignment, conditionals, en `typeof` checks
- `const` variabelen krijgen **literal types** (`"Hypatia"`), `let` variabelen krijgen **primitieve types** (`string`)
- **Strict null checking** voorkomt de "miljard-dollar-fout" door `null` en `undefined` apart te behandelen
- **Truthiness narrowing** werkt met `if`, `&&`, en `?.`
- **Type aliases** (`type X = ...`) geven herbruikbare namen aan complexe types

---

## Oefeningen

Maak deze in een bestand `module3.ts`.

1. **Union type.** Maak een variabele `resultaat` van het type `number | string`. Wijs eerst een getal toe, dan een string. Wat gebeurt er als je `boolean` probeert?

2. **Narrowing met typeof.** Maak een functie `toonWaarde` die een parameter `waarde: number | string` accepteert. Gebruik `typeof` om:
   - Als het een `number` is: het verdubbelde getal te loggen
   - Als het een `string` is: de hoofdletterversie te loggen

3. **Literal types.** Maak een type alias `Richting` met de waarden `"noord" | "oost" | "zuid" | "west"`. Maak een variabele `kompas: Richting` en probeer er `"noordoost"` aan toe te wijzen. Wat zegt TypeScript?

4. **Strict null checking.** Maak een variabele `gebruiker: string | null = null`. Schrijf code die:
   - Checkt of `gebruiker` niet `null` is
   - Alleen dan de naam in hoofdletters logt

5. **Type alias.** Maak een type alias `FormulierVeld` voor `string | number | boolean | null`. Maak drie variabelen van dit type en wijs er verschillende waarden aan toe.

Klaar? In **Module 4 (Objecten)** gaan we leren hoe TypeScript omgaat met de "vorm" van objecten.
