const path = require('path')
const express = require('express') // import express (web server)
const cors = require('cors') // import cors (cross-origin resource sharing)
const morgan = require('morgan') // import morgan (logging)

const planetsRouter = require('./routes/planets/planets.router') // import planets router
const launchesRouter = require('./routes/launches/launches.router') // import launches router

const app = express() // create express app

app.use(
        cors({
            origin: 'http://localhost:3000',
        })
    ) // enable cors

app.use(morgan('combined')) // enable logging

app.use(express.json()) // parse incoming JSON data
app.use(express.static(path.join(__dirname, '..', 'public'))) // serve static files from public directory

app.use('/planets', planetsRouter) // root path is /planets
app.use('/launches', launchesRouter) // root path is /launches
app.get('/*', (req, res) => { //! IMPORTANT: handle all other routes (React Router)
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'))
})

module.exports = app