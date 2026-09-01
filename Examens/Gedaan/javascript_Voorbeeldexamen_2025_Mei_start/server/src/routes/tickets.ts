import express, {Request, Response} from 'express'
import {Ticket} from '../models/ticket.ts'
import {v4 as uuidv4} from 'uuid'
import {FilePersistenceProvider} from '../persistence/filePersister'

const router = express.Router()
const provider = new FilePersistenceProvider<Ticket>(`./src/data/tickets.json`)

// GET all tickets
router.get('/', async (_req: Request, res: Response) => {
  const tickets = await provider.getAll()
  res.json(tickets)
})

// GET ticket by ID
router.get('/:id', async (req: Request, res: Response) => {
  const ticket = await provider.getById(req.params.id)
  if (!ticket) return res.status(404).json({error: 'Ticket not found'})
  res.json(ticket)
})

// CREATE ticket
router.post('/', async (req: Request, res: Response) => {
  const newTicket: Ticket = {...req.body, id: uuidv4()}
  await provider.create(newTicket)
  res.status(201).json(newTicket)
})

// UPDATE ticket
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const updatedTicket: Ticket = {...req.body, id: req.params.id}
    await provider.update(req.params.id, updatedTicket)
    res.json(updatedTicket)
  } catch {
    res.status(404).json({error: 'Ticket not found'})
  }
})

// DELETE ticket
router.delete('/:id', async (req: Request, res: Response) => {
  await provider.delete(req.params.id)
  res.status(204).send()
})

export default router
