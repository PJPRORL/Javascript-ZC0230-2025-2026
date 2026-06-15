# Module 9 — Type Modifiers

*Types aanpassen*
*Van any tot unknown en meer*
*Verfijn je controle*

In deze module leer je geavanceerde manieren om types te manipuleren en te verfijnen.

## Top Types

### `any` — het onzichtbare type

`any` schakelt alle type-controle uit. Het is het "ik geef het op"-type:

```typescript
let waarde: any = "hallo";
waarde = 42;         // OK
waarde = true;       // OK
waarde.foo.bar.baz;  // OK — TypeScript controleert niets!
```

> **🔴 Let op:** Gebruik `any` alleen als laatste redmiddel. Het verslaat het hele doel van TypeScript.

### `unknown` — het veilige alternatief

`unknown` is vergelijkbaar met `any`, maar **veilig**: je kunt niets met de waarde doen totdat je het type hebt gecontroleerd:

```typescript
let waarde: unknown = "hallo";

waarde.toUpperCase();
// Error: Object is of type 'unknown'.

// Narrow het type eerst!
if (typeof waarde === "string") {
    waarde.toUpperCase(); // OK
}
```

> **💡 Tip:** Gebruik `unknown` in plaats van `any` wanneer je niet weet welk type een waarde heeft. Het dwingt je om het type te controleren voordat je het gebruikt.

## Type Predicates

Een **type predicate** is een functie die TypeScript vertelt dat een waarde een specifiek type is:

```typescript
function isString(waarde: unknown): waarde is string {
    return typeof waarde === "string";
}

let invoer: unknown = "hallo";

if (isString(invoer)) {
    invoer.toUpperCase(); // OK — TypeScript weet nu dat het een string is
}
```

De syntax `waarde is string` na de `:` is het type predicate. Het vertelt TypeScript: "als deze functie `true` teruggeeft, dan is `waarde` een `string`."

```typescript
interface Hond {
    blaffen(): void;
}

interface Kat {
    spinnen(): void;
}

function isHond(dier: Hond | Kat): dier is Hond {
    return "blaffen" in dier;
}

function behandelDier(dier: Hond | Kat) {
    if (isHond(dier)) {
        dier.blaffen(); // OK
    } else {
        dier.spinnen(); // OK
    }
}
```

## Type Operators

### `keyof`

De `keyof` operator geeft een union van alle property-namen van een type:

```typescript
interface Persoon {
    naam: string;
    leeftijd: number;
    email: string;
}

type PersoonSleutels = keyof Persoon;
// Type: "naam" | "leeftijd" | "email"

function geefWaarde(persoon: Persoon, sleutel: keyof Persoon) {
    return persoon[sleutel];
}

const jan: Persoon = { naam: "Jan", leeftijd: 30, email: "jan@test.nl" };
geefWaarde(jan, "naam");    // OK
geefWaarde(jan, "adres");
// Error: Argument of type '"adres"' is not assignable to parameter of type 'keyof Persoon'.
```

### `typeof`

De `typeof` operator in een type-context geeft het **TypeScript-type** van een waarde:

```typescript
const origineel = {
    x: 10,
    y: 20,
};

type Punt = typeof origineel;
// Type: { x: number; y: number; }

const kopie: Punt = { x: 5, y: 15 }; // OK
```

> **📝 Opmerking:** TypeScripts `typeof` in een type-context is anders dan JavaScripts `typeof` in een waarde-context. De eerste geeft een TypeScript-type, de tweede een string.

## Type Assertions

Soms weet **jij** meer over een type dan TypeScript. Met een **type assertion** kun je TypeScript vertellen: "vertrouw me, dit is dit type":

```typescript
// TypeScript denkt: type is HTMLElement | null
const element = document.getElementById("mijn-element");

// Jij weet: het is een HTMLInputElement
const invoerVeld = document.getElementById("mijn-invoer") as HTMLInputElement;
invoerVeld.value = "hallo"; // OK
```

De `as` syntax is een type assertion. Er is ook een oudere syntax met `<>`:

```typescript
const invoerVeld = <HTMLInputElement>document.getElementById("mijn-invoer");
```

> **⚠️ Belangrijk:** Type assertions **verwijderen geen runtime controles**. Als het element niet bestaat of geen `HTMLInputElement` is, krijg je een runtime fout. Gebruik ze alleen als je zeker weet wat het type is.

### Non-Null Assertions

De `!` operator vertelt TypeScript dat een waarde **niet** `null` of `undefined` is:

```typescript
const element = document.getElementById("mijn-element"); // type: HTMLElement | null

// Non-null assertion
element!.textContent = "Hallo"; // OK — je belooft dat element niet null is
```

> **🔴 Let op:** Non-null assertions zijn gevaarlijk. Als de waarde wél `null` is, crasht je code. Gebruik liever een `if`-check.

### Error types asserteren

Bij `try/catch` is de error standaard van type `unknown`:

```typescript
try {
    // iets dat kan falen
} catch (error) {
    // error is van type 'unknown'
    
    if (error instanceof Error) {
        console.log(error.message); // OK na narrowing
    }
}
```

## Const Assertions

Met `as const` maak je waarden **zo specifiek mogelijk**:

```typescript
// Zonder as const
const kleuren = ["rood", "groen", "blauw"]; // type: string[]

// Met as const
const kleuren2 = ["rood", "groen", "blauw"] as const; // type: readonly ["rood", "groen", "blauw"]
```

Bij objecten maakt `as const` alle properties `readonly` en geeft ze literal types:

```typescript
const config = {
    url: "https://api.voorbeeld.nl",
    timeout: 5000,
} as const;

// Type: { readonly url: "https://api.voorbeeld.nl"; readonly timeout: 5000; }

config.url = "andere-url";
// Error: Cannot assign to 'url' because it is a read-only property.
```

---

## Samenvatting

- `any` schakelt type-controle uit — **vermijd het**
- `unknown` is het veilige alternatief — dwingt je om het type te controleren
- **Type predicates** (`waarde is Type`) laten functies narrowen voor de aanroeper
- `keyof` geeft een union van alle property-namen van een type
- `typeof` (in type-context) geeft het TypeScript-type van een waarde
- **Type assertions** (`as Type`) vertellen TypeScript wat jij weet over een type
- **Non-null assertions** (`!`) beloven dat een waarde niet null/undefined is
- `as const` maakt waarden zo specifiek en readonly mogelijk

---

## Oefeningen

Maak deze in een bestand `module9.ts`.

1. **Unknown vs any.** Maak een variabele `mysterie: unknown`. Probeer er een methode op aan te roepen. Gebruik dan `typeof` om te narrowen.

2. **Type predicate.** Schrijf een functie `isNumber(waarde: unknown): waarde is number` en gebruik deze in een `if`-statement.

3. **keyof.** Maak een interface `Auto` met `merk`, `model`, `bouwjaar`. Schrijf een functie die een `Auto` en een `keyof Auto` accepteert en de bijbehorende waarde teruggeeft.

4. **Type assertion.** Gebruik `document.querySelector` om een element te selecteren en assert het als `HTMLButtonElement`. Voeg een click handler toe.

5. **Const assertion.** Maak een object met `as const`. Probeer een property te wijzigen. Hover over het object in VS Code en schrijf het type in een commentaar.

Klaar? In **Module 10 (Generics)** leer je hoe je flexibele, herbruikbare types maakt.
