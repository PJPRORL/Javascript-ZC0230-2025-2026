// De enige plaats waar providers aangemaakt worden.
// Een ES-module draait maar één keer, dus iedereen die dit bestand importeert
// deelt dezelfde instanties — en dus dezelfde observers.

import type {Item} from '../models/item.ts'
import {RestPersistenceProvider} from './restPersistenceProvider.ts'

export const itemProvider = new RestPersistenceProvider<Item>('http://localhost:3000/items')

// Alternatieven, zelfde interface — je wisselt ze om zonder de rest aan te raken:
//
//   import {LocalStoragePersistenceProvider} from './localStoragePersistenceProvider.ts'
//   export const itemProvider = new LocalStoragePersistenceProvider<Item>('items')
//
//   import {MemoryPersistenceProvider} from './memoryPersistenceProvider.ts'
//   export const itemProvider = new MemoryPersistenceProvider<Item>([...testdata])
//
// Dat is het punt van de abstracte PersistenceProvider: de pagina's merken het verschil niet.
