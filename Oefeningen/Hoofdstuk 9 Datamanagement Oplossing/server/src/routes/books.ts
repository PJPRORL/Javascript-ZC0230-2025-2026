import express, {Request, Response} from 'express'
import { Book } from '../models/book'
import { v4 as uuidv4 } from 'uuid'
import {FilePersistenceProvider} from '../persistence/filePersister'

const router = express.Router()
const provider = new FilePersistenceProvider<Book>(`./src/data/books.json`)

// GET all books
router.get('/', async (_req: Request, res: Response) => {
  const books = await provider.getAll()
  res.json(books)
})

// GET book by ID
router.get('/:id', async (req: Request, res: Response) => {
  const book = await provider.getById(req.params.id)
  if (!book) return res.status(404).json({ error: 'Book not found' })
  res.json(book)
})

// CREATE book
router.post('/', async (req: Request, res: Response) => {
  const newBook: Book = { ...req.body, id: uuidv4() }
  await provider.create(newBook)
  res.status(201).json(newBook)
})

// UPDATE book
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const updatedBook: Book = { ...req.body, id: req.params.id }
    await provider.update(req.params.id, updatedBook)
    res.json(updatedBook)
  } catch {
    res.status(404).json({ error: 'Book not found' })
  }
})

// DELETE book
router.delete('/:id', async (req: Request, res: Response) => {
  await provider.delete(req.params.id)
  res.status(204).send()
})

export default router
