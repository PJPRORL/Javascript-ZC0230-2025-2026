# Oefenexamen JavaScript — Receptenboek & Weekmenu

Tijdens dit examen bouw je een applicatie waarmee je een **receptenboek** beheert (recepten bekijken,
toevoegen, beoordelen en verwijderen) en een persoonlijk **weekmenu** samenstelt dat je in het lokaal
geheugen bewaart.

**Je wordt niet beoordeeld op de opmaak (lay-out) van je code.
Je wordt enkel beoordeeld op de functionaliteit.**

Maak doorheen het volledige examen gebruik van **TypeScript**, zorg ervoor dat de volledige applicatie
**strongly typed** is. Elke wijziging moet **meteen zichtbaar** zijn na het drukken op de knop.

## De startbestanden

- De **frontend** map is het TypeScript-project waarin je code moet toevoegen.
- De **server** map bevat een API met één route (`http://localhost:3000/recipes`) die alle CRUD-operaties
  ondersteunt voor de recepten.
- De startbestanden bevatten verder de **`Recipe`**- en **`MenuItem`**-interfaces, de volledige HTML van de
  pagina's en de custom elements, en de framework-klassen (`CustomElement`, `Page`, `Router`, de
  `PersistenceProvider`s). **Aan de framework-klassen moet je niets aanpassen.**

> **TIP:** raak je vast door 'rommeldata', verwijder dan de localStorage-data van de localhost in je browser
> en vervang `server/src/data/recipes.json` door het origineel (`backupRecipes.json`). Recepten toevoegen,
> aanpassen of verwijderen past het json-bestand immers **permanent** aan.

## Starten

- Server (map `server`): `npm install` (of `pnpm install`) en `npm run dev` → API op `http://localhost:3000/recipes`.
- Frontend (map `frontend`): `npm install` en `npm run dev` → open de getoonde URL.

---

## Routing & componenten (1 punt)

De startbestanden bevatten twee pagina's (recepten en weekmenu) en drie custom elements (navbar, receptkaart,
weekmenu-item).

Zorg ervoor dat de pagina's bereikbaar zijn op `/` (recepten) en `/menu` (weekmenu). Registreer de custom
elements (de navbar verplicht als `custom-navbar`, de andere namen kies je zelf) en zorg dat de navbar-links werken.

---

## Recepten pagina

### Recepten inladen en renderen (4 punten)

Gebruik de API (`http://localhost:3000/recipes`) om alle recepten op te halen en weer te geven.
Bouw met de HTML uit `recipeCard/recipe.html` een custom element dat één recept toont (naam, keuken,
moeilijkheidsgraad, bereidingstijd in minuten en score).

Maak verplicht (en zoals aangeleerd in de cursus) gebruik van de **RestPersistenceProvider** om de recepten op te halen.

Om de maximumscore te behalen moeten de custom events nog niet afgewerkt zijn, de properties wel.

> **TIP:** Je kan enkel **strings** doorgeven als properties aan een custom element, en de namen moeten in
> **kebab-case** geschreven zijn.

### Recepten filteren & sorteren (3 punten)

Zorg ervoor dat de recepten gefilterd kunnen worden op **keuken** (dropdown) en op **naam** (tekstveld).
Ook een combinatie moet werken. Voor het maximum moet je op een **deel** van de naam kunnen zoeken en mag de
filter **niet hoofdlettergevoelig** zijn.

Zorg er bovendien voor dat de recepten **gesorteerd** kunnen worden via de sorteer-dropdown:
- Score (hoog → laag)
- Bereidingstijd (kort → lang)
- Naam (A → Z)

Het filteren én sorteren gebeurt pas wanneer er op de **knop** gedrukt wordt (niet bij elke toetsaanslag).
Filter en sortering moeten ook **samen** correct werken.

> **TIP:** zet het filteren en sorteren in een aparte functie om je code leesbaar te houden.

### Nieuw recept toevoegen via een formulier (3 punten)

Bovenaan de pagina staat een formulier met een naam, keuken, moeilijkheidsgraad en bereidingstijd.
Wanneer de gebruiker het formulier verzendt, moet er een **nieuw recept aangemaakt worden in de database**.

Maak verplicht (en zoals aangeleerd in de cursus) gebruik van de **RestPersistenceProvider** om het recept
aan te maken. Een nieuw recept start met een score van 0. Na het toevoegen wordt het formulier leeggemaakt en
verschijnt het nieuwe recept meteen in de lijst.

### Recept-beoordeling updaten (3 punten)

Elke receptkaart heeft een **-** en een **+** knop om de score aan te passen (telkens met 0,5; minimum 0,
maximum 5). Gebruik een **custom event** in de receptkaart om de gewenste verandering door te geven aan de pagina.

Maak verplicht (en zoals aangeleerd in de cursus) gebruik van de **RestPersistenceProvider** om de nieuwe score
**in de database** te bewaren. De aanpassing moet meteen zichtbaar zijn.

> **TIP:** een `CustomEvent` kan via `detail` extra informatie meegeven (bijvoorbeeld of de score moet stijgen
> of dalen). Zo kan je met één event-type werken.

### Recept verwijderen (2 punten)

Als er op het vuilbakje geklikt wordt, moet het recept (via de API) verwijderd worden uit de database, en moet
de UI bijgewerkt worden. Verplicht via de **RestPersistenceProvider**.

### Recept toevoegen aan het weekmenu (3 punten)

Gebruik een **custom event** in de receptkaart om een recept aan het weekmenu toe te voegen.
Maak verplicht gebruik van de **LocalStoragePersistenceProvider** om het weekmenu op te slaan (storagekey `menu`).
Een nieuw weekmenu-item start met 1 portie. Het label/symbool op de knop wijzigt naar een **checkmark** (&check;)
wanneer het recept al in het weekmenu zit; klikt de gebruiker nog eens, dan wordt het er terug uit gehaald.

---

## Weekmenu pagina

### Weekmenu renderen + porties aanpassen (4 punten)

Gebruik de **LocalStoragePersistenceProvider** om het weekmenu in te laden en weer te geven.
Toon elk recept met het custom element `menuItem`. Gebruik een **template literal** om de naam en de keuken op
één regel te tonen, bijvoorbeeld `Spaghetti Carbonara (Italian)`.

Elk weekmenu-item heeft een **-** en **+** knop om het **aantal porties** aan te passen (minimum 1). Werk hiervoor
het item bij in **localStorage** (gebruik de `update`-methode van de provider). 

Toon onderaan ook het **totaal aantal porties** en de **totale bereidingstijd** (de som van de minuten van alle
recepten in het weekmenu).

Een recept kan ook uit het weekmenu verwijderd worden via de X-knop (enkel uit localStorage, niet uit de database).

---

## Puntenverdeling (totaal 23 punten)

| Onderdeel | Punten |
|---|---|
| Routing & componenten | 1 |
| Recepten inladen en renderen | 4 |
| Recepten filteren & sorteren | 3 |
| Nieuw recept toevoegen via een formulier | 3 |
| Recept-beoordeling updaten | 3 |
| Recept verwijderen | 2 |
| Recept toevoegen aan het weekmenu | 3 |
| Weekmenu renderen + porties aanpassen | 4 |

> **Nieuw t.o.v. de vorige oefenexamens:** een record **aanmaken** in de database via een formulier (POST),
> een record **updaten** in de database (PUT) via een custom event met `detail`, **sorteren** bovenop filteren,
> en een veld (porties) van een **localStorage**-item **updaten**.
