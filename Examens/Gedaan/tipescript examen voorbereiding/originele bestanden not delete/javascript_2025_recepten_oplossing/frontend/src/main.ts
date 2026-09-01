// ============================================================================
// main.ts = het startpunt van de applicatie.
// Hier worden (1) de custom elements geregistreerd en (2) de router opgezet.
// Hoort volledig bij VRAAG "Routing & componenten (1 punt)".
// ============================================================================

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import {Router} from './router/router.ts'
import {RecipesPage} from './pages/recipes/recipes.ts'
import {MenuPage} from './pages/menu/menu.ts'
import {CustomNavbar} from './components/navbar/navbar.ts'
import {RecipeCard} from './components/recipeCard/recipe.ts'
import {MenuItemCard} from './components/menuItem/menuItem.ts'

// --- VRAAG "Routing & componenten (1 punt)" ---
// Custom elements moeten eerst geregistreerd worden voor je hun tag in HTML mag gebruiken.
// 'custom-navbar' is verplicht; de andere namen mochten we zelf kiezen.
window.customElements.define('custom-navbar', CustomNavbar)
window.customElements.define('custom-recipe', RecipeCard)
window.customElements.define('custom-menu-item', MenuItemCard)

// --- VRAAG "Routing & componenten (1 punt)" ---
// De recepten(home)pagina hangt aan '/', de weekmenu-pagina aan '/menu'.
new Router({
  '/': RecipesPage,
  '/menu': MenuPage,
})
