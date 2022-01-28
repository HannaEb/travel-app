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

// Invoke POST request
const postData = (req, res) => {
    const destination = req.body.destination
    const geonamesURL = 'http://api.geonames.org/searchJSON?q='+destination+'&maxRows=1&username='+geonamesKey

    fetchData(geonamesURL)
    .then(data => {
        projectData = {
            country: data.geonames[0].countryName,
            latitude: data.geonames[0].lat,
            longitude: data.geonames[0].lng
        }
    })
    .then(() => {
        res.send(projectData)
    })
}

// POST request to API
const fetchData = async (url) => {
    const res = await fetch(url, {
        method: 'POST', 
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        }
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
