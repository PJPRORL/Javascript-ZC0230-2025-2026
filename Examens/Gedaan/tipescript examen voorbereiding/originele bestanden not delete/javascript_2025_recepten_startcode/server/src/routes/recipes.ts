import express, {Request, Response} from 'express'
import {Recipe} from '../models/recipe.ts'
import {v4 as uuidv4} from 'uuid'
import {FilePersistenceProvider} from '../persistence/filePersister'

const router = express.Router()
const provider = new FilePersistenceProvider<Recipe>(`./src/data/recipes.json`)

// GET all recipes
router.get('/', async (_req: Request, res: Response) => {
  const recipes = await provider.getAll()
  res.json(recipes)
})

// GET recipe by ID
router.get('/:id', async (req: Request, res: Response) => {
  const recipe = await provider.getById(req.params.id)
  if (!recipe) return res.status(404).json({error: 'Recipe not found'})
  res.json(recipe)
})

// CREATE recipe
router.post('/', async (req: Request, res: Response) => {
  const newRecipe: Recipe = {...req.body, id: uuidv4()}
  await provider.create(newRecipe)
  res.status(201).json(newRecipe)
})

// UPDATE recipe
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const updatedRecipe: Recipe = {...req.body, id: req.params.id}
    await provider.update(req.params.id, updatedRecipe)
    res.json(updatedRecipe)
  } catch {
    res.status(404).json({error: 'Recipe not found'})
  }
})

// DELETE recipe
router.delete('/:id', async (req: Request, res: Response) => {
  await provider.delete(req.params.id)
  res.status(204).send()
})

export default router
