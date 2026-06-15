# Module 10 — Generics

*Generieke types*
*Flexibel maar toch getypeerd*
*Herbruikbaar en sterk*

Generics zijn een van de krachtigste features van TypeScript. Ze laten je **flexibele, herbruikbare types** maken die werken met verschillende typen zonder type-veiligheid te verliezen.

## Generic Functies

Stel je hebt een functie die het eerste element van een array teruggeeft:

```typescript
// Zonder generics — verliest type-informatie
function eersteElement(array: unknown[]): unknown {
    return array[0];
}

const resultaat = eersteElement([1, 2, 3]); // type: unknown 😕
```

Met **generics** behoud je het type:

```typescript
// Met generics — behoudt type-informatie
function eersteElement<T>(array: T[]): T {
    return array[0];
}

const getal = eersteElement([1, 2, 3]);     // type: number ✅
const tekst = eersteElement(["a", "b"]);   // type: string ✅
```

`T` is een **type parameter** — een placeholder voor een type dat later wordt ingevuld. TypeScript leidt `T` automatisch af op basis van de argumenten.

### Expliciet type meegeven

Je kunt het type ook **expliciet** specificeren:

```typescript
const resultaat = eersteElement<string>(["a", "b", "c"]);
// type: string
```

### Meerdere type parameters

```typescript
function maakPaar<K, V>(sleutel: K, waarde: V): [K, V] {
    return [sleutel, waarde];
}

const paar1 = maakPaar("naam", "Alice"); // type: [string, string]
const paar2 = maakPaar("leeftijd", 25);  // type: [string, number]
const paar3 = maakPaar(1, true);          // type: [number, boolean]
```

## Generic Interfaces

Interfaces kunnen ook type parameters hebben:

```typescript
interface Doos<T> {
    inhoud: T;
    leeg: boolean;
}

const stringDoos: Doos<string> = {
    inhoud: "Hallo",
    leeg: false,
};

const nummerDoos: Doos<number> = {
    inhoud: 42,
    leeg: false,
};
```

### Afgeleide generic interface types

TypeScript kan het type soms afleiden:

```typescript
interface GelinkteLijst<T> {
    waarde: T;
    volgende?: GelinkteLijst<T>;
}

const lijst: GelinkteLijst<string> = {
    waarde: "eerste",
    volgende: {
        waarde: "tweede",
        volgende: {
            waarde: "derde",
        },
    },
};
```

## Generic Klassen

```typescript
class Stapel<T> {
    private items: T[] = [];

    duwOp(item: T): void {
        this.items.push(item);
    }

    halAf(): T | undefined {
        return this.items.pop();
    }

    kijkBovenaan(): T | undefined {
        return this.items[this.items.length - 1];
    }

    get grootte(): number {
        return this.items.length;
    }
}

const getalStapel = new Stapel<number>();
getalStapel.duwOp(1);
getalStapel.duwOp(2);
getalStapel.halAf(); // type: number | undefined

const tekstStapel = new Stapel<string>();
tekstStapel.duwOp("hallo");
```

## Generic Type Aliases

```typescript
type Resultaat<T> = {
    succes: boolean;
    data: T;
    fout?: string;
};

const gebruikerResultaat: Resultaat<{ naam: string }> = {
    succes: true,
    data: { naam: "Alice" },
};

const getalResultaat: Resultaat<number> = {
    succes: true,
    data: 42,
};
```

### Generic Discriminated Unions

Een krachtig patroon — combineer generics met discriminated unions:

```typescript
type Succes<T> = {
    type: "succes";
    data: T;
};

type Fout = {
    type: "fout";
    bericht: string;
};

type Resultaat<T> = Succes<T> | Fout;

function verwerk<T>(resultaat: Resultaat<T>) {
    if (resultaat.type === "succes") {
        console.log("Data:", resultaat.data); // type: T
    } else {
        console.log("Fout:", resultaat.bericht);
    }
}
```

## Generic Modifiers

### Standaardwaarden voor type parameters

```typescript
interface Container<T = string> {
    waarde: T;
}

const tekstContainer: Container = { waarde: "hallo" }; // T is string (standaard)
const getalContainer: Container<number> = { waarde: 42 }; // T is number
```

## Constrained Generics (Type Beperkingen)

Je kunt eisen stellen aan het type parameter met `extends`:

```typescript
// T moet een eigenschap 'lengte' hebben
function logLengte<T extends { length: number }>(waarde: T): void {
    console.log(`Lengte: ${waarde.length}`);
}

logLengte("hallo");    // OK — strings hebben length
logLengte([1, 2, 3]); // OK — arrays hebben length
logLengte(42);
// Error: Argument of type 'number' is not assignable to parameter
// of type '{ length: number }'.
```

### keyof met constrained generics

```typescript
function geefEigenschap<T, K extends keyof T>(object: T, sleutel: K): T[K] {
    return object[sleutel];
}

const persoon = { naam: "Alice", leeftijd: 25 };

geefEigenschap(persoon, "naam");     // type: string
geefEigenschap(persoon, "leeftijd"); // type: number
geefEigenschap(persoon, "email");
// Error: Argument of type '"email"' is not assignable to
// parameter of type '"naam" | "leeftijd"'.
```

## Promises

Promises zijn generisch — het type parameter beschrijft wat de Promise oplevert:

```typescript
// Promise<string> — levert een string op
async function haalNaam(): Promise<string> {
    const response = await fetch("/api/naam");
    const data = await response.text();
    return data;
}

// Promise<number> — levert een number op
async function haalTellerStand(): Promise<number> {
    return 42;
}
```

### Async functies

```typescript
async function haalGebruiker(id: number): Promise<{ naam: string; email: string }> {
    const response = await fetch(`/api/gebruikers/${id}`);
    const gebruiker = await response.json();
    return gebruiker;
}
```

## De Gouden Regel van Generics

> **💡 Tip:** Gebruik generics alleen wanneer het type parameter op **minstens twee plekken** voorkomt (bijv. parameter en return type, of twee parameters). Als een type parameter maar één keer voorkomt, heb je waarschijnlijk geen generic nodig.

```typescript
// ✅ Goed — T wordt op twee plekken gebruikt
function eerste<T>(array: T[]): T {
    return array[0];
}

// ❌ Onnodig — T wordt maar één keer gebruikt
function log<T>(waarde: T): void {
    console.log(waarde);
}

// ✅ Beter — geen generic nodig
function log(waarde: unknown): void {
    console.log(waarde);
}
```

### Naamconventies

| Letter | Gebruik |
|--------|---------|
| `T` | Type (algemeen) |
| `K` | Key (sleutel) |
| `V` | Value (waarde) |
| `E` | Element |
| `R` | Return type |

---

## Samenvatting

- **Generics** maken types flexibel en herbruikbaar met type parameters (`<T>`)
- TypeScript leidt type parameters vaak **automatisch af**
- Generic **functies**, **interfaces**, **klassen**, en **type aliases** zijn allemaal mogelijk
- **Constrained generics** (`T extends ...`) beperken welke types zijn toegestaan
- **Promises** zijn generisch: `Promise<T>`
- Gebruik generics alleen als het type parameter op **minstens twee plekken** voorkomt

---

## Oefeningen

Maak deze in een bestand `module10.ts`.

1. **Generic functie.** Schrijf een functie `laatsteElement<T>(array: T[]): T` die het laatste element teruggeeft. Test met arrays van verschillende types.

2. **Generic interface.** Maak een interface `ApiResponse<T>` met `status: number`, `data: T`, en `timestamp: Date`. Gebruik het met verschillende types voor `data`.

3. **Generic klasse.** Maak een klasse `Wachtrij<T>` met methodes `toevoegen(item: T)`, `verwijderen(): T | undefined`, en een getter `grootte`.

4. **Constrained generic.** Schrijf een functie `langste<T extends { length: number }>(a: T, b: T): T` die het langste van twee waarden teruggeeft.

5. **keyof met generics.** Schrijf een functie `plukWaarden<T, K extends keyof T>(objecten: T[], sleutel: K): T[K][]` die een specifieke eigenschap uit een array van objecten plukt.

Klaar? In **Module 11 (Vite & Modules)** leer je hoe je een professioneel TypeScript project opzet met Vite.
