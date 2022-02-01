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
        let img = document.createElement('img')
        img.src = allData.pixabayData.image
        document.getElementById('image').appendChild(img)
    } catch(error) {
        console.log('error', error)
    }
}

export { updateUI }
