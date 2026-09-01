import {RestPersistenceProvider} from './restPersistenceProvider.ts'
import type {Product} from '../models/product.ts'
import {LocalStoragePersistenceProvider} from './localStoragePersistenceProvider.ts'
import {CartItem} from '../models/cartItem.ts'

export const productRestPersistenceProvider = new RestPersistenceProvider<Product>('http://localhost:3000/products')

export const cartLocalPersistenceProvider = new LocalStoragePersistenceProvider<CartItem>('cart')