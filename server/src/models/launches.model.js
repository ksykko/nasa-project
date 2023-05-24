const launchesDatabase = require('./launches.mongo')
const planets = require('./planets.mongo')

const DEFAULT_FLIGHT_NUMBER = 100

const launch = {
    flightNumber: 100,
    mission: 'Kepler Exploration X',
    rocket: 'Explorer IS1',
    target: 'Kepler-442 b',
    launchDate: new Date('December 5, 2030'),
    customers: ['SpaceX', 'NASA'],
    upcoming: true,
    success: true,
}

// delay saveLaunch() to give time for the database to connect
setTimeout(() => {
    saveLaunch(launch)
}, 10000)

async function existsLaunchWithId(launchId) {
    return await launchesDatabase.findOne({
        flightNumber: launchId,
    })
}

async function getLatestFlightNumber() {
    const latestLaunch = await launchesDatabase
        .findOne()
        .sort('-flightNumber')

    if (!latestLaunch) {
        return DEFAULT_FLIGHT_NUMBER
    }

    return latestLaunch.flightNumber
}

async function getAllLaunches() {
    try {
        return await launchesDatabase.find({}, {
            _id: 0,
            __v: 0,
        })
    } catch (err) {
        console.error('Could not retrieve launches from database', err)
    }
}

async function saveLaunch(launch) {
    const planet = await planets.findOne({
        keplerName: launch.target,
    })

    if (!planet) {
        throw new Error('No matching planet found')
    }

    await launchesDatabase.findOneAndUpdate({
            flightNumber: launch.flightNumber,
        },
        launch, {
            upsert: true,
        }
    )
}

async function scheduleNewLaunch(launch) {
    const newFlightNumber = await getLatestFlightNumber() + 1

    const newLaunch = Object.assign(launch, {
        flightNumber: newFlightNumber,
        customers: ['Zero to Mastery', 'NASA'],
        upcoming: true,
        success: true,
    })

    await saveLaunch(newLaunch)
}

async function abortLaunchById(launchId) {
    const aborted = await launchesDatabase.updateOne({
        flightNumber: launchId,
    }, {
        upcoming: false,
        success: false,
    })

    return aborted.modifiedCount === 1
}

module.exports = {
    existsLaunchWithId,
    getAllLaunches,
    scheduleNewLaunch,
    abortLaunchById,
}