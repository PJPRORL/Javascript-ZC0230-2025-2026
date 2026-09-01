# Module 8 — Klassen

*Klassen structureren*
*Eigenschappen en methoden*
*Alles netjes op zijn plek*

JavaScript-klassen bestaan al sinds ES2015. TypeScript voegt daar **type-annotaties** en **extra features** aan toe die je klassen veiliger en duidelijker maken.

## Class Methodes

Methodes in klassen werken net als functies — je kunt type-annotaties toevoegen aan parameters en return types:

```typescript
class Begroeter {
    begroet(naam: string): string {
        return `Hallo, ${naam}!`;
    }
}

const b = new Begroeter();
b.begroet("Alice");     // OK
b.begroet(42);
// Error: Argument of type 'number' is not assignable to parameter of type 'string'.
```

## Class Properties

TypeScript vereist dat je class properties **declareert** voordat je ze gebruikt:

```typescript
class Leerling {
    naam: string;
    leeftijd: number;

    constructor(naam: string, leeftijd: number) {
        this.naam = naam;
        this.leeftijd = leeftijd;
    }
}
```

### Initialisatie-controle

TypeScript controleert of alle properties worden **geïnitialiseerd** in de constructor:

```typescript
class MistEen {
    naam: string;
    leeftijd: number; // Error: Property 'leeftijd' has no initializer
                      // and is not definitely assigned in the constructor.

    constructor(naam: string) {
        this.naam = naam;
        // leeftijd wordt niet toegewezen!
    }
}
```

### Optionele properties

```typescript
class Leerling {
    naam: string;
    bijnaam?: string; // optioneel — hoeft niet in constructor

    constructor(naam: string) {
        this.naam = naam;
    }
}
```

### Readonly properties

```typescript
class Citaat {
    readonly tekst: string;

    constructor(tekst: string) {
        this.tekst = tekst; // OK — toewijzing in constructor
    }

    wijzig() {
        this.tekst = "Andere tekst";
        // Error: Cannot assign to 'tekst' because it is a read-only property.
    }
}
```

## Klassen als Types

Een klasse fungeert automatisch ook als een **type**:

```typescript
class Leraar {
    naam: string;
    vak: string;

    constructor(naam: string, vak: string) {
        this.naam = naam;
        this.vak = vak;
    }
}

// Leraar als type gebruiken
let mijnLeraar: Leraar;
mijnLeraar = new Leraar("Jan", "Wiskunde"); // OK

// Structural typing: elk object met dezelfde vorm werkt ook
mijnLeraar = {
    naam: "Piet",
    vak: "Nederlands",
}; // OK — heeft de juiste structuur
```

## Klassen en Interfaces

Klassen kunnen een interface **implementeren** met het `implements` keyword:

```typescript
interface Leerbaar {
    naam: string;
    studeer(uren: number): void;
}

class Student implements Leerbaar {
    naam: string;

    constructor(naam: string) {
        this.naam = naam;
    }

    studeer(uren: number): void {
        console.log(`${this.naam} studeert ${uren} uur`);
    }
}
```

> **⚠️ Belangrijk:** `implements` geeft de klasse **geen** types — het controleert alleen of de klasse voldoet aan de interface. Je moet de types zelf nog declareren.

### Meerdere interfaces implementeren

```typescript
interface Eetbaar {
    eet(): void;
}

interface Slaapbaar {
    slaap(): void;
}

class Mens implements Eetbaar, Slaapbaar {
    eet() { console.log("Eten..."); }
    slaap() { console.log("Slapen..."); }
}
```

## Overerving (Extending)

Klassen kunnen andere klassen **uitbreiden**:

```typescript
class Dier {
    naam: string;

    constructor(naam: string) {
        this.naam = naam;
    }

    spreek(): string {
        return "...";
    }
}

class Hond extends Dier {
    ras: string;

    constructor(naam: string, ras: string) {
        super(naam); // Roep de constructor van Dier aan
        this.ras = ras;
    }

    spreek(): string {
        return "Woef!"; // Override de methode
    }
}

const rex = new Hond("Rex", "Labrador");
rex.naam;    // "Rex" — van Dier
rex.ras;     // "Labrador" — van Hond
rex.spreek(); // "Woef!" — overschreven methode
```

### Overridden Methods

Een overridden methode moet **compatibel** zijn met de originele:

```typescript
class BasisKlasse {
    berekenWaarde(invoer: string | number): number {
        return 42;
    }
}

class AfgeleideKlasse extends BasisKlasse {
    berekenWaarde(invoer: string): number { // ❌ te strikt!
        return invoer.length;
    }
    // Error: Property 'berekenWaarde' in type 'AfgeleideKlasse'
    // is not assignable to the same property in base type 'BasisKlasse'.
}
```

## Abstracte Klassen

Een **abstracte klasse** kan niet direct geïnstantieerd worden — het dient als blauwdruk:

```typescript
abstract class Vorm {
    abstract berekenOppervlakte(): number;

    beschrijf(): string {
        return `Deze vorm heeft oppervlakte ${this.berekenOppervlakte()}`;
    }
}

class Cirkel extends Vorm {
    straal: number;

    constructor(straal: number) {
        super();
        this.straal = straal;
    }

    berekenOppervlakte(): number {
        return Math.PI * this.straal ** 2;
    }
}

// const vorm = new Vorm(); // Error: Cannot create an instance of an abstract class.
const cirkel = new Cirkel(5);
cirkel.beschrijf(); // "Deze vorm heeft oppervlakte 78.539..."
```

## Member Visibility

TypeScript voegt **toegangsmodificatoren** toe aan klassen:

| Modifier | Beschrijving |
|----------|-------------|
| `public` | Overal toegankelijk (standaard) |
| `protected` | Alleen in de klasse zelf en afgeleide klassen |
| `private` | Alleen in de klasse zelf |

```typescript
class BankRekening {
    public eigenaar: string;
    protected rekeningNummer: string;
    private saldo: number;

    constructor(eigenaar: string, rekeningNummer: string, saldo: number) {
        this.eigenaar = eigenaar;
        this.rekeningNummer = rekeningNummer;
        this.saldo = saldo;
    }

    public toonSaldo(): string {
        return `€${this.saldo}`; // OK — private binnen de klasse
    }
}

class SpaarRekening extends BankRekening {
    toonInfo() {
        console.log(this.eigenaar);       // OK — public
        console.log(this.rekeningNummer); // OK — protected
        console.log(this.saldo);
        // Error: Property 'saldo' is private and only accessible within class 'BankRekening'.
    }
}

const rekening = new BankRekening("Alice", "NL12BANK0123", 1000);
rekening.eigenaar;       // OK — public
rekening.rekeningNummer; // Error — protected
rekening.saldo;          // Error — private
```

> **📝 Opmerking:** JavaScript heeft ook `#private` velden. TypeScript's `private` is alleen een compilatie-controle — bij runtime is het gewoon een publieke eigenschap. JavaScript's `#` is een echte runtime private.

---

## Samenvatting

- Class **methodes** en **properties** kunnen type-annotaties krijgen
- TypeScript controleert **initialisatie** van properties in de constructor
- Properties kunnen **optional** (`?`) of **readonly** zijn
- Een klasse fungeert automatisch als een **type**
- `implements` controleert of een klasse aan een interface voldoet
- `extends` laat klassen **erven** van andere klassen
- **Abstracte klassen** dienen als blauwdruk en kunnen niet direct geïnstantieerd worden
- **Visibility modifiers**: `public`, `protected`, `private`

---

## Oefeningen

Maak deze in een bestand `module8.ts`.

1. **Basis klasse.** Maak een klasse `Persoon` met properties `naam: string` en `leeftijd: number`, en een methode `stelVoor(): string` die een begroeting teruggeeft.

2. **Extends.** Maak een klasse `Werknemer extends Persoon` met extra property `functie: string` en een override van `stelVoor()` die ook de functie noemt.

3. **Implements.** Maak een interface `Printbaar` met methode `print(): void`. Laat `Persoon` deze interface implementeren.

4. **Abstracte klasse.** Maak een abstracte klasse `Vorm` met een abstracte methode `oppervlakte(): number`. Maak twee afgeleide klassen: `Rechthoek` en `Driehoek`.

5. **Visibility.** Maak een klasse met `public`, `protected`, en `private` members. Probeer vanuit een afgeleide klasse en vanuit een instantie de members te benaderen. Schrijf in comments wat wel/niet werkt.

Klaar? In **Module 9 (Type Modifiers)** leer je geavanceerde manieren om types aan te passen.
