const http = require('http') // import http module

require('dotenv').config() // import dotenv module

const app = require('./app') // import app
const { mongoConnect } = require('./services/mongo')
const { loadPlanetsData } = require('./models/planets.model')
const { loadLaunchData } = require('./models/launches.model')

const PORT = process.env.PORT || 8000 // set port

const server = http.createServer(app) // create server

async function startServer() {
    await mongoConnect()
    await loadPlanetsData() // load planets data
    await loadLaunchData() // load launch data

    server.listen(PORT, () => {
        // listen on port
        console.log(`Server is listening on port ${PORT}`)
    })
}

startServer() // start server