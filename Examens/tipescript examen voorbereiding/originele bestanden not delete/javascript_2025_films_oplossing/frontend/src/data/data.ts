// ============================================================================
// data.ts = centrale plaats waar de "persistence providers" worden aangemaakt.
// Door ze hier 1x te exporteren deelt de hele app DEZELFDE instantie (cache + observers).
// Voeg je een film toe aan de kijklijst op de catalogus, dan ziet de kijklijst-pagina dat
// automatisch, want beide gebruiken net dezelfde watchlistLocalProvider.
// ============================================================================

import {RestPersistenceProvider} from './restPersistenceProvider.ts'
import type {Movie} from '../models/movie.ts'
import {LocalStoragePersistenceProvider} from './localStoragePersistenceProvider.ts'
import {WatchlistItem} from '../models/watchlistItem.ts'

// --- VRAAG "Films renderen" + "Films verwijderen" ---
// De films komen van de API. Verplicht via de RestPersistenceProvider (route /movies).
export const movieRestProvider = new RestPersistenceProvider<Movie>('http://localhost:3000/movies')

// --- VRAAG "Films toevoegen aan kijklijst" + "Kijklijst renderen/verwijderen" ---
// De kijklijst wordt lokaal bewaard. Verplicht via de LocalStoragePersistenceProvider,
// hier met storagekey 'watchlist'.
export const watchlistLocalProvider = new LocalStoragePersistenceProvider<WatchlistItem>('watchlist')
