import type {Author} from '../models/author.ts'
import type {Book} from '../models/book.ts'
import type {Series} from '../models/series.ts'
import {RestPersistenceProvider} from './restPersistenceProvider.ts'

export const bookPersistenceProvider = new RestPersistenceProvider<Book>('http://localhost:3000/books')

export const authorPersistenceProvider = new RestPersistenceProvider<Author>('http://localhost:3000/authors')

export const seriesPersistenceProvider = new RestPersistenceProvider<Series>('http://localhost:3000/series')
