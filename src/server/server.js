// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('dist'));

// Setup Server
const port = 3000;

const listening = () => {
    console.log('server running');
    console.log(`running on localhost: ${port}`);
}

const server = app.listen(port, listening)

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
