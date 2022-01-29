// Set up dotenv
const dotenv = require('dotenv')
dotenv.config()

// Require dependencies
const fetch = require('node-fetch')
const path = require('path')
const express = require('express')

// Start up an instance of app
const app = express()

// Configure express to use body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('dist'));

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

// Set up server
app.listen(3001, function () {
    console.log('Example app listening on port 3001!')
})

// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Declare API key variables
const geonamesKey = process.env.GEONAMES_KEY
const weatherbitKey = process.env.WEATHERBIT_KEY
const pixabayKey = process.env.PIXABAY_KEY

// Declare API URLs
const geonamesURL = 'http://api.geonames.org/searchJSON?q='
const weatherbitCurrentURL = 'http://api.weatherbit.io/v2.0/current?'
const weatherbitForecastURL = 'http://api.weatherbit.io/v2.0/forecast/daily?'
const pixabayURL = 'https://pixabay.com/api/?'

const postData = (req, res) => {
    const destination = req.body.destination
    const days = req.body.days
    let day

    if (days <= 7) {
        day = 0
    } else {
        day = days
    }

    fetchData(geonamesURL+destination+'&maxRows=1&username='+geonamesKey)
    .then(data => {
        projectData['country'] = data.geonames[0].countryName
        projectData['name'] = data.geonames[0].name
        
        if (days <= 7) {
            return fetchData(weatherbitCurrentURL+'lat='+data.geonames[0].lat+'&lon='+data.geonames[0].lng+'&key='+weatherbitKey)
        } else {
            return fetchData(weatherbitForecastURL+'lat='+data.geonames[0].lat+'&lon='+data.geonames[0].lng+'&key='+weatherbitKey)
        }
        
    })
    .then(data => {
        projectData['description'] = data.data[day].weather.description
        projectData['temperature'] = data.data[day].temp

        return fetchData(pixabayURL+'key='+pixabayKey+'&q='+destination+'&image-type=photo')
    })
    .then(data => {
        console.log(data)
        projectData['image'] = data.hits[0].webformatURL
    })
    .then(() => {
        res.send(projectData)
    })
}

// POST request to API
const fetchData = async (url) => {
    const res = await fetch(url, {
        method: 'GET'
    })
    try {
        const newData = await res.json()
        return newData
    } catch(error) {
        console.log('error', error)
    }
}

// POST route 
app.post('/postData', postData)
