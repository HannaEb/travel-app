// Declare API URLs
const geonamesURL = "http://api.geonames.org/searchJSON?q=";
const weatherbitCurrentURL = "http://api.weatherbit.io/v2.0/current?";
const pixabayURL = "https://pixabay.com/api/?";
const countriesURL = "https://restcountries.com/v3.1/alpha/";

// Declare variables
const submitBtn = document.querySelector("#generate");
let apiKeys = {};
let geonamesData = {};
let weatherbitData = {};
let pixabayData = {};
let countryData = {};

// Callback function
const handleSubmit = (event) => {
  event.preventDefault();

  const destination = document.getElementById("destination");
  const startDate = document.getElementById("startDate");
  const endDate = document.getElementById("endDate");
  let duration = Client.calcDays(startDate.value, endDate.value) - 1;
  let countryCode;

  Client.retrieveApiKeys()
    .then((data) => {
      apiKeys = data;
      let geonamesKey = apiKeys["geonamesKey"];
      return getData(
        `${geonamesURL + destination.value}&maxRows=1&username=${geonamesKey}`
      );
    })
    .then((data) => {
      geonamesData = { ...data.geonames[0] };
      countryCode = geonamesData.countryCode;

      let weatherbitKey = apiKeys["weatherbitKey"];

      return getData(
        `${weatherbitCurrentURL}lat=${data.geonames[0].lat}&lon=${data.geonames[0].lng}&key=${weatherbitKey}`
      );
    })
    .then((data) => {
      weatherbitData = { ...data.data[0] };
      console.log(data);

      return getData(`${countriesURL}${countryCode}`);
    })
    .then((data) => {
      countryData = { ...data[0] };

      let pixabayKey = apiKeys["pixabayKey"];

      return getData(
        `${pixabayURL}key=${pixabayKey}&q=${destination.value}&image-type=photo&orientation=horizontal`
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
      postData("http://localhost:3001/add", {
        geonamesData,
        weatherbitData,
        pixabayData,
        countryData,
        duration,
      });

      destination.value = "";
      startDate.value = "";
      endDate.value = "";
    })
    .then(() =>
      setTimeout(() => {
        Client.updateUI()
          .then(() => Client.hideLoader())
          .then(() => Client.revealInfo());
      }, "1000")
    );
};

// Event listener for action to be performed
document.addEventListener("DOMContentLoaded", () => {
  submitBtn.addEventListener("click", handleSubmit);
});

// GET request
const getData = async (url) => {
  try {
    let res = await fetch(url);
    return await res.json();
  } catch (error) {
    console.log(error);
  }
};

// POST request
const postData = async (url = "", data = {}) => {
  try {
    let res = await fetch(url, {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch (error) {
    console.log(error);
  }
};

export { handleSubmit };
