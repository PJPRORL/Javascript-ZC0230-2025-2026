# Module 4 — Objecten

*Object literals*
*Een set sleutels en waarden*
*Elk met hun eigen type*

In Module 3 hebben we union en literal types behandeld — werken met primitieven. Maar JavaScript draait om **objecten**. In deze module leer je hoe TypeScript de "vorm" van objecten begrijpt en controleert.

## Object Types

Wanneer je een object aanmaakt met `{...}` syntax, beschouwt TypeScript het als een nieuw **object type** op basis van zijn eigenschappen:

```typescript
const dichter = {
    geboren: 1935,
    naam: "Mary Oliver",
};

dichter.geboren; // Type: number
dichter.naam;    // Type: string

dichter.einde;
//      ~~~~~
// Error: Property 'einde' does not exist on
// type '{ geboren: number; naam: string; }'.
```

### Object types declareren

Je kunt object types ook **expliciet** beschrijven:

```typescript
let dichterLater: {
    geboren: number;
    naam: string;
};

dichterLater = {
    geboren: 1935,
    naam: "Mary Oliver",
}; // OK

dichterLater = "Sappho";
// Error: Type 'string' is not assignable to
// type '{ geboren: number; naam: string; }'
```

### Type aliases voor objecten

Steeds dezelfde structuur uittypen wordt vervelend. Gebruik een **type alias**:

```typescript
type Dichter = {
    geboren: number;
    naam: string;
};

let dichterLater: Dichter;

dichterLater = {
    geboren: 1935,
    naam: "Sara Teasdale",
}; // OK

dichterLater = "Emily Dickinson";
// Error: Type 'string' is not assignable to 'Dichter'.
```

> **📝 Opmerking:** De meeste TypeScript-projecten gebruiken het `interface` keyword voor object types (Module 7). Aliased object types en interfaces zijn bijna identiek.

## Structural Typing

TypeScripts type systeem is **structureel getypeerd**: elke waarde die de juiste "vorm" heeft, mag gebruikt worden als dat type. Het gaat niet om de naam, maar om de **structuur**.

```typescript
type MetVoornaam = {
    voornaam: string;
};

type MetAchternaam = {
    achternaam: string;
};

const heeftBeide = {
    voornaam: "Lucille",
    achternaam: "Clifton",
};

// OK: heeftBeide bevat een voornaam van type string
let metVoornaam: MetVoornaam = heeftBeide;

// OK: heeftBeide bevat een achternaam van type string
let metAchternaam: MetAchternaam = heeftBeide;
```

> **💡 Tip:** JavaScript is *duck typed* (controle tijdens runtime), TypeScript is *structureel getypeerd* (controle tijdens compilatie). "Als het eruitziet als een eend en kwaakt als een eend, dan is het een eend."

### Gebruik-controle

TypeScript controleert of alle **verplichte eigenschappen** aanwezig zijn:

```typescript
type VoorEnAchternaam = {
    voor: string;
    achter: string;
};

const heeftBeide: VoorEnAchternaam = {
    voor: "Sarojini",
    achter: "Naidu",
}; // OK

const heeftEen: VoorEnAchternaam = {
    voor: "Sappho"
};
// Error: Property 'achter' is missing in type '{ voor: string; }'
// but required in type 'VoorEnAchternaam'.
```

### Overtollige eigenschappen

Als je een object **direct** toewijst aan een getypeerde variabele, mag het geen extra eigenschappen hebben:

```typescript
type Dichter = {
    geboren: number;
    naam: string;
};

const extraEigenschap: Dichter = {
    activiteit: "wandelen",  // ❌ Fout!
    geboren: 1935,
    naam: "Mary Oliver",
};
// Error: 'activiteit' does not exist in type 'Dichter'.
```

Maar als je een bestaand object toewijst, worden extra eigenschappen **niet** gecontroleerd:

```typescript
const bestaandObject = {
    activiteit: "wandelen",
    geboren: 1935,
    naam: "Mary Oliver",
};

const extraMaarOk: Dichter = bestaandObject; // OK!
```

## Geneste Object Types

Objecten kunnen andere objecten bevatten:

```typescript
type Auteur = {
    voornaam: string;
    achternaam: string;
};

type Gedicht = {
    auteur: Auteur;
    naam: string;
};

const gedichtCorrect: Gedicht = {
    auteur: {
        voornaam: "Sylvia",
        achternaam: "Plath",
    },
    naam: "Lady Lazarus",
}; // OK
```

> **💡 Tip:** Splits geneste object types altijd op in aparte type aliases. Dat maakt je code leesbaarder en de foutmeldingen duidelijker.

## Optionele Eigenschappen

Niet alle eigenschappen hoeven verplicht te zijn. Gebruik `?` om een eigenschap optioneel te maken:

```typescript
type Boek = {
    auteur?: string;   // optioneel
    paginas: number;   // verplicht
};

const metAuteur: Boek = {
    auteur: "Rita Dove",
    paginas: 80,
}; // OK

const zonderAuteur: Boek = {
    paginas: 120,
}; // OK — auteur is optioneel

const zonderPaginas: Boek = {
    auteur: "Rita Dove",
};
// Error: Property 'paginas' is missing
```

> **⚠️ Belangrijk:** Er is een verschil tussen `eigenschap?: string` (mag ontbreken) en `eigenschap: string | undefined` (moet aanwezig zijn, maar mag `undefined` zijn).

```typescript
type Schrijvers = {
    auteur: string | undefined;  // MOET bestaan, mag undefined zijn
    editor?: string;              // MAG ontbreken
};

const metAuteur: Schrijvers = {
    auteur: undefined,
}; // OK

const zonderAuteur: Schrijvers = {};
// Error: Property 'auteur' is missing
```

## Unions van Object Types

### Afgeleide object-type unions

Als een variabele verschillende objectvormen kan hebben, leidt TypeScript een union van object types af:

```typescript
const gedicht = Math.random() > 0.5
    ? { naam: "The Double Image", paginas: 7 }
    : { naam: "Her Kind", rijmt: true };

gedicht.naam;    // string — altijd aanwezig
gedicht.paginas; // number | undefined
gedicht.rijmt;   // boolean | undefined
```

### Expliciete object-type unions

Je kunt ook **expliciet** een union van object types maken:

```typescript
type GedichtMetPaginas = {
    naam: string;
    paginas: number;
};

type GedichtDatRijmt = {
    naam: string;
    rijmt: boolean;
};

type Gedicht = GedichtMetPaginas | GedichtDatRijmt;
```

Bij een expliciete union mag je alleen eigenschappen benaderen die op **alle** types bestaan:

```typescript
const gedicht: Gedicht = Math.random() > 0.5
    ? { naam: "The Double Image", paginas: 7 }
    : { naam: "Her Kind", rijmt: true };

gedicht.naam; // OK — bestaat op beide types

gedicht.paginas;
// Error: Property 'paginas' does not exist on type 'Gedicht'.
```

### Narrowing van object types

Gebruik de `in` operator om te narrowen:

```typescript
if ("paginas" in gedicht) {
    gedicht.paginas; // OK — TypeScript weet: GedichtMetPaginas
} else {
    gedicht.rijmt;   // OK — TypeScript weet: GedichtDatRijmt
}
```

### Discriminated Unions

Een veelgebruikt patroon: geef elk object-type een **discriminant** eigenschap die aangeeft welk type het is:

```typescript
type GedichtMetPaginas = {
    naam: string;
    paginas: number;
    type: "paginas";   // discriminant
};

type GedichtDatRijmt = {
    naam: string;
    rijmt: boolean;
    type: "rijmt";     // discriminant
};

type Gedicht = GedichtMetPaginas | GedichtDatRijmt;

const gedicht: Gedicht = Math.random() > 0.5
    ? { naam: "The Double Image", paginas: 7, type: "paginas" }
    : { naam: "Her Kind", rijmt: true, type: "rijmt" };

if (gedicht.type === "paginas") {
    console.log(`Aantal paginas: ${gedicht.paginas}`); // OK
} else {
    console.log(`Rijmt: ${gedicht.rijmt}`); // OK
}
```

> **💡 Tip:** Discriminated unions zijn een van de krachtigste patronen in TypeScript. Je zult ze vaak tegenkomen bij het werken met API-responses en state management.

## Intersection Types

Waar `|` (union) "of" betekent, betekent `&` (intersection) "en". Een intersection type **combineert** meerdere types:

```typescript
type Kunstwerk = {
    genre: string;
    naam: string;
};

type Geschrift = {
    paginas: number;
    naam: string;
};

type GeschrevenKunst = Kunstwerk & Geschrift;
// Equivalent aan:
// {
//   genre: string;
//   naam: string;
//   paginas: number;
// }
```

### Gevaren van intersection types

Als je twee primitieve types combineert met `&`, krijg je het type `never` — want een waarde kan niet tegelijk een number **en** een string zijn:

```typescript
type Onmogelijk = number & string; // Type: never
```

> **⚠️ Belangrijk:** Houd intersection types eenvoudig. Complexe intersections leiden tot verwarrende foutmeldingen.

---

## Samenvatting

- TypeScript leidt **object types** af op basis van de eigenschappen van object literals
- Je kunt object types **declareren** met inline types of **type aliases**
- **Structural typing**: als de structuur klopt, past het type
- **Overtollige eigenschappen** worden gecontroleerd bij directe toewijzing
- **Optionele eigenschappen** markeer je met `?`
- **Unions van object types** kun je narrowen met `in` of discriminant-eigenschappen
- **Discriminated unions** zijn een krachtig patroon met een `type`-eigenschap als discriminant
- **Intersection types** (`&`) combineren meerdere types tot één

---

## Oefeningen

Maak deze in een bestand `module4.ts`.

1. **Object type.** Maak een type alias `Product` met: `naam: string`, `prijs: number`, `opVoorraad: boolean`. Maak twee objecten die aan dit type voldoen.

2. **Optionele eigenschap.** Breid `Product` uit met een optionele eigenschap `beschrijving?: string`. Maak een object mét en een object zonder beschrijving.

3. **Geneste objecten.** Maak een type `Bestelling` met een `klant: { naam: string; email: string }` en een `producten: Product[]`. Maak een voorbeeldbestelling.

4. **Discriminated union.** Maak een union type `Betaling` met twee varianten:
   - `{ type: "creditcard"; kaartNummer: string; }`
   - `{ type: "ideal"; bank: string; }`
   Schrijf een functie die op basis van `betaling.type` de juiste info logt.

5. **Intersection type.** Maak twee types `Adreseerbaar` (met `adres: string`) en `Contacteerbaar` (met `email: string; telefoon: string`). Combineer ze met `&` tot een `Klant` type. Maak een object van dit type.

Klaar? In **Module 5 (Functies)** gaan we dieper in op hoe TypeScript functieparameters en return types behandelt.
