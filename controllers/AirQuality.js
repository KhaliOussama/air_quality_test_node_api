const { response } = require('express');
const axios = require('axios');
const AirQuality = require('../models/AirQuality')
require('dotenv').config()

// local function to get any city air quality using longitude and latitude as parameters, added to prevent redundancy

const getCityAirQuality = async (longitude, latitude) => {
    const api_uri = `http://api.airvisual.com/v2/nearest_city?lat=${latitude}&lon=${longitude}&key=${process.env.AIR_QUALITY_API_KEY}`
    try {
        return await axios.get(api_uri)

    } catch (error) {
        console.error(error)
    }
        
}

// method to get current city air quality; this is called by the route of getting any city air quality 

const getCurrentCityAirQuality = async (req, res) => {
    const { lat, lon } = req.params
    const result = await getCityAirQuality(lon, lat)
    const { pollution } = result.data.data.current
    res.status(200).json({ result: { pollution } })
}

// method to get Paris air quality, this is called by the cron job  

const storeParisAirQuality = async (req, res) => {
    const result = await getCityAirQuality(2.352222, 48.856613);
    const { pollution } = result.data.data.current
    try {
        const airQuality = await AirQuality.create({ ...pollution, city: "Paris" });
        return

    } catch (err) {
        console.log(err)
    }
}
// get the date time when the paris zone is the most polluted

const getParisMostPollutedDateTime = async (req, res) => {
    try {
        const airQuality = await AirQuality.findOne({ city: "Paris" }).sort('-aqius').limit(1);
        const { ts } =  airQuality
        res.status(200).json({dateTime : ts})
    } catch (err) {
        console.log(err)
    }
}
module.exports = {
    getCurrentCityAirQuality,
    storeParisAirQuality,
    getParisMostPollutedDateTime
}