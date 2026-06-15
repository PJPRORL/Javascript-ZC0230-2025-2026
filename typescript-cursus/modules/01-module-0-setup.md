# Module 0 — Je computer klaarmaken

Voordat we ook maar één regel TypeScript schrijven, zorgen we dat je gereedschap klaarstaat. Dit duurt ongeveer 15 minuten en daarna kun je echt aan de slag.

## Wat heb je nodig?

TypeScript draait **niet** rechtstreeks in de browser zoals JavaScript. TypeScript-code moet eerst **gecompileerd** (omgezet) worden naar JavaScript. Daarvoor heb je het volgende nodig:

1. **Node.js** — een JavaScript-runtime die buiten de browser draait
2. **npm** — de pakketbeheerder die bij Node.js hoort (wordt automatisch meegeleverd)
3. **TypeScript** — de compiler die we via npm installeren
4. **Een code-editor** — Visual Studio Code (aanbevolen)

## Stap 1 — Installeer Node.js

Node.js is de motor waarop TypeScript draait. Ga naar [nodejs.org](https://nodejs.org) en download de **LTS-versie** (Long Term Support). Dat is de stabiele versie.

Na installatie kun je controleren of het werkt door een terminal te openen en dit te typen:

```bash
node --version
```

Je zou iets moeten zien als `v20.x.x` of hoger.

Controleer ook of npm (de pakketbeheerder) werkt:

```bash
npm --version
```

## Stap 2 — Installeer TypeScript

Nu we Node.js hebben, kunnen we TypeScript **globaal** installeren. Dat betekent dat je het overal op je computer kunt gebruiken. Open je terminal en typ:

```bash
npm install -g typescript
```

> **💡 Tip:** Het `-g` vlaggetje staat voor "global". Zonder dit vlaggetje wordt TypeScript alleen in de huidige map geïnstalleerd.

Controleer of TypeScript correct is geïnstalleerd:

```bash
tsc --version
```

Je zou iets moeten zien als `Version 5.x.x`.

Het commando `tsc` staat voor **TypeScript Compiler** — dit is het programma dat je TypeScript-code omzet naar JavaScript.

## Stap 3 — Installeer Visual Studio Code

We gebruiken **Visual Studio Code** (kortweg "VS Code"). Gratis, en de standaard in de hele webwereld. Je hebt het waarschijnlijk al.

- Download: [code.visualstudio.com](https://code.visualstudio.com)

VS Code heeft **ingebouwde TypeScript-ondersteuning**. Het herkent automatisch `.ts`-bestanden en geeft je:
- **Foutmeldingen** terwijl je typt (rode onderstrepingen)
- **Autocompletion** — suggesties terwijl je code schrijft
- **Hover-informatie** — beweeg je muis over een variabele om het type te zien

> **💡 Tip:** VS Code is zelf gebouwd in TypeScript. Het is dus geen verrassing dat de TypeScript-ondersteuning uitstekend is!

## Stap 4 — Maak je eerste TypeScript-project

Maak een nieuwe map aan voor je TypeScript-oefeningen. Open die map in VS Code en open de **geïntegreerde terminal** (Ctrl + `).

### 4.1 Maak een `tsconfig.json` aan

In je projectmap, typ dit commando:

```bash
tsc --init
```

Dit maakt een bestand `tsconfig.json` aan. Dit is het **configuratiebestand** van TypeScript — het vertelt de compiler hoe hij je code moet verwerken.

> **📝 Opmerking:** Je hoeft de meeste opties in `tsconfig.json` nog niet te begrijpen. We behandelen ze uitgebreid in Module 16. Voor nu volstaat de standaardconfiguratie.

### 4.2 Maak je eerste TypeScript-bestand

Maak een nieuw bestand `index.ts` aan met de volgende inhoud:

```typescript
const begroeting: string = "Hallo, TypeScript!";
console.log(begroeting);
```

Let op het `: string` gedeelte — dit is een **type-annotatie**. Het vertelt TypeScript dat de variabele `begroeting` een tekst (string) moet zijn. Hier gaan we later uitgebreid op in.

### 4.3 Compileer en voer uit

Compileer het bestand naar JavaScript:

```bash
tsc index.ts
```

Er verschijnt nu een bestand `index.js` naast je `index.ts`. Bekijk dat bestand — je zult zien dat de type-annotatie (`: string`) verdwenen is. **TypeScript-types bestaan alleen tijdens het ontwikkelen**, ze worden nooit meegenomen naar de uiteindelijke JavaScript-code.

Voer het gegenereerde JavaScript uit:

```bash
node index.js
```

Je zou moeten zien: `Hallo, TypeScript!`

### 4.4 Probeer een fout te maken

Verander je `index.ts` naar:

```typescript
const begroeting: string = "Hallo, TypeScript!";
console.blub(begroeting);
```

Compileer opnieuw met `tsc index.ts`. Je krijgt nu een foutmelding:

```
index.ts:2:9 - error TS2339: Property 'blub' does not exist on type 'Console'.
```

TypeScript heeft de fout gevonden **voordat je de code uitvoerde**! Dit is precies waar TypeScript voor dient: fouten opsporen vóór runtime.

> **⚠️ Belangrijk:** Merk op dat TypeScript ondanks de foutmelding tóch een `index.js` bestand aanmaakt. De code wordt altijd gecompileerd, ook als er type-fouten zijn. TypeScript **waarschuwt** je, maar **blokkeert** je niet.

## Stap 5 — Watch Mode (optioneel)

Het is vervelend om na elke wijziging handmatig `tsc` uit te voeren. Gelukkig heeft TypeScript een **watch mode** die automatisch hercompileert wanneer je een bestand wijzigt:

```bash
tsc --watch
```

Of korter:

```bash
tsc -w
```

Laat dit draaien in een terminal en werk in een andere terminal of in VS Code. Elke keer dat je een `.ts`-bestand opslaat, wordt het automatisch gecompileerd.

## De mapstructuur tot nu toe

Na al deze stappen zou je projectmap er zo uit moeten zien:

```
mijn-typescript-project/
├── tsconfig.json
├── index.ts
└── index.js        ← automatisch gegenereerd door tsc
```

---

## Samenvatting

- **Node.js** is nodig om TypeScript te kunnen installeren en JavaScript buiten de browser te draaien
- Installeer TypeScript globaal met `npm install -g typescript`
- Het commando `tsc` compileert TypeScript (`.ts`) naar JavaScript (`.js`)
- Een `tsconfig.json` configureert hoe TypeScript je project verwerkt
- **VS Code** heeft ingebouwde TypeScript-ondersteuning
- Type-annotaties (zoals `: string`) bestaan alleen in TypeScript en verdwijnen na compilatie
- `tsc --watch` hercompileert automatisch bij wijzigingen

---

## Oefeningen

Je hoeft hier nog niet veel te typen — dit zijn vooral installatie- en verificatie-oefeningen.

1. **Installatie controleren.** Open een terminal en voer de volgende drie commando's uit. Schrijf de versienummers op:
   - `node --version`
   - `npm --version`
   - `tsc --version`

2. **Eerste TypeScript-bestand.** Maak een bestand `oefening0.ts` met daarin:
   ```typescript
   const naam: string = "jouw naam hier";
   const leeftijd: number = 25;
   console.log(`Ik ben ${naam} en ik ben ${leeftijd} jaar oud.`);
   ```
   Compileer met `tsc oefening0.ts` en voer uit met `node oefening0.js`.

3. **Fout provoceren.** Verander in je bestand de regel naar `const leeftijd: number = "vijfentwintig";` en compileer opnieuw. Lees de foutmelding. Wat zegt TypeScript precies? Schrijf het in een commentaar.

4. **Watch mode testen.** Start `tsc --watch` en wijzig je bestand. Controleer dat het automatisch hercompileert.

Klaar en gecontroleerd? Top. **Module 1 (Van JavaScript naar TypeScript)** volgt — daar leer je waarom TypeScript eigenlijk bestaat en wat het toevoegt aan JavaScript.
