const request = require('request')

const forecast = (latitude, longitude, callback) => {

    const url = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + encodeURIComponent(latitude) + '&lon=' + encodeURIComponent(longitude) + '&exclude=hourly,daily&appid=80eb7407b0e304fabc60232a3ea053fc'

    console.log(url)
    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (response.body.error) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined,
                'The temperature now is ' + Math.round((JSON.stringify(response.body.current.temp-272.15)*100)/100).toFixed(2) + ' degree Celcius and the weather is ' + JSON.stringify(response.body.current.weather[0].description)
            )
        }
    })
}


module.exports = forecast