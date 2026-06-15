# Module 13 — Multipage Apps & Architectuur

*Alles komt samen*
*De UI en de Database*
*Via Object-Georiënteerde Magie*

In de vorige modules hebben we geleerd hoe we een professionele mappenstructuur opzetten met Vite en hoe we data kunnen bewaren met een `PersistenceProvider`. Nu wordt het tijd om de visuele kant — de User Interface (UI) — daaraan te koppelen.

Als je applicatie groeit, wordt het onbeheersbaar om alle HTML en "click" logica in één `main.ts` te proppen. We gebruiken daarom Object-Georiënteerd Programmeren (Module 8) om een **Multipage App** structuur op te zetten.

---

## 1. De Abstracte Pagina (Page) Klasse

In een Single Page Application (SPA) navigeert een gebruiker niet naar een totaal nieuw HTML bestand via de server. We lossen alles op in de browser door simpelweg de HTML van de `div id="app"` te vervangen.

Om te voorkomen dat we voor elke nieuwe "pagina" in onze app dezelfde code moeten schrijven, bouwen we een fundering in `src/pages/Page.ts`.

```typescript
// src/pages/Page.ts
export abstract class Page {
  // Dit is het element in de body waarin we alle HTML van onze pagina stoppen
  protected readonly body: HTMLDivElement;

  // We zoeken de #app div uit de originele index.html (slechts één keer!)
  static readonly #root = document.querySelector<HTMLDivElement>('#app')!;

  protected constructor(htmlContent: string) {
    this.body = document.createElement('div');
    this.body.innerHTML = htmlContent;
  }

  // Elke pagina moet deze methode aanroepen om zichtbaar te worden
  render() {
    // Maak de hoofddiv leeg
    Page.#root.innerHTML = '';
    // Stop deze specifieke pagina er in
    Page.#root.appendChild(this.body);
  }
}
```

Met deze klasse kunnen we héél eenvoudig nieuwe pagina's aanmaken door de `Page` klasse over te erven (`extends`).

```typescript
// src/pages/HomePage.ts
import { Page } from './Page';
// Vite laat ons toe om HTML bestanden rechtstreeks in te laden als een string!
import HTML_TEMPLATE from './HomePage.html?raw'; 

export class HomePage extends Page {
  constructor() {
    super(HTML_TEMPLATE);
    this.koppelEvents();
  }

  private koppelEvents() {
    // Koppel hier events, bijvoorbeeld:
    const btn = this.body.querySelector('#my-btn');
    if (btn) {
      btn.addEventListener('click', () => alert("Geklikt op de homepagina!"));
    }
  }
}
```

---

## 2. De Hash-Router

Je hebt nu een `HomePage` en misschien een `SettingsPage`. Maar hoe wissel je hiertussen? En hoe weet de app op welke pagina hij moet zijn? We gebruiken een **Hash Router**.

Wanneer je `http://localhost:5173/#/settings` typt, reageert de server (Vite) niet op het `#` gedeelte, maar we kunnen het `#` gedeelte wél uitlezen in onze TypeScript code via `window.location.hash`.

We maken een `src/routes/Router.ts`:

```typescript
// src/routes/Router.ts
import { HomePage } from '../pages/HomePage';
import { SettingsPage } from '../pages/SettingsPage';

export class Router {
  constructor() {
    // Luister naar momenten dat de gebruiker de hash verandert in de URL balk
    window.addEventListener("hashchange", () => this.laadRoute());
    
    // Laad direct de juiste route als de applicatie start
    this.laadRoute();
  }

  private laadRoute() {
    const hash = window.location.hash.replace("#", "") || "/";

    if (hash === "/") {
      const page = new HomePage();
      page.render();
    } 
    else if (hash === "/settings") {
      const page = new SettingsPage();
      page.render();
    } 
    else {
      // Een rudimentaire 404 pagina
      document.getElementById("app")!.innerHTML = `<h1>404 - Niet Gevonden</h1>`;
    }
  }
}
```

In je `main.ts` hoef je nu enkel de router op te starten:
```typescript
// src/main.ts
import { Router } from './routes/Router';

// Start de applicatie
new Router();
```

---

## 3. Custom Elements (Web Components)

Nu we pagina's en data (uit Module 12) hebben, komen we bij de laatste stap. Soms wil je herbruikbare stukjes UI, zoals een specifiek formulier of een data-kaartje. We kunnen browser-eigen **Custom Elements** maken.

Een Custom Element stelt je in staat om je eigen HTML-tags te verzinnen, zoals `<product-card>`.

```typescript
// src/components/ProductCard.ts
export class ProductCard extends HTMLElement {
    // Een private eigenschap voor de data
    private _productNaam: string = "";

    // Een setter: als we de naam aanpassen, rendert de HTML zich opnieuw!
    set productNaam(value: string) {
        this._productNaam = value;
        this.render();
    }

    constructor() {
        super();
        this.render(); // Initiële render
    }

    private render() {
        this.innerHTML = `
            <div class="card" style="border: 1px solid black; padding: 10px;">
                <h3>Product: ${this._productNaam}</h3>
                <button id="add-btn">In winkelmand</button>
            </div>
        `;

        // We kunnen rechtstreeks event listeners op dit element hangen
        this.querySelector('#add-btn')?.addEventListener('click', () => {
            alert(`Je hebt ${this._productNaam} toegevoegd!`);
        });
    }
}

// ⚠️ Belangrijk: Registreer het element. Er MOET altijd een streepje (-) in de naam staan!
customElements.define("product-card", ProductCard);
```

### De Combinatie

Laten we alles samenbrengen op onze `HomePage`! We laden data in vanuit onze `LocalStoragePersistenceProvider` en tekenen voor elk record een `<product-card>`.

```typescript
// src/pages/HomePage.ts
import { Page } from './Page';
import { ProductCard } from '../components/ProductCard';
import { LocalStoragePersistenceProvider } from '../services/LocalStoragePersistenceProvider';

// Zorg dat de browser weet dat <product-card> bestaat (importeer het bestand)
import '../components/ProductCard'; 

export class HomePage extends Page {
  // We roepen onze Provider aan (uit Module 12)
  private db = new LocalStoragePersistenceProvider<any>("producten_db");

  constructor() {
    super(`
        <h1>Onze Producten</h1>
        <div id="product-lijst"></div>
    `);
    this.laadProducten();
  }

  private async laadProducten() {
    const lijst = this.body.querySelector('#product-lijst')!;
    
    // Haal alle producten op uit localStorage
    const producten = await this.db.getAll();

    // Loop over de producten heen
    for (const prod of producten) {
        // Maak ons nieuwe Custom Element aan
        const card = document.createElement("product-card") as ProductCard;
        // Gebruik de setter om data door te geven
        card.productNaam = prod.naam; 
        
        // Voeg het toe aan de pagina
        lijst.appendChild(card);
    }
  }
}
```

Met deze architectuur (Pages + Components + PersistenceProviders) bezit je de fundering om extreem complexe, schaalbare Enterprise applicaties in TypeScript te bouwen. 

---

## Samenvatting

- Een **abstracte `Page` klasse** voorkomt dat je voor elke pagina dezelfde DOM-logica herschrijft
- De **Hash-Router** leest `window.location.hash` uit om te bepalen welke pagina getoond wordt, zonder de server te betrekken
- **Custom Elements** (Web Components) laten je eigen HTML-tags aanmaken (zoals `<product-card>`), die herbruikbaar zijn in je hele applicatie
- Custom element namen moeten **altijd een streepje (`-`)** bevatten
- Data wordt via de **PersistenceProvider** (Module 12) aan de UI gekoppeld, zodat de weergave en de opslag strikt gescheiden blijven

---

## Oefeningen

1. **Page klasse.** Bouw de abstracte `Page` klasse na in een Vite project. Maak vervolgens twee concrete pagina's: een `HomePage` en een `AboutPage`, elk met hun eigen HTML-content.

2. **Hash Router.** Implementeer de `Router` klasse uit de theorie. Zorg dat je via `/#/` naar de `HomePage` gaat en via `/#/about` naar de `AboutPage`. Test door handmatig de URL te wijzigen in de adresbalk.

3. **Custom Element.** Maak een Custom Element `<todo-item>` met een setter `set taakNaam(value: string)`. Het element moet de taaknaam tonen en een "Verwijder" knop bevatten die een `alert()` toont.

4. **Alles combineren.** Maak een `HomePage` die de `LocalStoragePersistenceProvider` (Module 12) gebruikt om een lijst van taken op te halen. Render elke taak als een `<todo-item>` Custom Element. Voeg een invoerveld en een knop toe om nieuwe taken aan te maken via `provider.create()`.

5. **Navigatie.** Voeg een simpele navigatiebalk toe (een `<nav>` met `<a href="#/">Home</a>` en `<a href="#/about">Over</a>`) die in de abstracte `Page` klasse gerendered wordt, zodat elke pagina automatisch navigatie heeft.

In de resterende modules zullen we ons weer op geavanceerde theorie richten (Declaraties, Configuratie), maar je hebt nu de blauwdruk voor je eigen applicaties en het Eindexamen.
