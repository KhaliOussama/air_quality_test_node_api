const request = require('request');
const AirQuality = require('../models/AirQuality')

require('dotenv').config()

const getCityAirQuality = (longitude, latitude) =>  {
    return options = {
        url: `http://api.airvisual.com/v2/nearest_city?lat=${latitude}&lon=${longitude}&key=${process.env.AIR_QUALITY_API_KEY}`,
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Accept-Charset': 'utf-8'
        }
    };
  }
const getCurrentCityAirQuality = (req, res, next) => {
    const { lat, lon } = req.params
    const options = getCityAirQuality(lon, lat)
    request(options, (error, response, body)=>{
        let json = JSON.parse(body);
        const { pollution } = json.data.current
        res.status(200).json({result: {pollution} })
    });
}

const storeParisAirQuality = async (req, res) => {
    const options = getCityAirQuality(2.352222, 48.856613)
    await request(options, (error, response, body)=>{
        let json = JSON.parse(body);
        const { pollution } = json.data.current
        const airQuality = AirQuality.create({ pollution });
        return
    });
}

module.exports = {
    getCurrentCityAirQuality,
    storeParisAirQuality
}