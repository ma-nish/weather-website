const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express(); //Server configurationh1

const viewspath = path.join(__dirname, '../templates/views');
const partialspath = path.join(__dirname, '../templates/partials');
const port = process.env.PORT;

app.use(express.static(viewspath));
app.set('view engine', 'hbs');
app.set('views', viewspath);
hbs.registerPartials(partialspath);

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Manish Maurya'
  });
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Page',
    name: 'Manish Maurya'
  });
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help Page',
    name: 'Manish Maurya'
  });
})

app.get('/weather', (req, res) => {

  if (!req.query.address) {
    return res.send({
      error: 'please provide a valid address.'
    })
  }
  geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
      if (error) {
          return res.send({
            error: error
          })
      }
      forecast(latitude, longitude, (error, forecastData) => {
          if (error) {
            return res.send({
              error: error
            })
          }
          return res.send({
            location: location,
            forecast: forecastData
          })
        })
      })
})

app.get('/products', (req, res) => {

  if (!req.query.search) {
    return res.send({
      error: 'Please provide the search options'
    })
  }
  res.send({
    product: []
  })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Manish Maurya',
    errorMessage: 'Help page article not found.'
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Manish Maurya',
    errorMessage: 'Error: 404'
  })
})




app.listen(port, () => {
  console.log('Server is up on port' + port +'.');
})
