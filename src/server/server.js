// Set up dotenv
const dotenv = require("dotenv");
dotenv.config();

// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Declare API key variables
let apiKeys = {
  geonamesKey: process.env.GEONAMES_KEY,
  weatherbitKey: process.env.WEATHERBIT_KEY,
  pixabayKey: process.env.PIXABAY_KEY,
};

// Require Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();

app.use(express.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

// Initialize the main project folder
app.use(express.static("dist"));

// GET API keys
const getApiKeys = (req, res) => {
  res.send(apiKeys);
};

app.get("/api", getApiKeys);

// POST route
const addData = (req, res) => {
  projectData = { ...req.body };
};

app.post("/add", addData);

// GET route
const sendData = (req, res) => {
  res.send(projectData);
};

app.get("/all", sendData);

module.exports = app;
