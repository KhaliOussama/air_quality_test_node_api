const express = require('express')

const Router = express.Router();

const { getCurrentCityAirQuality } = require('../controllers/airQuality')

Router.route('/:lon/:lat').get(getCurrentCityAirQuality)

module.exports = Router;