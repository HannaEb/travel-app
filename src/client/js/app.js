// Declare API URLs
const geonamesURL = 'http://api.geonames.org/searchJSON?q='
const weatherbitCurrentURL = 'http://api.weatherbit.io/v2.0/current?'
const weatherbitForecastURL = 'http://api.weatherbit.io/v2.0/forecast/daily?'
const pixabayURL = 'https://pixabay.com/api/?'

const travelDate = document.getElementById('date').value

// Declare variables
let apiKeys = {}
let geonamesData = {}

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();

// Callback function
const performAction = (event) => {
    event.preventDefault();

    const destination = document.getElementById('destination').value  

    retrieveApiKeys()
    .then(() => {
        let geonamesKey = apiKeys['geonamesKey']
        return getData(geonamesURL+destination+'&maxRows=1&username='+geonamesKey)
    })
    .then(data => {
        geonamesData = {
            city: data.geonames[0].name,
            country: data.geonames[0].countryName
        }
    })
    .then(() => {
        postData('http://localhost:3001/add', { 
            geonamesData
        })
    })
    .then(() => updateUI());
}

// Event listener for action to be performed
document.getElementById('generate').addEventListener('click', performAction);

// Get API keys from server
const retrieveApiKeys = async () => {
    const req = await fetch('http://localhost:3001/api')
    try {
        const keys = await req.json()
        apiKeys = {
            geonamesKey: keys.geonamesKey,
            weatherbitKey: keys.weatherbitKey,
            pixabayKey: keys.pixabayKey
        }
    } catch(error) {
        console.log('error', error)
    }
}

// GET request to OpenWeatherMap
const getData = async (url) => {
    const res = await fetch(url);
    try {
        const data = await res.json();
        return data;
    } catch(error) {
        console.log('error', error)
    }
}

// POST request
const postData = async (url = '', data = {}) => {
    const res = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    try {
        const newData = await res.json();
        return newData;
    } catch(error) {
        console.log('error', error)
    }
}

// update UI
const updateUI = async () => {
    const req = await fetch('http://localhost:3001/all')
    try {
        const allData = await req.json()
        document.getElementById('city').innerHTML = allData.geonamesData.city;
        document.getElementById('country').innerHTML = allData.geonamesData.country
    } catch(error) {
        console.log('error', error)
    }
}

// Calculate countdown
const calcDays = (start, end) => {
    const startDate = new Date(start)
    const endDate = new Date(end)

    const days = Math.round((endDate - startDate) / (1000 * 60 * 60 * 24) + 1)
    console.log('Days till departure:')
    console.log(days)
    return days
}

export { performAction }
