# Module 15 — IDE Functies

*Je editor helpt mee*
*Navigeer, refactor, vind*
*TypeScript stuurt je*

TypeScript is meer dan een type checker — het is een **taaldienst** die je editor superkrachten geeft. In deze module leer je de belangrijkste IDE-functies die je productiviteit enorm verhogen.

## Code Navigeren

### Ga naar definitie (Go to Definition)

**Sneltoets:** `F12` of `Ctrl+klik`

Klik op een variabele, functie, of type en spring direct naar waar het gedefinieerd is. Dit werkt zelfs naar externe bibliotheken (naar hun `.d.ts` bestanden).

### Vind alle referenties (Find All References)

**Sneltoets:** `Shift+F12`

Zoek alle plekken waar een variabele, functie, of type wordt gebruikt. Handig om te begrijpen hoe iets in je codebase wordt ingezet.

### Vind implementaties (Go to Implementation)

**Sneltoets:** `Ctrl+F12`

Bij interfaces en abstracte klassen: spring naar de concrete implementaties.

## Code Schrijven

### Autocompletion

TypeScript biedt **contextgevoelige suggesties** terwijl je typt:

- Na een `.` op een object: alle beschikbare properties en methodes
- Na `import { ... } from "`: alle exports van het bestand
- Bij functie-argumenten: welke types verwacht worden

> **💡 Tip:** Druk `Ctrl+Spatie` om suggesties handmatig op te roepen als ze niet automatisch verschijnen.

### Automatische imports

Wanneer je een naam typt die uit een ander bestand komt, kan VS Code automatisch het `import`-statement toevoegen. Je hoeft alleen de suggestie te accepteren.

### Code Actions (Quick Fixes)

**Sneltoets:** `Ctrl+.` (punt)

VS Code biedt context-afhankelijke acties aan, zoals:

- **Import toevoegen** — automatisch een import statement aanmaken
- **Type toevoegen** — ontbrekende type-annotatie toevoegen
- **Hernoemen** (`F2`) — hernoem een symbool overal in je project
- **Interface implementeren** — automatisch alle methodes van een interface invullen
- **Ongebruikte imports verwijderen** — opschonen van imports

### Voorbeeld: interface implementeren

Wanneer je een klasse schrijft die een interface implementeert, kun je `Ctrl+.` gebruiken om alle methodes automatisch in te vullen:

```typescript
interface Dier {
    naam: string;
    spreek(): string;
    beweeg(afstand: number): void;
}

class Kat implements Dier {
    // Zet je cursor hier en druk Ctrl+.
    // → "Implement interface 'Dier'"
    // VS Code vult automatisch alle properties en methodes in!
}
```

## Effectief Werken met Foutmeldingen

### Foutmeldingen lezen

TypeScript-foutmeldingen bestaan uit:

1. **Bestandsnaam en regelnummer** — waar de fout is
2. **Error code** — bijv. `TS2339`
3. **Beschrijving** — wat er mis is

```
index.ts:5:10 - error TS2339: Property 'blub' does not exist on type 'Console'.
```

### De Problems-tab

In VS Code opent `Ctrl+Shift+M` het **Problems**-paneel met alle fouten en waarschuwingen. Je kunt:
- Klikken om naar de fout te springen
- Filteren op bestandsnaam
- Fouten sorteren op ernst

### Hover-informatie

Beweeg je muis over een variabele om het **type** te zien. Dit is een van de meest nuttige features — gebruik het continu om te begrijpen hoe TypeScript je code interpreteert.

> **💡 Tip:** Hover over een variabele na een `if`-check om te zien hoe TypeScript het type heeft genarrowd.

### Inline hints

VS Code kan **inline type hints** tonen:

```
Instellingen → "typescript.inlayHints.parameterNames.enabled": "all"
Instellingen → "typescript.inlayHints.variableTypes.enabled": true
```

---

## Samenvatting

- `F12` → **Ga naar definitie** van een symbool
- `Shift+F12` → **Vind alle referenties** van een symbool
- `Ctrl+Spatie` → **Autocompletion** suggesties
- `Ctrl+.` → **Quick Fixes** (imports, refactoring, etc.)
- `F2` → **Hernoemen** van een symbool overal in het project
- `Ctrl+Shift+M` → **Problems-paneel** met alle fouten
- **Hover** over variabelen om hun type te zien

---

## Oefeningen

1. **Autocompletion.** Maak een array van strings en typ `.` na de variabele. Bekijk welke methodes VS Code voorstelt. Gebruik er minstens 3.

2. **Go to Definition.** Maak twee bestanden die importeren van elkaar. Gebruik `F12` om te navigeren.

3. **Hernoemen.** Maak een variabele die op 5 plekken wordt gebruikt. Gebruik `F2` om deze te hernoemen en controleer dat alle referenties zijn bijgewerkt.

4. **Quick Fix.** Schrijf een klasse die een interface `implements` maar geen methodes heeft. Gebruik `Ctrl+.` om ze automatisch in te vullen.

5. **Hover.** Maak een union type variabele. Gebruik `if`/`typeof` om te narrowen. Hover over de variabele binnen en buiten de `if` en schrijf de types op.

Klaar? In **Module 16 (Configuratie)** leer je alles over `tsconfig.json`.
