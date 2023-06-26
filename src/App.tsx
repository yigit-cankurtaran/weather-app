import { useState } from "react";

async function fetchCoordinates(cityName: string) {
  // fetch geocoding data
  const geocodingResponse = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=1&limit=1`
  );
  const geocodingData = await geocodingResponse.json();

  // get "latitude" and "longitude" from geocoding data
  const result = geocodingData.results[0];
  const latitude = result.latitude;
  const longitude = result.longitude;

  // fetch weather data
  const weatherResponse = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,relativehumidity_2m,windspeed_10m&current_weather=true`
  );
  const weatherData = await weatherResponse.json();

  return weatherData;
}

function App() {
  const [cityName, setCityName] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  async function formatCityName(cityName: string) {
    // format the city name to be all lowercase and replace spaces with underscores
    cityName = cityName.toLowerCase().replace(/ /g, "_");

    // fetch coordinates and weather data for city
    const data = await fetchCoordinates(cityName);
    setWeatherData(data);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl m-4">Hello World!</h1>
      <input
        className="border-2 border-gray-400 rounded-lg p-1 m-4"
        onChange={(event) => setCityName(event.target.value)}
      />
      <button
        className="border-2 border-gray-400 rounded-lg p-1 m-4"
        onClick={() => formatCityName(cityName)}
      >
        Submit
      </button>
      {weatherData && (
        <div>
          <h2>Current Weather:</h2>
          <p>Temperature: {weatherData.current_weather.temperature}°C</p>
          <p>
            Relative Humidity: {weatherData.current_weather.relativehumidity}%
          </p>
          <p>Wind Speed: {weatherData.current_weather.windspeed} m/s</p>
        </div>
      )}
    </div>
  );
}

export default App;
