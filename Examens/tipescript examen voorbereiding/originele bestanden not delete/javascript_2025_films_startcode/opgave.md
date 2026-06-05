# Oefenexamen JavaScript — Filmcatalogus & Kijklijst

Tijdens dit examen bouw je een applicatie waarmee je een **filmcatalogus** kan raadplegen en een persoonlijke
**kijklijst** kan samenstellen die je in het lokaal geheugen bewaart.

**Je wordt niet beoordeeld op de opmaak (lay-out) van je code.
Als deze niet 100% overeenkomt met de beschrijving is dit dus geen probleem.
Je wordt enkel beoordeeld op de functionaliteit.**

Maak doorheen het volledige examen gebruik van **TypeScript**, zorg ervoor dat de volledige applicatie
**strongly typed** is.

Doorheen het volledige examen is het de bedoeling dat **elke wijziging meteen zichtbaar is** na het drukken op de knop.

## De startbestanden

De startbestanden bevatten twee folders:
- De **frontend** map is het JavaScript/TypeScript project waarin je code moet toevoegen.
- De **server** map bevat een API die één route bevat (`http://localhost:3000/movies`) die alle
  CRUD-operaties ondersteunt voor de films.

Verder bevatten de startbestanden:
- De **`Movie`**- en **`WatchlistItem`**-interfaces die de data in de applicatie beschrijven.
- De volledige HTML van de pagina's en de custom elements (in de `.html`-bestanden).
- De framework-klassen (`CustomElement`, `Page`, `Router`, de verschillende `PersistenceProvider`s).
  **Aan deze klassen moet je niets aanpassen, je moet ze enkel gebruiken.**

> **TIP:** raak je op een bepaald moment vast door 'rommeldata', verwijder dan eerst de localStorage-data
> van de localhost in je browser, en vervang de inhoud van `server/src/data/movies.json` door het origineel
> (`backupMovies.json`). Films verwijderen past het json-bestand immers permanent aan.

> **TIP:** voorzie voor elk component en elke pagina al een TypeScript-bestand met de juiste functie/klasse die
> voorlopig enkel de HTML toont. Zo kan je alles correct oproepen en je werk testen, en werk je de inhoud later af.

## De server starten

In de map `server`: `npm install` (of `pnpm install`) en daarna `npm run dev`.
De API draait dan op `http://localhost:3000/movies`.

## De frontend starten

In de map `frontend`: `npm install` en daarna `npm run dev`. Open de getoonde URL in je browser.

---

## Routing & componenten (1 punt)

De startbestanden bevatten twee pagina's (catalogus en kijklijst) en drie custom elements (navbar, filmkaart,
kijklijst-item).

Zorg ervoor dat de pagina's bereikbaar zijn op `/` en `/watchlist`. Je toont de **catalogus** op de root en de
**kijklijst** op `/watchlist`.

Zorg er verder voor dat de custom elements geregistreerd worden. Voor de navbar gebruik je verplicht de naam
`custom-navbar`; voor de andere elementen mag je zelf een naam kiezen. Zorg ervoor dat de links in de navbar
correct werken.

_Catalogus (home) pagina:_ een navigatiebalk bovenaan, een titel "Filmcatalogus", een filterbalk en daaronder
een raster waarin de films komen.

_Kijklijst pagina:_ een navigatiebalk, een titel "Mijn kijklijst", een lijst met films en een teller met het
aantal films.

---

## Catalogus pagina

### Films inladen en renderen (5 punten)

Gebruik de API (`http://localhost:3000/movies`) om alle films op te halen en weer te geven op de catalogus pagina.
Gebruik de HTML-code die je in de startbestanden vindt (`movieCard/movie.html`) om een custom element te bouwen
dat de informatie over één film weergeeft (titel, genre, jaar, score en regisseur).

Maak verplicht (en zoals aangeleerd in de cursus) gebruik van de **RestPersistenceProvider** om de films op te halen.

Maak voor elke film een nieuwe instantie van het custom element en voeg deze toe op de correcte plaats.

Om de maximumscore op deze vraag te behalen moeten de custom events nog niet afgewerkt zijn, de properties wel.

> **TIP:** Je kan enkel **strings** doorgeven als properties aan een custom element, en de properties ervan
> moeten in **kebab-case** (kleine letters en liggend streepje) geschreven zijn en niet in camelCase.

### Films filteren (2 punten)

Zorg ervoor dat de films gefilterd kunnen worden op basis van het **genre** (dropdown) en de **titel** (tekstveld).
Ook een combinatie moet correct werken.

Om het maximum te halen op deze vraag moet je ook op een **deel** van de titel kunnen zoeken, en mag de filter
**niet hoofdlettergevoelig** zijn. De data moet pas gefilterd worden als je op de **knop** drukt, je moet dus
niet filteren bij elke toetsaanslag.

> **TIP:** zet de filter in een aparte functie om je code beter leesbaar te houden.

### Films verwijderen (2 punten)

Als er op het vuilbakje geklikt wordt, moet de film (via de API) verwijderd worden uit de database. Natuurlijk
moet deze aanpassing ook zichtbaar zijn in de UI.

Maak verplicht (en zoals aangeleerd in de cursus) gebruik van de **RestPersistenceProvider** om de films te verwijderen.

### Films toevoegen aan de kijklijst (3 punten)

Gebruik een **custom event** in de filmkaart om een film toe te voegen aan de kijklijst.
Maak verplicht (en zoals aangeleerd in de cursus) gebruik van de **LocalStoragePersistenceProvider** om de
kijklijst op te slaan (storagekey `watchlist`).

Zorg ervoor dat het symbool/label op de knop wijzigt naar een **checkmark** (&check;) wanneer de film al in de
kijklijst zit, zodat de gebruiker ziet welke films al toegevoegd zijn. Klikt de gebruiker nog eens op de knop van
een film die al in de kijklijst zit, dan wordt die er terug uit gehaald.

---

## Kijklijst pagina

### Kijklijst inladen en renderen (4 punten)

Maak verplicht (en zoals aangeleerd in de cursus) gebruik van de **LocalStoragePersistenceProvider** om de
kijklijst in te laden en weer te geven op de kijklijst pagina.

Gebruik het custom element `watchlistItem` om de informatie over één film in de kijklijst weer te geven.
Gebruik een **template literal** om de titel en het jaar van de film in 1 regel weer te geven, bijvoorbeeld
`Inception (2010)`.

Toon ook het **totaal aantal films** in de kijklijst.

Om de maximumscore op deze vraag te behalen moet de event nog niet afgewerkt zijn, de properties wel.

### Films verwijderen uit de kijklijst (3 punten)

Maak verplicht (en zoals aangeleerd in de cursus) gebruik van de **LocalStoragePersistenceProvider** om films
te verwijderen uit de kijklijst.

Dit keer mag je **geen** custom event gebruiken als je de maximumscore wil behalen, maar spreek je rechtstreeks
de correcte persistentie provider aan. Het verwijderen gebeurt enkel in **localStorage**, de film blijft dus in
de database (catalogus) staan.

---

## Puntenverdeling (totaal 20 punten)

| Onderdeel | Punten |
|---|---|
| Routing & componenten | 1 |
| Films inladen en renderen | 5 |
| Films filteren | 2 |
| Films verwijderen | 2 |
| Films toevoegen aan de kijklijst | 3 |
| Kijklijst inladen en renderen | 4 |
| Films verwijderen uit de kijklijst | 3 |
