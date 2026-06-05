// ============================================================================
// recipe.ts = het custom element dat ÉÉN recept weergeeft (<custom-recipe>).
// Het beantwoordt meerdere vragen tegelijk:
//   - "Recepten renderen (4 punten)": de receptinfo tonen via attributen.
//   - "Recept-beoordeling updaten (3 punten)": de +/- knoppen sturen een custom event MET DETAIL.
//   - "Recept verwijderen (2 punten)": de vuilbak-knop.
//   - "Recept toevoegen aan weekmenu (3 punten)": de weekmenu-knop + custom event.
// ============================================================================

import HTML from './recipe.html?raw'
import {CustomElement} from '../../router/customElement.ts'
import {recipeRestProvider} from '../../data/data.ts'

export class RecipeCard extends CustomElement {
  // Attributen die we observeren (strings only, kebab-case).
  static observedAttributes = ['name', 'cuisine', 'difficulty', 'minutes', 'rating', 'in-menu']

  #name = this.componentBody.querySelector<HTMLHeadingElement>('#name')!
  #cuisine = this.componentBody.querySelector<HTMLSpanElement>('#cuisine')!
  #difficulty = this.componentBody.querySelector<HTMLSpanElement>('#difficulty')!
  #minutes = this.componentBody.querySelector<HTMLSpanElement>('#minutes')!
  #rating = this.componentBody.querySelector<HTMLSpanElement>('#rating')!
  #deleteBtn = this.componentBody.querySelector<HTMLButtonElement>('#delete-recipe')!
  #menuBtn = this.componentBody.querySelector<HTMLButtonElement>('#menu-button')!
  #ratingUp = this.componentBody.querySelector<HTMLButtonElement>('#rating-up')!
  #ratingDown = this.componentBody.querySelector<HTMLButtonElement>('#rating-down')!

  constructor() {
    super(HTML)

    // --- VRAAG "Recept verwijderen (2 punten)" ---
    // Klik op het vuilbakje => verwijder het recept via de RestPersistenceProvider (uit de database).
    this.#deleteBtn.addEventListener('click', () => recipeRestProvider.delete(this.id))

    // --- VRAAG "Recept toevoegen aan weekmenu (3 punten)" ---
    // Custom event naar de parent (de pagina beslist of het recept toegevoegd/verwijderd wordt).
    this.#menuBtn.addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('toggleMenu'))
    })

    // --- VRAAG "Recept-beoordeling updaten (3 punten)" ---
    // De +/- knoppen sturen één custom event 'changeRating', maar met een DETAIL-object dat
    // vertelt hoeveel de score moet stijgen of dalen. Zo hoeft de parent maar op één event te
    // luisteren. (CustomEvent kan via 'detail' extra data meegeven, in tegenstelling tot attributen.)
    this.#ratingUp.addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('changeRating', {detail: {delta: 0.5}}))
    })
    this.#ratingDown.addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('changeRating', {detail: {delta: -0.5}}))
    })
  }

  // --- VRAAG "Recepten renderen (4 punten)" ---
  attributeChangedCallback(name: string, _oldValue: string, newValue: string) {
    switch (name) {
      case 'name':
        this.#name.innerText = newValue
        break
      case 'cuisine':
        this.#cuisine.innerText = newValue
        break
      case 'difficulty':
        this.#difficulty.innerText = newValue
        break
      case 'minutes':
        this.#minutes.innerText = newValue
        break
      case 'rating':
        // Toon de score met één decimaal, gevolgd door /5.
        this.#rating.innerText = Number(newValue).toFixed(1) + ' / 5'
        break
      case 'in-menu':
        // --- VRAAG "Recept toevoegen aan weekmenu (3 punten)" ---
        // Zit het recept al in het weekmenu? Toon een checkmark, anders '+ Weekmenu'.
        if (newValue === 'true') {
          this.#menuBtn.setAttribute('class', 'btn btn-success w-100')
          this.#menuBtn.innerHTML = '&check; In weekmenu'
        } else {
          this.#menuBtn.setAttribute('class', 'btn btn-primary w-100')
          this.#menuBtn.innerHTML = '+ Weekmenu'
        }
        break
    }
  }
}
