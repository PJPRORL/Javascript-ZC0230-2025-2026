import express, {type Request, type Response} from 'express'
import {v4 as uuidv4} from 'uuid'
import type {TradingCard} from '../models/tradingCard.ts'
import {FilePersistenceProvider} from '../persistence/filePersister'

const router = express.Router()
const provider = new FilePersistenceProvider<TradingCard>(`./src/data/kaarten.json`)

// GET all kaarten
router.get('/', async (_req: Request, res: Response) => {
  const kaarten = await provider.getAll()
  res.json(kaarten)
})

// GET kaart by ID
router.get('/:id', async (req: Request, res: Response) => {
  const kaart = await provider.getById(req.params.id)
  if (!kaart) return res.status(404).json({error: 'Kaart niet gevonden'})
  res.json(kaart)
})

// CREATE kaart
router.post('/', async (req: Request, res: Response) => {
  const nieuweKaart: TradingCard = {...req.body, id: uuidv4()}
  await provider.create(nieuweKaart)
  res.status(201).json(nieuweKaart)
})

// UPDATE kaart
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const bijgewerktKaart: TradingCard = {...req.body, id: req.params.id}
    await provider.update(req.params.id, bijgewerktKaart)
    res.json(bijgewerktKaart)
  } catch {
    res.status(404).json({error: 'Kaart niet gevonden'})
  }
})

// DELETE kaart
router.delete('/:id', async (req: Request, res: Response) => {
  await provider.delete(req.params.id)
  res.status(204).send()
})

export default router
