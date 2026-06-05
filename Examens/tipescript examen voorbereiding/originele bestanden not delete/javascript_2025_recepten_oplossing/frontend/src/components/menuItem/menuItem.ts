// ============================================================================
// menuItem.ts = het custom element dat ÉÉN regel in het weekmenu toont (<custom-menu-item>).
// Het beantwoordt:
//   - "Weekmenu renderen + porties aanpassen (4 punten)": de titel + het aantal porties tonen,
//     en met +/- het aantal porties laten wijzigen via een custom event MET DETAIL.
//   - Verwijderen uit het weekmenu: de X-knop spreekt RECHTSTREEKS de LocalStoragePersistenceProvider
//     aan (geen custom event, zoals de opgave vraagt).
// ============================================================================

import {CustomElement} from '../../router/customElement.ts'
import HTML from './menuItem.html?raw'
import {menuLocalProvider} from '../../data/data.ts'

export class MenuItemCard extends CustomElement {

  static observedAttributes = ['title', 'servings', 'id']

  #label = this.componentBody.querySelector<HTMLSpanElement>('#menu-label')!
  #servings = this.componentBody.querySelector<HTMLSpanElement>('#servings')!
  #deleteBtn = this.componentBody.querySelector<HTMLButtonElement>('#delete-btn')!
  #servingsUp = this.componentBody.querySelector<HTMLButtonElement>('#servings-up')!
  #servingsDown = this.componentBody.querySelector<HTMLButtonElement>('#servings-down')!

  constructor() {
    super(HTML)

    // --- VRAAG "Weekmenu renderen + porties aanpassen (4 punten)" ---
    // De +/- knoppen sturen een custom event 'changeServings' met een DETAIL-object dat aangeeft
    // of het aantal porties met 1 stijgt of daalt. De pagina luistert hierop en past het weekmenu
    // in localStorage aan (update).
    this.#servingsUp.addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('changeServings', {detail: {delta: 1}}))
    })
    this.#servingsDown.addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('changeServings', {detail: {delta: -1}}))
    })

    // Verwijderen: rechtstreeks de provider aanspreken (geen custom event).
    this.#deleteBtn.addEventListener('click', () => {
      void menuLocalProvider.delete(this.id)
    })
  }

  attributeChangedCallback(name: string, _oldValue: string, newValue: string) {
    switch (name) {
      case 'title':
        this.#label.innerText = newValue
        break
      case 'servings':
        this.#servings.innerText = newValue
        break
    }
  }
}
