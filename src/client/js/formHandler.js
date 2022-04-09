// Declare API URLs
const geonamesURL = "http://api.geonames.org/searchJSON?q=";
const weatherbitCurrentURL = "http://api.weatherbit.io/v2.0/current?";
const weatherbitForecastURL = "http://api.weatherbit.io/v2.0/forecast/daily?";
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
  let days = Client.calcDays(Date.now(), startDate.value);
  let day;
  let countryCode;

  days <= 7 || days > 16 ? (day = 0) : (day = days);

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

      if (days <= 7) {
        return getData(
          `${weatherbitCurrentURL}lat=${data.geonames[0].lat}&lon=${data.geonames[0].lng}&key=${weatherbitKey}`
        );
      } else {
        return getData(
          `${weatherbitForecastURL}lat=${data.geonames[0].lat}&lon=${data.geonames[0].lng}&key=${weatherbitKey}`
        );
      }
    })
    .then((data) => {
      weatherbitData = { ...data.data[day] };

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
    .then(() => Client.updateUI())
    .then(() => Client.hideLoader())
    .then(() => Client.revealInfo());
};

// Event listener for action to be performed
document.addEventListener("DOMContentLoaded", () => {
  submitBtn.addEventListener("click", handleSubmit);
});

// GET request
const getData = async (url) => {
  const res = await fetch(url);
  try {
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

// POST request
const postData = async (url = "", data = {}) => {
  const res = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    body: JSON.stringify(data),
  });
  try {
    const newData = await res.json();
    return newData;
  } catch (error) {
    console.log("error", error);
  }
};

export { handleSubmit };
