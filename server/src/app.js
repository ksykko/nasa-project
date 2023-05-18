const express = require('express') // import express

const cors = require('cors') // import cors

const planetsRouter = require('./routes/planets/planets.router') // import planets router

const app = express() // create express app

app.use(cors({
        origin: 'http://localhost:3000'
    })) // enable cors
app.use(express.json()) // parse incoming JSON data
app.use(planetsRouter)


module.exports = app