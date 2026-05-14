import express, {Request, Response} from 'express'
import { Series } from '../models/series'
import { v4 as uuidv4 } from 'uuid'
import {FilePersistenceProvider} from '../persistence/filePersister'

const router = express.Router()
const provider = new FilePersistenceProvider<Series>(`./src/data/series.json`)

// GET all seriess
router.get('/', async (_req: Request, res: Response) => {
  const series = await provider.getAll()
  res.json(series)
})

// GET series by ID
router.get('/:id', async (req: Request, res: Response) => {
  const series = await provider.getById(req.params.id)
  if (!series) return res.status(404).json({ error: 'Series not found' })
  res.json(series)
})

// CREATE series
router.post('/', async (req: Request, res: Response) => {
  const newSeries: Series = { ...req.body, id: uuidv4() }
  await provider.create(newSeries)
  res.status(201).json(newSeries)
})

// UPDATE series
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const updatedSeries: Series = { ...req.body, id: req.params.id }
    await provider.update(req.params.id, updatedSeries)
    res.json(updatedSeries)
  } catch {
    res.status(404).json({ error: 'Series not found' })
  }
})

// DELETE series
router.delete('/:id', async (req: Request, res: Response) => {
  await provider.delete(req.params.id)
  res.status(204).send()
})

export default router
