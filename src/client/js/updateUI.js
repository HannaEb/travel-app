// Update UI
const updateUI = async () => {
    const req = await fetch('http://localhost:3001/all')
    try {
        const allData = await req.json()
        document.getElementById('city').innerHTML = allData.geonamesData.city
        document.getElementById('country').innerHTML = allData.geonamesData.country
        document.getElementById('duration').innerHTML = allData.duration
        document.getElementById('description').innerHTML = allData.weatherbitData.description
        document.getElementById('temperature').innerHTML = allData.weatherbitData.temperature
        document.getElementById('locationImage').src = allData.pixabayData.image
    } catch(error) {
        console.log('error', error)
    }
}

export { updateUI }
