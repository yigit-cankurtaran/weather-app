import { useState } from "react";

interface WeatherData {
  hourly: {
    temperature_2m: number[];
    relativehumidity_2m: number[];
    windspeed_10m: number[];
  };
}

interface CurrentWeatherProps {
  setCoordinates: (
    coordinates: {
      latitude: number;
      longitude: number;
    } | null
  ) => void;
}

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
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,relativehumidity_2m,windspeed_10m`
  );
  const weatherData: WeatherData = await weatherResponse.json();

  return { latitude, longitude, weatherData };
}

export default function CurrentWeather({
  setCoordinates,
}: CurrentWeatherProps) {
  const [cityName, setCityName] = useState("");
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  async function formatCityName(cityName: string) {
    // format the city name to be all lowercase and replace spaces with underscores
    cityName = cityName.toLowerCase().replace(/ /g, "_");

    // fetch coordinates and weather data for city
    const data = await fetchCoordinates(cityName);
    setWeatherData(data.weatherData);
    setCoordinates({ latitude: data.latitude, longitude: data.longitude });
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
          <p>Temperature: {weatherData.hourly.temperature_2m[0]}°C</p>
          <p>Relative Humidity: {weatherData.hourly.relativehumidity_2m[0]}%</p>
          <p>Wind Speed: {weatherData.hourly.windspeed_10m[0]} m/s</p>
        </div>
      )}
    </div>
  );
}
