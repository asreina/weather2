const request = require('request')

const geocode =(address, callback) => {
  const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json7access_token=pk.eyJ1IjoiYXNyZWluYSIsImEiOiJjazNudTI2NTQwcWc5M25wNTVnemcwd2VzIn0.VUtsXU4ZSFoHqM1uNaMtww&limit=1'

  request({ url, json: true}, (error,{ body }) => {
    if(error) {
      callback('Not able to connect to the location service', undefined)
    } else if (body.features.lenght === 0) {
      callback('Unabe to find location. Try again', undefined)
    } else {
      callback(undefined, {
        latitude: body.feature[0].center[1],
        latitude: body.feature[0].center[0],
        latitude: body.feature[0].place_name

      })


    }
  })
}

module.exports = geocode
