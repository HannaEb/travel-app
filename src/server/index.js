// Set up dotenv
const dotenv = require('dotenv')
dotenv.config()

// Setup empty JS object to act as endpoint for all routes
let projectData = {}

// Declare API key variables
let apiKeys = {
    geonamesKey: process.env.GEONAMES_KEY,
    weatherbitKey: process.env.WEATHERBIT_KEY,
    pixabayKey: process.env.PIXABAY_KEY
}

// Require Express to run server and routes
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

// GET API keys
const getApiKeys = (req, res) => {
    res.send(apiKeys)
}

app.get('/api', getApiKeys)

// GET route
const sendData = (req, res) => {
    res.send(projectData)
}

app.get('/all', sendData)

// POST route
const addData = (req, res) => {
    let newData = req.body;
    console.log('Server Data:')
    console.log(newData)
    projectData['geonamesData'] = newData.geonamesData
    projectData['weatherbitData'] = newData.weatherbitData
    projectData['pixabayData'] = newData.pixabayData
}

app.post('/add', addData)
