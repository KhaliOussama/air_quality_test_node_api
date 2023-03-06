const express = require('express')
const app = express()
const airQuality = require('./routes/airQuality')
const cron = require("node-cron");

app.use('/api/v2/nearest_city', airQuality)


const job = cron.schedule('* 1 * * *', () => {
    console.log('running a task every minute');
}, {
    scheduled: true,
});

job.start();

const port = 3000
app.listen(port)
