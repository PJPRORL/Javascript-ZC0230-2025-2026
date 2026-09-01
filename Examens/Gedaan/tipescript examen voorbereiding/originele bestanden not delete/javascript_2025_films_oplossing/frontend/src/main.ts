// ============================================================================
// main.ts = het startpunt van de applicatie.
// Hier worden (1) de custom elements geregistreerd en (2) de router opgezet.
// Hoort volledig bij VRAAG "Routing & componenten (1 punt)".
// ============================================================================

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import {Router} from './router/router.ts'
import {MoviesPage} from './pages/movies/movies.ts'
import {WatchlistPage} from './pages/watchlist/watchlist.ts'
import {CustomNavbar} from './components/navbar/navbar.ts'
import {MovieCard} from './components/movieCard/movie.ts'
import {WatchlistItemCard} from './components/watchlistItem/watchlistItem.ts'

// --- VRAAG "Routing & componenten (1 punt)" ---
// Custom elements moeten eerst geregistreerd worden voor je hun tag in HTML mag gebruiken.
// 'custom-navbar' is verplicht; de andere twee namen mochten we zelf kiezen.
window.customElements.define('custom-navbar', CustomNavbar)
window.customElements.define('custom-movie', MovieCard)
window.customElements.define('custom-watchlist-item', WatchlistItemCard)

// --- VRAAG "Routing & componenten (1 punt)" ---
// De catalogus(home)pagina hangt aan '/', de kijklijst-pagina aan '/watchlist'.
new Router({
  '/': MoviesPage,
  '/watchlist': WatchlistPage,
})
