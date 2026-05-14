import express, {Request, Response} from 'express'
import {Ticket} from '../models/ticket.ts'
import {v4 as uuidv4} from 'uuid'
import {FilePersistenceProvider} from '../persistence/filePersister'

const router = express.Router()
const provider = new FilePersistenceProvider<Ticket>(`./src/data/favorites.json`)

// GET all favorites
router.get('/', async (_req: Request, res: Response) => {
  const favorites = await provider.getAll()
  res.json(favorites)
})

// GET favorite by ID
router.get('/:id', async (req: Request, res: Response) => {
  const favorite = await provider.getById(req.params.id)
  if (!favorite) return res.status(404).json({error: 'Ticket not found'})
  res.json(favorite)
})

// CREATE favorite
router.post('/', async (req: Request, res: Response) => {
  const newTicket: Ticket = {id: uuidv4(), ...req.body}
  await provider.create(newTicket)
  res.status(201).json(newTicket)
})

// UPDATE favorite
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const updatedTicket: Ticket = {...req.body, id: req.params.id}
    await provider.update(req.params.id, updatedTicket)
    res.json(updatedTicket)
  } catch {
    res.status(404).json({error: 'Ticket not found'})
  }
})

// DELETE favorite
router.delete('/:id', async (req: Request, res: Response) => {
  await provider.delete(req.params.id)
  res.status(204).send()
})

export default router
