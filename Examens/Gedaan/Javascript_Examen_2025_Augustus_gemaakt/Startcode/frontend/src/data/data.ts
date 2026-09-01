import {RestPersistenceProvider} from './restPersistenceProvider.ts'
import type {Product} from '../models/product.ts'

export const productRestPersistenceProvider = new RestPersistenceProvider<Product>('http://localhost:3000/products')