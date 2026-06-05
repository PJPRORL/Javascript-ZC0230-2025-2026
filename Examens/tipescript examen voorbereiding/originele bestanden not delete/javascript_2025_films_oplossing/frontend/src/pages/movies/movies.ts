// ============================================================================
// movies.ts = de logica achter de catalogus(home)pagina.
// Het bundelt meerdere vragen:
//   - "Films renderen (5 punten)": films ophalen via de API en tonen.
//   - "Films filteren (2 punten)": filteren op titel (deel, niet hoofdlettergevoelig) + genre.
//   - "Films toevoegen aan kijklijst (3 punten)": via custom event toevoegen/verwijderen + localStorage.
//   - (Films verwijderen uit de database zit in het movie-component zelf, zie movie.ts.)
// ============================================================================

import {Page} from '../../router/page.ts'
import HTML from './movies.html?raw'
import {movieRestProvider, watchlistLocalProvider} from '../../data/data.ts'
import {Movie} from '../../models/movie.ts'
import {WatchlistItem} from '../../models/watchlistItem.ts'

export class MoviesPage extends Page {

  // Verwijzingen naar de elementen op de pagina (uit movies.html).
  #movieContainer = this.body.querySelector<HTMLDivElement>('#movies')!
  #titleFilter = this.body.querySelector<HTMLInputElement>('#title-filter')!
  #genreFilter = this.body.querySelector<HTMLSelectElement>('#genre-filter')!
  #filterBtn = this.body.querySelector<HTMLButtonElement>('#filter-btn')!

  // De films (uit de API) en de kijklijst (uit localStorage).
  #movies: Movie[] = []
  #watchlist: WatchlistItem[] = []

  constructor() {
    super(HTML)

    // --- VRAAG "Films toevoegen aan kijklijst" ---
    // Observer op de kijklijst: telkens die wijzigt, herrenderen we zodat de knop
    // (+ Kijklijst / checkmark) meteen klopt.
    this.unsubscribe.push(watchlistLocalProvider.addObserver(watchlist => {
      this.#watchlist = watchlist
      this.render()
    }))

    void watchlistLocalProvider.getAll()

    // --- VRAAG "Films renderen (5 punten)" ---
    // Observer op de films + ophalen via de API (verplicht via RestPersistenceProvider).
    // getAll() vult de cache en verwittigt de observer -> render() toont de films.
    this.unsubscribe.push(movieRestProvider.addObserver(movies => {
      this.#movies = movies
      this.render()
    }))

    void movieRestProvider.getAll()

    // --- VRAAG "Films filteren (2 punten)" ---
    // Er wordt pas gefilterd bij een klik op de knop (niet bij elke toetsaanslag).
    // preventDefault voorkomt dat het <form> de pagina herlaadt; daarna gewoon herrenderen.
    this.#filterBtn.addEventListener('click', evt => {
      evt.preventDefault()
      this.render()
    })
  }

  render(): void {
    super.render()

    // Bouw de filmlijst opnieuw op (enkel de films die door de filter geraken).
    this.#movieContainer.innerHTML = ''
    this.#movies.filter(movie => this.#movieMatchesFilter(movie)).map(movie => {
      // Zoek of deze film al in de kijklijst zit (om de knopstaat te bepalen).
      const watchlistItem = this.#watchlist.find(item => item.movie.id === movie.id)

      // --- VRAAG "Films renderen (5 punten)" ---
      // Maak per film een custom-movie en geef de gegevens door via attributen (altijd strings).
      const movieCard = document.createElement('custom-movie')
      movieCard.setAttribute('id', movie.id)              // id meegeven (nodig om te verwijderen!)
      movieCard.setAttribute('title', movie.title)
      movieCard.setAttribute('genre', movie.genre)
      movieCard.setAttribute('year', movie.year.toString())
      movieCard.setAttribute('rating', movie.rating.toString())
      movieCard.setAttribute('director', movie.director)
      // 'in-watchlist' bepaalt of de knop '+ Kijklijst' of een checkmark toont.
      movieCard.setAttribute('in-watchlist', watchlistItem ? 'true' : 'false')

      // --- VRAAG "Films toevoegen aan kijklijst (3 punten)" ---
      // Luister op het custom event van de kaart. Zit de film al in de kijklijst? -> verwijderen,
      // anders -> een nieuw WatchlistItem met eigen id aanmaken. Beide via de LocalStoragePersistenceProvider.
      // De observer hierboven herrendert daarna automatisch.
      movieCard.addEventListener('toggleWatchlist', async () => {
        if (watchlistItem) {
          await watchlistLocalProvider.delete(watchlistItem.id)
        } else {
          const newItem: WatchlistItem = {movie, id: crypto.randomUUID()}
          await watchlistLocalProvider.create(newItem)
        }
      })

      this.#movieContainer.appendChild(movieCard)
    })
  }

  // --- VRAAG "Films filteren (2 punten)" ---
  // Bepaalt of één film aan beide filters voldoet. In een aparte functie voor leesbaarheid.
  // - titel: includes() laat zoeken op een DEEL; toLowerCase() maakt het niet hoofdlettergevoelig.
  // - genre: gelijk aan het gekozen genre, of 'all' -> dan telt het genre niet mee.
  #movieMatchesFilter(movie: Movie): boolean {
    const titleMatches = movie.title.toLowerCase().includes(this.#titleFilter.value.toLowerCase())
    const genreMatches = this.#genreFilter.value === 'all' || movie.genre === this.#genreFilter.value

    return titleMatches && genreMatches
  }
}
