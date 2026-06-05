import {RestPersistenceProvider} from './restPersistenceProvider.ts'
import type {Movie} from '../models/movie.ts'
import {LocalStoragePersistenceProvider} from './localStoragePersistenceProvider.ts'
import {WatchlistItem} from '../models/watchlistItem.ts'

/**
 * TODO: Maak hier de persistence providers aan die je in de app nodig hebt.
 *
 * - Een RestPersistenceProvider<Movie> voor de films (route: http://localhost:3000/movies).
 * - Een LocalStoragePersistenceProvider<WatchlistItem> voor de kijklijst (storagekey: 'watchlist').
 *
 * Exporteer ze zodat je pagina's en componenten ze kunnen importeren.
 * (De imports hierboven mag je gebruiken; verwijder ze niet als je ze nodig hebt.)
 **/
