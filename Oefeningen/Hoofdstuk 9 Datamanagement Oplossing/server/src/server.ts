import express from 'express'
import booksRouter from './routes/books'
import authorsRouter from './routes/authors'
import seriesRouter from './routes/series'
import bodyParser from 'body-parser'
import cors from 'cors'

const server = express()
const port = 3000

server.use(cors())
server.use(bodyParser.json())

server.use('/books', booksRouter)
server.use('/authors', authorsRouter)
server.use('/series', seriesRouter)

server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
})
