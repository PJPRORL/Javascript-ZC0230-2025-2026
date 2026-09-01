# Startsjabloon — Vite + TypeScript + Express

Het skelet van het Ruilkaartenbibliotheek-project, zonder de ruilkaarten. Dezelfde vier
bouwstenen, één voorbeeldmodel (`Item`), twee pagina's en één component. Bedoeld om te
kopiëren als startpunt voor een nieuw project.

De bestanden in `router/`, `data/` (behalve `data.ts`) en `Server/src/persistence/` zijn
**letterlijk identiek** aan die uit je examenproject. Wat je daar leert geldt hier, en omgekeerd.

## Starten

```bash
cd Server    && pnpm install && pnpm dev    # http://localhost:3000
cd Frontend  && pnpm install && pnpm dev    # http://localhost:5173
```

Twee terminals, allebei open laten. De frontend praat via `fetch` met de server; die twee
projecten delen geen code, enkel JSON over HTTP.

Wat je te zien krijgt: een overzichtspagina die items ophaalt, toevoegt en verwijdert, en een
infopagina die niets ophaalt — om te tonen dat dat ook mag.

## Wat is wat

```
Server/src/
  server.ts                 Express-opzet: cors, bodyParser, routers koppelen
  models/item.ts            ← vervang door jouw model
  routes/items.ts           ← één bestand per resource (CRUD)
  persistence/filePersister.ts   generieke JSON-opslag        (ongewijzigd overnemen)
  data/items.json           ← je "database"
  data/backupItems.json     reservekopie om terug te zetten

Frontend/src/
  main.ts                   ← routetabel: pad → paginaklasse
  models/item.ts            ← zelfde interface als op de server
  data/data.ts              ← hier maak je je providers aan, nergens anders
  data/*PersistenceProvider.ts   REST / localStorage / memory  (ongewijzigd overnemen)
  router/{router,page,customElement}.ts                       (ongewijzigd overnemen)
  components/<naam>/<naam>.html + .ts    ← herbruikbare custom elements
  pages/<naam>/<naam>.html + .ts         ← één map per pagina
```

## Een nieuw project beginnen

1. Kopieer deze map en hernoem ze.
2. Vervang `Item` door je eigen model — in `Server/src/models/` én `Frontend/src/models/`.
   Twee keer hetzelfde bestand, want het zijn losse projecten. Wijken ze uit elkaar, dan
   krijg je runtime-verrassingen die de compiler niet ziet.
3. Hernoem `Server/src/routes/items.ts` en pas de regel `server.use('/items', ...)` aan.
4. Vul `Server/src/data/<jouw>.json` met je eigen gegevens (een array, elk object met een `id`).
5. Pas `Frontend/src/data/data.ts` aan: de juiste URL en het juiste type.
6. Hernoem de pagina's en componenten, en werk `main.ts` en `navbar.html` bij.

De namen in `package.json` van beide projecten mag je ook aanpassen; verder werkt alles.

## Iets toevoegen

**Een pagina** — maak `pages/<naam>/<naam>.html` en `<naam>.ts` met een klasse die `Page`
uitbreidt, voeg een regel toe aan de routetabel in `main.ts`, en een
`<a href="/<pad>" data-link="/<pad>">` in `navbar.html`. De router pikt elk element met
`data-link` automatisch op.

**Een component** — maak `components/<naam>/<naam>.html` en `<naam>.ts` met een klasse die
`CustomElement` uitbreidt, en eindig het bestand met `customElements.define('naam-met-streepje', Klasse)`.
Importeer dat bestand in elke pagina die het gebruikt: die import ís de registratie.

**Een tweede resource op de server** — kopieer `routes/items.ts`, pas model en bestandsnaam
aan, en voeg één `server.use('/<naam>', <naam>Router)` toe. Meer is er niet.

## Zonder server werken

Voor een site die vooral iets uitlegt heb je de backend niet nodig. Verwijder dan de map
`Server/` en vervang in `data.ts` de `RestPersistenceProvider` door een
`LocalStoragePersistenceProvider` (blijft bewaard in de browser) of een
`MemoryPersistenceProvider` (weg bij refresh) — of laat `data.ts` helemaal weg als je
nergens data bijhoudt. De pagina's en componenten merken het verschil niet: dat is precies
waar de abstracte `PersistenceProvider` voor dient.

## Grenzen van dit sjabloon

`FilePersistenceProvider` leest en herschrijft bij élke wijziging het volledige JSON-bestand.
Dat is prima voor een schoolproject of iets dat lokaal draait, maar het is geen database:
geen gelijktijdige schrijvers, geen indexen, geen login, geen validatie van wat binnenkomt.

Wil je later iets dat écht online staat, dan vervang je die ene klasse door een echte
databaselaag. De routes en de hele frontend blijven ongewijzigd — dat is de reden waarom de
opslag achter een aparte klasse zit in plaats van rechtstreeks in de routes.

## Regels die geen foutmelding geven

- De naam van een custom element **moet** een streepje bevatten.
- Attributen zijn altijd strings en altijd kebab-case (`item-id`, niet `itemId`).
  Zet getallen om met `Number(...)`.
- `super.connectedCallback()` als eerste regel, anders vindt `querySelector` niets.
- Event listeners in de **constructor** van een pagina, niet in `render()` — die kan opnieuw draaien.
- Abonneer met `addObserver` vóór je `getAll()` aanroept, en duw de unsubscribe in
  `this.unsubscribe`, anders stapelen observers zich op bij elke navigatie.
