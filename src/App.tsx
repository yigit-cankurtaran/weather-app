import { useState } from "react";

async function fetchCoordinates(cityName: string) {
  const response = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=1&limit=1`
  );
  const data = await response.json();
  console.log(data);
  // get "latitude" and "longitude" from data
  const result = data.results[0];
  const latitude = result.latitude;
  const longitude = result.longitude;
  console.log(latitude, longitude);
}

function App() {
  const [cityName, setCityName] = useState("");

  function formatCityName(cityName: string) {
    // format the city name to be all lowercase and replace spaces with underscores
    console.log(cityName);
    cityName = cityName.toLowerCase().replace(/ /g, "_");
    console.log(cityName);

    // fetch coordinates for city
    fetchCoordinates(cityName);
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
    </div>
  );
}

export default App;
