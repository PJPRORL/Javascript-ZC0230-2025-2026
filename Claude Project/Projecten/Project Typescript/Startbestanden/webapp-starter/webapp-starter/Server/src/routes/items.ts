import express, {type Request, type Response} from 'express'
import {v4 as uuidv4} from 'uuid'
import type {Item} from '../models/item.ts'
import {FilePersistenceProvider} from '../persistence/filePersister'

const router = express.Router()

// Het pad is relatief aan de map waaruit je `pnpm dev` draait (Server/).
const provider = new FilePersistenceProvider<Item>('./src/data/items.json')

router.get('/', async (_req: Request, res: Response) => {
  res.json(await provider.getAll())
})

router.get('/:id', async (req: Request, res: Response) => {
  const item = await provider.getById(req.params.id)
  if (!item) return res.status(404).json({error: 'Item niet gevonden'})
  res.json(item)
})

router.post('/', async (req: Request, res: Response) => {
  // Het id komt ná de spread, zodat een door de client meegestuurd id genegeerd wordt.
  const nieuwItem: Item = {...req.body, id: uuidv4()}
  await provider.create(nieuwItem)
  res.status(201).json(nieuwItem)
})

router.put('/:id', async (req: Request, res: Response) => {
  try {
    const bijgewerkt: Item = {...req.body, id: req.params.id}
    await provider.update(req.params.id, bijgewerkt)
    res.json(bijgewerkt)
  } catch {
    res.status(404).json({error: 'Item niet gevonden'})
  }
})

router.delete('/:id', async (req: Request, res: Response) => {
  await provider.delete(req.params.id)
  res.status(204).send()
})

export default router
