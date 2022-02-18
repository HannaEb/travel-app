// Update UI
const updateUI = async () => {
    const req = await fetch('http://localhost:3001/all')
    try {
        const allData = await req.json()
        document.getElementById('intro').innerHTML = 'Your upcoming trip to: '
        document.getElementById('location').innerHTML = allData.geonamesData.city + ', ' + allData.geonamesData.country
        document.getElementById('duration').innerHTML = allData.duration + ' nights'
        document.getElementById('weather').innerHTML = 'Weather conditions:'
        document.getElementById('description').innerHTML = allData.weatherbitData.description
        document.getElementById('temperature').innerHTML = allData.weatherbitData.temperature + ' degrees'
        document.getElementById('image-1').src = allData.pixabayData.imageOne
        document.getElementById('image-2').src = allData.pixabayData.imageTwo
        document.getElementById('image-3').src = allData.pixabayData.imageThree
    } catch(error) {
        console.log('error', error)
    }
}

export { updateUI }
