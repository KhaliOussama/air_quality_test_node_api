const request = require('request');

const getCurrentCityAirQuality = (req, res) => {
    const { lat, lon} = req.params
    let options = {
        url: `http://api.airvisual.com/v2/nearest_city?lat=${lat}&lon=${lon}&key=159f6143-d91b-4b4d-8f4b-f356db6bba61`,
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Accept-Charset': 'utf-8'
        }
    };
    request(options, (error, response, body)=>{
        let json = JSON.parse(body);
        console.log(json); 
        const { pollution } = json.data.current
        res.status(200).json({result: {pollution} })
    });
}

module.exports = {
    getCurrentCityAirQuality
}