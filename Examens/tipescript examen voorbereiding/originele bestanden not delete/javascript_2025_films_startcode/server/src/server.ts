import express from 'express'
import movieRouter from './routes/movies.ts'
import bodyParser from 'body-parser'
import cors from 'cors'

const server = express()
const port = 3000

server.use(cors())
server.use(bodyParser.json())

server.use('/movies', movieRouter)

server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
})
