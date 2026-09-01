import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import kaartRouter from './routes/kaarten.ts'

const server = express()
const port = 3000

server.use(cors())
server.use(bodyParser.json())

server.use('/kaarten', kaartRouter)

server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
})
