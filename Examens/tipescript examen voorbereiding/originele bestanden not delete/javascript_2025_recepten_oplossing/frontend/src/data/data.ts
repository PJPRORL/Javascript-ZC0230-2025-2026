// ============================================================================
// data.ts = centrale plaats waar de "persistence providers" worden aangemaakt.
// Door ze hier 1x te exporteren deelt de hele app DEZELFDE instantie (cache + observers).
// ============================================================================

import {RestPersistenceProvider} from './restPersistenceProvider.ts'
import type {Recipe} from '../models/recipe.ts'
import {LocalStoragePersistenceProvider} from './localStoragePersistenceProvider.ts'
import {MenuItem} from '../models/menuItem.ts'

// --- VRAAG "Recepten renderen / toevoegen / updaten / verwijderen" ---
// De recepten komen van de API. Verplicht via de RestPersistenceProvider (route /recipes).
// Met deze ene provider doen we alles: ophalen (getAll), aanmaken (create), aanpassen (update)
// en verwijderen (delete) van recepten in de database.
export const recipeRestProvider = new RestPersistenceProvider<Recipe>('http://localhost:3000/recipes')

// --- VRAAG "Weekmenu" ---
// Het weekmenu wordt lokaal bewaard. Verplicht via de LocalStoragePersistenceProvider,
// hier met storagekey 'menu'.
export const menuLocalProvider = new LocalStoragePersistenceProvider<MenuItem>('menu')
