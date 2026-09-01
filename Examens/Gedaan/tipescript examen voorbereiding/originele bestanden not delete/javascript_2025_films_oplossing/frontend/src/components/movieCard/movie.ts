// ============================================================================
// movie.ts = het custom element dat ÉÉN film weergeeft (<custom-movie>).
// Het beantwoordt meerdere vragen tegelijk:
//   - "Films renderen (5 punten)": de filminfo tonen via attributen.
//   - "Films verwijderen (2 punten)": de vuilbak-knop.
//   - "Films toevoegen aan kijklijst (3 punten)": de kijklijst-knop + custom event.
// ============================================================================

import HTML from './movie.html?raw'
import {CustomElement} from '../../router/customElement.ts'
import {movieRestProvider} from '../../data/data.ts'

export class MovieCard extends CustomElement {
  // De attributen die we observeren. Telkens er één wijzigt (via setAttribute) roept de browser
  // attributeChangedCallback op. Let op: strings only + kebab-case ('in-watchlist').
  static observedAttributes = ['title', 'genre', 'year', 'rating', 'director', 'in-watchlist']

  // Verwijzingen naar de elementen binnen de kaart (id's uit movie.html).
  #title = this.componentBody.querySelector<HTMLHeadingElement>('#title')!
  #genre = this.componentBody.querySelector<HTMLSpanElement>('#genre')!
  #year = this.componentBody.querySelector<HTMLSpanElement>('#year')!
  #rating = this.componentBody.querySelector<HTMLSpanElement>('#rating')!
  #director = this.componentBody.querySelector<HTMLSpanElement>('#director')!
  #deleteBtn = this.componentBody.querySelector<HTMLButtonElement>('#delete-movie')!
  #watchlistBtn = this.componentBody.querySelector<HTMLButtonElement>('#watchlist-button')!

  constructor() {
    super(HTML)

    // --- VRAAG "Films verwijderen (2 punten)" ---
    // Klik op het vuilbakje => verwijder de film via de RestPersistenceProvider (= uit de database).
    // this.id is het 'id'-attribuut dat de pagina op dit element zette. delete() verwittigt de
    // observers, dus de catalogus herrendert automatisch en de film verdwijnt uit de UI.
    this.#deleteBtn.addEventListener('click', () => movieRestProvider.delete(this.id))

    // --- VRAAG "Films toevoegen aan kijklijst (3 punten)" ---
    // De knop mag niet zelf aan de data zitten; hij stuurt een CUSTOM EVENT naar de parent
    // (de catalogus-pagina), die beslist of de film toegevoegd of verwijderd wordt.
    this.#watchlistBtn.addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('toggleWatchlist'))
    })
  }

  // --- VRAAG "Films renderen (5 punten)" ---
  // Vertaal elk geobserveerd attribuut (een string) naar de juiste plek in de UI.
  attributeChangedCallback(name: string, _oldValue: string, newValue: string) {
    switch (name) {
      case 'title':
        this.#title.innerText = newValue
        break
      case 'genre':
        this.#genre.innerText = newValue
        break
      case 'year':
        this.#year.innerText = newValue
        break
      case 'rating':
        // De score tonen we met één decimaal en een sterretje.
        this.#rating.innerText = Number(newValue).toFixed(1) + ' / 10'
        break
      case 'director':
        this.#director.innerText = newValue
        break
      case 'in-watchlist':
        // --- VRAAG "Films toevoegen aan kijklijst (3 punten)" ---
        // Zit de film al in de kijklijst? Toon een groene checkmark, anders '+ Kijklijst'.
        if (newValue === 'true') {
          this.#watchlistBtn.setAttribute('class', 'btn btn-success w-100')
          this.#watchlistBtn.innerHTML = '&check; In kijklijst'
        } else {
          this.#watchlistBtn.setAttribute('class', 'btn btn-primary w-100')
          this.#watchlistBtn.innerHTML = '+ Kijklijst'
        }
        break
    }
  }
}
