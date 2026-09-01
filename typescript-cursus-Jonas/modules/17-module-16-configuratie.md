# Module 16 — Configuratie

*Opties instellen*
*tsconfig.json stuurt alles*
*Jouw project, jouw regels*

De `tsconfig.json` is het hart van je TypeScript-project. Het configureert hoe de compiler je code verwerkt.

## tsc Opties

### Pretty Mode

Standaard toont `tsc` foutmeldingen met kleuren en formatting. Je kunt dit uitschakelen met `--pretty false`.

### Watch Mode

```bash
tsc --watch
# of korter:
tsc -w
```

Hercompileert automatisch bij bestandswijzigingen.

## TSConfig bestanden

### Aanmaken

```bash
tsc --init
```

Dit maakt een `tsconfig.json` met standaardopties en veel commentaar.

### CLI vs Configuratie

Opties in `tsconfig.json` werken als standaardwaarden. CLI-argumenten overschrijven ze:

```bash
# tsconfig.json zegt target: "es2016"
# CLI overschrijft naar es2020:
tsc --target es2020
```

## Bestanden Insluiten

### `include`

Bepaalt welke bestanden TypeScript compileert:

```json
{
    "include": ["src/**/*"]
}
```

### `exclude`

Sluit bestanden uit:

```json
{
    "exclude": ["node_modules", "dist", "**/*.test.ts"]
}
```

## Belangrijke Compiler Opties

### `target`

Naar welke JavaScript-versie wordt gecompileerd:

```json
{
    "compilerOptions": {
        "target": "ES2020"
    }
}
```

| Target | Beschrijving |
|--------|-------------|
| `ES5` | Oudste browsers (IE11) |
| `ES2015`/`ES6` | Klassen, arrow functions, let/const |
| `ES2020` | Optional chaining, nullish coalescing |
| `ESNext` | Nieuwste features |

### `outDir`

Waar de gecompileerde JavaScript naartoe gaat:

```json
{
    "compilerOptions": {
        "outDir": "./dist"
    }
}
```

### `rootDir`

Waar je bronbestanden staan:

```json
{
    "compilerOptions": {
        "rootDir": "./src"
    }
}
```

### `declaration`

Genereer `.d.ts` declaratiebestanden:

```json
{
    "compilerOptions": {
        "declaration": true
    }
}
```

### `sourceMap`

Genereer source maps voor debugging:

```json
{
    "compilerOptions": {
        "sourceMap": true
    }
}
```

### `noEmit`

Alleen type checking, geen JavaScript genereren:

```json
{
    "compilerOptions": {
        "noEmit": true
    }
}
```

> **💡 Tip:** Gebruik `noEmit: true` als je een bundler zoals Vite of Webpack gebruikt die zelf de compilatie doet.

## Type Checking Opties

### `lib`

Welke ingebouwde type-declaraties beschikbaar zijn:

```json
{
    "compilerOptions": {
        "lib": ["ES2020", "DOM", "DOM.Iterable"]
    }
}
```

### Strict Mode

De **aanbevolen** instelling — schakelt alle strikte controles in:

```json
{
    "compilerOptions": {
        "strict": true
    }
}
```

`strict: true` is een afkorting voor:

| Optie | Wat het doet |
|-------|-------------|
| `strictNullChecks` | `null`/`undefined` zijn niet overal toewijsbaar |
| `strictFunctionTypes` | Strengere controle op functie-types |
| `strictBindCallApply` | Controle op `bind`, `call`, `apply` |
| `strictPropertyInitialization` | Alle class properties moeten geïnitialiseerd worden |
| `noImplicitAny` | Verbied impliciet `any` type |
| `noImplicitThis` | Verbied impliciet `any` voor `this` |
| `alwaysStrict` | Emit `"use strict"` in elk bestand |
| `useUnknownInCatchVariables` | Catch-variabelen zijn `unknown` i.p.v. `any` |

> **⚠️ Belangrijk:** Zet `strict: true` **altijd** aan in nieuwe projecten. Het voorkomt veel bugs.

### Andere nuttige opties

```json
{
    "compilerOptions": {
        "noUnusedLocals": true,           // Waarschuw bij ongebruikte variabelen
        "noUnusedParameters": true,       // Waarschuw bij ongebruikte parameters
        "noImplicitReturns": true,        // Alle code-paden moeten returnen
        "noFallthroughCasesInSwitch": true // Voorkom fall-through in switch
    }
}
```

## Module Opties

### `module`

Welk module-systeem te gebruiken:

```json
{
    "compilerOptions": {
        "module": "ESNext"
    }
}
```

| Optie | Beschrijving |
|-------|-------------|
| `CommonJS` | Node.js `require`/`module.exports` |
| `ESNext` | Moderne `import`/`export` |
| `NodeNext` | Node.js 16+ met ESM-ondersteuning |

### `moduleResolution`

Hoe TypeScript modules vindt:

```json
{
    "compilerOptions": {
        "moduleResolution": "node"
    }
}
```

## Voorbeeld: Complete tsconfig.json

```json
{
    "compilerOptions": {
        "target": "ES2020",
        "module": "ESNext",
        "moduleResolution": "node",
        "lib": ["ES2020", "DOM", "DOM.Iterable"],
        "outDir": "./dist",
        "rootDir": "./src",
        "strict": true,
        "declaration": true,
        "sourceMap": true,
        "noUnusedLocals": true,
        "noUnusedParameters": true,
        "noImplicitReturns": true,
        "esModuleInterop": true,
        "skipLibCheck": true,
        "forceConsistentCasingInFileNames": true
    },
    "include": ["src/**/*"],
    "exclude": ["node_modules", "dist"]
}
```

---

## Samenvatting

- `tsconfig.json` configureert de TypeScript-compiler
- `tsc --init` maakt een standaard configuratie
- **`strict: true`** is aanbevolen — schakelt alle strikte controles in
- `target` bepaalt de JavaScript-output versie
- `outDir`/`rootDir` regelen de bestandsstructuur
- `include`/`exclude` bepalen welke bestanden gecompileerd worden
- `module` en `moduleResolution` bepalen het module-systeem

---

## Oefeningen

1. **tsconfig aanmaken.** Maak een nieuw project met `tsc --init`. Open de `tsconfig.json` en lees de commentaren.

2. **Strict mode.** Zet `strict: true` aan en schrijf code die fouten oplevert (bijv. een variabele zonder type, een class property zonder initialisatie).

3. **OutDir testen.** Stel `outDir: "./dist"` en `rootDir: "./src"` in. Maak een bestand in `src/` en compileer. Controleer dat de output in `dist/` staat.

4. **Target vergelijken.** Compileer een bestand met arrow functions met `target: "ES5"` en `target: "ES2020"`. Vergelijk de output.

5. **noUnusedLocals.** Zet `noUnusedLocals: true` en maak een variabele die je nergens gebruikt. Wat zegt TypeScript?

Klaar? In **Module 17 (Syntax Extensies)** behandelen we bonus-onderwerpen zoals enums en decorators.
