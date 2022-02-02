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

export { retrieveApiKeys }
