// ============================================================================
// watchlist.ts = de logica achter de kijklijst-pagina ('/watchlist').
// Het beantwoordt:
//   - "Kijklijst renderen (4 punten)": de kijklijst uit localStorage tonen + aantal films.
// (Het verwijderen van items zit in het watchlistItem-component zelf, zie watchlistItem.ts.)
// ============================================================================

import {Page} from '../../router/page.ts'
import HTML from './watchlist.html?raw'
import {watchlistLocalProvider} from '../../data/data.ts'
import {WatchlistItem} from '../../models/watchlistItem.ts'

export class WatchlistPage extends Page {

  #watchlistContainer = this.body.querySelector<HTMLUListElement>('#watchlist')!
  #countLabel = this.body.querySelector<HTMLSpanElement>('#watchlist-count')!

  #watchlist: WatchlistItem[] = []

  constructor() {
    super(HTML)

    // --- VRAAG "Kijklijst renderen (4 punten)" ---
    // Observer op de kijklijst + inladen via de LocalStoragePersistenceProvider (verplicht).
    // Verwijdert een item zichzelf, dan verwittigt de provider deze observer -> herrenderen.
    this.unsubscribe.push(watchlistLocalProvider.addObserver(watchlist => {
      this.#watchlist = watchlist
      this.render()
    }))

    void watchlistLocalProvider.getAll()
  }

  render(): void {
    super.render()

    // Bouw de kijklijst opnieuw op.
    this.#watchlistContainer.innerHTML = ''
    this.#watchlist.map(item => {
      // Per item een custom-watchlist-item maken.
      const element = document.createElement('custom-watchlist-item')
      // Titel + jaar in één regel via een TEMPLATE LITERAL (zoals de opgave vraagt).
      element.setAttribute('title', `${item.movie.title} (${item.movie.year})`)
      // Het id meegeven zodat de X-knop in het component net dit item kan verwijderen.
      element.setAttribute('id', item.id)

      this.#watchlistContainer.appendChild(element)
    })

    // Toon het aantal films in de kijklijst.
    this.#countLabel.innerText = this.#watchlist.length.toString()
  }
}
