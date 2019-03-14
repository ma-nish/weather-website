// const express = require('express');
//
// const app = express(); //Server configuration
//
// app.get('/', (req, res) => {
//   res.send({
//     name: 'Andrew',
//     age: 23
//   });
// });
//
// app.get('/about', (req, res) => {
//   res.send('<h1> About Page</h1>');
// })
//
// app.get('/help', (req, res) => {
//   res.send('<i>Help Page</i>');
// })
//
// app.get('/weather', (req, res) => {
//   res.send('Soon you will get weather information here.')
// })
//
// app.listen(3000, () => {
//   console.log('Server is up on port 3000.');
// })






// const path = require('path');
// const express = require('express');
//
// const app = express(); //Server configuration
//
// const staticPublicPath = path.join(__dirname, '../public');
//
// app.use(express.static(staticPublicPath));
//
// app.get('/weather', (req, res) => {
//   res.send('Soon you will get weather information here.')
// })
//
// app.listen(3000, () => {
//   console.log('Server is up on port 3000.');
// })







// const path = require('path');
// const express = require('express');
// const hbs = require('hbs');
//
// const app = express(); //Server configurationh1
//
// const viewspath = path.join(__dirname, '../templates/views');
// const partialspath = path.join(__dirname, '../templates/partials');
//
// app.use(express.static(viewspath));
// app.set('view engine', 'hbs');
// app.set('views', viewspath);
// hbs.registerPartials(partialspath);
//
// app.get('', (req, res) => {
//   res.render('index', {
//     title: 'Home Page',
//     name: 'Andrew Mead'
//   });
// })
//
// app.get('/about', (req, res) => {
//   res.render('about', {
//     title: 'About Page',
//     name: 'Andrew Mead'
//   });
// })
//
// app.get('/help', (req, res) => {
//   res.render('help', {
//     title: 'Help Page',
//     name: 'Andrew Mead'
//   });
// })
//
// app.get('/weather', (req, res) => {
//   res.send({
//     forcast: 'It is rainy!',
//     location: 'Noida'
//   })
// })
//
// //
// // app.get('/help/*', (req, res) => {
// //   res.send('Help page article not found.')
// // })
// //
// // app.get('*', (req, res) => {
// //   res.send('Error: <h1>404</h1>')
// // })
//
//
//
// app.get('/help/*', (req, res) => {
//   res.render('404', {
//     title: '404',
//     name: 'Andrew Mead',
//     errorMessage: 'Help page article not found.'
//   })
// })
//
// app.get('*', (req, res) => {
//   res.render('404', {
//     title: '404',
//     name: 'Andrew Mead',
//     errorMessage: 'Error: 404'
//   })
// })
//
//
//
//
// app.listen(3000, () => {
//   console.log('Server is up on port 3000.');
// })






// const path = require('path');
// const express = require('express');
// const hbs = require('hbs');
//
// const app = express(); //Server configurationh1
//
// const viewspath = path.join(__dirname, '../templates/views');
// const partialspath = path.join(__dirname, '../templates/partials');
//
// app.use(express.static(viewspath));
// app.set('view engine', 'hbs');
// app.set('views', viewspath);
// hbs.registerPartials(partialspath);
//
// app.get('', (req, res) => {
//   res.render('index', {
//     title: 'Home Page',
//     name: 'Andrew Mead'
//   });
// })
//
// app.get('/about', (req, res) => {
//   res.render('about', {
//     title: 'About Page',
//     name: 'Andrew Mead'
//   });
// })
//
// app.get('/help', (req, res) => {
//   res.render('help', {
//     title: 'Help Page',
//     name: 'Andrew Mead'
//   });
// })
//
// app.get('/weather', (req, res) => {
//   if (!req.query.address) {
//     return res.send({
//       error: 'please provide a valid address.'
//     })
//   }
//   res.send({
//     forcast: 'It is rainy!',
//     location: req.query.address
//   })
// })
//
// app.get('/products', (req, res) => {
//
//   if (!req.query.search) {
//     return res.send({
//       error: 'Please provide the search options'
//     })
//   }
//   res.send({
//     product: []
//   })
// })
// app.get('/help/*', (req, res) => {
//   res.render('404', {
//     title: '404',
//     name: 'Andrew Mead',
//     errorMessage: 'Help page article not found.'
//   })
// })
//
// app.get('*', (req, res) => {
//   res.render('404', {
//     title: '404',// app.listen(3000, () => {
//   console.log('Server is up on port 3000.');
// }fetch('http://puzzle.mead.io/puzzle')


//     name: 'Andrew Mead',
//     errorMessage: 'Error: 404'
//   })
// })
//
//
//
//







const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express(); //Server configurationh1

const viewspath = path.join(__dirname, '../templates/views');
const partialspath = path.join(__dirname, '../templates/partials');

app.use(express.static(viewspath));
app.set('view engine', 'hbs');
app.set('views', viewspath);
hbs.registerPartials(partialspath);

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Andrew Mead'
  });
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Page',
    name: 'Andrew Mead'
  });
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help Page',
    name: 'Andrew Mead'
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
    name: 'Andrew Mead',
    errorMessage: 'Help page article not found.'
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Andrew Mead',
    errorMessage: 'Error: 404'
  })
})




app.listen(3000, () => {
  console.log('Server is up on port 3000.');
})
