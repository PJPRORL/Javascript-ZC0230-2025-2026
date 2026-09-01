// Centrale plaats waar de "data managers" van de applicatie leven.
// Belangrijk: dit zijn *modules* in ESM, dus deze twee objecten worden maar één keer
// aangemaakt. Iedereen die dit bestand importeert, krijgt exact dezelfde instantie
// (en dus dezelfde observers). Dat is precies wat we willen.

import type {CollectieItem} from '../models/collectieItem.ts'
import type {TradingCard} from '../models/tradingCard.ts'
import {LocalStoragePersistenceProvider} from './localStoragePersistenceProvider.ts'
import {RestPersistenceProvider} from './restPersistenceProvider.ts'

// De kaarten komen van de Server (Express, poort 3000).
export const kaartenProvider = new RestPersistenceProvider<TradingCard>('http://localhost:3000/kaarten')

// De collectie is van de gebruiker en blijft lokaal in de browser staan.
// 'collectie' is de sleutel in localStorage.
export const collectieProvider = new LocalStoragePersistenceProvider<CollectieItem>('collectie')
