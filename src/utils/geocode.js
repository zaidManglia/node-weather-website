const request = require('request')

const access_token = 'pk.eyJ1IjoiemFpZC1raGFuLTEyMyIsImEiOiJjbDNnMmR3aDQwYXBiM2N0NXFqdzE2aGtyIn0.ckENFS6c4TPDI-ojNeBsvw'

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?limit=1&access_token=' + access_token

    request({ url, json: true }, (error, {body}) => {
        const {features} = body
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: features[0].center[1],
                longitude: features[0].center[0],
                location: features[0].place_name
            })
            
        }
    })
}

module.exports = geocode
