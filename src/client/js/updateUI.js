// Update UI
const updateUI = async () => {
  const req = await fetch("http://localhost:3001/all");
  try {
    const allData = await req.json();
    document.getElementById("intro").innerHTML = "Your upcoming trip to ";
    document.getElementById(
      "location"
    ).innerHTML = `${allData.geonamesData.name}, ${allData.geonamesData.countryName}`;
    document.getElementById(
      "duration"
    ).innerHTML = `For ${allData.duration} nights`;
    document.getElementById(
      "date"
    ).innerHTML = `${allData.weatherbitData.datetime}`;
    document.getElementById(
      "weather-icon"
    ).innerHTML = `${allData.weatherbitData.weather.icon}`;
    document.getElementById(
      "description"
    ).innerHTML = `${allData.weatherbitData.weather.description}`;
    document.getElementById(
      "temperature"
    ).innerHTML = `${allData.weatherbitData.temp} degrees`;
    document.getElementById("image-1").src = `${allData.pixabayData.imageOne}`;
    document.getElementById("image-2").src = `${allData.pixabayData.imageTwo}`;
    document.getElementById(
      "image-3"
    ).src = `${allData.pixabayData.imageThree}`;
    document.getElementById(
      "btn-tripadvisor"
    ).href = `https://www.tripadvisor.com/Search?q=${allData.geonamesData.city}`;
  } catch (error) {
    console.log("error", error);
  }
};

export { updateUI };
