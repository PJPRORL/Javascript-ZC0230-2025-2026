import express, {Request, Response} from 'express'
import { Author } from '../models/author'
import { v4 as uuidv4 } from 'uuid'
import {FilePersistenceProvider} from '../persistence/filePersister'

const router = express.Router()
const provider = new FilePersistenceProvider<Author>(`./src/data/authors.json`)

// GET all authors
router.get('/', async (_req: Request, res: Response) => {
  const authors = await provider.getAll()
  res.json(authors)
})

// GET author by ID
router.get('/:id', async (req: Request, res: Response) => {
  const author = await provider.getById(req.params.id)
  if (!author) return res.status(404).json({ error: 'Author not found' })
  res.json(author)
})

// CREATE author
router.post('/', async (req: Request, res: Response) => {
  const newAuthor: Author = { ...req.body, id: uuidv4() }
  await provider.create(newAuthor)
  res.status(201).json(newAuthor)
})

// UPDATE author
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const updatedAuthor: Author = { ...req.body, id: req.params.id }
    await provider.update(req.params.id, updatedAuthor)
    res.json(updatedAuthor)
  } catch {
    res.status(404).json({ error: 'Author not found' })
  }
})

// DELETE author
router.delete('/:id', async (req: Request, res: Response) => {
  await provider.delete(req.params.id)
  res.status(204).send()
})

export default router
