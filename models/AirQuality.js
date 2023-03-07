const mongoose = require('mongoose');


const AirQualitySchema = new mongoose.Schema({
    ts: String,
    aqius: Number,
    mainus: String,
    aqicn: Number,
    maincn: String,
},{ timestamps: true })

module.exports = mongoose.model('AirQuality', AirQualitySchema);