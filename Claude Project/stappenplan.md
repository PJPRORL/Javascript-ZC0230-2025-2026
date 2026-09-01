*Examen augustus 2026 · TypeScript, 16 punten · Nagekeken tegen de startbestanden*

# De Ruilkaartenbibliotheek, van startbestanden tot volledige oplossing

Eerst begrijpen hoe het project in elkaar zit — vooral de **Server**-map, die je op het examen niet mag aanraken maar wel moet snappen. Daarna de volledige oplossing, stap voor stap, met de reden achter elke regel.

## Overzicht: wat krijg je, wat maak je zelf?

Het examen geeft je een werkende *machinekamer* en een lege *cockpit*. Alle moeilijke infrastructuur (server, router, opslag) is al geschreven. Jouw werk zit in de bestanden die die infrastructuur **gebruiken**. Wie dat onderscheid meteen ziet, verliest geen tijd met dingen herschrijven die al bestaan.

De startbestanden bevatten twee losstaande projecten. Ze delen geen `node_modules`, geen `package.json` en geen build — ze praten enkel met elkaar over HTTP.

    TypeScript/
    ├── opgave.md
    ├── screenshots/
    │
    ├── Server/                       ← volledig gegeven, niets aanpassen
    │   ├── package.json
    │   ├── tsconfig.json
    │   └── src/
    │       ├── server.ts             Express-app, poort 3000
    │       ├── models/tradingCard.ts interface TradingCard
    │       ├── routes/kaarten.ts     CRUD-endpoints /kaarten
    │       ├── persistence/filePersister.ts  generieke JSON-opslag
    │       └── data/
    │           ├── kaarten.json        de "database" — 20 kaarten
    │           └── backupKaarten.json  reservekopie
    │
    └── Frontend/
        ├── index.html                gegeven
        ├── package.json / tsconfig.json / biome.json   gegeven
        └── src/
            ├── main.ts               ← jij: router opstarten
            ├── index.css             gegeven
            ├── index.d.ts            gegeven
            ├── models/
            │   ├── tradingCard.ts    gegeven
            │   └── collectieItem.ts  gegeven
            ├── router/
            │   ├── router.ts         gegeven
            │   ├── page.ts           gegeven
            │   └── customElement.ts  gegeven
            ├── data/
            │   ├── persistenceProvider.ts          gegeven (abstract)
            │   ├── restPersistenceProvider.ts      gegeven
            │   ├── localStoragePersistenceProvider.ts gegeven
            │   ├── memoryPersistenceProvider.ts    gegeven
            │   └── data.ts                         ← jij: providers aanmaken
            ├── components/
            │   ├── navbar/navbar.html              gegeven + navbar.ts ← jij
            │   ├── kaartKaart/kaartKaart.html      gegeven + kaartKaart.ts ← jij
            │   └── collectieItem/collectieItem.html gegeven + collectieItem.ts ← jij
            └── pages/
                ├── kaarten/kaarten.html            gegeven + kaarten.ts ← jij
                └── collectie/collectie.html        gegeven + collectie.ts ← jij

Er zijn dus precies **zeven bestanden** die jij schrijft, plus één regel in `main.ts`. Alle HTML bestaat al; jij vult ze enkel met data en gedrag.

> **Zo herken je het onderscheid**
>
> Bovenaan `router.ts`, `page.ts` en `customElement.ts` staat letterlijk: *“Je KRIJGT deze code op het examen en moet hier geen aanpassingen aan doen. Je moet deze klasse enkel gebruiken.”* Kom je in de verleiding om zo’n bestand te wijzigen, dan pak je het probleem waarschijnlijk verkeerd aan.

## Setup en opstarten

Twee projecten, dus twee keer installeren en twee terminalvensters die tegelijk open blijven staan. De frontend werkt niet zonder de server: de kaarten komen daarvandaan.

### Installeren

```bash
# Terminal 1 — de server
cd TypeScript/Server
pnpm install
pnpm dev          # → Server is running at http://localhost:3000

# Terminal 2 — de frontend
cd TypeScript/Frontend
pnpm install
pnpm dev          # → Vite dev server, meestal http://localhost:5173
```

> **Controleer de poort**
>
> De opgave vraagt uitdrukkelijk dat je in de terminaluitvoer nakijkt of de server op **poort 3000** draait. Draait er nog een oude server op die poort, dan crasht de nieuwe (`EADDRINUSE`) of neemt hij een andere poort — en dan haalt je frontend nooit kaarten op. Sluit oude terminals eerst.

### De volgorde die je aanhoudt tijdens het examen

1.  Beide projecten installeren en starten. Werkt de server? Open `http://localhost:3000/kaarten` in je browser: je moet JSON zien.
2.  Alle lege TypeScript-bestanden aanmaken met enkel de klasse en `super(html)` erin, en ze registreren. Dan staat de structuur er en kan je alles testen.
3.  Pas daarna functionaliteit toevoegen, vraag per vraag, van boven naar onder in de opgave.

> **Data terugzetten**
>
> `Server/src/data/backupKaarten.json` is een identieke kopie van `kaarten.json` (20 kaarten, samen € 249,50). Heb je met POST/DELETE de data vervuild, kopieer dan de backup over `kaarten.json`. Dat is het enige dat je in de Server-map *mag* wijzigen.
>
> Zit je collectie in de war? Verwijder de localStorage-sleutel `collectie` van `localhost` via DevTools → Application → Local Storage.

## De Server van A tot Z

Dit is het deel dat je op het examen niet schrijft en daardoor makkelijk overslaat. Maar je kan de frontend niet debuggen zonder te weten wat er aan de andere kant gebeurt — en op het herexamen wordt van je verwacht dat je erover kan vertellen.

### Wat doet die server eigenlijk?

De server is een klein programma dat draait in **Node.js** (JavaScript buiten de browser) en luistert op poort 3000. Het beantwoordt HTTP-verzoeken met JSON. Meer is het niet: er is geen echte database, enkel een JSON-bestand op schijf.

1.  **Browser** — fetch('http://localhost:3000/kaarten')
2.  **server.ts** — cors + bodyParser, stuurt /kaarten door
3.  **routes/kaarten.ts** — welke methode? welk id?
4.  **filePersister.ts** — leest/schrijft het bestand
5.  **kaarten.json** — de data op schijf

Die vier lagen zijn een klassieke opsplitsing: *opzet* (server.ts), *routing* (welke URL doet wat), *persistentie* (hoe raakt data op schijf) en *data*. Elke laag kent enkel zijn buur. Daardoor kan je de opslag vervangen door een echte database zonder één routeregel aan te passen.

### server.ts — regel per regel

*Server/src/server.ts*

```typescript
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import kaartRouter from './routes/kaarten.ts'

const server = express()
const port = 3000

server.use(cors())
server.use(bodyParser.json())

server.use('/kaarten', kaartRouter)

server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
})
```

| Regel                                 | Wat het doet en waarom                                                                                                                                                                                                                                                                                                                                                            |
|---------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `express()`                           | Maakt de applicatie aan. Een Express-app is in de kern een lijst van functies (middleware en routes) die één na één de kans krijgen om een binnenkomend verzoek te behandelen.                                                                                                                                                                                                    |
| `server.use(cors())`                  | **Het belangrijkste voor jouw frontend.** Je pagina draait op `localhost:5173`, de server op `localhost:3000`. Voor de browser zijn dat twee verschillende *origins*, en die blokkeert hij standaard. `cors()` zet de header `Access-Control-Allow-Origin` zodat de browser het antwoord wél doorlaat. Zonder deze regel krijg je in de console een CORS-fout en een lege pagina. |
| `server.use(bodyParser.json())`       | Leest de body van POST- en PUT-verzoeken uit en zet de JSON-tekst om naar een echt object in `req.body`. Zonder deze regel is `req.body` undefined.                                                                                                                                                                                                                               |
| `server.use('/kaarten', kaartRouter)` | Hangt de hele router onder het pad `/kaarten`. In de router zelf staat dus `router.get('/')`, en dat wordt van buitenaf `GET /kaarten`. Wil je er later `/gebruikers` bij, dan maak je gewoon een tweede routerbestand.                                                                                                                                                           |
| `server.listen(...)`                  | Start het luisteren. De callback draait zodra de poort open is — vandaar de regel die je in de terminal ziet.                                                                                                                                                                                                                                                                     |

> **Volgorde telt**
>
> Middleware wordt uitgevoerd in de volgorde waarin je ze registreert. Zou `server.use('/kaarten', ...)` vóór `bodyParser.json()` staan, dan zou `req.body` in je POST-handler leeg zijn. Eerst alles wat het verzoek *voorbereidt*, dan pas de routes.

### routes/kaarten.ts — de vijf endpoints

Een `express.Router()` is een mini-app: je hangt er routes aan en koppelt hem in één keer aan een pad. Elke route krijgt twee objecten: `req` (wat de client vroeg) en `res` (waarmee je antwoordt).

*Server/src/routes/kaarten.ts (fragment)*

```typescript
const router = express.Router()
const provider = new FilePersistenceProvider<TradingCard>(`./src/data/kaarten.json`)

// GET all kaarten
router.get('/', async (_req: Request, res: Response) => {
  const kaarten = await provider.getAll()
  res.json(kaarten)
})

// GET kaart by ID
router.get('/:id', async (req: Request, res: Response) => {
  const kaart = await provider.getById(req.params.id)
  if (!kaart) return res.status(404).json({error: 'Kaart niet gevonden'})
  res.json(kaart)
})

// CREATE kaart
router.post('/', async (req: Request, res: Response) => {
  const nieuweKaart: TradingCard = {...req.body, id: uuidv4()}
  await provider.create(nieuweKaart)
  res.status(201).json(nieuweKaart)
})
```

| Endpoint            | Antwoord               | Status    | Wat je moet onthouden                                                                                                                                |
|---------------------|------------------------|-----------|------------------------------------------------------------------------------------------------------------------------------------------------------|
| GET /kaarten        | array van alle kaarten | 200       | Dit is het enige endpoint dat je op het examen echt nodig hebt.                                                                                      |
| GET /kaarten/:id    | één kaart              | 200 / 404 | `:id` is een *routeparameter*; je leest hem uit via `req.params.id`.                                                                                 |
| POST /kaarten       | de aangemaakte kaart   | 201       | De server negeert een id die jij meestuurt: `{...req.body, id: uuidv4()}` zet het gegenereerde id er ná de spread bij en overschrijft dus het jouwe. |
| PUT /kaarten/:id    | de bijgewerkte kaart   | 200 / 404 | Vervangt het volledige object; het id uit de URL wint.                                                                                               |
| DELETE /kaarten/:id | leeg                   | 204       | 204 = “gelukt, geen inhoud”. Let op in de frontend: `response.json()` op een 204 crasht, want er is niets te parsen.                                 |

Twee patronen die op elke Express-route terugkomen:

- **`async` + `await`** — bestanden lezen duurt tijd. De handler geeft ondertussen de draad terug aan Node, zodat de server andere verzoeken kan blijven behandelen.
- **Statuscodes zijn betekenis, geen versiering.** 2xx = gelukt, 4xx = de client deed iets fout, 5xx = de server. Je frontend leest `response.ok`, en dat is precies “status tussen 200 en 299”.

### persistence/filePersister.ts — generics in de praktijk

Dit is het leerzaamste bestand van de server. Het is een klasse die *niet weet* wat ze opslaat.

*Server/src/persistence/filePersister.ts (fragment)*

```typescript
export class FilePersistenceProvider<T> {
  constructor(private filename: string) {}

  private async read(): Promise<T[]> {
    try {
      const data = await fs.readFile(this.filename, 'utf-8')
      return JSON.parse(data) as T[]
    } catch (e) {
      console.log(e)
      return []
    }
  }

  private async write(data: T[]): Promise<void> {
    await fs.writeFile(this.filename, JSON.stringify(data, null, 2), 'utf-8')
  }

  async getById(id: string): Promise<T | undefined> {
    const data = await this.read()
    return data.find(item => (item as any).id === id)
  }
}
```

- `<T>` is een **typeparameter**: een gat in het type dat pas ingevuld wordt bij gebruik. `new FilePersistenceProvider<TradingCard>(...)` maakt van elke `T` in de klasse een `TradingCard`, en dus geeft `getAll()` een `TradingCard[]` terug — met autocompletion en al.
- `constructor(private filename: string)` is een *parameter property*: die ene regel declareert het veld én wijst het toe.
- Elke methode leest het bestand opnieuw en schrijft het volledig terug. Traag, maar simpel en altijd consistent met wat er op schijf staat.
- `read()` vangt fouten op en geeft dan een lege array terug. Handig, maar het verbergt ook een kapot JSON-bestand: je krijgt dan gewoon nul kaarten in plaats van een foutmelding. Kijk bij een lege pagina dus zeker eens in de serverterminal.
- `(item as any).id` is het zwakke punt: de klasse belooft niets over `T`, dus TypeScript weet niet of er een `id` bestaat en met `as any` zet je de controle uit. **De frontend lost dit netter op** met `<T extends Persistable>` — vergelijk die twee eens naast elkaar, dat is precies waar generieke constraints voor dienen.

### Waarom er nergens gecompileerd wordt

*Server/package.json (fragment)*

```json
{
  "scripts": {
    "dev": "pnpx tsx src/server.ts"
  }
}
```

**tsx** voert TypeScript rechtstreeks uit: het strípt de types eruit en draait de rest. Er wordt dus niets getypecheckt bij het starten. Dat verklaart ook `"noEmit": true` in `Server/tsconfig.json` — de compiler is er enkel voor je IDE. Typfouten in de server merk je pas als iets crasht, niet bij het opstarten.

Het verklaart ook waarom de imports eindigen op `.ts` (`from './routes/kaarten.ts'`): er wordt geen `.js` gegenereerd om naar te verwijzen. De optie die dat toelaat is `"allowImportingTsExtensions": true`.

### Zelf testen zonder frontend

Deze reflex bespaart je op het examen minuten aan verkeerd zoeken. Werkt de server, dan ligt een probleem in je frontend — en omgekeerd.

```bash
# In de browser (alleen GET):
http://localhost:3000/kaarten
http://localhost:3000/kaarten/550e8400-e29b-41d4-a716-446655440003

# Of via de terminal:
curl http://localhost:3000/kaarten
curl -i http://localhost:3000/kaarten/bestaat-niet     # → 404 + {"error":"Kaart niet gevonden"}
```

Zo ziet één kaart eruit — dit is exact het model dat je frontend verwacht:

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440001",
  "naam": "Vuurdrake Brutus",
  "serie": "Vuurdraak",
  "type": "Wezen",
  "zeldzaamheid": "zeldzaam",
  "aanvalskracht": 2400,
  "waarde": 12.5
}
```

De dataset telt 20 kaarten in 4 series (Vuurdraak, IJsberg, Stormwind, Schaduwwoud), 3 types (Wezen, Spreuk, Val) en 4 zeldzaamheden (gewoon, ongewoon, zeldzaam, legendarisch). Die vier zeldzaamheden komen exact overeen met de CSS-klassen `.zeldzaamheid-gewoon` tot `.zeldzaamheid-legendarisch` in `index.css` — dat is geen toeval, dat is een hint.

## De frontend-architectuur

Vier gegeven bouwstenen dragen de hele applicatie: `Page`, `CustomElement`, `Router` en `PersistenceProvider`. Als je begrijpt hoe die vier samenwerken, is de rest van het examen invulwerk.

### Vite en het instappunt

Er is precies één HTML-bestand. Alles wat je ziet, wordt door TypeScript in `<div id="app">` gezet. Dat heet een **Single Page Application**: navigeren herlaadt de pagina niet, het vervangt enkel de inhoud.

*Frontend/index.html (fragment)*

```html
<body class="bg-dark">
  <div id="app"></div>
  <script type="module" src="/src/main.ts"></script>
</body>
```

Vite doet drie dingen voor je: het start een dev-server met hot reload, het zet TypeScript om naar JavaScript dat de browser begrijpt, en het laat je *niet-JavaScript* bestanden importeren. Dat laatste is de truc waarop dit hele project draait:

```typescript
import html from './navbar.html?raw'   // html is nu gewoon een string
```

Het achtervoegsel `?raw` zegt tegen Vite: geef me de inhoud van dit bestand als tekst. Daarom bevat `src/index.d.ts` de regel `declare module '*html?raw'` — anders weet TypeScript niet wat zo'n import oplevert en krijg je een rode lijn.

### Page — de basisklasse voor een pagina

*Frontend/src/router/page.ts*

```typescript
export abstract class Page {
  protected readonly body: HTMLDivElement
  protected unsubscribe: Unsubscribe[] = []
  static readonly #root = document.querySelector<HTMLDivElement>('#app')!

  protected constructor(body: string) {
    this.body = document.createElement('div')
    this.body.innerHTML = body
  }

  render() {
    Page.#root.innerHTML = ''
    Page.#root.appendChild(this.body)
  }

  cleanup() {
    this.unsubscribe.forEach(x => { x() })
    this.unsubscribe = []
  }
}
```

- **abstract** betekent: je kan hier geen `new Page()` van maken, hij bestaat enkel om van te erven.
- `this.body` is een losse `<div>` in het geheugen met de HTML van je pagina erin. Hij hangt nog nergens in de DOM. Dat is precies waarom je er in de constructor al event listeners op mag zetten.
- `render()` leegt `#app` en hangt jouw div erin. **Jij overschrijft deze methode** en roept eerst `super.render()` aan — anders staat je HTML nog niet in de DOM en vindt `querySelector` niets.
- `unsubscribe` en `cleanup()` horen bij het observer-patroon verderop. De router roept `cleanup()` automatisch op wanneer je de pagina verlaat.

### CustomElement — je eigen HTML-tag

*Frontend/src/router/customElement.ts*

```typescript
export abstract class CustomElement extends HTMLElement {
  protected componentBody: HTMLDivElement

  protected constructor(body: string) {
    super()
    this.componentBody = document.createElement('div')
    this.componentBody.innerHTML = body
  }

  connectedCallback() {
    this.innerHTML = ''
    this.appendChild(this.componentBody)
  }
}
```

Een custom element is een echte HTML-tag die jij zelf definieert. Na `customElements.define('custom-navbar', Navbar)` mag `<custom-navbar></custom-navbar>` letterlijk in je HTML staan, en de browser maakt er automatisch een `Navbar`-object van.

| Moment               | Wat er gebeurt                                                  | Wat jij daar doet                                                                                 |
|----------------------|-----------------------------------------------------------------|---------------------------------------------------------------------------------------------------|
| constructor          | Het object bestaat, maar hangt nog *niet* in de DOM.            | Enkel `super(html)`. Nooit attributen lezen of DOM aanpassen.                                     |
| connectedCallback    | Het element is in de DOM gehangen. Attributen zijn beschikbaar. | Alles: `super.connectedCallback()`, dan velden invullen, listeners zetten, observers registreren. |
| disconnectedCallback | Het element is uit de DOM verwijderd.                           | Observers afmelden.                                                                               |

> **De twee regels waar iedereen over struikelt**
>
> **1.** De naam van een custom element *moet* een streepje bevatten. `kaartkaart` werkt niet, `kaart-kaart` wel.  
> **2.** Attributen zijn *altijd strings* en *altijd kebab-case*. `setAttribute('kaartId', ...)` lees je niet terug met `getAttribute('kaartId')` zoals je verwacht — HTML maakt er `kaartid` van. Gebruik `kaart-id`, en zet getallen om met `Number(...)`.

### Router — navigeren zonder herladen

*Frontend/src/router/router.ts (fragment)*

```typescript
type ConcretePage = new () => Page
type RouteMap = Record<string, ConcretePage>

export class Router {
  constructor(pages: RouteMap) {
    this.#pages = pages
    const pathName = window.location.pathname
    this.navigate(this.#pages[pathName] ? pathName : '/')
  }

  navigate(path: string) {
    this.#activePage?.cleanup()
    this.#activePage = new this.#pages[path]()
    this.#activePage.render()
    this.#setupRouter()
  }
}
```

`ConcretePage = new () => Page` leest als: “een ding waar je `new` op kan doen zonder argumenten en dat een `Page` oplevert”. Je geeft de router dus **klassen door, geen instanties**: `{'/': KaartenPage}` en niet `{'/': new KaartenPage()}`. De router maakt bij élke navigatie een verse instantie.

De navigatie zelf: `#setupRouter()` zoekt alle elementen met een `data-link`-attribuut en hangt daar een klik-listener aan die `preventDefault()` doet en `history.pushState` gebruikt. De URL verandert, de browser herlaadt niets. Kijk maar in `navbar.html`:

*Frontend/src/components/navbar/navbar.html (fragment)*

```html
<a href="/" data-link="/" class="nav-link text-secondary">Kaarten</a>
<a href="/collectie" data-link="/collectie" class="nav-link text-secondary">Mijn Collectie</a>
```

Die `data-link`-attributen staan er al. Jij moet enkel zorgen dat de navbar effectief op de pagina terechtkomt — dan werken de links vanzelf.

### PersistenceProvider en het observer-patroon

Dit is het hart van de opgave. Er staat letterlijk in: *“elke wijziging moet meteen zichtbaar zijn na het drukken op de knop, niet pas na een refresh. Dit doe je door correct gebruik te maken van het observer patroon.”*

Het probleem dat het oplost: `render()` is synchroon, data ophalen is asynchroon. In plaats van te wachten, zeg je: *“laat het me weten wanneer de data verandert”*.

1.  **1. addObserver** — pagina meldt zich aan en krijgt een afmeld­functie terug
2.  **2. create / delete / getAll** — de data verandert
3.  **3. notifyObservers** — elke callback wordt opgeroepen met de nieuwe lijst
4.  **4. UI hertekent** — vanzelf, zonder dat de knop iets van de pagina weet

*Frontend/src/data/persistenceProvider.ts (fragment)*

```typescript
export abstract class PersistenceProvider<T extends Persistable> {
  addObserver(observer: ChangeObserver<T>): Unsubscribe {
    this.observers.push(observer)
    return () => { this.observers = this.observers.filter(x => x !== observer) }
  }

  abstract create(data: Omit<T, 'id'>): Promise<T>
  abstract get(id: string): Promise<T>
  abstract getAll(): Promise<T[]>
  abstract update(id: string, data: T): Promise<T>
  abstract delete(id: string): Promise<void>
}
```

Drie typedetails die het waard zijn om te kennen:

- `<T extends Persistable>` — een **constraint**. T mag alles zijn, zolang het een `id: string` heeft. Daardoor mag de klasse `item.id` schrijven zonder `as any`, in tegenstelling tot de `FilePersistenceProvider` op de server.
- `Omit<T, 'id'>` in `create` — je geeft een object mee *zonder* id, want de provider genereert er zelf een. Geef je er toch een mee, dan geeft TypeScript een fout.
- `Unsubscribe` is gewoon `() => void`: de functie die je terugkrijgt om je weer af te melden. Doe je dat niet, dan blijven observers van oude pagina’s draaien en probeert een verdwenen pagina zichzelf te hertekenen.

| Provider                          | Bewaart in                  | Waarvoor in dit examen                                                                             |
|-----------------------------------|-----------------------------|----------------------------------------------------------------------------------------------------|
| `RestPersistenceProvider`         | de API op poort 3000        | **Verplicht** voor de kaarten.                                                                     |
| `LocalStoragePersistenceProvider` | localStorage van de browser | **Verplicht** voor de collectie. Blijft bestaan na het sluiten van de browser (± 5 MB per origin). |
| `MemoryPersistenceProvider`       | een array in het geheugen   | Niet nodig, maar handig om te testen: alles verdwijnt bij refresh.                                 |

> **Eén detail dat je moet weten om stap 4 te snappen**
>
> `getAll()` haalt niet alleen data op, het roept ook `notifyObservers()` aan. Dat is geen bijwerking waar je omheen moet werken — het is precies hoe je de eerste weergave in gang zet: eerst `addObserver(...)`, dan `getAll()`, en je callback doet de rest.

## De volledige oplossing, stap voor stap

Zeven stappen, in de volgorde waarin je ze op het examen best schrijft. Elke stap eindigt met iets dat je kan zien werken — nooit twintig minuten typen zonder te testen. Alle code hieronder is nagekeken: de frontend compileert foutloos onder de strikte `tsconfig.json` van het examen, en de servereindpunten zijn effectief getest.

## Stap 1 · De data managers aanmaken

`src/data/data.ts` is het enige lege bestand in de `data`-map, met de commentaar “Gebruik deze file voor je data management.” Hier maak je je twee providers aan — en nergens anders.

*Frontend/src/data/data.ts*

```typescript
import type {CollectieItem} from '../models/collectieItem.ts'
import type {TradingCard} from '../models/tradingCard.ts'
import {LocalStoragePersistenceProvider} from './localStoragePersistenceProvider.ts'
import {RestPersistenceProvider} from './restPersistenceProvider.ts'

// De kaarten komen van de Server (Express, poort 3000).
export const kaartenProvider = new RestPersistenceProvider<TradingCard>('http://localhost:3000/kaarten')

// De collectie is van de gebruiker en blijft lokaal in de browser staan.
// 'collectie' is de sleutel in localStorage.
export const collectieProvider = new LocalStoragePersistenceProvider<CollectieItem>('collectie')
```

> **Waarom dit in één bestand hoort**
>
> Een ES-module wordt maar één keer uitgevoerd, hoe vaak je hem ook importeert. Iedereen die `data.ts` importeert krijgt dus **exact dezelfde twee objecten**, met dezelfde lijst observers. Zou je in elk bestand een nieuwe `LocalStoragePersistenceProvider('collectie')` maken, dan bewaren ze wel naar dezelfde sleutel, maar verwittigen ze elkaars observers niet — en dan is je scherm pas na een refresh weer juist. Precies wat de opgave niet wil.

## Stap 2 · De navbar registreren

De eenvoudigste component, en meteen het patroon voor alle drie. Je maakt een klasse die erft van `CustomElement`, geeft de HTML door aan `super()`, en registreert de tag.

*Frontend/src/components/navbar/navbar.ts*

```typescript
import {CustomElement} from '../../router/customElement.ts'
// ?raw is een Vite-truc: importeer het bestand als string in plaats van het uit te voeren.
import html from './navbar.html?raw'

export class Navbar extends CustomElement {
  constructor() {
    super(html)
  }
}

// De naam is opgelegd door de opgave en moet een streepje bevatten.
customElements.define('custom-navbar', Navbar)
```

> **Registratie gebeurt door te importeren**
>
> `customElements.define` staat op het einde van het bestand, buiten de klasse. Die regel draait pas wanneer het bestand ergens geïmporteerd wordt. Vergeet je de import in je pagina, dan blijft `<custom-navbar>` een lege, onbekende tag — zonder enige foutmelding. Dat is de meest verwarrende bug van dit hele examen.

## Stap 3 · De twee pagina’s en de router (1 punt)

Maak eerst allebei de pagina’s in hun kaalste vorm. Zo kan je meteen testen of routing en navbar werken, vóór je aan data begint. Dat is ook wat de opgave zelf aanraadt.

*Frontend/src/pages/kaarten/kaarten.ts (voorlopige versie)*

```typescript
import '../../components/navbar/navbar.ts'   // registreert <custom-navbar>

import {Page} from '../../router/page.ts'
import html from './kaarten.html?raw'

export class KaartenPage extends Page {
  constructor() {
    super(html)
  }
}
```

Idem voor `collectie.ts` met `CollectiePage`. Daarna koppel je ze in `main.ts`:

*Frontend/src/main.ts*

```typescript
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import './index.css'

import {CollectiePage} from './pages/collectie/collectie.ts'
import {KaartenPage} from './pages/kaarten/kaarten.ts'
import {Router} from './router/router.ts'

// De router koppelt een URL-pad aan een pagina-KLASSE (geen instantie!).
// Hij maakt zelf een nieuwe instantie aan bij elke navigatie.
new Router({
  '/': KaartenPage,
  '/collectie': CollectiePage,
})
```

**Test nu.** Je ziet de navbar, de titels en de lege containers, en de twee links wisselen de pagina zonder te herladen. Werkt dat, dan staat je hele skelet recht en is het punt voor deze vraag binnen.

## Stap 4 · Kaarten inladen en tonen (5 punten)

De zwaarste vraag van het examen. Ze bestaat uit twee helften: een custom element dat één kaart toont, en een pagina die de kaarten ophaalt en er elementen van maakt.

### 4a. Het custom element `kaart-kaart`

Bekijk eerst de gegeven HTML: elk stukje informatie heeft al een `id`. Jouw werk is die vullen.

*kaartKaart.html (de ids die je nodig hebt)*

```html
<span class="badge bg-primary text-uppercase small" id="serie"></span>
<span class="badge text-uppercase small" id="zeldzaamheid-badge"></span>
<h6 class="card-title text-white mb-1" id="naam"></h6>
<p class="text-secondary small mb-1" id="type"></p>
<p class="text-info small mb-1">&#x2694; <span id="aanvalskracht"></span></p>
<p class="text-success fw-bold mb-auto" id="waarde"></p>
<button type="button" id="add-button" class="btn btn-outline-primary btn-sm">+</button>
```

*Frontend/src/components/kaartKaart/kaartKaart.ts*

```typescript
import {collectieProvider} from '../../data/data.ts'
import type {Unsubscribe} from '../../data/persistenceProvider.ts'
import {CustomElement} from '../../router/customElement.ts'
import html from './kaartKaart.html?raw'

export class KaartKaart extends CustomElement {
  #unsubscribe: Unsubscribe | null = null

  constructor() {
    super(html)
  }

  // Getters vertalen de string-attributen naar bruikbare waarden.
  get kaartId(): string { return this.getAttribute('kaart-id') ?? '' }
  get naam(): string { return this.getAttribute('naam') ?? '' }
  get serie(): string { return this.getAttribute('serie') ?? '' }
  get kaartType(): string { return this.getAttribute('kaart-type') ?? '' }
  get zeldzaamheid(): string { return this.getAttribute('zeldzaamheid') ?? '' }
  get aanvalskracht(): number { return Number(this.getAttribute('aanvalskracht') ?? '0') }
  get waarde(): number { return Number(this.getAttribute('waarde') ?? '0') }

  connectedCallback() {
    // Eerst de basisklasse: die zet de HTML in de DOM.
    // Pas daarna kan querySelector iets vinden.
    super.connectedCallback()

    this.#vulGegevensIn()

    const knop = this.querySelector<HTMLButtonElement>('#add-button')!
    knop.addEventListener('click', () => {
      // We handelen het toevoegen NIET zelf af: we roepen om hulp met een custom event.
      // bubbles: true zorgt dat het event omhoog borrelt tot bij de pagina.
      this.dispatchEvent(
        new CustomEvent('kaart-toggle', {
          bubbles: true,
          detail: {kaartId: this.kaartId, naam: this.naam, waarde: this.waarde},
        }),
      )
    })

    // Observer: zodra de collectie wijzigt, past dit element zijn eigen knop aan.
    this.#unsubscribe = collectieProvider.addObserver(items => {
      const zitInCollectie = items.some(item => item.kaartId === this.kaartId)
      knop.innerHTML = zitInCollectie ? '&check;' : '+'
    })
  }

  // Wordt opgeroepen wanneer het element uit de DOM verdwijnt.
  disconnectedCallback() {
    this.#unsubscribe?.()
    this.#unsubscribe = null
  }

  #vulGegevensIn() {
    this.querySelector('#serie')!.textContent = this.serie
    this.querySelector('#naam')!.textContent = this.naam
    this.querySelector('#type')!.textContent = this.kaartType
    this.querySelector('#aanvalskracht')!.textContent = String(this.aanvalskracht)
    this.querySelector('#waarde')!.textContent = `€ ${this.waarde.toFixed(2)}`

    const badge = this.querySelector('#zeldzaamheid-badge')!
    badge.textContent = this.zeldzaamheid
    // De klassen zeldzaamheid-gewoon/-ongewoon/-zeldzaam/-legendarisch staan in index.css.
    badge.classList.add(`zeldzaamheid-${this.zeldzaamheid}`)
  }
}

customElements.define('kaart-kaart', KaartKaart)
```

> **Waarom getters?**
>
> Je zou overal `this.getAttribute('naam')` kunnen schrijven, maar dat geeft `string | null`. Met een getter doe je de omzetting (`?? ''` of `Number(...)`) op één plaats, en werk je in de rest van de klasse met nette types. Merk op dat `type` niet als getternaam kan (het botst met bestaande HTML-begrippen), vandaar `kaartType` met attribuut `kaart-type`.

### 4b. De pagina die de kaarten ophaalt

*Frontend/src/pages/kaarten/kaarten.ts*

```typescript
// De import van een component-bestand registreert het custom element.
// Zonder deze imports blijven <custom-navbar> en <kaart-kaart> onbekende tags.
import '../../components/kaartKaart/kaartKaart.ts'
import '../../components/navbar/navbar.ts'

import {collectieProvider, kaartenProvider} from '../../data/data.ts'
import type {TradingCard} from '../../models/tradingCard.ts'
import {Page} from '../../router/page.ts'
import html from './kaarten.html?raw'

export class KaartenPage extends Page {
  constructor() {
    super(html)
  }

  render() {
    super.render() // zet de HTML van de pagina in #app

    // Abonneer op de kaarten. De callback draait telkens de data verandert.
    this.unsubscribe.push(kaartenProvider.addObserver(kaarten => this.#toonKaarten(kaarten)))

    // getAll() haalt op én verwittigt meteen alle observers → daar begint alles.
    void kaartenProvider.getAll()
  }

  #toonKaarten(kaarten: TradingCard[]) {
    const container = this.body.querySelector('#kaarten-container')!
    container.innerHTML = ''

    for (const kaart of kaarten) {
      const element = document.createElement('kaart-kaart')
      // Properties doorgeven kan enkel als string en in kebab-case.
      element.setAttribute('kaart-id', kaart.id)
      element.setAttribute('naam', kaart.naam)
      element.setAttribute('serie', kaart.serie)
      element.setAttribute('kaart-type', kaart.type)
      element.setAttribute('zeldzaamheid', kaart.zeldzaamheid)
      element.setAttribute('aanvalskracht', String(kaart.aanvalskracht))
      element.setAttribute('waarde', String(kaart.waarde))
      container.appendChild(element)
    }

    // Nu alle kaarten in de DOM staan (en dus geabonneerd zijn), één keer de collectie
    // ophalen. Elke kaart zet daardoor meteen het juiste symbool (+ of ✓).
    void collectieProvider.getAll()
  }
}
```

- `this.unsubscribe.push(...)` — `Page` heeft dat veld al. De router roept bij het verlaten van de pagina `cleanup()` aan, die al je observers netjes afmeldt. Vergeet je dit, dan stapelen observers zich op elke keer dat je heen en weer navigeert.
- `this.body.querySelector(...)` en niet `document.querySelector(...)`: zo zoek je enkel binnen je eigen pagina.
- De volgorde in `#toonKaarten` is bewust: eerst alle elementen aanhangen (elk element abonneert zich in `connectedCallback`), pas daarna `collectieProvider.getAll()` zodat ze allemaal in één keer hun knopsymbool zetten.
- `void` vóór een promise zegt: “ik weet dat dit asynchroon is en ik wacht bewust niet”. Het houdt de linter tevreden.

> **Vangnet uit de opgave**
>
> Krijg je de provider écht niet werkend, dan mag je een eigen `TradingCard[]` hardcoderen voor maximaal 3 van de 5 punten. Doe dat pas als laatste redmiddel — maar doe het wel, want zonder kaarten op het scherm kan je ook de vragen erna niet tonen.

## Stap 5 · Kaart toevoegen aan de collectie (4 punten)

Vier dingen moeten hier kloppen: het custom event, de LocalStorage-provider, het wisselen van + naar ✓, en de duplicaatcontrole op naam. Het event zelf schreef je al in stap 4; nu vang je het op.

Voeg in `kaarten.ts` een listener toe in de **constructor** en de afhandeling als privémethode:

*Frontend/src/pages/kaarten/kaarten.ts (aanvulling)*

```typescript
import type {CollectieItem} from '../../models/collectieItem.ts'

// Het type van wat er in het custom event zit.
type KaartToggleDetail = Pick<CollectieItem, 'kaartId' | 'naam' | 'waarde'>

export class KaartenPage extends Page {
  constructor() {
    super(html)

    // Event listeners in de CONSTRUCTOR, niet in render():
    // render() kan meerdere keren draaien, de constructor maar één keer.
    this.body.addEventListener('kaart-toggle', evt => {
      void this.#verwerkToggle((evt as CustomEvent<KaartToggleDetail>).detail)
    })
  }

  async #verwerkToggle(detail: KaartToggleDetail) {
    const collectie = await collectieProvider.getAll()

    // Zit deze kaart al in de collectie? Dan is de klik een "verwijderen".
    const bestaand = collectie.find(item => item.kaartId === detail.kaartId)
    if (bestaand) {
      await collectieProvider.delete(bestaand.id)
      return
    }

    // Een ándere kaart met dezelfde naam? Melden en niets doen.
    if (collectie.some(item => item.naam === detail.naam)) {
      alert(`Er zit al een kaart met de naam "${detail.naam}" in je collectie.`)
      return
    }

    await collectieProvider.create({
      kaartId: detail.kaartId,
      naam: detail.naam,
      waarde: detail.waarde,
    })
  }
}
```

### Waarom deze opbouw?

| Keuze                            | Reden                                                                                                                                                                                                                          |
|----------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Listener op `this.body`          | Het event heeft `bubbles: true` en borrelt dus omhoog van de knop, via het `<kaart-kaart>`-element, tot bij de div van de pagina. Eén listener volstaat voor twintig kaarten — dat heet *event delegation*.                    |
| Listener in de constructor       | `render()` kan opnieuw draaien; de constructor niet. Zet je hem in `render()`, dan wordt bij elke hertekening een extra listener toegevoegd en voegt één klik straks drie kaarten toe.                                         |
| `evt as CustomEvent<...>`        | De DOM-types kennen jouw eventnaam niet, dus geef je zelf aan wat er in `detail` zit. `Pick<CollectieItem, ...>` hergebruikt daarvoor de velden uit je bestaande model in plaats van ze over te typen.                         |
| Twee controles, in deze volgorde | Eerst op `kaartId` (is het déze kaart? dan verwijderen), pas daarna op `naam` (is het een ándere kaart met dezelfde naam? dan waarschuwen). Draai je dat om, dan krijg je een popup wanneer je je eigen kaart wil verwijderen. |
| Geen enkele DOM-code hier        | Je past de knop niet aan vanuit de pagina. De provider verwittigt zijn observers, en elk `kaart-kaart`-element zet zijn eigen symbool. Dat is het observer-patroon dat de opgave vraagt.                                       |

> **Het model verklaart de rest**
>
> `CollectieItem` heeft een eigen `id` én een `kaartId`. Het eigen `id` genereert de provider (daarom geef je het niet mee aan `create`); `kaartId` is de verwijzing naar de kaart op de server. Verwijderen doe je dus met het *collectie-id*, terugvinden met het *kaartId*. Dat onderscheid is precies waarom het model twee velden heeft.

## Stap 6 · De collectie tonen (4 punten)

Zelfde patroon als de kaartenpagina, maar met de LocalStorage-provider. Extra gevraagd: een template literal met naam en waarde op één regel, en de totale waarde.

*Frontend/src/components/collectieItem/collectieItem.ts*

```typescript
import {collectieProvider} from '../../data/data.ts'
import {CustomElement} from '../../router/customElement.ts'
import html from './collectieItem.html?raw'

export class CollectieItemElement extends CustomElement {
  constructor() {
    super(html)
  }

  get itemId(): string { return this.getAttribute('item-id') ?? '' }
  get naam(): string { return this.getAttribute('naam') ?? '' }
  get waarde(): number { return Number(this.getAttribute('waarde') ?? '0') }

  connectedCallback() {
    super.connectedCallback()

    // Template literal: naam en waarde in één regel.
    this.querySelector('#collectie-item-info')!.textContent =
      `${this.naam} — € ${this.waarde.toFixed(2)}`

    this.querySelector<HTMLButtonElement>('#delete-btn')!.addEventListener('click', () => {
      // Rechtstreeks de provider aanspreken; de observers doen de rest. (stap 7)
      void collectieProvider.delete(this.itemId)
    })
  }
}

customElements.define('collectie-item', CollectieItemElement)
```

*Frontend/src/pages/collectie/collectie.ts*

```typescript
import '../../components/collectieItem/collectieItem.ts'
import '../../components/navbar/navbar.ts'

import {collectieProvider} from '../../data/data.ts'
import type {CollectieItem} from '../../models/collectieItem.ts'
import {Page} from '../../router/page.ts'
import html from './collectie.html?raw'

export class CollectiePage extends Page {
  constructor() {
    super(html)
  }

  render() {
    super.render()

    this.unsubscribe.push(collectieProvider.addObserver(items => this.#toonCollectie(items)))
    void collectieProvider.getAll()
  }

  #toonCollectie(items: CollectieItem[]) {
    const lijst = this.body.querySelector('#collectie-lijst')!
    lijst.innerHTML = ''

    for (const item of items) {
      const element = document.createElement('collectie-item')
      element.setAttribute('item-id', item.id)
      element.setAttribute('naam', item.naam)
      element.setAttribute('waarde', String(item.waarde))
      lijst.appendChild(element)
    }

    this.body.querySelector('#aantal-kaarten')!.textContent = `${items.length} kaarten`

    const totaal = items.reduce((som, item) => som + item.waarde, 0)
    this.body.querySelector('#collectie-totaal')!.textContent = totaal.toFixed(2)
  }
}
```

`reduce` is de nette manier om een lijst tot één getal te herleiden: begin bij 0 en tel bij elk item zijn waarde op. Het euroteken staat al in de HTML, dus je zet er enkel het getal in. `toFixed(2)` maakt er twee decimalen van — let op: dat geeft een *string* terug, dus reken er nooit verder mee.

## Stap 7 · Kaart verwijderen uit de collectie (2 punten)

Deze staat er al in stap 6 — en dat is meteen de les. De opgave vraagt hier uitdrukkelijk **geen** custom event: het element handelt de delete zelf af.

```typescript
this.querySelector<HTMLButtonElement>('#delete-btn')!.addEventListener('click', () => {
  void collectieProvider.delete(this.itemId)
})
```

> **Waarom mag het hier zonder event, en bij de kaarten niet?**
>
> Omdat de **pagina** naar dezelfde provider luistert. Zodra `delete()` klaar is, roept de provider `notifyObservers` aan, tekent `#toonCollectie` de lijst opnieuw en verdwijnt het item — inclusief bijgewerkt aantal en totaal. Het element hoeft niets aan de pagina te vertellen.
>
> Bij de kaartenpagina lag dat anders: daar moest logica draaien die het element niet aangaat (duplicaatcontrole, toevoegen of verwijderen), en dus vroeg de opgave om een event. Beide patronen zijn geldig; het examen wil dat je kan uitleggen wanneer je welk gebruikt.

**Test het geheel:** voeg op de kaartenpagina een kaart toe (de knop wordt ✓), ga naar de collectie (de kaart staat er, met het juiste totaal), verwijder hem met de X (hij verdwijnt meteen), ga terug naar de kaarten (de knop staat weer op +). Werkt die volledige rondgang zonder één refresh, dan zit het observer-patroon goed.

## Valkuilen

Fouten die geen foutmelding geven zijn de duurste. Deze lijst is gerangschikt van meest naar minst voorkomend.

| Symptoom                                               | Oorzaak                                                                     | Oplossing                                                                                         |
|--------------------------------------------------------|-----------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------|
| Je custom element blijft leeg, geen fout in de console | Het bestand met `customElements.define` is nergens geïmporteerd             | Importeer het component-bestand bovenaan je pagina, ook al gebruik je de klasse niet rechtstreeks |
| `querySelector` geeft `null` in `connectedCallback`    | `super.connectedCallback()` vergeten of te laat                             | Zet die aanroep als eerste regel                                                                  |
| Attribuut komt niet aan                                | camelCase gebruikt (`kaartId`)                                              | Altijd kebab-case: `kaart-id`                                                                     |
| Optellen geeft `"1.52.5"`                              | Attribuutwaarden zijn strings; `+` plakt ze aan elkaar                      | `Number(...)` in je getter                                                                        |
| Lege pagina, CORS-fout in de console                   | De server draait niet, of niet op poort 3000                                | Terminal 1 nakijken; `http://localhost:3000/kaarten` openen                                       |
| Eén klik doet drie keer iets                           | Listener in `render()` in plaats van in de constructor                      | Verplaats hem naar de constructor                                                                 |
| Scherm ververst pas na F5                              | Data rechtstreeks aangepast in plaats van via de provider, of geen observer | Altijd via `create/update/delete` van de provider; abonneer met `addObserver`                     |
| Traagheid na veel heen-en-weer navigeren               | Observers niet afgemeld                                                     | `this.unsubscribe.push(...)` op pagina’s, `disconnectedCallback` op elementen                     |
| `/collectie` geeft 404 bij het herladen                | Je opende de URL rechtstreeks in plaats van via de navbar                   | Bij `pnpm dev` vangt Vite dit op; gebeurt het toch, navigeer dan via de links                     |
| Rare data die niet weggaat                             | Oude localStorage of vervuilde `kaarten.json`                               | Sleutel `collectie` wissen in DevTools; `backupKaarten.json` terugzetten                          |

## Puntenchecklist

Zestien punten, verdeeld over vijf vragen. Loop dit na voor je indient — en werk tijdens het examen van boven naar onder, want de latere vragen bouwen op de vorige.

- **Pagina’s & componenten** — routes `/` en `/collectie`, drie custom elements geregistreerd (`custom-navbar` verplicht zo genoemd), navbar-links werken — 1 pt
- **Kaarten inladen en tonen** — via `RestPersistenceProvider`, één `kaart-kaart`-element per kaart, alle properties ingevuld — 5 pt
- **Kaart toevoegen** — via custom event, opslag in `LocalStoragePersistenceProvider`, knop wisselt naar ✓, opnieuw klikken verwijdert, popup bij dezelfde naam — 4 pt
- **Collectie tonen** — via `LocalStoragePersistenceProvider`, `collectie-item`-elementen, template literal met naam en waarde, totale waarde — 4 pt
- **Kaart verwijderen** — X-knop, zonder custom event, via de provider — 2 pt

> **Wat er niet meetelt, en wat wel**
>
> **Niet:** de opmaak. Er staat letterlijk dat je enkel op functionaliteit beoordeeld wordt en dat afwijken van de screenshots geen probleem is.  
> **Wel:** dat alles *strongly typed* is en dat elke wijziging *meteen* zichtbaar is zonder refresh. Dat zijn twee eisen die door het hele examen lopen, niet per vraag.  
> **Ook:** verwijder alle `node_modules`-mappen voor je zipt, en lever één zip met de JavaScript- én TypeScript-oplossing samen in één map.

### Tijdsindeling die werkt

1.  **Eerst het skelet.** Installeren, starten, alle zeven bestanden aanmaken met enkel klasse + `super(html)` + `define`, router koppelen. Je ziet twee werkende pagina’s met een navbar. Punt 1 binnen.
2.  **Dan de kaarten op het scherm.** Zonder knop, zonder events. Twintig kaarten zichtbaar is het grootste deel van de punten.
3.  **Dan de collectie tonen**, met een handmatig item in localStorage om te testen als het toevoegen nog niet werkt.
4.  **Pas daarna events en randgevallen** (checkmark, duplicaat, verwijderen).

De reden voor die volgorde: bij de vragen van 5 en 4 punten staat expliciet dat je de maximumscore al haalt *zonder* dat de events afgewerkt zijn, zolang de properties kloppen. Zichtbare kaarten zijn dus meer waard dan een halve knop.

## Begrippenlijst

De termen die op dit examen terugkomen, in de betekenis die ze hier hebben.

Generic `<T>`  
Een typeparameter: een gat in het type dat pas bij gebruik ingevuld wordt. `PersistenceProvider<TradingCard>` maakt van alle `T`’s in de klasse een `TradingCard`.

Constraint `<T extends Persistable>`  
Een voorwaarde op die typeparameter. T mag alles zijn, zolang het een `id: string` heeft — daardoor mag de klasse `item.id` gebruiken.

Utility types  
`Omit<T,'id'>` = T zonder het veld id. `Pick<T,'a'|'b'>` = enkel die velden. `Partial<T>` = alle velden optioneel. `Record<string, X>` = een object met string-sleutels.

Abstracte klasse  
Een klasse waarvan je geen instantie kan maken; ze bestaat om van te erven. `Page`, `CustomElement` en `PersistenceProvider` zijn alle drie abstract.

Privéveld `#naam`  
Echt privé op runtime-niveau (JavaScript zelf), in tegenstelling tot `private` dat enkel tijdens het compileren bestaat.

Non-null assertion `!`  
“Ik weet zeker dat dit niet null is.” Handig na `querySelector` op een element waarvan je de HTML zelf schreef, maar het schakelt de controle uit — gebruik het alleen als je gelijk hebt.

Custom element  
Een zelfgedefinieerde HTML-tag, geregistreerd met `customElements.define('naam-met-streepje', Klasse)`.

`connectedCallback`  
De lifecycle-methode die draait zodra het element in de DOM hangt. Hier hoort al je opzetwerk.

Custom event  
Een eigen event met data erin: `new CustomEvent('naam', {bubbles: true, detail: {...}})`. Met `bubbles` borrelt het omhoog naar de pagina.

Observer-patroon  
Iets meldt zich aan om verwittigd te worden bij verandering. Hier: `addObserver(callback)` geeft een `Unsubscribe`-functie terug waarmee je je weer afmeldt.

SPA  
Single Page Application: één HTML-bestand waarvan de inhoud door JavaScript wordt vervangen. Navigeren herlaadt niets.

REST API  
Een server die data aanbiedt via HTTP-methodes op URL’s: GET om te lezen, POST om aan te maken, PUT om te wijzigen, DELETE om te verwijderen.

Middleware  
Een functie die elk binnenkomend verzoek in Express passeert vóór de routes. `cors()` en `bodyParser.json()` zijn middleware.

CORS  
De beveiliging die de browser verbiedt om data op te halen van een andere origin. Poort 5173 en poort 3000 zijn verschillende origins, vandaar `cors()` op de server.

Vite  
De dev-server en bundler van de frontend. Zorgt voor hot reload, TypeScript-omzetting en imports zoals `?raw`.

tsx  
Voert TypeScript-bestanden rechtstreeks uit in Node, zonder compilatiestap — en dus ook zonder typecontrole.

Biome  
Linter en formatter in één, vervangt ESLint + Prettier. Draait met `pnpm lint`.

------------------------------------------------------------------------

Gecontroleerd tegen de startbestanden van augustus 2026. De frontend-code hierboven compileert foutloos onder de meegeleverde `tsconfig.json` (strict, `noUnusedLocals`, `erasableSyntaxOnly`); de vijf servereindpunten zijn getest tegen `kaarten.json`.
