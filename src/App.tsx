import { useState } from "react";

async function fetchCoordinates(cityName: string) {
  const response = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${cityName}`
  );
  const data = await response.json();
  console.log(data);
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
