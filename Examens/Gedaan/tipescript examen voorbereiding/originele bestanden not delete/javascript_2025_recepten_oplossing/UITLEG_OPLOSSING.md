# Uitleg oplossing — Oefenexamen Receptenboek & Weekmenu

Dit (verzonnen) oefenexamen varieert méér dan de vorige drie en introduceert nieuwe mechanismen. Per vraag
staat **wat** er moest gebeuren, **welke bestanden** aangepast/aangemaakt zijn en **hoe** de code werkt.

> Het basispatroon (observer → `getAll()` → `render()`, attributen als strings, custom events) is hetzelfde als
> in [HANDLEIDING_EXAMEN.md](../HANDLEIDING_EXAMEN.md). De **nieuwe** stukken staan hieronder duidelijk gemarkeerd.

## Wat is nieuw t.o.v. de vorige examens?

| Nieuw mechanisme | Waar | Kern |
|---|---|---|
| **Record aanmaken in de DB via formulier (POST)** | `recipes.ts` | `recipeRestProvider.create({...})` op `submit` |
| **Record updaten in de DB (PUT)** | `recipes.ts` + `recipe.ts` | `recipeRestProvider.update(id, {...recipe, rating})` |
| **Custom event met `detail`** | `recipe.ts`, `menuItem.ts` | `new CustomEvent('x', {detail: {delta}})` |
| **Sorteren** bovenop filteren | `recipes.ts` | `[...arr].sort((a,b) => ...)` |
| **Veld van een localStorage-item updaten** | `menu.ts` + `menuItem.ts` | `menuLocalProvider.update(id, {...item, servings})` |

## Datamodellen
- `models/recipe.ts` → `Recipe { id, name, cuisine, difficulty, minutes, rating }`
- `models/menuItem.ts` → `MenuItem { id, recipe: Recipe, servings: number }`

---

## Stap 1 — Routing & componenten (1 punt)
`main.ts` registreert `custom-navbar`, `custom-recipe`, `custom-menu-item` en zet de routes `'/'` (recepten) en
`'/menu'` (weekmenu). `navbar.ts` toont enkel de HTML; links werken via `data-link`.

## Stap 2 — Recepten inladen en renderen (4 punten)
Standaardpatroon: provider in `data.ts`, observer + `getAll()` in `recipes.ts`, en in `render()` per recept een
`custom-recipe` met de gegevens als attributen (strings, kebab-case, `id` meegeven). In `recipe.ts` zet
`attributeChangedCallback` alles op de juiste plek; de score toont als `Number(newValue).toFixed(1) + ' / 5'`.

## Stap 3 — Recepten filteren & sorteren (3 punten) 🆕 sorteren
Filteren en sorteren gebeuren op de knop (`evt.preventDefault()` + `render()`), in één hulpfunctie:
```ts
#filterAndSort(): Recipe[] {
  const filtered = this.#recipes.filter(r =>
    r.name.toLowerCase().includes(this.#nameFilter.value.toLowerCase()) &&
    (this.#cuisineFilter.value === 'all' || r.cuisine === this.#cuisineFilter.value))

  switch (this.#sortSelect.value) {
    case 'rating-desc':  return [...filtered].sort((a, b) => b.rating - a.rating)
    case 'minutes-asc':  return [...filtered].sort((a, b) => a.minutes - b.minutes)
    case 'name-asc':     return [...filtered].sort((a, b) => a.name.localeCompare(b.name))
    default:             return filtered
  }
}
```
> **Let op:** sorteer een **kopie** (`[...filtered]`), want `sort()` wijzigt de array zelf — anders verander je
> ongewild je originele `#recipes`. Voor getallen gebruik je `a - b`, voor tekst `localeCompare`.

## Stap 4 — Nieuw recept toevoegen via een formulier (3 punten) 🆕 create in DB
Op de `submit` van het formulier bouwen we een strongly typed object (zonder `id`, dat geeft de server) en maken
we het recept aan via de REST-provider:
```ts
this.#addForm.addEventListener('submit', async evt => {
  evt.preventDefault()
  const newRecipe: Omit<Recipe, 'id'> = {
    name: this.#newName.value,
    cuisine: this.#newCuisine.value,
    difficulty: this.#newDifficulty.value as Recipe['difficulty'],
    minutes: Number(this.#newMinutes.value),
    rating: 0,
  }
  await recipeRestProvider.create(newRecipe)   // POST -> verwittigt observer -> lijst herrendert
  this.#addForm.reset()                         // formulier leegmaken
})
```
> `evt.preventDefault()` is hier essentieel: anders herlaadt het formulier de pagina. `as Recipe['difficulty']`
> houdt de waarde strongly typed (`'easy' | 'medium' | 'hard'`).

## Stap 5 — Recept-beoordeling updaten (3 punten) 🆕 update in DB + event met detail
In `recipe.ts` sturen de +/- knoppen één event-type, met de richting in `detail`:
```ts
this.#ratingUp.addEventListener('click',
  () => this.dispatchEvent(new CustomEvent('changeRating', {detail: {delta: 0.5}})))
this.#ratingDown.addEventListener('click',
  () => this.dispatchEvent(new CustomEvent('changeRating', {detail: {delta: -0.5}})))
```
In `recipes.ts` lezen we `detail.delta`, begrenzen we de nieuwe score en bewaren ze in de DB:
```ts
card.addEventListener('changeRating', async evt => {
  const delta = (evt as CustomEvent<{delta: number}>).detail.delta
  const newRating = Math.min(5, Math.max(0, recipe.rating + delta))
  await recipeRestProvider.update(recipe.id, {...recipe, rating: newRating})   // PUT
})
```
> De cast `evt as CustomEvent<{delta: number}>` is nodig omdat een gewone listener een `Event` krijgt; zo kan
> je strongly typed aan `detail` komen.

## Stap 6 — Recept verwijderen (2 punten)
In `recipe.ts`: `this.#deleteBtn.addEventListener('click', () => recipeRestProvider.delete(this.id))`.

## Stap 7 — Recept toevoegen aan het weekmenu (3 punten)
Standaard "toggle"-patroon met custom event + localStorage. In `recipes.ts`:
```ts
const menuItem = this.#menu.find(m => m.recipe.id === recipe.id)
card.setAttribute('in-menu', menuItem ? 'true' : 'false')
card.addEventListener('toggleMenu', async () => {
  menuItem
    ? await menuLocalProvider.delete(menuItem.id)
    : await menuLocalProvider.create({recipe, servings: 1, id: crypto.randomUUID()})
})
```
(Vergeet niet ook een observer + `getAll()` op `menuLocalProvider` te zetten zodat de knopstaat klopt.)

## Stap 8 — Weekmenu renderen + porties aanpassen (4 punten) 🆕 update in localStorage
In `menu.ts` per item een `custom-menu-item` met template literal + servings. De +/- knoppen (in `menuItem.ts`)
sturen `changeServings` met `detail.delta`; de pagina werkt het item bij in localStorage:
```ts
element.addEventListener('changeServings', async evt => {
  const delta = (evt as CustomEvent<{delta: number}>).detail.delta
  const newServings = Math.max(1, item.servings + delta)
  await menuLocalProvider.update(item.id, {...item, servings: newServings})   // update in localStorage
})
```
Totalen met `reduce`:
```ts
const totalServings = this.#menu.reduce((sum, item) => sum + item.servings, 0)
const totalMinutes  = this.#menu.reduce((sum, item) => sum + item.recipe.minutes, 0)
```
Verwijderen uit het weekmenu zit in `menuItem.ts` (rechtstreeks `menuLocalProvider.delete(this.id)`, geen event).

---

## Overzicht: welk bestand hoort bij welke vraag?

| Bestand | Vraag/vragen |
|---|---|
| `main.ts` | Routing & componenten |
| `components/navbar/navbar.ts` | Routing & componenten |
| `data/data.ts` | Alle vragen (providers) |
| `components/recipeCard/recipe.ts` | Renderen, Beoordeling updaten, Verwijderen, Toevoegen aan weekmenu |
| `pages/recipes/recipes.ts` | Renderen, Filteren & sorteren, Toevoegen via formulier, Beoordeling updaten, Toevoegen aan weekmenu |
| `components/menuItem/menuItem.ts` | Weekmenu renderen, Porties aanpassen, Verwijderen uit weekmenu |
| `pages/menu/menu.ts` | Weekmenu renderen + porties aanpassen + totalen |

## Hoe testen?
1. Server (`server`): `npm install` + `npm run dev` → API op `http://localhost:3000/recipes`.
2. Frontend (`frontend`): `npm install` + `npm run dev`.
3. Test op `/`: recepten verschijnen, filter+sorteer, voeg een recept toe via het formulier, pas de score aan
   met +/-, verwijder een recept, voeg toe aan het weekmenu (knop → ✓).
4. Test op `/menu`: het weekmenu verschijnt, pas porties aan met +/-, controleer de totalen, verwijder een item.
5. Rommeldata? Wis localStorage en herstel `recipes.json` met `backupRecipes.json`.
