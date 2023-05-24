const fs = require('fs')
const path = require('path')
const { parse } = require('csv-parse')

const planets = require('./planets.mongo')

/*
    Check if planet is habitable.
    @param {Object} planet Planet to check.
    @returns {Boolean} True if planet is habitable, false otherwise.
*/
function isHabitablePlanet(planet) {
    return (
        planet['koi_disposition'] === 'CONFIRMED' &&
        planet['koi_insol'] > 0.36 &&
        planet['koi_insol'] < 1.11 &&
        planet['koi_prad'] < 1.6
    )
}


/*
    Load planets data from CSV file.
    @returns {Promise} Promise object.
*/
function loadPlanetsData() {
    return new Promise((resolve, reject) => {
        fs.createReadStream(
                path.join(__dirname, '..', '..', 'data', 'kepler_data.csv')
            )
            .pipe(
                parse({
                    comment: '#',
                    columns: true,
                })
            )
            .on('data', async(data) => {
                if (isHabitablePlanet(data)) {
                    savePlanet(data)
                }
            })
            .on('error', (err) => {
                console.log(err)
                reject(err)
            })
            .on('end', async() => {
                const countPlanetsFound = (await getAllPlanets()).length
                console.log(
                    `${countPlanetsFound} habitable planets found!`
                )
                resolve()
            })
    })
}

/*
    Get all planets from MongoDB.
    @returns {Array} All planets.
*/
async function getAllPlanets() {
    return await planets.find({}, {
        '_id': 0,
        '__v': 0,
    })
}

/*
    Save planet to MongoDB.
    @param {Object} planet Planet to save.
*/
async function savePlanet(planet) {
    try {
        await planets.updateOne({
            keplerName: planet.kepler_name
        }, {
            keplerName: planet.kepler_name
        }, {
            upsert: true
        })
    } catch (err) {
        console.error(`Could not save planet ${err}`)
    }
}

module.exports = {
    loadPlanetsData,
    getAllPlanets,
}