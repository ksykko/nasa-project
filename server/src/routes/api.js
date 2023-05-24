const express = require('express')

const planetsRouter = require('./planets/planets.router') // import planets router
const launchesRouter = require('./launches/launches.router') // import launches router

const api = express.Router()

api.use('/planets', planetsRouter) // root path is /planets
api.use('/launches', launchesRouter) // root path is /launches

module.exports = api