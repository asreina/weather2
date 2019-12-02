const path =  require('path')
const express =  require('express')
const hbs =  require('hbs')
const geocode =  require('./utlis/geocode')
const forecast =  require('./utlis/forecast')

const app = express()

//Define the paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup HBS

app.set('views engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup statc directory
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
  res.rendor('index', {
    title: 'Weather',
    name: 'Lamar Jackson'
  })
})

//create route for support
app.get('/support', function(req, res){
  res.render('support',);
});

//create route for about

app.get('/about', function(req, res){
  res.render('about', );
});

//create 404 route

//weather route
app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide an address'
    })
  }

  geocode(req.query.address, (error,{ latitude, longitude, location}) => {
    if (error) {
       return res.send({ error })
    }

    forecast(latitude, longitude, (error, forecastData) => {
      if (error){
        return res.send({ error })
      }
      res.send({
        forecast: forecastData,
        location,
        address: req.query.address
      })
    })
  })
})

//Product Route
app.get('/products', (req, res) => {
  if (!req.query.search)
  return res.send({
    error: 'You must prove a search query'
  })

  console.log(req.query.search)
  res.send({
    products: []
  })
})

app.use(function(req, res, next){
	res.status(404);
        res.render('404');
});

app.listen(3000, () => {
  console.log('Server is  up on port 3000');
})
