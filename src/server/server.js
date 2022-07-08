// Set up dotenv
const dotenv = require("dotenv");
dotenv.config();

// Setup empty JS object to act as endpoint for all routes
let projectData = {};
let geonamesData = {};
let weatherbitData = {};
let pixabayData = {};
let countryData = {};

// Declare API key variables
const geonamesKey = process.env.GEONAMES_KEY;
const weatherbitKey = process.env.WEATHERBIT_KEY;
const pixabayKey = process.env.PIXABAY_KEY;

// Declare API URL variables
const geonamesURL = process.env.GEONAMES_URL;
const weatherbitURL = process.env.WEATHERBIT_URL;
const pixabayURL = process.env.PIXABAY_URL;
const countriesURL = process.env.COUNTRIES_URL;

// Require Node Fetch for API calls
const fetch = require("node-fetch");

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

const addData = (req, res) => {
  const destination = req.body.destination;
  const duration = req.body.duration;
  let countryCode;

  getData(`${geonamesURL + destination}&maxRows=1&username=${geonamesKey}`)
    .then((data) => {
      geonamesData = { ...data.geonames[0] };
      countryCode = geonamesData.countryCode;

      return getData(
        `${weatherbitURL}lat=${data.geonames[0].lat}&lon=${data.geonames[0].lng}&key=${weatherbitKey}`
      );
    })
    .then((data) => {
      weatherbitData = { ...data.data[0] };

      return getData(`${countriesURL}${countryCode}`);
    })
    .then((data) => {
      countryData = { ...data[0] };

      return getData(
        `${pixabayURL}key=${pixabayKey}&q=${destination}&image-type=photo&orientation=horizontal`
      );
    })
    .then((data) => {
      pixabayData = {
        imageOne: data.hits[0].webformatURL,
        imageTwo: data.hits[1].webformatURL,
        imageThree: data.hits[2].webformatURL,
      };
    })
    .then(() => {
      projectData = {
        geonamesData,
        weatherbitData,
        pixabayData,
        countryData,
        duration,
      };
    })
    .then(() => {
      res.send(projectData);
    });
};

const getData = async (url) => {
  try {
    let res = await fetch(url);
    return await res.json();
  } catch (error) {
    console.log(error);
  }
};

app.post("/all", addData);

module.exports = app;
