import express from 'express'
import bodyParser from 'body-parser'
import bookRouter from './routes/books.js'
import cors from 'cors'

const server = express()
const port = 3000

server.use(cors())
server.use(bodyParser.json())

server.use('/books', bookRouter)

server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
})
