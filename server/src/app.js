const path = require('path')
const express = require('express') // import express (web server)
const cors = require('cors') // import cors (cross-origin resource sharing)
const morgan = require('morgan') // import morgan (logging)

const api = require('./routes/api') // import api router

const app = express() // create express app

app.use(
        cors({
            origin: 'http://localhost:3000',
        })
    ) // enable cors

app.use(morgan('combined')) // enable logging

app.use(express.json()) // parse incoming JSON data
app.use(express.static(path.join(__dirname, '..', 'public'))) // serve static files from public directory

app.use('/v1', api) // root path is /v1 (version 1 of API)

app.get('/*', (req, res) => { //! IMPORTANT: handle all other routes (React Router)
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'))
})

module.exports = app