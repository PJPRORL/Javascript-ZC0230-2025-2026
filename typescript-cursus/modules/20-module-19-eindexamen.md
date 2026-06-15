# Module 19 — Eindexamen & Oplossingen

*Alles komt samen*
*Van types tot aan router*
*Toon wat je kan*

Welkom bij de laatste module van deze cursus! Je hebt nu alle theorie geleerd: van het basistype-systeem en objecten, tot interfaces, klassen, generics en configuratie. Nu is het tijd om deze theorie toe te passen in de praktijk met een **volledig eindexamen**.

Dit eindexamen is gebaseerd op echte examenopdrachten (Juni en Augustus 2025). We bespreken eerst een cruciaal concept dat in deze examens voorkomt (eigen routing instellen in TypeScript), en daarna krijg je de opdrachten en een overzicht van de oplossing.

---

## Oplossingsstrategie: Een Eigen Router Instellen

In een Single Page Application (SPA) laad je de pagina niet opnieuw als je ergens op klikt. In plaats daarvan gebruik je JavaScript/TypeScript om de HTML te vervangen. Om toch verschillende URL's (zoals `/` of `/cart`) te ondersteunen, bouwen we een **router**.

### Hoe werkt een Hash-Router?

Een eenvoudige manier om een router te bouwen zonder serverconfiguratie is via de "hash" in de URL (bijv. `http://localhost:3000/#/cart`). Alles na de `#` wordt niet naar de server gestuurd, maar kunnen we wél uitlezen in TypeScript.

Hier is een voorbeeld van hoe je zo'n router instelt en type-veilig maakt:

```typescript
// 1. Definieer de mogelijke routes
type RoutePath = "/" | "/quizzes" | "/cart";

// 2. Definieer een interface voor je Router
interface RouteConfig {
    pad: RoutePath;
    componentNaam: string;
}

// 3. De configuratie van al je pagina's
const routes: RouteConfig[] = [
    { pad: "/", componentNaam: "home-page" },
    { pad: "/quizzes", componentNaam: "quizzes-page" },
    { pad: "/cart", componentNaam: "cart-page" }
];

// 4. De Router Klasse
class Router {
    private appElement: HTMLElement;

    constructor(appElementId: string) {
        const element = document.getElementById(appElementId);
        if (!element) throw new Error(`Element ${appElementId} niet gevonden`);
        
        this.appElement = element;
        
        // Luister naar URL wijzigingen
        window.addEventListener("hashchange", () => this.laadHuidigeRoute());
        
        // Laad de initiële pagina
        this.laadHuidigeRoute();
    }

    private laadHuidigeRoute(): void {
        // Haal de hash op, of gebruik "/" als standaard
        const hash = window.location.hash.replace("#", "") || "/";
        const pad = hash as RoutePath;

        // Zoek de route in de configuratie
        const route = routes.find(r => r.pad === pad);

        if (route) {
            // Render het custom element dat bij de route hoort
            this.appElement.innerHTML = `<${route.componentNaam}></${route.componentNaam}>`;
        } else {
            // 404 fallback
            this.appElement.innerHTML = `<h1>404 - Pagina niet gevonden</h1>`;
        }
    }
}

// 5. Start de router
const router = new Router("app");
```

> **💡 Waarom TypeScript hier helpt:** Door `RoutePath` als een union type te definiëren, garandeert TypeScript dat we nooit per ongeluk naar een onbekende pagina navigeren zonder dat de compiler ons waarschuwt!

---

## Eindexamen Opdracht

Voor dit eindexamen ga je een applicatie bouwen die de functionaliteiten van twee projecten combineert. Je wordt uitsluitend beoordeeld op de functionaliteit en of de applicatie **100% strongly typed** is.

### Deel 1: De Trivia Quiz Manager (Gebaseerd op Juni 2025)

Je bouwt een applicatie waarmee quizvragen beheerd kunnen worden.
*   **Routing:** De app heeft een navigatiebalk en twee pagina's (`/` voor home en `/quizzes` voor de quizzes). Zorg dat de Custom Elements correct geregistreerd zijn.
*   **API (RestPersistenceProvider):** Haal de vragen op van `http://localhost:3000/questions` en render deze met een custom element.
*   **Filteren:** Maak een zoekfunctie (radio input voor type, dropdown voor moeilijkheidsgraad) om de vragen realtime te filteren.
*   **Verwijderen:** Voeg een vuilbak-icoon toe om een vraag via de API permanent te verwijderen.
*   **Quiz bouwen:** Voeg een `+` knop toe om de vraag in een "nieuwe quiz" geheugen te plaatsen. Met een "Create Quiz" knop sla je deze quiz op in **localStorage** (met een `LocalStoragePersistenceProvider`).
*   **Quizzes Overzicht:** Op de `/quizzes` pagina laad je alle bewaarde quizzes en hun vragen in via localStorage.

### Deel 2: Webshop & Winkelmand (Gebaseerd op Augustus 2025)

Implementeer de e-commerce functionaliteiten:
*   **Products API:** Gebruik een endpoint (`/products`) om producten op te halen en weer te geven op de `/` route.
*   **Winkelmand (Cart):** Voeg producten toe aan het winkelmandje. Dit winkelmandje wordt lokaal bewaard via **localStorage**. De interface toont een checkmark (✓) als een item in het mandje zit.
*   **Korting:** Implementeer een feature waarbij een druk op de knop een korting van 10% (`prijs * 0.9`) toepast. Dit moet permanent via de API opgeslagen worden.
*   **Cart Pagina:** Maak een `/cart` pagina waar het lokaal bewaarde winkelmandje wordt getoond, inclusief de berekening van de **totaalprijs**. Het moet mogelijk zijn om producten weer uit het mandje te verwijderen (rechtstreekse interactie met de Provider, geen event listeners in de child component vereist).

---

## Oplossingsrichtlijnen & Architectuur

Hoe pak je zo'n gigantisch project aan in TypeScript? Hier is de blauwdruk.

### 1. Definieer je Interfaces

Begin *altijd* met je data-structuren. Maak gebruik van **Module 7 (Interfaces)**.

```typescript
export interface Vraag {
    id: string;
    vraagTekst: string;
    moeilijkheidsgraad: "makkelijk" | "gemiddeld" | "moeilijk";
    type: "multiple-choice" | "open";
}

export interface Quiz {
    id: string;
    naam: string;
    vragen: Vraag[];
}

export interface Product {
    id: string;
    naam: string;
    categorie: string;
    prijs: number;
}
```

### 2. Generieke Providers (Generics)

Omdat je data ophaalt uit een API (voor Vragen en Producten) én uit localStorage (voor Quizzes en Cart), is dit dé perfecte kans om **Module 10 (Generics)** te gebruiken.

```typescript
// Een generieke interface voor elke soort opslag
export interface PersistenceProvider<T> {
    getAll(): Promise<T[]>;
    getById(id: string): Promise<T | undefined>;
    save(item: T): Promise<void>;
    delete(id: string): Promise<void>;
}

// Implementatie voor REST (API)
export class RestProvider<T> implements PersistenceProvider<T> {
    constructor(private baseUrl: string) {}
    
    async getAll(): Promise<T[]> {
        const response = await fetch(this.baseUrl);
        return await response.json();
    }
    // ... implementatie van de overige methodes
}

// Implementatie voor LocalStorage
export class LocalStorageProvider<T> implements PersistenceProvider<T> {
    constructor(private storageKey: string) {}
    
    async getAll(): Promise<T[]> {
        const data = localStorage.getItem(this.storageKey);
        return data ? JSON.parse(data) : [];
    }
    // ...
}
```

Dankzij TypeScript hoef je de logica maar één keer te schrijven. Vervolgens maak je specifieke instanties aan:
`const productApi = new RestProvider<Product>('http://localhost:3000/products');`
`const cartStorage = new LocalStorageProvider<Product>('cart');`

### 3. Custom Elements (Klassen)

Gebruik **Module 8 (Klassen)** om je UI te bouwen. TypeScript dwingt je af om alle properties correct te typeren. Custom elements sturen data naar boven via **Custom Events** en ontvangen data via attributen/properties.

```typescript
export class ProductCard extends HTMLElement {
    // Definieer de property strikt!
    private _product?: Product;

    set product(value: Product) {
        this._product = value;
        this.render();
    }

    // Voorbeeld van een Custom Event verzenden (Toevoegen aan winkelmandje)
    private onAddToCart() {
        if (!this._product) return;
        
        const event = new CustomEvent('add-to-cart', {
            detail: this._product,
            bubbles: true // Zorgt dat het parent element dit kan opvangen
        });
        this.dispatchEvent(event);
    }

    private render() {
        if (!this._product) return;
        this.innerHTML = `
            <div class="card">
                <h3>${this._product.naam}</h3>
                <p>€${this._product.prijs.toFixed(2)}</p>
                <button id="add-btn">In winkelmand</button>
            </div>
        `;
        this.querySelector('#add-btn')?.addEventListener('click', () => this.onAddToCart());
    }
}
// Registreer het element
customElements.define('product-card', ProductCard);
```

### Tips voor succes:
- Vermijd het gebruik van `any`. Als de API response onbekend is, gebruik dan `unknown` en type guards (Module 9).
- Zorg ervoor dat de data manipulatie (bijvoorbeeld filteren en kortingen berekenen) in een aparte functie zit en niet rechtstreeks in je HTML render logica vervlochten zit.
- Bij attributen van custom elements (bijv. id's doorgeven), onthoud dat HTML attributen *altijd strings* zijn. Converteer ze indien nodig via `Number(id)`.

---

# Einde van de Cursus

Gefeliciteerd! Je hebt de TypeScript cursus volledig afgerond. Van onzeker JavaScript naar rotsvaste, strongly-typed architectuur. TypeScript is een krachtig hulpmiddel dat, zodra je er gewend aan bent geraakt, onmisbaar zal worden in al je toekomstige web-projecten. Succes met coderen!
