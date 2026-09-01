// Gebruik deze file voor je data management.
import {RestPersistenceProvider} from './restPersistenceProvider.ts'
import type {TradingCard} from '../models/tradingCard.ts'

export const productRestPersistenceProvider = new RestPersistenceProvider<TradingCard>('http://localhost:3000/kaarten')