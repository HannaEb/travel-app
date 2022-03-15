// Declare API URLs
const geonamesURL = "http://api.geonames.org/searchJSON?q=";
const weatherbitCurrentURL = "http://api.weatherbit.io/v2.0/current?";
const weatherbitForecastURL = "http://api.weatherbit.io/v2.0/forecast/daily?";
const pixabayURL = "https://pixabay.com/api/?";

// Declare variables
let apiKeys = {};
let geonamesData = {};
let weatherbitData = {};
let pixabayData = {};

// Callback function
const handleSubmit = (event) => {
  event.preventDefault();

  const destination = document.getElementById("destination").value;
  const startDate = document.getElementById("startDate").value;
  const endDate = document.getElementById("endDate").value;
  let duration = Client.calcDays(startDate, endDate) - 1;
  let days = Client.calcDays(Date.now(), startDate);
  let day;

  days <= 7 || days > 16 ? (day = 0) : (day = days);

  Client.retrieveApiKeys()
    .then((data) => {
      apiKeys = data;
      let geonamesKey = apiKeys["geonamesKey"];
      return getData(
        geonamesURL + destination + "&maxRows=1&username=" + geonamesKey
      );
    })
    .then((data) => {
      geonamesData = { ...data.geonames[0] };

      let weatherbitKey = apiKeys["weatherbitKey"];

      if (days <= 7) {
        return getData(
          weatherbitCurrentURL +
            "lat=" +
            data.geonames[0].lat +
            "&lon=" +
            data.geonames[0].lng +
            "&key=" +
            weatherbitKey
        );
      } else {
        return getData(
          weatherbitForecastURL +
            "lat=" +
            data.geonames[0].lat +
            "&lon=" +
            data.geonames[0].lng +
            "&key=" +
            weatherbitKey
        );
      }
    })
    .then((data) => {
      weatherbitData = {
        description: data.data[day].weather.description,
        temperature: data.data[day].temp,
        date: data.data[day].datetime,
        icon: data.data[day].weather.icon,
      };

      let pixabayKey = apiKeys["pixabayKey"];

      return getData(
        pixabayURL +
          "key=" +
          pixabayKey +
          "&q=" +
          destination +
          "&image-type=photo&orientation=horizontal"
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
        duration,
        geonamesData,
        weatherbitData,
        pixabayData,
      });
    })
    .then(() => Client.updateUI());
};

// Event listener for action to be performed
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("generate").addEventListener("click", handleSubmit);
});

// GET request
const getData = async (url) => {
  const res = await fetch(url);
  try {
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("error", error);
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
