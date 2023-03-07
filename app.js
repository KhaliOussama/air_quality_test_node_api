const express = require('express')
const app = express()
const airQuality = require('./routes/airQuality')
const cron = require("node-cron");
const connectDB = require('./db/connect')
const { storeParisAirQuality } = require('./controllers/AirQuality')
require('dotenv').config()

//Middleware

app.use(express.json());


app.use('/api/v2/nearest_city', airQuality)


const job = cron.schedule('1 * * * * *', () => {
    console.log('running a task every minute');
    storeParisAirQuality();
});

job.start();

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