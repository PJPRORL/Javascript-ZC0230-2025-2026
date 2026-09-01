import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import itemRouter from './routes/items.ts'

const server = express()
const port = 3000

server.use(cors())            // laat de frontend op poort 5173 toe
server.use(bodyParser.json()) // vult req.body bij POST/PUT

// Elke resource krijgt zijn eigen routerbestand en zijn eigen regel hier.
// Een tweede resource toevoegen = één bestand in routes/ + één regel hieronder.
server.use('/items', itemRouter)

server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
})
