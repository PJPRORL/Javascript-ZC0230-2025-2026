# Module 12 — Data Management in TypeScript

*Verlies nooit data*
*De browser als databank*
*Met solide interfaces*

In een webapplicatie gebeurt het vaak dat je applicatie data nodig heeft en moet opslaan. Denk aan een Todo-app, een winkelmandje of een inlog-token. Als je data opslaat in een simpele array (zoals `let todos = []`), dan is die array leeg zodra je de webpagina herlaadt. Dit heet het verlies van "State" (status).

Om dit op te lossen, moeten we de data **persisteren** (bewaren). Dat kan in de browser via `localStorage` of online in een echte databank via een API. Om onze TypeScript code schoon te houden, bouwen we hiervoor de **PersistenceProvider** architectuur.

---

## 1. Wat is LocalStorage?

Browsers bieden een ingebouwde mini-databank aan genaamd `localStorage`. Het is eigenlijk gewoon een heel groot "woordenboek" (Dictionary) dat data bewaart als pure tekst (strings). Data in `localStorage` blijft bewaard, zélfs als je de computer afsluit!

### Basiscommando's:
```typescript
// Bewaar iets in localStorage onder de sleutel "mijn_naam"
localStorage.setItem("mijn_naam", "Pieter");

// Haal de waarde terug op
const naam = localStorage.getItem("mijn_naam"); 

// Verwijder de waarde
localStorage.removeItem("mijn_naam");
```

### Probleem: LocalStorage kent alleen "Strings"
Als je een TypeScript object hebt, kan je dat niet rechtstreeks opslaan:
```typescript
const user = { id: 1, naam: "Bob" };
localStorage.setItem("user", user); // Fout! Bewaart "[object Object]"
```

We lossen dit op door ons object om te zetten in tekstformaat via `JSON.stringify()`, en bij het ophalen terug om te zetten naar een object via `JSON.parse()`.

```typescript
// Opslaan
localStorage.setItem("user", JSON.stringify(user));

// Ophalen
const bewaardeData = localStorage.getItem("user");
if (bewaardeData) {
    const userObject = JSON.parse(bewaardeData);
    console.log(userObject.naam); // Bob
}
```

---

## 2. Waarom de PersistenceProvider?

Als we rechtstreeks `localStorage.getItem()` en `setItem()` door onze hele applicatie heen gebruiken, hebben we twee problemen:
1. Wat als we later beslissen om de data *niet* in localStorage, maar online in een PostgreSQL databank op te slaan? Dan moeten we onze hele applicatie herschrijven!
2. Het voortdurend gebruiken van `JSON.stringify` zorgt voor rommelige, foutgevoelige code.

Hier is de professionele oplossing uit **Module 7 (Interfaces) en Module 10 (Generics)**: We definiëren een standaard "contract" waaraan een databank zich moet houden.

### Het Contract (De Interface of Abstracte Klasse)

Elk object dat we willen opslaan, moet minstens een `id` hebben, anders kunnen we het nooit meer terugvinden om te verwijderen of te updaten.
```typescript
// src/models/Persistable.ts
export interface Persistable {
  id: string;
}
```

Vervolgens schrijven we een abstracte klasse:

```typescript
// src/services/PersistenceProvider.ts
import { Persistable } from '../models/Persistable';

// Een T is een generiek type. We eisen dat T altijd minstens een id heeft (extends Persistable)
export abstract class PersistenceProvider<T extends Persistable> {
  // We retourneren Promises, omdat we in de toekomst misschien online moeten gaan met onze data!
  abstract create(data: Omit<T, 'id'>): Promise<T>; // Omit verwijdert het 'id' uit T, want de databank moet het ID genereren
  abstract get(id: string): Promise<T | undefined>;
  abstract getAll(): Promise<T[]>;
  abstract update(id: string, data: T): Promise<T>;
  abstract delete(id: string): Promise<void>;
}
```

Dankzij deze Abstracte klasse verplichten we elke databank-logica om exact deze 5 "CRUD" acties (Create, Read, Update, Delete) aan te bieden.

---

## 3. Implementatie 1: MemoryPersistenceProvider

Tijdens het ontwikkelen van een applicatie wil je soms een "nep" databank die zijn geheugen reset als je de browser herlaadt. Dit is perfect om je code te testen.

We maken een klasse die de acties implementeert met een simpele Array:

```typescript
// src/services/MemoryPersistenceProvider.ts
import { PersistenceProvider } from './PersistenceProvider';
import { Persistable } from '../models/Persistable';

export class MemoryPersistenceProvider<T extends Persistable> extends PersistenceProvider<T> {
  // Een private array die als 'nep' databank dient
  private memory: T[] = [];

  async getAll(): Promise<T[]> {
    return this.memory;
  }

  async get(id: string): Promise<T | undefined> {
    return this.memory.find(item => item.id === id);
  }

  async create(data: Omit<T, 'id'>): Promise<T> {
    // Genereer een willekeurig uniek ID in de browser
    const newId = window.crypto.randomUUID();
    
    // Voeg het ID samen met de overige data (Spread operator)
    const newRecord = { ...data, id: newId } as T;
    
    this.memory.push(newRecord);
    return newRecord;
  }

  async update(id: string, data: T): Promise<T> {
    const index = this.memory.findIndex(item => item.id === id);
    if (index === -1) throw new Error("Record not found");
    
    this.memory[index] = data;
    return data;
  }

  async delete(id: string): Promise<void> {
    this.memory = this.memory.filter(item => item.id !== id);
  }
}
```

Je kunt deze nu in je `main.ts` gebruiken voor bijvoorbeeld Producten:
```typescript
interface Product extends Persistable { naam: string; prijs: number; }
const db = new MemoryPersistenceProvider<Product>();
await db.create({ naam: "Banaan", prijs: 1.5 }); // Let op: id is weggelaten (Omit)
```

---

## 4. Implementatie 2: LocalStoragePersistenceProvider

Als je de app écht wilt laten werken (zodat data bewaard blijft na herladen), schrijven we exact dezelfde 5 methoden, maar deze keer interacteren we met `localStorage`.

```typescript
// src/services/LocalStoragePersistenceProvider.ts
import { PersistenceProvider } from './PersistenceProvider';
import { Persistable } from '../models/Persistable';

export class LocalStoragePersistenceProvider<T extends Persistable> extends PersistenceProvider<T> {
  // We hebben een "sleutel" nodig, bijvoorbeeld "my_app_users" om onze data in localStorage te stoppen
  private storageKey: string;

  constructor(key: string) {
    super();
    this.storageKey = key;
  }

  // Interne Helper: Haal alles op en zet om naar Objecten
  private loadData(): T[] {
    const raw = localStorage.getItem(this.storageKey);
    return raw ? JSON.parse(raw) : [];
  }

  // Interne Helper: Sla de array terug op als String
  private saveData(data: T[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(data));
  }

  async getAll(): Promise<T[]> {
    return this.loadData();
  }

  async create(data: Omit<T, 'id'>): Promise<T> {
    const newRecord = { ...data, id: window.crypto.randomUUID() } as T;
    
    const allData = this.loadData(); // 1. Haal de oude lijst op
    allData.push(newRecord);         // 2. Voeg het nieuwe element toe
    this.saveData(allData);          // 3. Sla de vernieuwde lijst op in localStorage!
    
    return newRecord;
  }

  async delete(id: string): Promise<void> {
    let allData = this.loadData();
    allData = allData.filter(item => item.id !== id);
    this.saveData(allData);
  }

  // De get en update methodes werken volgens hetzelfde load/save principe...
}
```

### De Kracht van deze Architectuur

Waarom deden we al deze moeite? Kijk naar je `main.ts`:

```typescript
// main.ts
import { PersistenceProvider } from './services/PersistenceProvider';
import { MemoryPersistenceProvider } from './services/MemoryPersistenceProvider';
import { LocalStoragePersistenceProvider } from './services/LocalStoragePersistenceProvider';

// We kunnen nu met ÉÉN regel code onze hele applicatie omschakelen!
// const database: PersistenceProvider<Product> = new MemoryPersistenceProvider<Product>(); // Voor testing
const database: PersistenceProvider<Product> = new LocalStoragePersistenceProvider<Product>("producten"); // Voor productie

// De rest van onze code (die database.create() en getAll() aanroept)
// heeft GEEN IDEE in welke databank hij aan het praten is. Prachtig!
```

Dit principe heet "Polymorfisme" en "Dependency Injection", en het is de ultieme manier om flexibele, onbreekbare applicaties te bouwen. 

---

## Samenvatting

- **`localStorage`** bewaart data als strings in de browser, zelfs na herladen of afsluiten
- Gebruik `JSON.stringify()` en `JSON.parse()` om objecten op te slaan en uit te lezen
- De **`Persistable`** interface verplicht elk opgeslagen object om een `id` te bezitten
- Een **`PersistenceProvider`** abstracte klasse definieert het standaard "contract" voor data-opslag (CRUD)
- De **`MemoryPersistenceProvider`** bewaart data in een array (ideaal om te testen, niet persistent)
- De **`LocalStoragePersistenceProvider`** bewaart data in de browser (persistent over sessies heen)
- Dankzij **Polymorfisme** kan je met één regel code wisselen van opslagmethode

---

## Oefeningen

1. **localStorage verkennen.** Open de Developer Tools van je browser (F12 → Application → Local Storage). Gebruik `localStorage.setItem()` en `localStorage.getItem()` in de console om handmatig een naam op te slaan en op te halen.

2. **JSON omzetten.** Maak een TypeScript object `const student = { naam: "Eva", punten: 85 }`. Sla het op in localStorage via `JSON.stringify()`, haal het terug op via `JSON.parse()`, en log `student.punten` naar de console.

3. **PersistenceProvider bouwen.** Schrijf de volledige `PersistenceProvider` abstracte klasse en de `Persistable` interface exact zoals in de theorie. Implementeer daarna de `MemoryPersistenceProvider` met alle 5 CRUD methoden.

4. **LocalStoragePersistenceProvider.** Implementeer de `LocalStoragePersistenceProvider` volledig (inclusief `get` en `update` methoden die in de theorie met "..." werden aangegeven). Test of je data bewaard blijft na het herladen van de pagina.

5. **Polymorfisme testen.** Schrijf een functie `toonAlleItems<T extends Persistable>(provider: PersistenceProvider<T>)` die `getAll()` aanroept en de resultaten logt. Roep deze functie aan met zowel een `MemoryPersistenceProvider` als een `LocalStoragePersistenceProvider` en controleer dat beide werken.

In **Module 13** gaan we een user interface (UI) bouwen op deze databank om een echte Multipage App te realiseren!
