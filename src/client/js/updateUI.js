// Assign variables to HTML elements
const introContainer = document.querySelector(".heading");
const infoContainer = document.querySelector(".info-container");
const slideContainer = document.querySelectorAll(".slider__slide");
const tripadvisorContainer = document.querySelector(
  ".destination__tripadvisor"
);

// Update destination details
const updateDestinationDetails = (geonamesData, duration) => {
  introContainer.innerHTML = `
  <p class="heading__intro">Your upcoming trip to</p>
  <h2 class="secondary-heading">${geonamesData.name}, ${geonamesData.countryName}</h2>
  <p class="heading__duration">For ${duration} nights</p>
  `;
};

// Update destination information
const updateDestinationInformation = (weatherbitData, countryData) => {
  const weatherDate = new Date(weatherbitData.datetime.slice(0, 10));
  infoContainer.innerHTML = `
     <div class="info-card">
       <div class="info-card__section">
         <h3 class="tertiary-heading">General Info</h3>
         <p class="info-card__continent">${countryData.continents[0]} 🌍 </p>
         <p class="info-card__language">${
           Object.values(countryData.languages)[0]
         } 💬</p>
         <p class="info-card__currency">${
           Object.values(countryData.currencies)[0].name
         } 💰</p>
       </div>
       <div class="info-card__section">
         <h3 class="tertiary-heading">Weather Info</h3>
         <p class="info-card__date">🗓️ ${weatherDate.toDateString()}</p>
         <p class="info-card__desc">🌦️ ${weatherbitData.weather.description}</p>
         <p class="info-card__temp">🌡️ ${weatherbitData.temp} &#176C</p>
       </div>
     </div>
   `;
};

// Update image slider
const updateSlider = (pixabayData) => {
  const images = [
    `${pixabayData.imageOne}`,
    `${pixabayData.imageTwo}`,
    `${pixabayData.imageThree}`,
  ];

  for (let i = 0; i < images.length; i++) {
    slideContainer[i].innerHTML = `
    <img
        src="${images[i]}"
        class="destination-img"
        onerror="this.style.display = 'none'"
      />
    `;
  }
};

// Update link to Tripadvisor
const updateTripadvisorLink = (geonamesData) => {
  tripadvisorContainer.innerHTML = `
    <a href = https://www.tripadvisor.com/Search?q=${geonamesData.name.replaceAll(
      / /g,
      "%20"
    )} class="btn btn--standard" id="btn-tripadvisor" target="_blank"
      >More on Tripadvisor &rarr;</a
    >
  `;
};

// Update UI
const updateUI = async (data) => {
  const { geonamesData, weatherbitData, pixabayData, countryData, duration } =
    data;
  try {
    updateDestinationDetails(geonamesData, duration);
    updateDestinationInformation(weatherbitData, countryData);
    updateSlider(pixabayData);
    updateTripadvisorLink(geonamesData);
  } catch (error) {
    console.log("error", error);
  }
};

export { updateUI };
