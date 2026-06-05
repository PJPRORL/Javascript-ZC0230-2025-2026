// ============================================================================
// watchlistItem.ts = het custom element dat ÉÉN regel in de kijklijst toont
// (<custom-watchlist-item>). Het beantwoordt:
//   - "Kijklijst renderen (4 punten)": de titel (titel + jaar) tonen.
//   - "Films verwijderen uit kijklijst (3 punten)": de X-knop spreekt RECHTSTREEKS de
//     LocalStoragePersistenceProvider aan (de opgave vraagt hier expliciet GEEN custom event).
// ============================================================================

import {CustomElement} from '../../router/customElement.ts'
import HTML from './watchlistItem.html?raw'
import {watchlistLocalProvider} from '../../data/data.ts'

export class WatchlistItemCard extends CustomElement {

  static observedAttributes = ['title', 'id']

  #label = this.componentBody.querySelector<HTMLSpanElement>('#watchlist-item')!
  #deleteBtn = this.componentBody.querySelector<HTMLButtonElement>('#delete-btn')!

  constructor() {
    super(HTML)

    // --- VRAAG "Films verwijderen uit kijklijst (3 punten)" ---
    // Voor de maximumscore mag hier GEEN custom event gebruikt worden: we spreken rechtstreeks
    // de juiste provider aan. this.id is het 'id'-attribuut van dit kijklijst-item; delete()
    // haalt het uit localStorage en verwittigt de observers -> de kijklijst-pagina herrendert.
    this.#deleteBtn.addEventListener('click', () => {
      void watchlistLocalProvider.delete(this.id)
    })
  }

  // --- VRAAG "Kijklijst renderen (4 punten)" ---
  // De pagina geeft titel + jaar als één string door via het 'title'-attribuut (template literal).
  attributeChangedCallback(name: string, _oldValue: string, newValue: string) {
    switch (name) {
      case 'title':
        this.#label.innerText = newValue
        break
    }
  }
}
