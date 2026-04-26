# Welkom bij TypeScript: Een uitgebreide gids

Deze gids is speciaal geschreven voor ontwikkelaars die de overstap maken van JavaScript naar TypeScript. We behandelen de basisconcepten, hoe dit project is opgebouwd, en hoe we omgaan met de DOM en `fetch` in TypeScript.

## 1. Wat is TypeScript en waarom gebruiken we het?

TypeScript is een **superset van JavaScript**. Dit betekent dat elke geldige JavaScript-code ook geldige TypeScript-code is. Wat TypeScript toevoegt, is een **statisch typesysteem**. 

In gewone JavaScript ontdek je fouten (zoals het aanroepen van een functie die niet bestaat of het doorgeven van tekst waar een getal wordt verwacht) vaak pas als je de code uitvoert in de browser (runtime). TypeScript controleert je code al *tijdens het schrijven en compileren* (compile-time). 

**Voordelen:**
*   **Minder bugs:** TypeScript waarschuwt je voordat je de code runt.
*   **Betere autocompletion:** Omdat je editor weet welke types variabelen hebben, kan hij betere suggesties geven (IntelliSense).
*   **Leesbaardere code:** Types fungeren als ingebouwde documentatie. Je ziet meteen wat een functie verwacht en teruggeeft.

## 2. Hoe werkt dit project?

Dit project is opgezet met **Vite** en **TypeScript**. 

*   `index.html`: Dit is het startpunt van de applicatie. Het bevat een `<div id="app"></div>` waar onze applicatie in geladen wordt, en verwijst naar `src/main.ts`.
*   `src/main.ts`: Het hoofdscript. Hier importeren we stijlen (Bootstrap), halen we HTML op (bijv. van `home.html`) en voeren we de DOM-manipulatie uit.
*   `src/models/book.ts`: Hier definiëren we onze "blauwdrukken" (interfaces en types).

### Types en Interfaces
In `src/models/book.ts` zien we:
```typescript
export type BookType = 'ebook' | 'audiobook' | 'print'

export interface Book {
    id: string
    title: string
    publicationYear: number
    series?: {            // Het vraagteken betekent dat dit veld optioneel is
        name: string
        number: number
    }
    author: string
    type: BookType
}
```
Dit vertelt TypeScript precies hoe een "Boek" eruit hoort te zien. Als we ergens proberen een boek aan te maken zonder `title`, zal TypeScript direct een foutmelding geven.

## 3. DOM Manipulatie in TypeScript

Als je met de Document Object Model (DOM) werkt in TypeScript, kom je vaak twee belangrijke concepten tegen: **Generics** (`<Type>`) en de **Non-null assertion operator** (`!`).

Kijk naar deze code uit `main.ts`:
```typescript
const titleInput = document.querySelector<HTMLInputElement>('input[name="title"]')!
```

**Wat gebeurt hier?**
1.  `document.querySelector('input[name="title"]')`: Net als in JS zoeken we een element. In JS zou dit een generiek `Element` of `null` teruggeven.
2.  `<HTMLInputElement>`: Dit vertelt TypeScript: *"Het element dat je gaat vinden, is specifiek een invulveld (input)"*. Hierdoor weet TypeScript dat `titleInput.value` bestaat. Zonder dit zou TypeScript klagen, omdat een generiek HTML element geen `value` heeft.
3.  `!`: Dit is het uitroepteken aan het einde. `querySelector` kan `null` teruggeven als het element niet bestaat. Door `!` te typen, zeggen we tegen TypeScript: *"Vertrouw me, ik weet 100% zeker dat dit element op de pagina staat, je hoeft niet te checken voor null"*. Als alternatief zou je if-statements moeten schrijven om te checken of het element niet `null` is.

Bij events zien we ook type-aanduidingen:
```typescript
bookFrom.addEventListener('submit', (evt: SubmitEvent) => {
    evt.preventDefault()
    // ...
})
```
Hier zeggen we dat `evt` van het type `SubmitEvent` is.

## 4. Werken met Fetch en API's in TypeScript

In de huidige `main.ts` slaan we boeken lokaal op in een array (`let books : Book[] = []`). Maar in de praktijk zul je vaak data ophalen van een server met `fetch()`.

In JavaScript doe je dit zo:
```javascript
fetch('https://api.example.com/books')
  .then(response => response.json())
  .then(data => console.log(data));
```

Het probleem in TypeScript is dat `response.json()` standaard van het type `any` is. TypeScript heeft geen idee hoe die data eruitziet, waardoor we de voordelen van TypeScript verliezen.

**Hoe doen we dit correct in TypeScript?**

We maken gebruik van onze `Book` interface om aan te geven wat voor data we verwachten:

```typescript
// Stel we hebben een functie om boeken op te halen
async function fetchBooks(): Promise<Book[]> {
    try {
        const response = await fetch('https://api.example.com/books');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        // Hier is de 'magic': We vertellen TypeScript dat de data 
        // die uit .json() komt, een array van boeken (Book[]) is.
        const data = await response.json() as Book[];
        return data;
        
    } catch (error) {
        console.error("Fout bij het ophalen van boeken:", error);
        return []; // Geef een lege array terug bij een fout
    }
}

// Hoe we dit zouden gebruiken:
async function init() {
    const onlineBooks = await fetchBooks();
    // TypeScript weet nu dat 'onlineBooks' een array is van 'Book' objecten.
    // Dus we krijgen autocompletion op onlineBooks[0].title !
    onlineBooks.forEach(book => console.log(book.title));
}
```

### Waarom is `Promise<Book[]>` belangrijk?
Omdat `fetch` asynchroon is (het duurt even voordat het netwerk antwoordt), geeft de functie niet direct de boeken terug, maar een "belofte" (Promise) dat de boeken later komen. We schrijven `Promise<Book[]>` om te zeggen: *"Deze functie is asynchroon en zal uiteindelijk een array van Boeken afleveren."*

## Samenvatting
1.  Gebruik **Interfaces/Types** (`interface Book`) om te beschrijven hoe je data eruit ziet.
2.  Gebruik **Generics** (`<HTMLInputElement>`) bij DOM selecties zodat TypeScript weet welke specifieke HTML-eigenschappen beschikbaar zijn.
3.  Gebruik de **Type Assertion** (`as Book[]`) bij `fetch()` om TypeScript te vertellen welk type data een API teruggeeft.
