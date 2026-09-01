// Gebruik deze file voor je data management.
import {RestPersistenceProvider} from './restPersistenceProvider.ts'
import type {Part} from '../models/part.ts'

// 🔧 API_URL = de route uit de opgave
export const partsRestProvider = new RestPersistenceProvider<Part>('http://localhost:3000/parts')