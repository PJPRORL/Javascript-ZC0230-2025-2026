import express from 'express'
import ticketRouter from './routes/tickets.ts'
import favoriteRouter from './routes/favorites.ts'
import bodyParser from 'body-parser'
import cors from 'cors'

const server = express()
const port = 3000

server.use(cors())
server.use(bodyParser.json())

server.use('/tickets', ticketRouter)
server.use('/favorites', favoriteRouter)

server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
})
