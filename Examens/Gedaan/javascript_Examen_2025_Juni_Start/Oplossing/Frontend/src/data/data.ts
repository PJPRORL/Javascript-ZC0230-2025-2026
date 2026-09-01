import {RestPersistenceProvider} from './restPersistenceProvider.ts'
import type {Book} from '../models/book.ts'
import {LocalStoragePersistenceProvider} from './localStoragePersistenceProvider.ts'
import {CollectionItem} from '../models/collectionItem.ts'

export const bookPersistenceProvider = new RestPersistenceProvider<Book>('http://localhost:3000/books')
export const collectionPersistenceProvider = new LocalStoragePersistenceProvider<CollectionItem>('collection')