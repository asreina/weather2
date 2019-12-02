const request = require('request')

const forecast =(latitude, longitude, callback) => {
  const url = 'https://api.darksky.net/forecast/bfb0b7481cdec5c20825c6080d7a6fbc/' + latitude + ',' + longitude

  request({ url, json: true}, (error,{ body }) => {
    if(error) {
      callback('Not able to connect to the weather service', undefined)
    } else if (body.error) {
      callback('Not able to find the location', undefined)
    } else {
      callback(undefined, body.daily.data[0].summary + 'It is currently' + body.currently.temperature + ' degrees out. There is a' + body.currently.precipProbability + '% Chance of rain')


    }
  })
}

module.exports = forecast
