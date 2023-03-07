const express = require('express')

const Router = express.Router();

const { getCurrentCityAirQuality, getParisMostPollutedDateTime } = require('../controllers/airQuality')

//route get air quality for a current_city with longitude and latitude

Router.route('/:lon/:lat').get(getCurrentCityAirQuality)
Router.route('/paris/most/polluted').get(getParisMostPollutedDateTime)

module.exports = Router;