import {Recipe} from './recipe.ts'

export interface MenuItem {
  id: string
  recipe: Recipe
  servings: number
}
