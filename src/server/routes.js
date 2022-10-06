// Set up dotenv for environment variables
const dotenv = require("dotenv");
dotenv.config();

// Require Node Fetch for API calls
const fetch = require("node-fetch");

// Declare API key variables
const geonamesKey = process.env.GEONAMES_KEY;
const weatherbitKey = process.env.WEATHERBIT_KEY;
const pixabayKey = process.env.PIXABAY_KEY;

// Declare API URL variables
const geonamesURL = process.env.GEONAMES_URL;
const weatherbitURL = process.env.WEATHERBIT_URL;
const pixabayURL = process.env.PIXABAY_URL;
const countriesURL = process.env.COUNTRIES_URL;

module.exports = (app) => {
  const addData = async (req, res) => {
    try {
      const { destination, duration } = req.body;

      const resGeonames = await fetch(
        `${geonamesURL + destination}&maxRows=1&username=${geonamesKey}`
      );
      if (!resGeonames.ok) throw new Error("Problem getting data");
      const geonamesVar = await resGeonames.json();

      const geonamesData = { ...geonamesVar.geonames[0] };
      const countryCode = geonamesData.countryCode;

      const resWeatherbit = await fetch(
        `${weatherbitURL}lat=${geonamesVar.geonames[0].lat}&lon=${geonamesVar.geonames[0].lng}&key=${weatherbitKey}`
      );
      if (!resWeatherbit.ok) throw new Error("Problem getting data");
      const weatherbit = await resWeatherbit.json();

      const weatherbitData = { ...weatherbit.data[0] };

      const resCountries = await fetch(`${countriesURL}${countryCode}`);
      if (!resCountries.ok) throw new Error("Problem getting data");
      const countries = await resCountries.json();

      const countryData = { ...countries[0] };

      const resPixabay = await fetch(
        `${pixabayURL}key=${pixabayKey}&q=${destination}&image-type=photo&orientation=horizontal`
      );
      if (!resPixabay.ok) throw new Error("Problem getting data");
      const pixabay = await resPixabay.json();

      const pixabayData = {
        imageOne: pixabay.hits[0].webformatURL,
        imageTwo: pixabay.hits[1].webformatURL,
        imageThree: pixabay.hits[2].webformatURL,
      };

      const projectData = {
        geonamesData,
        weatherbitData,
        pixabayData,
        countryData,
        duration,
      };

      res.send(projectData);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  app.get("/", (req, res) => {
    res.sendFile("dist/index.html");
  });

  app.post("/all", addData);
};
