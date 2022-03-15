// Update UI
const updateUI = async () => {
  const req = await fetch("http://localhost:3001/all");
  try {
    const allData = await req.json();
    console.log(allData);
    document.getElementById("intro").innerHTML = "Your upcoming trip to ";
    document.getElementById(
      "location"
    ).innerHTML = `${allData.geonamesData.name}, ${allData.geonamesData.countryName}`;
    document.getElementById(
      "duration"
    ).innerHTML = `For ${allData.duration} nights`;
    document.getElementById(
      "date"
    ).innerHTML = `${allData.weatherbitData.date}`;
    document.getElementById(
      "weather-icon"
    ).innerHTML = `${allData.weatherbitData.icon}`;
    document.getElementById(
      "description"
    ).innerHTML = `${allData.weatherbitData.description}`;
    document.getElementById(
      "temperature"
    ).innerHTML = `${allData.weatherbitData.temperature} degrees`;
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
