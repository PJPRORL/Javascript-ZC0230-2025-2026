# Module 14 — Declaratiebestanden

*Types apart bewaard*
*In `.d.ts` bestanden*
*Bruggen naar JavaScript*

Wanneer je TypeScript-code schrijft, genereert de compiler JavaScript. Maar wat als je bestaande JavaScript-bibliotheken wilt gebruiken? Hoe weet TypeScript welke types die hebben? Dat is waar **declaratiebestanden** voor dienen.

## Wat zijn declaratiebestanden?

Een **declaratiebestand** (`.d.ts`) bevat alleen type-informatie — geen uitvoerbare code. Het beschrijft de "vorm" van JavaScript-code zodat TypeScript ermee kan werken.

```typescript
// utils.d.ts — declaratiebestand
export declare function optellen(a: number, b: number): number;
export declare const PI: number;
```

Het `declare` keyword vertelt TypeScript: "deze waarden bestaan ergens in JavaScript, hier zijn de types."

## Runtime waarden declareren

### Globale waarden

Soms voegt een script globale variabelen toe (bijv. via een `<script>` tag). Je kunt hun types declareren:

```typescript
// globals.d.ts
declare const API_URL: string;
declare function analytics(event: string): void;
```

Nu kun je `API_URL` en `analytics()` overal in je TypeScript-code gebruiken zonder foutmeldingen.

### Global Interface Merging

Je kunt bestaande globale interfaces uitbreiden:

```typescript
// globals.d.ts
interface Window {
    mijnApp: {
        versie: string;
        debug: boolean;
    };
}
```

Nu weet TypeScript dat `window.mijnApp` bestaat:

```typescript
console.log(window.mijnApp.versie); // OK
```

## Ingebouwde declaraties

TypeScript bevat **ingebouwde declaraties** voor:

### Library declaraties (`lib`)

Types voor JavaScript's ingebouwde objecten zoals `Array`, `Promise`, `Map`, etc. Deze komen uit bestanden als `lib.es2015.d.ts`, `lib.es2020.d.ts`, etc.

### DOM declaraties

Types voor de browser DOM API: `Document`, `HTMLElement`, `Event`, etc.

```typescript
// TypeScript weet dit al via de ingebouwde declaraties:
const knop = document.createElement("button"); // type: HTMLButtonElement
knop.textContent = "Klik mij";
knop.addEventListener("click", (event) => {
    console.log(event.target); // type: EventTarget | null
});
```

## Module declaraties

Je kunt types declareren voor modules die TypeScript niet kent:

```typescript
// types/mijn-module.d.ts
declare module "mijn-module" {
    export function doeIets(invoer: string): number;
    export const versie: string;
}
```

### Wildcard module declaraties

Handig voor bestanden die geen TypeScript-types hebben, zoals CSS of afbeeldingen:

```typescript
// types/assets.d.ts
declare module "*.css" {
    const inhoud: { [className: string]: string };
    export default inhoud;
}

declare module "*.png" {
    const url: string;
    export default url;
}
```

## Package Types

### Eigen types meeleveren

Als je een npm-pakket publiceert, kun je types meeleveren via het `declaration` veld in `tsconfig.json`:

```json
{
    "compilerOptions": {
        "declaration": true,
        "outDir": "./dist"
    }
}
```

Dit genereert automatisch `.d.ts` bestanden naast je `.js` bestanden.

### DefinitelyTyped (@types)

Veel JavaScript-pakketten hebben geen ingebouwde types. De community onderhoudt **DefinitelyTyped** — een enorme verzameling type-declaraties voor populaire pakketten.

Je installeert ze met het `@types` prefix:

```bash
npm install --save-dev @types/lodash
npm install --save-dev @types/express
npm install --save-dev @types/node
```

TypeScript vindt deze types automatisch in `node_modules/@types/`.

> **💡 Tip:** Zoek op [npmjs.com](https://www.npmjs.com) of een pakket al types heeft (🟢 TS icon). Zo niet, zoek naar `@types/pakketnaam`.

---

## Samenvatting

- **Declaratiebestanden** (`.d.ts`) bevatten alleen type-informatie
- `declare` vertelt TypeScript dat waarden ergens in JavaScript bestaan
- TypeScript heeft **ingebouwde declaraties** voor JavaScript en de DOM
- Je kunt **module declaraties** schrijven voor onbekende modules
- **DefinitelyTyped** (`@types/...`) levert community-types voor JavaScript-pakketten

---

## Oefeningen

1. **Globale declaratie.** Maak een bestand `globals.d.ts` en declareer een globale variabele `APP_VERSIE: string`. Gebruik deze in een `.ts` bestand.

2. **Window uitbreiden.** Breid de `Window` interface uit met een eigenschap `debugMode: boolean`. Gebruik `window.debugMode` in je code.

3. **@types installeren.** Installeer `@types/node` en controleer dat je `process.env` kunt gebruiken zonder fouten.

4. **Module declaratie.** Maak een declaratie voor een fictief module `"mijn-utils"` met een functie `formateerDatum(datum: Date): string`.

Klaar? In **Module 15 (IDE Functies)** leer je hoe je TypeScript in je editor maximaal benut.
