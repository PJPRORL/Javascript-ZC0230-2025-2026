# Uitleg oplossing — Oefenexamen Filmcatalogus & Kijklijst

Dit document legt stap voor stap uit hoe dit (verzonnen) oefenexamen is opgelost. Per vraag van de opgave staat
**wat** er moest gebeuren, **welke bestanden** aangepast/aangemaakt zijn en **hoe** de code werkt.

> Dit examen volgt exact hetzelfde patroon als de echte oefenexamens (Quiz builder en Webshop). Je kan het dus
> oplossen door [HANDLEIDING_EXAMEN.md](../HANDLEIDING_EXAMEN.md) stap voor stap te volgen.

## Wat bouwen we?

Een filmapp met twee pagina's:
- **Catalogus (`/`)** — toont alle films uit de database, met filters (titel + genre), een vuilbak-knop om een
  film uit de database te verwijderen en een knop om een film aan de kijklijst toe te voegen.
- **Kijklijst (`/watchlist`)** — toont de films in de kijklijst (lokaal opgeslagen), het aantal films en een knop
  om een film uit de kijklijst te verwijderen.

## Plaatshouders (link met de handleiding)

| Handleiding | Hier |
|---|---|
| `Item` | `Movie` |
| `custom-item` | `custom-movie` |
| `ItemCard` / `ItemsPage` | `MovieCard` / `MoviesPage` |
| `itemRestProvider` / `API_URL` | `movieRestProvider` / `http://localhost:3000/movies` |
| `collectionLocalProvider` / `STORAGE_KEY` | `watchlistLocalProvider` / `'watchlist'` |
| tweede pagina + collectie-item | `WatchlistPage` + `custom-watchlist-item` |

## Datamodellen (strongly typed)
- `models/movie.ts` → `Movie { id, title, genre, year, rating, director }`
- `models/watchlistItem.ts` → `WatchlistItem { id, movie: Movie }` (een kijklijst-regel verwijst naar een volledige film)

---

## Stap 1 — Routing & componenten (1 punt)

**Aangemaakt/aangepast:** `main.ts`, `components/navbar/navbar.ts`.

In `main.ts` registreren we de drie custom elements en koppelen we de routes:
```ts
window.customElements.define('custom-navbar', CustomNavbar)
window.customElements.define('custom-movie', MovieCard)
window.customElements.define('custom-watchlist-item', WatchlistItemCard)
new Router({ '/': MoviesPage, '/watchlist': WatchlistPage })
```
`navbar.ts` toont enkel de HTML; de links werken via `data-link` (al aanwezig in `navbar.html`).

---

## Stap 2 — Films inladen en renderen (5 punten)

**Aangemaakt/aangepast:** `data/data.ts`, `components/movieCard/movie.ts`, `pages/movies/movies.ts`.

1. Provider in `data.ts`:
   ```ts
   export const movieRestProvider = new RestPersistenceProvider<Movie>('http://localhost:3000/movies')
   ```
2. In `movies.ts`: observer + `getAll()` (de vaste drievuldigheid observer → getAll → render):
   ```ts
   this.unsubscribe.push(movieRestProvider.addObserver(movies => { this.#movies = movies; this.render() }))
   void movieRestProvider.getAll()
   ```
3. In `render()` per film een `custom-movie` met de gegevens als **attributen** (strings, kebab-case). Getallen
   worden omgezet met `.toString()`. Vergeet `id` niet (nodig om te verwijderen).
4. In `movie.ts` zet `attributeChangedCallback` elke waarde op de juiste plek; de score wordt netjes getoond met
   `Number(newValue).toFixed(1) + ' / 10'`.

---

## Stap 3 — Films filteren (2 punten)

**Aangepast:** `pages/movies/movies.ts`.

- Filteren gebeurt op de **knop** → `evt.preventDefault()` (anders herlaadt het `<form>`) + `render()`.
- Hulpfunctie `#movieMatchesFilter`:
  ```ts
  const titleMatches = movie.title.toLowerCase().includes(this.#titleFilter.value.toLowerCase())
  const genreMatches = this.#genreFilter.value === 'all' || movie.genre === this.#genreFilter.value
  return titleMatches && genreMatches
  ```
  `includes` = zoeken op een deel; `toLowerCase` = niet hoofdlettergevoelig; `'all'` = genre negeren. Door `&&`
  werken beide filters samen.

---

## Stap 4 — Films verwijderen (2 punten)

**Aangepast:** `components/movieCard/movie.ts`.

```ts
this.#deleteBtn.addEventListener('click', () => movieRestProvider.delete(this.id))
```
`delete()` doet een DELETE-request en verwittigt de observers → de catalogus herrendert en de film verdwijnt.
Daarom moet de pagina in stap 2 het `id` als attribuut meegeven.

---

## Stap 5 — Films toevoegen aan de kijklijst (3 punten)

**Aangepast:** `data/data.ts`, `components/movieCard/movie.ts`, `pages/movies/movies.ts`.

1. Provider in `data.ts`: `new LocalStoragePersistenceProvider<WatchlistItem>('watchlist')`.
2. In `movie.ts` vuurt de knop een **custom event** af:
   ```ts
   this.#watchlistBtn.addEventListener('click', () => this.dispatchEvent(new CustomEvent('toggleWatchlist')))
   ```
   Het `in-watchlist`-attribuut bepaalt het label/symbool (`&check; In kijklijst` of `+ Kijklijst`).
3. In `movies.ts` voegen we ook een observer + `getAll()` op de kijklijst toe, en luisteren we op het event:
   ```ts
   const watchlistItem = this.#watchlist.find(item => item.movie.id === movie.id)
   movieCard.setAttribute('in-watchlist', watchlistItem ? 'true' : 'false')
   movieCard.addEventListener('toggleWatchlist', async () => {
     watchlistItem
       ? await watchlistLocalProvider.delete(watchlistItem.id)
       : await watchlistLocalProvider.create({ movie, id: crypto.randomUUID() })
   })
   ```

---

## Stap 6 — Kijklijst inladen en renderen (4 punten)

**Aangemaakt/aangepast:** `components/watchlistItem/watchlistItem.ts`, `pages/watchlist/watchlist.ts`.

In `watchlist.ts`: observer + `getAll()` op de kijklijst. In `render()` per item een `custom-watchlist-item` met
een **template literal** als titel, plus de teller:
```ts
element.setAttribute('title', `${item.movie.title} (${item.movie.year})`)
element.setAttribute('id', item.id)
// ...
this.#countLabel.innerText = this.#watchlist.length.toString()
```
In `watchlistItem.ts` toont `attributeChangedCallback` de `title`.

---

## Stap 7 — Films verwijderen uit de kijklijst (3 punten)

**Aangepast:** `components/watchlistItem/watchlistItem.ts`.

Voor de max-score **geen** custom event, maar rechtstreeks de provider:
```ts
this.#deleteBtn.addEventListener('click', () => {
  void watchlistLocalProvider.delete(this.id)
})
```
`delete()` haalt het item uit localStorage en verwittigt de observer → de kijklijst-pagina herrendert. De film
blijft in de database (catalogus) staan.

> **Onthoud het verschil:** toevoegen aan de kijklijst (stap 5) gebruikt **wel** een custom event (de pagina
> beslist), verwijderen uit de kijklijst (stap 7) **niet** (het component spreekt de provider rechtstreeks aan).
> Dat is exact wat de opgave per onderdeel vraagt.

---

## Overzicht: welk bestand hoort bij welke vraag?

| Bestand | Vraag/vragen |
|---|---|
| `main.ts` | Routing & componenten |
| `components/navbar/navbar.ts` | Routing & componenten |
| `data/data.ts` | Renderen/verwijderen (REST) + kijklijst (localStorage) |
| `components/movieCard/movie.ts` | Renderen, Verwijderen, Toevoegen aan kijklijst |
| `pages/movies/movies.ts` | Renderen, Filteren, Toevoegen aan kijklijst |
| `components/watchlistItem/watchlistItem.ts` | Kijklijst renderen + Verwijderen uit kijklijst |
| `pages/watchlist/watchlist.ts` | Kijklijst inladen en renderen |

## Hoe testen?
1. Start de **server** (`server`): `npm install` + `npm run dev` → API op `http://localhost:3000/movies`.
2. Start de **frontend** (`frontend`): `npm install` + `npm run dev`.
3. Op `/` verschijnen de films. Test filters, verwijderen en toevoegen aan de kijklijst (knop → ✓).
4. Op `/watchlist` zie je de kijklijst + teller; test de X-knop om een film te verwijderen.
5. Rommeldata? Wis de localStorage van localhost en herstel `server/src/data/movies.json` met `backupMovies.json`.
