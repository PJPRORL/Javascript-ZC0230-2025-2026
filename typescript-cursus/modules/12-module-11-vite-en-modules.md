# Module 11 — Vite & Modules

*Van losse bestanden*
*Naar een gebundelde app*
*Met Vite en TypeScript*

Tot nu toe hebben we TypeScript voornamelijk bekeken in de context van losse bestanden die we handmatig compileerden via `tsc`. Dat is prima om de basis te leren (Klassen, Interfaces, Generics), maar in een professionele webapplicatie gebeurt er meer. 

Code wordt **gebundeld** (samengevoegd tot een paar efficiënte bestanden), we gebruiken modules (`import` en `export` tussen tientallen bestanden), en we scheiden onze logica netjes af. Om dit te automatiseren gebruiken we **Vite**.

---

## 1. Wat is Vite?

[Vite](https://vitejs.dev/) (uitgesproken als 'veet', Frans voor 'snel') is een moderne "build tool". Het voert twee cruciale taken uit voor je applicatie:

1. **Dev Server (Lokaal ontwikkelen):** Een lokale webserver die je TypeScript code *on the fly* vertaalt. Als je een bestand opslaat, update Vite je browser in milliseconden zonder de hele pagina te herladen ("Hot Module Replacement").
2. **Bundler (Voor productie):** Als je applicatie klaar is, neemt Vite al je `.ts`, `.css` en afbeeldingen, en perst ze samen in een supergeoptimaliseerde, kleine `dist/` map. Die map kan je op het internet plaatsen!

### Een Vite Project Starten

Je start een Vite-project via je terminal (met Node.js geïnstalleerd):

```bash
npm create vite@latest
```

Beantwoord de vragen in de terminal:
* **Project name:** `mijn-eerste-app`
* **Framework:** `Vanilla` (We gebruiken geen React of Vue in deze cursus)
* **Variant:** `TypeScript`

Vervolgens start je het project op:
```bash
cd mijn-eerste-app
npm install       # Dit downloadt alle nodige bibliotheken (Vite etc.)
npm run dev       # Start de ontwikkelingsserver
```

> **💡 Tip:** Ga in je browser naar `http://localhost:5173` (of de poort die in je terminal verschijnt). Je ziet nu je draaiende TypeScript applicatie!

---

## 2. De Professionele Mappenstructuur

Als je `npm install` hebt gerund, zie je dat Vite al enkele bestanden heeft klaargezet. Zodra we echter een echte applicatie gaan bouwen (met Data Management en API's in de volgende modules), hebben we een logische en georganiseerde structuur nodig.

Hier is een uitstekende en veelgebruikte "best practice" structuur voor TypeScript webapplicaties:

```text
mijn-typescript-project/
├── src/                    # Alle broncode, hier spendeer je 99% van je tijd
│   ├── config/             # Configuratiebestanden (bijv. API instellingen)
│   ├── models/             # TypeScript interfaces, klassen en datamodellen
│   ├── pages/              # Bestanden die de volledige weergave van een pagina voorstellen
│   ├── routes/             # Definiëring van je applicatie routes en navigatie
│   ├── services/           # Logica zoals externe API calls en bedrijfslogica
│   ├── types/              # Aangepaste type-definities, vaak voor algemeen gebruik
│   ├── utils/              # Algemene helperfuncties (bijv. een datum formatteren)
│   ├── global.ts           # Globale variabelen die over de hele app worden gedeeld
│   └── main.ts             # Het startpunt van de applicatie (injecteert in index.html)
├── tests/                  # Je testbestanden
├── .env                    # Verborgen omgevingsvariabelen (zoals geheime API keys)
├── index.html              # De initiële HTML pagina. Hiermee start de applicatie in de browser
├── package.json            # Projectafhankelijkheden en NPM scripts (zoals 'npm run dev')
└── tsconfig.json           # Hoe TypeScript zich moet gedragen
```

### Wat doet elke map precies?

Om je te helpen begrijpen waar welke logica moet wonen, lopen we door elke map heen met een concreet voorbeeld uit een webshop.

#### 1. `src/models/`
Hier bewaar je de "blauwdrukken" van je applicatie. Modellen bevatten *geen* logica of functies die dingen uitvoeren, het zijn puur de definities van hoe je data er uit ziet. Als we met "Producten" of "Gebruikers" werken, definiëren we die hier via interfaces of klassen.

**Voorbeeld:** `src/models/Product.ts`
```typescript
export interface Product {
    id: string;
    naam: string;
    prijs: number;
    opVoorraad: boolean;
}
```
*Waarom hier?* Door dit model in een apart bestand te zetten, kan de hele applicatie dit model importeren. Zo garandeer je dat een Product overal exact dezelfde structuur heeft.

#### 2. `src/services/`
Services bevatten "hoe dingen gebeuren" (de bedrijfslogica). Ze voeren acties uit, zoals data ophalen van een server, data opslaan in `localStorage`, of complexe berekeningen uitvoeren. Services zijn de "werkpaarden" van je app.

**Voorbeeld:** `src/services/ProductService.ts`
```typescript
import { Product } from '../models/Product';

export class ProductService {
    // Deze service simuleert het ophalen van producten uit een database
    async haalProductenOp(): Promise<Product[]> {
        return [
            { id: "1", naam: "TypeScript Boek", prijs: 25, opVoorraad: true },
            { id: "2", naam: "Koffiemok", prijs: 12, opVoorraad: false }
        ];
    }
}
```
*Waarom hier?* Als je later beslist om producten via een échte API te laden, hoef je alleen dit bestand aan te passen. De rest van je app (zoals je pagina's) merkt hier niets van.

#### 3. `src/pages/`
Hier zit de UI (User Interface) logica. Een pagina-bestand is verantwoordelijk voor wat de gebruiker daadwerkelijk ziet en waar ze op kunnen klikken. Een pagina haalt vaak data op via een Service.

**Voorbeeld:** `src/pages/HomePage.ts`
```typescript
import { ProductService } from '../services/ProductService';

export class HomePage {
    private service = new ProductService();

    async render(containerId: string) {
        const container = document.getElementById(containerId);
        if (!container) return;

        // Roep het werkpaard (de service) aan
        const producten = await this.service.haalProductenOp();
        
        // Teken de UI
        container.innerHTML = `<h1>Onze Webshop</h1>`;
        producten.forEach(p => {
            container.innerHTML += `<p>${p.naam} - €${p.prijs}</p>`;
        });
    }
}
```
*Waarom hier?* Door UI (weergave) gescheiden te houden van logica (services), vermijd je onleesbare spaghetti-code in één gigantisch bestand.

#### 4. `src/types/`
Deze map bevat vaak losse `type` aliases of union types die in de hele applicatie gebruikt mogen worden, maar te klein zijn om een volwaardig "model" te zijn. Vaak gaat het om status-teksten of kleine configuratie-types.

**Voorbeeld:** `src/types/BestelStatus.ts`
```typescript
export type BestelStatus = "in_behandeling" | "verzonden" | "geleverd";
```

#### 5. `src/utils/`
Functies die héél generiek zijn en in veel verschillende projecten gebruikt zouden kunnen worden. Ze hebben niets te maken met jouw specifieke webshop, maar zijn puur "helper" functies.

**Voorbeeld:** `src/utils/valuta.ts`
```typescript
export function formatteerNaarEuro(bedrag: number): string {
    return `€${bedrag.toFixed(2)}`;
}
```
*Waarom hier?* In plaats van `toFixed(2)` overal handmatig te typen in je pagina's, gebruik je de utility-functie. Als je later de opmaak wilt veranderen, doe je dit op één centrale plek.

#### 6. `src/global.ts`
In zeldzame gevallen heb je variabelen of instellingen nodig die de héle app mag zien en die je makkelijk wil bundelen, zoals een globale applicatie status of configuratie.

**Voorbeeld:** `src/global.ts`
```typescript
export const APP_CONFIG = {
    taal: "nl-BE",
    versie: "1.0.0",
    api_url: "https://api.mijnwebshop.be"
};
```

#### 7. `index.html` & `src/main.ts`
Dit is het startpunt van de kettingreactie. Vite is "HTML-first". De browser laadt de `index.html`, en hierin staat een verwijzing naar `main.ts`. Vanaf dat moment neemt TypeScript de controle over.

**Voorbeeld:** `index.html`
```html
<body>
    <!-- De lege doos waar onze app in komt -->
    <div id="app"></div>
    
    <!-- Het startschot -->
    <script type="module" src="/src/main.ts"></script>
</body>
```

**Voorbeeld:** `src/main.ts`
```typescript
import { HomePage } from './pages/HomePage';
import { APP_CONFIG } from './global';

console.log(`Applicatie gestart (Versie ${APP_CONFIG.versie})`);

// We maken de pagina aan en vertellen hem in welke div hij zichzelf mag tekenen
const home = new HomePage();
home.render("app");
```

---

## 3. ES Modules: Import en Export

Nu we onze bestanden over verschillende mappen verdelen, moeten ze met elkaar kunnen communiceren. In de oude JavaScript-tijd was dat een ramp, maar moderne (ES) Modules lossen dit elegant op.

### Exporteren
Als je in `src/utils/math.ts` een functie schrijft die je ergens anders wil gebruiken, moet je het keyword `export` toevoegen.

```typescript
// src/utils/math.ts
export function telOp(a: number, b: number): number {
    return a + b;
}

export const PI = 3.14159;
```

### Importeren
In een ander bestand (bijvoorbeeld `src/main.ts`) kan je deze code nu "binnenhalen":

```typescript
// src/main.ts
// Merk op: in Vite typen we GEEN .ts extensie in de import!
import { telOp, PI } from './utils/math';

console.log(telOp(5, 10)); // 15
console.log(`Pi is ongeveer ${PI}`);
```

> **⚠️ Let op het pad:** Het pad `./` betekent "in dezelfde map". `../` betekent "één map omhoog".

### Default Exports
Je kunt ook één ding als de "standaard" (default) export aanduiden. Dit wordt vaak gebruikt als een bestand maar één grote klasse bevat (bijv. in `src/pages/HomePage.ts`).

```typescript
// src/pages/HomePage.ts
export default class HomePage {
    render() {
        console.log("Welkom op de Homepagina!");
    }
}
```

Bij het importeren van een default export laat je de accolades `{}` weg en mag je zelf een naam kiezen:

```typescript
// src/main.ts
import MijnGeweldigePagina from './pages/HomePage';

const page = new MijnGeweldigePagina();
page.render();
```

---

## Samenvatting

- **Vite** is onze moderne ontwikkelserver en bundler. Het laadt TypeScript razendsnel in je browser.
- De **mappenstructuur** is cruciaal om het overzicht te bewaren in grotere projecten (verdelingen in `models`, `pages`, `services`, etc).
- Met **ES Modules (`import`/`export`)** deel je code (zoals interfaces of functies) naadloos op over meerdere bestanden.

---

## Oefeningen

1. **Vite project aanmaken.** Gebruik `npm create vite@latest` om een nieuw Vanilla TypeScript project te maken. Start de dev server met `npm run dev` en open het in je browser. Bekijk de gegenereerde bestanden.

2. **Mappenstructuur opzetten.** Maak in je nieuw project de volgende mappen aan: `src/models/`, `src/services/`, `src/pages/`, `src/types/`, en `src/utils/`. Maak in elke map een leeg `.ts` bestand aan (bijv. `placeholder.ts`) zodat Git de lege mappen niet negeert.

3. **Model maken.** Maak een bestand `src/models/Student.ts` met een `interface Student` die de velden `id: string`, `naam: string`, en `punten: number` bevat. Exporteer de interface.

4. **Importeren en gebruiken.** Importeer je `Student` interface in `src/main.ts`. Maak een array van 3 studenten en log ze naar de console. Controleer dat Vite alles automatisch herlaadt als je een student toevoegt.

5. **Default export.** Maak een bestand `src/utils/berekeningen.ts` met een `export default function berekenGemiddelde(punten: number[]): number`. Importeer de functie in `main.ts` met een default import en bereken het gemiddelde van je studentenpunten.

Klaar? In **Module 12 (Data Management)** gaan we deze georganiseerde structuur in de praktijk brengen. We richten ons specifiek op de `src/services` en `src/models` mappen om een robuust Data Management Systeem in TypeScript te bouwen!
