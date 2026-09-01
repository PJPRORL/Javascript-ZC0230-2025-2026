import {RestPersistenceProvider} from './restPersistenceProvider.ts'
import type {Ticket} from '../models/ticket.ts'

export const favoriteRestPersistenceProvider = new RestPersistenceProvider<Ticket>('http://localhost:3000/favorites')