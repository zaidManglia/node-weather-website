const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Andrew Mead'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Andrew Mead'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        help: 'I am in trouble. Please help me',
        contact: '0000000000',
        title: 'Help',
        name: 'Andrew Mead'
    })
})


app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({error: 'You must provide an address'})
    }

    const address = req.query.address

    geocode(address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            console.log(forecastData)
            console.log(location)
            console.log(address)

            return res.send({
                forecast: forecastData,
                location,
                address
            })
        })
    })

})

app.get('/help/*' , (req, res) => {
    res.render('error', {
        error: 'Help article not found',
        name: 'Andrew Mead',
        title: '404'
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        error: 'Page not found',
        name: 'Andrew Mead',
        title: '404'
    })
})

app.listen(3000, () => {
    console.log('Server is up on 3000')
})