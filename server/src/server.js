const http = require('http') // import http module
const mongoose = require('mongoose') // import mongoose module

const app = require('./app') // import app

const { loadPlanetsData } = require('./models/planets.model') // import loadPlanetsData function

const PORT = process.env.PORT || 8000 // set port

const MONGO_URL = "mongodb+srv://nasa-api:3DypZXECg6pomri6@nasa-cluster.w1zi9zp.mongodb.net/?retryWrites=true&w=majority"

const server = http.createServer(app) // create server

mongoose.connection.once('open', () => {
    console.log('MongoDB is connected!')
})

mongoose.connection.on('error', (err) => {
    console.error(err)
})

async function startServer() {
    await mongoose.connect(MONGO_URL) // connect to MongoDB
    await loadPlanetsData() // load planets data
}

server.listen(PORT, () => { // listen on port
    console.log(`Server is listening on port ${PORT}`)
})

startServer() // start server