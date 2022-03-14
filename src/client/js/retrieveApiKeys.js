// Get API keys from server
const retrieveApiKeys = async () => {
  let apiKeys = {};
  const req = await fetch("http://localhost:3001/api");
  try {
    const keys = await req.json();
    return (apiKeys = {
      geonamesKey: keys.geonamesKey,
      weatherbitKey: keys.weatherbitKey,
      pixabayKey: keys.pixabayKey,
    });
  } catch (error) {
    console.log("error", error);
  }
};

export { retrieveApiKeys };
