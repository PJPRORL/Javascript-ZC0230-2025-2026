# Module 6 — Arrays

*Array-types ook*
*Flexibel en sterk getypeerd*
*Bewaar alles mooi*

JavaScript arrays zijn ongelooflijk flexibel — je kunt er van alles in stoppen. TypeScript brengt hier structuur in door **array types** te bieden die beschrijven welke waarden een array mag bevatten.

## Array Types

Er zijn twee manieren om een array type te schrijven:

```typescript
// Manier 1: type[]
let getallen: number[] = [1, 2, 3];
let namen: string[] = ["Alice", "Bob"];

// Manier 2: Array<type> (generic syntax)
let getallen2: Array<number> = [1, 2, 3];
let namen2: Array<string> = ["Alice", "Bob"];
```

Beide zijn identiek — de meeste ontwikkelaars gebruiken `type[]` omdat het korter is.

### Array en Function Types

Let op de haakjes bij functie types in arrays:

```typescript
// Een array van functies die strings teruggeven
let makersFuncties: (() => string)[];

// NIET hetzelfde als: een functie die een array van strings teruggeeft
let functieDieArrayGeeft: () => string[];
```

### Union-Type Arrays

Een array kan waarden van meerdere types bevatten:

```typescript
// Array met strings EN numbers
let gemengd: (string | number)[] = ["Alice", 42, "Bob", 7];

// Let op: zonder haakjes is het iets anders!
let andersType: string | number[]; // string OF een array van numbers
```

### Evolving Any Arrays

Als je een lege array declareert zonder type, begint TypeScript met `any[]` en past het type aan naarmate je waarden toevoegt:

```typescript
let waarden = []; // Type: any[]

waarden.push("hallo"); // Type wordt: string[]
waarden.push(42);       // Type wordt: (string | number)[]
```

> **⚠️ Belangrijk:** Vermijd evolving any arrays. Geef altijd een expliciet type aan een lege array: `let waarden: string[] = [];`

### Multidimensionale Arrays

Arrays van arrays:

```typescript
let matrix: number[][] = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
];

// 3D array
let kubus: number[][][] = [[[1, 2], [3, 4]], [[5, 6], [7, 8]]];
```

## Array Leden

TypeScript weet welk type elk element in een array heeft:

```typescript
const verdedigers = ["Clarenza", "Dina"];

// Type van verdediger: string
const verdediger = verdedigers[0];
verdediger.toUpperCase(); // OK
```

Bij union-type arrays:

```typescript
const gemengd = ["Alice", 42];
// Type van element: string | number
const element = gemengd[0];

element.toUpperCase();
// Error: Property 'toUpperCase' does not exist on type 'string | number'.

// Narrow eerst!
if (typeof element === "string") {
    element.toUpperCase(); // OK
}
```

## Spreads en Rests

### Spread operator

TypeScript begrijpt de spread operator `...`:

```typescript
const eenArray = [1, 2, 3]; // number[]
const anderArray = [4, 5];  // number[]

// Type: number[]
const samengevoegd = [...eenArray, ...anderArray]; // [1, 2, 3, 4, 5]
```

Als je arrays met verschillende types samenvoegt:

```typescript
const gemengd = [...eenArray, ...["hallo"]];
// Type: (string | number)[]
```

### Spread bij rest parameters

```typescript
function logNamen(begroeting: string, ...namen: string[]) {
    for (const naam of namen) {
        console.log(`${begroeting}, ${naam}!`);
    }
}

const vrienden = ["Alice", "Bob", "Charlie"];
logNamen("Hallo", ...vrienden);
```

## Tuples

Een **tuple** is een array met een **vast aantal elementen** waarvan elk element een specifiek type heeft:

```typescript
let paar: [string, number];

paar = ["Alice", 25]; // OK
paar = [25, "Alice"]; // Error: types staan in verkeerde volgorde
paar = ["Alice"];      // Error: te weinig elementen
```

### Tuple types in de praktijk

Tuples zijn handig voor functies die meerdere waarden teruggeven:

```typescript
function geefNaamEnLeeftijd(): [string, number] {
    return ["Alice", 25];
}

const [naam, leeftijd] = geefNaamEnLeeftijd();
// naam: string, leeftijd: number
```

### Tuple vs Array

Het verschil is belangrijk:

```typescript
// Tuple: exact 2 elementen, eerste string, tweede number
let tuple: [string, number] = ["Alice", 25];

// Array: onbeperkt aantal elementen, allemaal string | number
let array: (string | number)[] = ["Alice", 25, "Bob", 30];
```

### Const Assertions met Tuples

Je kunt `as const` gebruiken om een array-literal om te zetten naar een readonly tuple:

```typescript
// Zonder as const: type is (string | number)[]
const waarden = ["Alice", 25];

// Met as const: type is readonly ["Alice", 25]
const vasterWaarden = ["Alice", 25] as const;

vasterWaarden[0] = "Bob";
// Error: Cannot assign to '0' because it is a read-only property.
```

---

## Samenvatting

- **Array types** schrijf je als `type[]` of `Array<type>`
- **Union-type arrays** (`(string | number)[]`) bevatten meerdere types
- Vermijd **evolving any arrays** — geef altijd een expliciet type
- **Multidimensionale arrays** gebruik je met `type[][]`
- TypeScript begrijpt de **spread operator** en **rest parameters** met arrays
- **Tuples** zijn arrays met een vast aantal elementen en specifieke types per positie
- `as const` maakt een array readonly en geeft het een tuple-type

---

## Oefeningen

Maak deze in een bestand `module6.ts`.

1. **Array types.** Maak een array `kleuren: string[]` met minstens 3 kleuren. Voeg er een kleur aan toe met `.push()`. Probeer een `number` toe te voegen — wat zegt TypeScript?

2. **Union array.** Maak een array `formulierWaarden: (string | number | boolean)[]` en vul deze met minstens 5 waarden van verschillende types.

3. **Tuple.** Maak een tuple type `Coordinaat` voor `[number, number]`. Maak drie coördinaten. Probeer een coördinaat met 3 elementen te maken.

4. **Tuple destructuring.** Schrijf een functie `deelMetRest(a: number, b: number): [number, number]` die het quotiënt en de rest teruggeeft. Gebruik destructuring om de resultaten op te vangen.

5. **Spread.** Maak twee arrays en voeg ze samen met de spread operator. Controleer het type van de samengevoegde array.

Klaar? In **Module 7 (Interfaces)** leer je een alternatieve en veelgebruikte manier om object types te definiëren.
