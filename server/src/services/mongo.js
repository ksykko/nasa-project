const mongoose = require('mongoose')

const MONGO_URL =
    'mongodb+srv://nasa-api:3DypZXECg6pomri6@nasa-cluster.w1zi9zp.mongodb.net/?retryWrites=true&w=majority'

mongoose.connection.once('open', () => {
    console.log('MongoDB is connected!')
})

mongoose.connection.on('error', (err) => {
    console.error(err)
})

async function mongoConnect() {
    await mongoose.connect(MONGO_URL)
}

async function mongoDisconnect() {
    await mongoose.disconnect()
}

module.exports = {
    mongoConnect,
    mongoDisconnect,
}