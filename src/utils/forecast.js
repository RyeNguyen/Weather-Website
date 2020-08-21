const request = require("postman-request");

const forecast = (latitude, longitude, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=651d2c8f9be4651983a89fb81b21eded&query=" + latitude + "," + longitude;

    request({url, json: true}, (error, {body} = {}) => {
        if (error) {
            callback("Unable to connect to weather services!", undefined);
        } else if (body.error) {
            callback("Unable to find locations!", undefined);
        } else {
            callback(undefined, body.current.weather_descriptions[0] + ".\nIt is currently " + body.current.temperature + " degrees out. It feels like " + body.current.feelslike + " degrees out.")
        }
    })
};

module.exports = forecast;