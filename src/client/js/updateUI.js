// Update UI
const updateUI = async () => {
  const req = await fetch("http://localhost:3001/all");
  try {
    const allData = await req.json();

    // Update destination details
    const introContainer = document.querySelector(".destination__details");
    const introHTML = `
      <p class="destination__intro" id="intro">Your upcoming trip to</p>
      <h2 class="secondary-heading" id="location">${allData.geonamesData.name}, ${allData.geonamesData.countryName}</h2>
      <p class="destination__duration" id="duration">For ${allData.duration} nights</p>
    `;
    introContainer.insertAdjacentHTML("beforeend", introHTML);

    // Update weather information
    const weatherContainer = document.querySelector(".destination__weather");
    const weatherDate = new Date(allData.weatherbitData.datetime.slice(0, 10));
    const weatherHTML = `
      <div class="weather-card" id="weather">
        <h3>Weather Info</h3>
        <p class="weather-card__date" id="date">${weatherDate.toDateString()}</p>
        <p class="weather-card__desc" id="description">${
          allData.weatherbitData.weather.description
        }</p>
        <p class="weather-card__temp" id="temperature">${
          allData.weatherbitData.temp
        } &#176C</p>
      </div>
    `;
    weatherContainer.insertAdjacentHTML("beforeend", weatherHTML);

    // Update general information
    const generalContainer = document.querySelector(".destination__general");
    const generalHTML = `
      <div class="general-info" id="general">
        <h3>General Info</h3>
        <p class="general-info__continent">${
          allData.countryData.continents[0]
        }</p>
        <p class="general-info__language">${
          Object.values(allData.countryData.languages)[0]
        }</p>
        <p class="general-info__currency">${
          Object.values(allData.countryData.currencies)[0].name
        }</p>
      </div>
    `;
    generalContainer.insertAdjacentHTML("beforeend", generalHTML);

    // Update image slider
    const slideContainer = document.querySelectorAll(".slide");
    let slideHTML;

    const images = [
      `${allData.pixabayData.imageOne}`,
      `${allData.pixabayData.imageTwo}`,
      `${allData.pixabayData.imageThree}`,
    ];

    for (let i = 0; i < images.length; i++) {
      slideHTML = `
      <img
          src="${images[i]}"
          class="destination-img"
          onerror="this.style.display = 'none'"
        />
      `;
      slideContainer[i].insertAdjacentHTML("beforeend", slideHTML);
    }

    // Update link to Tripadvisor
    const tripadvisorContainer = document.querySelector(".tripadvisor");
    const tripadvisorHTML = `
      <a href = https://www.tripadvisor.com/Search?q=${allData.geonamesData.name} class="btn btn--standard" id="btn-tripadvisor" target="_blank"
        >More on Tripadvisor &rarr;</a
      >
    `;
    tripadvisorContainer.insertAdjacentHTML("beforeend", tripadvisorHTML);
  } catch (error) {
    console.log("error", error);
  }
};

export { updateUI };
