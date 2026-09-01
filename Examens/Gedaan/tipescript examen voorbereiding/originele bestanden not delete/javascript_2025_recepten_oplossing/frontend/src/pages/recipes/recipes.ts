// ============================================================================
// recipes.ts = de logica achter de recepten(home)pagina.
// Het bundelt verschillende vragen:
//   - "Recepten renderen (4 punten)": recepten ophalen via de API en tonen.
//   - "Recepten filteren & sorteren (3 punten)": filteren op keuken + naam, en sorteren.
//   - "Nieuw recept toevoegen via formulier (3 punten)": een recept AANMAKEN in de database (POST).
//   - "Recept-beoordeling updaten (3 punten)": de score van een recept aanpassen (PUT) via custom event.
//   - "Recept toevoegen aan weekmenu (3 punten)": via custom event toevoegen/verwijderen + localStorage.
//   - (Verwijderen uit de database zit in het recept-component zelf, zie recipe.ts.)
// ============================================================================

import {Page} from '../../router/page.ts'
import HTML from './recipes.html?raw'
import {recipeRestProvider, menuLocalProvider} from '../../data/data.ts'
import {Recipe} from '../../models/recipe.ts'
import {MenuItem} from '../../models/menuItem.ts'

export class RecipesPage extends Page {

  // Container + filter/sorteer-elementen.
  #recipeContainer = this.body.querySelector<HTMLDivElement>('#recipes')!
  #nameFilter = this.body.querySelector<HTMLInputElement>('#name-filter')!
  #cuisineFilter = this.body.querySelector<HTMLSelectElement>('#cuisine-filter')!
  #sortSelect = this.body.querySelector<HTMLSelectElement>('#sort-select')!
  #filterBtn = this.body.querySelector<HTMLButtonElement>('#filter-btn')!

  // Elementen van het "nieuw recept"-formulier.
  #addForm = this.body.querySelector<HTMLFormElement>('#add-form')!
  #newName = this.body.querySelector<HTMLInputElement>('#new-name')!
  #newCuisine = this.body.querySelector<HTMLSelectElement>('#new-cuisine')!
  #newDifficulty = this.body.querySelector<HTMLSelectElement>('#new-difficulty')!
  #newMinutes = this.body.querySelector<HTMLInputElement>('#new-minutes')!

  #recipes: Recipe[] = []
  #menu: MenuItem[] = []

  constructor() {
    super(HTML)

    // --- VRAAG "Recept toevoegen aan weekmenu" ---
    // Observer + ophalen van het weekmenu (zodat de knopstaat 'in-menu' klopt).
    this.unsubscribe.push(menuLocalProvider.addObserver(menu => {
      this.#menu = menu
      this.render()
    }))
    void menuLocalProvider.getAll()

    // --- VRAAG "Recepten renderen (4 punten)" ---
    // Observer + ophalen van de recepten via de API.
    this.unsubscribe.push(recipeRestProvider.addObserver(recipes => {
      this.#recipes = recipes
      this.render()
    }))
    void recipeRestProvider.getAll()

    // --- VRAAG "Recepten filteren & sorteren (3 punten)" ---
    // Pas filteren/sorteren bij een klik op de knop (niet bij elke toetsaanslag).
    this.#filterBtn.addEventListener('click', evt => {
      evt.preventDefault()
      this.render()
    })

    // --- VRAAG "Nieuw recept toevoegen via formulier (3 punten)" ---
    // Bij submit van het formulier maken we een NIEUW recept aan in de database via de
    // RestPersistenceProvider (create -> POST). preventDefault voorkomt dat de pagina herlaadt.
    this.#addForm.addEventListener('submit', async evt => {
      evt.preventDefault()

      // Strongly typed object opbouwen uit de formulierwaarden.
      // (Het id wordt door de server toegekend, dus we sturen het niet mee: Omit<Recipe, 'id'>.)
      const newRecipe: Omit<Recipe, 'id'> = {
        name: this.#newName.value,
        cuisine: this.#newCuisine.value,
        difficulty: this.#newDifficulty.value as Recipe['difficulty'],
        minutes: Number(this.#newMinutes.value),
        rating: 0,
      }

      await recipeRestProvider.create(newRecipe)

      // Formulier leegmaken zodat de gebruiker meteen een nieuw recept kan ingeven.
      this.#addForm.reset()
    })
  }

  render(): void {
    super.render()

    this.#recipeContainer.innerHTML = ''

    // --- VRAAG "Recepten filteren & sorteren" ---
    // Eerst filteren, dan sorteren (zie #filterAndSort).
    this.#filterAndSort().map(recipe => {
      // Zit dit recept al in het weekmenu? (om de knopstaat te bepalen)
      const menuItem = this.#menu.find(m => m.recipe.id === recipe.id)

      // --- VRAAG "Recepten renderen (4 punten)" ---
      const card = document.createElement('custom-recipe')
      card.setAttribute('id', recipe.id)
      card.setAttribute('name', recipe.name)
      card.setAttribute('cuisine', recipe.cuisine)
      card.setAttribute('difficulty', recipe.difficulty)
      card.setAttribute('minutes', recipe.minutes.toString())
      card.setAttribute('rating', recipe.rating.toString())
      card.setAttribute('in-menu', menuItem ? 'true' : 'false')

      // --- VRAAG "Recept-beoordeling updaten (3 punten)" ---
      // Luister op het custom event 'changeRating'. De gewenste verandering zit in event.detail.delta.
      // We berekenen de nieuwe score (begrensd tussen 0 en 5) en bewaren ze in de database via update (PUT).
      card.addEventListener('changeRating', async evt => {
        const delta = (evt as CustomEvent<{delta: number}>).detail.delta
        const newRating = Math.min(5, Math.max(0, recipe.rating + delta))
        await recipeRestProvider.update(recipe.id, {...recipe, rating: newRating})
      })

      // --- VRAAG "Recept toevoegen aan weekmenu (3 punten)" ---
      // Zit het recept al in het weekmenu? -> verwijderen, anders -> een nieuw MenuItem (1 portie) aanmaken.
      card.addEventListener('toggleMenu', async () => {
        if (menuItem) {
          await menuLocalProvider.delete(menuItem.id)
        } else {
          const newMenuItem: MenuItem = {recipe, servings: 1, id: crypto.randomUUID()}
          await menuLocalProvider.create(newMenuItem)
        }
      })

      this.#recipeContainer.appendChild(card)
    })
  }

  // --- VRAAG "Recepten filteren & sorteren (3 punten)" ---
  // In een aparte functie om leesbaar te blijven. Eerst filteren op naam (deel, niet
  // hoofdlettergevoelig) + keuken, daarna sorteren op de gekozen sorteeroptie.
  #filterAndSort(): Recipe[] {
    const filtered = this.#recipes.filter(recipe => {
      const nameMatches = recipe.name.toLowerCase().includes(this.#nameFilter.value.toLowerCase())
      const cuisineMatches = this.#cuisineFilter.value === 'all' || recipe.cuisine === this.#cuisineFilter.value
      return nameMatches && cuisineMatches
    })

    // [...filtered] = een kopie maken, want sort() wijzigt de array zelf (we willen #recipes niet aanpassen).
    switch (this.#sortSelect.value) {
      case 'rating-desc':
        return [...filtered].sort((a, b) => b.rating - a.rating)
      case 'minutes-asc':
        return [...filtered].sort((a, b) => a.minutes - b.minutes)
      case 'name-asc':
        return [...filtered].sort((a, b) => a.name.localeCompare(b.name))
      default:
        return filtered
    }
  }
}
