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
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})

// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// GET route
const sendData = (req, res) => {
    res.send(projectData)
}

app.get('/all', sendData);

// POST route
const addData = (req, res) => {
    let newData = req.body;
    projectData['temperature'] = newData.temperature;
    projectData['date'] = newData.date;
    projectData['userResponse'] = newData.userResponse;
}

app.post('/add', addData);
