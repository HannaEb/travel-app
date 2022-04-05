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
    const weatherHTML = `
      <div class="weather-card" id="weather">
        <p class="weather-card__date" id="date">${allData.weatherbitData.datetime}</p>
        <p class="weather-card__desc" id="description">${allData.weatherbitData.weather.description}</p>
        <p class="weather-card__temp" id="temperature">${allData.weatherbitData.temp} degrees</p>
      </div>
    `;
    weatherContainer.insertAdjacentHTML("beforeend", weatherHTML);

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
