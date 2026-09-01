# Module 18 — Type Operaties (Bonus)

*Types uit types*
*Transformeer en combineer*
*Geavanceerde magie*

Dit is de meest geavanceerde module van de cursus. TypeScript heeft een "type-programmeertaal" ingebouwd waarmee je nieuwe types kunt genereren op basis van bestaande types. Dit is extreem krachtig, maar ook complex.

> **📝 Opmerking:** Dit is een bonus-module. Je hoeft dit niet allemaal uit je hoofd te kennen, maar het is nuttig om te herkennen als je geavanceerde code of bibliotheken leest.

## Mapped Types

Een **mapped type** neemt een bestaand type en "maakt" een nieuw type door over alle eigenschappen te itereren.

Stel, we hebben een interface:

```typescript
interface Gebruiker {
    id: number;
    naam: string;
    email: string;
}
```

Wat als we een versie willen waar alle velden **optioneel** zijn? We kunnen een mapped type schrijven:

```typescript
type MaakOptioneel<T> = {
    [K in keyof T]?: T[K];
};

type OptioneleGebruiker = MaakOptioneel<Gebruiker>;
// Type:
// {
//    id?: number;
//    naam?: string;
//    email?: string;
// }
```

### Ingebouwde Mapped Types

TypeScript heeft een aantal ingebouwde utility types die gebruikmaken van mapped types. Je hoeft ze dus niet zelf te schrijven:

| Type | Wat het doet |
|------|-------------|
| `Partial<T>` | Maakt alle properties optioneel |
| `Required<T>` | Maakt alle properties verplicht (verwijdert `?`) |
| `Readonly<T>` | Maakt alle properties `readonly` |
| `Record<K, V>` | Maakt een object type met keys `K` en values `V` |

Voorbeelden:

```typescript
type GedeeltelijkeGebruiker = Partial<Gebruiker>;
type VasteGebruiker = Readonly<Gebruiker>;

// Een object met strings als keys en numbers als values
const scores: Record<string, number> = {
    Alice: 10,
    Bob: 20,
};
```

## Conditional Types

Met **conditional types** kun je `if`-statements schrijven in het type systeem:

```typescript
// Syntaxis: Conditie ? Waar : Onwaar
type IsString<T> = T extends string ? true : false;

type A = IsString<"hallo">; // true
type B = IsString<42>;      // false
```

### Ingebouwde Conditional Types

TypeScript levert handige utility types op basis van condities:

| Type | Wat het doet |
|------|-------------|
| `Exclude<T, U>` | Verwijdert `U` uit de union `T` |
| `Extract<T, U>` | Behoudt alleen `U` in de union `T` |
| `NonNullable<T>` | Verwijdert `null` en `undefined` uit `T` |

Voorbeelden:

```typescript
type AlleStatus = "actief" | "inactief" | "geschorst";

type ActieveStatus = Exclude<AlleStatus, "geschorst">;
// Type: "actief" | "inactief"

type AlleenStrings = Extract<string | number | boolean, string>;
// Type: string
```

## Template Literal Types

Je kunt **template literals** (backticks `` ` ``) gebruiken in types om nieuwe string types te genereren!

```typescript
type Kleur = "rood" | "blauw";
type Kleding = "shirt" | "broek";

type ProductCode = `${Kleur}-${Kleding}`;
// Type: "rood-shirt" | "rood-broek" | "blauw-shirt" | "blauw-broek"
```

Dit is enorm krachtig voor het genereren van strak getypeerde string-combinaties.

### Ingebouwde String Manipulaties

TypeScript heeft ingebouwde types om strings aan te passen:

```typescript
type NaarHoofdletters = Uppercase<"hallo">; // "HALLO"
type NaarKleineLetters = Lowercase<"HALLO">; // "hallo"
type EersteHoofdletter = Capitalize<"hallo">; // "Hallo"
type EersteKleineLetter = Uncapitalize<"Hallo">; // "hallo"
```

## typeof en ReturnType

Je hebt `typeof` al gezien. Gecombineerd met de utility `ReturnType` kun je het return type van een willekeurige functie extraheren:

```typescript
function maakConfiguratie() {
    return {
        poort: 8080,
        host: "localhost",
        beveiligd: true,
    };
}

// Haal het type uit de returnwaarde van de functie
type Configuratie = ReturnType<typeof maakConfiguratie>;

// Type is automatisch:
// { poort: number; host: string; beveiligd: boolean; }
```

Dit bespaart je de moeite om de interface handmatig up-to-date te houden als de functie verandert.

---

## Samenvatting

- **Mapped types** transformeren elk veld in een type (bijv. alles optioneel maken)
- Utility types zoals `Partial`, `Required`, `Readonly`, en `Record` besparen je type-werk
- **Conditional types** (`A extends B ? X : Y`) laten logica toe in je types
- Utility types zoals `Exclude` en `Extract` filteren union types
- **Template literal types** genereren combinaties van strings op type-niveau
- `ReturnType<typeof functie>` extraheert het return type van een bestaande functie

---

## Oefeningen

1. **Ingebouwde types.** Maak een interface `Auto` met `merk`, `model`, en `jaar`. Maak een variabele van het type `Partial<Auto>` en één van het type `Readonly<Auto>`. Test wat wel en niet mag.

2. **Template literal.** Maak een type `Grootte` met `"S" | "M" | "L"`. Maak een type `Kleur` met `"rood" | "blauw"`. Genereer een type `TShirt` dat alle combinaties vormt (bijv. `"S-rood"`).

3. **ReturnType.** Schrijf een functie die een ingewikkeld object teruggeeft. Gebruik `ReturnType` en `typeof` om dat type op te slaan in een alias.

Gefeliciteerd! Je hebt alle theoriemodules van deze TypeScript-cursus afgerond. Je bent nu klaar voor de **Eindoefening & Examens** in de laatste module.
