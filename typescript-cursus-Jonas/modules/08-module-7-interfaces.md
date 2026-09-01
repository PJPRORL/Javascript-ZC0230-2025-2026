# Module 7 — Interfaces

*Interfaces staan*
*Als contract voor objecten*
*Beloof wat je bent*

In Module 4 hebben we type aliases gebruikt om object types te definiëren. Nu leer je **interfaces** — de meestgebruikte manier om object types te beschrijven in TypeScript.

## Type Aliases vs Interfaces

Beide kunnen object types beschrijven, maar er zijn subtiele verschillen:

```typescript
// Met type alias
type DichterType = {
    geboren: number;
    naam: string;
};

// Met interface
interface DichterInterface {
    geboren: number;
    naam: string;
}
```

De belangrijkste verschillen:

| Eigenschap | Type Alias | Interface |
|------------|-----------|-----------|
| Object types | ✅ Ja | ✅ Ja |
| Union types | ✅ Ja (`type X = A \| B`) | ❌ Nee |
| Extending | ✅ Met `&` | ✅ Met `extends` |
| Declaration merging | ❌ Nee | ✅ Ja |
| Foutmeldingen | Toont de alias-naam | Toont de interface-naam |

> **💡 Tip:** Gebruik `interface` voor object types en `type` voor alles wat geen object is (unions, primitieven, tuples). Dit is de meest gangbare conventie.

## Soorten Properties

### Optionele properties

Net als bij type aliases, gebruik `?`:

```typescript
interface Boek {
    auteur?: string;
    paginas: number;
    titel: string;
}
```

### Read-only properties

Markeer eigenschappen als `readonly` om te voorkomen dat ze gewijzigd worden:

```typescript
interface Pagina {
    readonly tekst: string;
}

function leesPagina(pagina: Pagina) {
    console.log(pagina.tekst); // OK — lezen mag

    pagina.tekst = "Nieuwe tekst";
    // Error: Cannot assign to 'tekst' because it is a read-only property.
}
```

### Methodes

Interfaces kunnen methodes (functies) bevatten op twee manieren:

```typescript
interface HeeftMethodes {
    // Methode syntax
    begroet(naam: string): string;

    // Property syntax (functie type)
    optellen: (a: number, b: number) => number;
}
```

Beide zijn geldig. Methode syntax (`begroet(): type`) is gebruikelijker.

### Call Signatures

Je kunt een interface beschrijven als een **callable** — iets dat aangeroepen kan worden:

```typescript
interface OptelFunctie {
    (a: number, b: number): number;
}

const optellen: OptelFunctie = (a, b) => a + b;
```

### Index Signatures

Als je niet alle property-namen van tevoren kent:

```typescript
interface WoordenBoek {
    [woord: string]: string;
}

const woordenboek: WoordenBoek = {
    "hallo": "hello",
    "wereld": "world",
};

woordenboek["nieuw"] = "new"; // OK
```

> **⚠️ Belangrijk:** Index signatures zijn krachtig maar voorzichtig mee om te gaan. TypeScript gaat ervan uit dat elke mogelijke sleutel een waarde heeft, ook als dat niet zo is.

### Geneste Interfaces

Interfaces kunnen naar andere interfaces verwijzen:

```typescript
interface Adres {
    straat: string;
    stad: string;
    postcode: string;
}

interface Persoon {
    naam: string;
    adres: Adres;
}
```

## Interface Extensions

Een interface kan een andere interface **uitbreiden** (erven):

```typescript
interface Dier {
    naam: string;
    geluid(): string;
}

interface Hond extends Dier {
    ras: string;
    apporteer(): void;
}

const rex: Hond = {
    naam: "Rex",
    ras: "Labrador",
    geluid: () => "Woef!",
    apporteer: () => console.log("*brengt bal terug*"),
};
```

### Properties overschrijven

Een afgeleide interface mag een property overschrijven met een **specifieker** type:

```typescript
interface BasisWaarde {
    waarde: string | number;
}

interface StringWaarde extends BasisWaarde {
    waarde: string; // OK — string is een subtype van string | number
}
```

### Meerdere interfaces uitbreiden

```typescript
interface Eetbaar {
    calorieen: number;
}

interface Drinkbaar {
    milliliters: number;
}

interface Smoothie extends Eetbaar, Drinkbaar {
    smaak: string;
}

const groenteSmoothie: Smoothie = {
    calorieen: 150,
    milliliters: 500,
    smaak: "spinazie-banaan",
};
```

## Interface Merging

Als je twee interfaces met **dezelfde naam** declareert, worden ze automatisch **samengevoegd**:

```typescript
interface Venster {
    hoogte: number;
    breedte: number;
}

interface Venster {
    kleur: string;
}

// Venster heeft nu: hoogte, breedte, EN kleur
const mijnVenster: Venster = {
    hoogte: 100,
    breedte: 200,
    kleur: "blauw",
};
```

> **📝 Opmerking:** Interface merging wordt vooral gebruikt bij het uitbreiden van externe bibliotheken. In je eigen code is het beter om `extends` te gebruiken.

> **🔴 Let op:** Als twee samengevoegde interfaces dezelfde property hebben met **verschillende types**, geeft TypeScript een fout.

---

## Samenvatting

- **Interfaces** zijn de standaardmanier om object types te definiëren in TypeScript
- Gebruik `interface` voor objecten, `type` voor unions en primitieven
- Properties kunnen **optioneel** (`?`), **readonly**, of **methodes** zijn
- **Index signatures** (`[key: string]: type`) staan dynamische properties toe
- `extends` laat een interface **erven** van één of meerdere andere interfaces
- **Interface merging** voegt gelijknamige interfaces automatisch samen

---

## Oefeningen

Maak deze in een bestand `module7.ts`.

1. **Interface vs type.** Herschrijf het `Product` type uit Module 4 als een `interface`. Maak een object dat eraan voldoet.

2. **Readonly.** Maak een interface `Configuratie` met readonly properties `apiUrl: string` en `versie: number`. Probeer een property te wijzigen na creatie.

3. **Extends.** Maak een interface `Voertuig` met `merk: string` en `bouwjaar: number`. Maak `Auto extends Voertuig` met extra `aantalDeuren: number`. Maak `ElektrischeAuto extends Auto` met extra `bereikKm: number`.

4. **Index signature.** Maak een interface `Vertaalwoordenboek` met een index signature `[sleutel: string]: string`. Vul het met minstens 5 vertalingen.

5. **Interface merging.** Declareer een interface `Window` twee keer met verschillende properties. Maak een object dat alle properties bevat.

Klaar? In **Module 8 (Klassen)** leer je hoe TypeScript klassen verrijkt met types.
