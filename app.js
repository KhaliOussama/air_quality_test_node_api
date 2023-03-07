const express = require('express')
const app = express()
const airQuality = require('./routes/airQuality')
const cron = require("node-cron");
const connectDB = require('./db/connect')
const { storeParisAirQuality } = require('./controllers/AirQuality')
require('dotenv').config()

//Middleware

app.use(express.json());

// Base route off app
app.use('/api/v2/nearest_city', airQuality);

// cron job to get paris air quality every  minute
const job = cron.schedule('1 * * * * *', () => {
    console.log('cron job every 1 minute')
    storeParisAirQuality();
});

job.start();

// port where the app should be served
const port = 3000

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`Server is listening on port ${port}...`))
    } catch (error) {
        console.log(error)
    }
}
    
start();