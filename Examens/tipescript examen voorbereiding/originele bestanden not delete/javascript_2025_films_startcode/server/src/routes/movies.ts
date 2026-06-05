import express, {Request, Response} from 'express'
import {Movie} from '../models/movie.ts'
import {v4 as uuidv4} from 'uuid'
import {FilePersistenceProvider} from '../persistence/filePersister'

const router = express.Router()
const provider = new FilePersistenceProvider<Movie>(`./src/data/movies.json`)

// GET all movies
router.get('/', async (_req: Request, res: Response) => {
  const movies = await provider.getAll()
  res.json(movies)
})

// GET movie by ID
router.get('/:id', async (req: Request, res: Response) => {
  const movie = await provider.getById(req.params.id)
  if (!movie) return res.status(404).json({error: 'Movie not found'})
  res.json(movie)
})

// CREATE movie
router.post('/', async (req: Request, res: Response) => {
  const newMovie: Movie = {...req.body, id: uuidv4()}
  await provider.create(newMovie)
  res.status(201).json(newMovie)
})

// UPDATE movie
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const updatedMovie: Movie = {...req.body, id: req.params.id}
    await provider.update(req.params.id, updatedMovie)
    res.json(updatedMovie)
  } catch {
    res.status(404).json({error: 'Movie not found'})
  }
})

// DELETE movie
router.delete('/:id', async (req: Request, res: Response) => {
  await provider.delete(req.params.id)
  res.status(204).send()
})

export default router
