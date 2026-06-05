import {RestPersistenceProvider} from './restPersistenceProvider.ts'
import type {Recipe} from '../models/recipe.ts'
import {LocalStoragePersistenceProvider} from './localStoragePersistenceProvider.ts'
import {MenuItem} from '../models/menuItem.ts'

/**
 * TODO: Maak hier de persistence providers aan die je in de app nodig hebt.
 *
 * - Een RestPersistenceProvider<Recipe> voor de recepten (route: http://localhost:3000/recipes).
 *   Hiermee haal je op (getAll), maak je aan (create), update je (update) en verwijder je (delete).
 * - Een LocalStoragePersistenceProvider<MenuItem> voor het weekmenu (storagekey: 'menu').
 *
 * Exporteer ze zodat je pagina's en componenten ze kunnen importeren.
 **/
