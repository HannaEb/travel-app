// Update UI
const updateUI = async () => {
  const req = await fetch("http://localhost:3001/all");
  try {
    const allData = await req.json();
    const { geonamesData, weatherbitData, pixabayData, countryData, duration } =
      allData;
    console.log(allData);

    // Update destination details
    const introContainer = document.querySelector(".heading");
    const introHTML = `
      <p class="heading__intro">Your upcoming trip to</p>
      <h2 class="secondary-heading">${geonamesData.name}, ${geonamesData.countryName}</h2>
      <p class="heading__duration">For ${duration} nights</p>
    `;
    introContainer.insertAdjacentHTML("beforeend", introHTML);

    // Update destination information
    const infoContainer = document.querySelector(".info-container");
    const weatherDate = new Date(weatherbitData.datetime.slice(0, 10));
    const infoHTML = `
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
          <p class="info-card__desc">🌦️ ${
            weatherbitData.weather.description
          }</p>
          <p class="info-card__temp">🌡️ ${weatherbitData.temp} &#176C</p>
        </div>
      </div>
    `;
    infoContainer.insertAdjacentHTML("beforeend", infoHTML);

    // Update image slider
    const slideContainer = document.querySelectorAll(".slider__slide");
    let slideHTML;

    const images = [
      `${pixabayData.imageOne}`,
      `${pixabayData.imageTwo}`,
      `${pixabayData.imageThree}`,
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
      <a href = https://www.tripadvisor.com/Search?q=${geonamesData.name} class="btn btn--standard" id="btn-tripadvisor" target="_blank"
        >More on Tripadvisor &rarr;</a
      >
    `;
    tripadvisorContainer.insertAdjacentHTML("beforeend", tripadvisorHTML);
  } catch (error) {
    console.log("error", error);
  }
};

export { updateUI };
