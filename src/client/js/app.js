/* Global Variables */
let baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=' + process.env.API_KEY + '&units=imperial';
const newZip = document.getElementById('zip');  
const feelings = document.getElementById('feelings');

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();

// Callback function
const performAction = (event) => {
    event.preventDefault();
    
    getWeather(baseURL, `${newZip.value}`, apiKey)

    .then(data => {
        postData('/add', { 
            temperature: data.main.temp, 
            date: newDate,
            userResponse: `${feelings.value}`
        })
    })

    .then(() => updateUI());
}

// Event listener for action to be performed
document.getElementById('generate').addEventListener('click', performAction);

// GET request to OpenWeatherMap
const getWeather = async (url, zip, key) => {
    const res = await fetch(url+zip+key);
    try {
        const data = await res.json();
        return data;
    } catch(error) {
        console.log('error', error)
    }
}

// POST request
const postData = async (url='', data ={}) => {
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
    const req = await fetch('/all')
    try {
        const allData = await req.json()
        console.log(allData)
        document.getElementById('date').innerHTML = allData.date;
        document.getElementById('temp').innerHTML = Math.round(allData.temperature)+ ' degrees';
        document.getElementById('content').innerHTML = allData.userResponse;  
    } catch(error) {
        console.log('error', error)
    }
}

export { performAction }
