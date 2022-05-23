const request = require('request')

const access_key = '97f851f44dfc985186a5d2e2fa5188a4'

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=' + access_key + '&query=' + latitude + ',' + longitude + '&units=m'

    request({ url, json: true }, (error, {body}) => {
        const {current} = body
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            console.log('Unable to find location.', undefined)
        } else {
            callback(undefined, current.weather_descriptions[0] + '. It is ' + current.temperature + ' out there. It feels like ' + current.feelslike + ' out.')
        }
    })
}

module.exports = forecast