# Module 17 — Syntax Extensies (Bonus)

*Extra syntax bovenop*
*Enums, decorators, meer*
*Gebruik met beleid*

Deze module behandelt TypeScript-syntax die **verder gaat** dan puur types toevoegen aan JavaScript. Dit zijn features die ook de **runtime** output beïnvloeden.

> **📝 Opmerking:** Deze module is een bonus. De onderwerpen hierin zijn nuttig om te kennen, maar niet essentieel voor dagelijks gebruik.

## Enums

Een **enum** (enumeration) is een manier om een set benoemde constanten te definiëren:

### Numerieke Enums

```typescript
enum Richting {
    Noord,  // 0
    Oost,   // 1
    Zuid,    // 2
    West,   // 3
}

const kompas = Richting.Noord;  // 0
console.log(Richting[0]);       // "Noord" (reverse mapping)
```

Standaard beginnen numerieke enums bij 0, maar je kunt een andere startwaarde opgeven:

```typescript
enum StatusCode {
    Ok = 200,
    NietGevonden = 404,
    ServerFout = 500,
}
```

### String Enums

String enums zijn **expliciet** — elke waarde moet opgegeven worden:

```typescript
enum Kleur {
    Rood = "ROOD",
    Groen = "GROEN",
    Blauw = "BLAUW",
}

const mijnKleur = Kleur.Rood; // "ROOD"
```

> **💡 Tip:** String enums zijn in de praktijk handiger dan numerieke enums, omdat de waarden leesbaar zijn in console logs en debuggen.

### Const Enums

Met `const enum` worden de waarden **inline** geplaatst — er wordt geen JavaScript object gegenereerd:

```typescript
const enum Grootte {
    Klein = "S",
    Medium = "M",
    Groot = "L",
}

const maat = Grootte.Medium; // Wordt gecompileerd naar: const maat = "M";
```

### Enums vs Union Literal Types

In veel gevallen kun je **union literal types** gebruiken in plaats van enums:

```typescript
// Met enum
enum Status {
    Actief = "actief",
    Inactief = "inactief",
}

// Alternatief: union literal type
type Status2 = "actief" | "inactief";
```

> **⚠️ Belangrijk:** Veel TypeScript-experts raden aan om union literal types te gebruiken in plaats van enums. Enums voegen runtime code toe, union types niet. Maar enums kunnen handiger zijn in grote codebases waar autocompletion nuttig is.

## Type-Only Imports en Exports

Je kunt aangeven dat een import alleen voor **types** is — niet voor runtime waarden:

```typescript
// Gewone import — wordt meegenomen in JavaScript output
import { Gebruiker } from "./types";

// Type-only import — wordt verwijderd bij compilatie
import type { Gebruiker } from "./types";
```

Dit is nuttig voor:
- **Duidelijkheid** — je ziet meteen wat runtime is en wat alleen types zijn
- **Bundler-optimalisatie** — bundlers kunnen type-only imports beter weglaten
- **Circulaire afhankelijkheden** — type-only imports voorkomen runtime circulariteit

### Inline type imports

Je kunt ook per import aangeven dat het een type is:

```typescript
import { type Gebruiker, maakGebruiker } from "./gebruiker";
// Gebruiker is type-only, maakGebruiker is runtime
```

## Namespaces

Namespaces waren een vroege manier om code te organiseren in TypeScript:

```typescript
namespace Wiskunde {
    export function optellen(a: number, b: number): number {
        return a + b;
    }

    export function aftrekken(a: number, b: number): number {
        return a - b;
    }
}

Wiskunde.optellen(1, 2); // 3
```

> **🔴 Let op:** Namespaces worden **niet meer aanbevolen** voor nieuwe code. Gebruik in plaats daarvan moderne `import`/`export` modules. Namespaces bestaan nog voor legacy-code en het uitbreiden van globale types.

## Decorators (experimenteel)

Decorators zijn een manier om klassen en hun leden te **annoteren en wijzigen**. Ze worden veel gebruikt in frameworks zoals Angular en NestJS.

```typescript
// Een eenvoudige decorator
function Log(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const origineel = descriptor.value;
    descriptor.value = function (...args: any[]) {
        console.log(`Aanroep: ${propertyKey}(${args.join(", ")})`);
        return origineel.apply(this, args);
    };
}

class Calculator {
    @Log
    optellen(a: number, b: number): number {
        return a + b;
    }
}

const calc = new Calculator();
calc.optellen(2, 3); // Logt: "Aanroep: optellen(2, 3)" en geeft 5 terug
```

> **📝 Opmerking:** Decorators vereisen de optie `experimentalDecorators: true` in `tsconfig.json`. TypeScript 5.0+ ondersteunt ook de nieuwe standaard decorators.

---

## Samenvatting

- **Enums** definiëren benoemde constanten (numeriek of string)
- **Union literal types** zijn vaak een beter alternatief voor enums
- `const enum` wordt inline geplaatst zonder runtime code
- **Type-only imports** (`import type`) worden verwijderd bij compilatie
- **Namespaces** zijn legacy — gebruik moderne modules in plaats daarvan
- **Decorators** annoteren en wijzigen klassen (experimenteel)

---

## Oefeningen

1. **String enum.** Maak een enum `Seizoen` met waarden `"lente"`, `"zomer"`, `"herfst"`, `"winter"`. Schrijf een functie die het seizoen logt.

2. **Enum vs union.** Herschrijf je `Seizoen` enum als een union literal type. Vergelijk het gebruik.

3. **Type-only import.** Maak twee bestanden. Exporteer een interface uit het ene bestand en importeer het met `import type` in het andere.

4. **Const enum.** Maak een `const enum` en compileer het. Bekijk de JavaScript output — merk op dat er geen enum object is.

Klaar? In **Module 18 (Type Operaties)** behandelen we de meest geavanceerde type-features.
