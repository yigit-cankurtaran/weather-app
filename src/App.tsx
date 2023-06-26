import { useState } from "react";

function App() {
  const [cityName, setCityName] = useState("");

  function formatCityName(cityName: string) {
    // format the city name to be all lowercase and replace spaces with underscores
    console.log(cityName);
    cityName = cityName.toLowerCase().replace(/ /g, "_");
    console.log(cityName);
  }

  return (
    // create a div that centers everything in a column in the middle, use tailwind
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl m-4">Hello World!</h1>
      {/* create an input field prompting user to enter a city name */}
      <input
        className="border-2 border-gray-400 rounded-lg p-1 m-4"
        onChange={(event) => setCityName(event.target.value)}
      />
      {/* create a button to submit the city name */}
      {/* calls formatCityName on click */}
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
