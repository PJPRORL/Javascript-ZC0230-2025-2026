import express, {Request, Response} from 'express'
import {Highscore} from '../models/highscore'
import {v4 as uuidv4} from 'uuid'
import {FilePersistenceProvider} from '../persistence/filePersister'

const router = express.Router()
const provider = new FilePersistenceProvider<Highscore>(`./src/data/highscores.json`)

// GET all highscores
router.get('/', async (_req: Request, res: Response) => {
  const highscores = await provider.getAll()
  highscores.sort((a, b) => {
    const aSplit = a.time.split(':')
    const totalSecondsA = Number(aSplit[0]) * 60 + Number(aSplit[1])

    const bSplit = b.time.split(':')
    const totalSecondsB = Number(bSplit[0]) * 60 + Number(bSplit[1])

    return totalSecondsA - totalSecondsB
  })


  res.json(highscores)
})

// GET highscore by ID
router.get('/:id', async (req: Request, res: Response) => {
  const highscore = await provider.getById(req.params.id)
  if (!highscore) return res.status(404).json({error: 'Highscore not found'})
  res.json(highscore)
})

// CREATE highscore
router.post('/', async (req: Request, res: Response) => {
  const newHighscore: Highscore = {...req.body, id: uuidv4()}
  await provider.create(newHighscore)
  res.status(201).json(newHighscore)
})

// UPDATE highscore
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const updatedHighscore: Highscore = {...req.body, id: req.params.id}
    await provider.update(req.params.id, updatedHighscore)
    res.json(updatedHighscore)
  } catch {
    res.status(404).json({error: 'Highscore not found'})
  }
})

// DELETE highscore
router.delete('/:id', async (req: Request, res: Response) => {
  await provider.delete(req.params.id)
  res.status(204).send()
})

export default router
