const http = require('http') // import http module

const app = require('./app') // import app

const { loadPlanetsData } = require('./models/planets.model') // import loadPlanetsData function

const PORT = process.env.PORT || 8000 // set port

const server = http.createServer(app) // create server

async function startServer() {
    await loadPlanetsData() // load planets data
}

server.listen(PORT, () => { // listen on port
    console.log(`Server is listening on port ${PORT}`)
})

startServer() // start server