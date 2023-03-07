//AirQuality Model

const mongoose = require('mongoose');

/* Schema for database withoout validation cuz it's just a TEST */

const AirQualitySchema = new mongoose.Schema({
    city: String,
    ts: String,
    aqius: Number,
    mainus: String,
    aqicn: Number,
    maincn: String,
},{ timestamps: true })

// export the AirQualitySchema 

module.exports = mongoose.model('AirQuality', AirQualitySchema);