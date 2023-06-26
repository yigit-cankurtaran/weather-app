import React from "react";
import ReactDOM from "react-dom/client";
import CurrentWeather from "./CurrentWeather.tsx";
import HourlyForecast from "./HourlyForecast.tsx";
import "./index.css";

function App() {
  const [coordinates, setCoordinates] = React.useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  return (
    <React.StrictMode>
      <CurrentWeather setCoordinates={setCoordinates} />
      {coordinates && (
        <HourlyForecast
          latitude={coordinates.latitude}
          longitude={coordinates.longitude}
        />
      )}
    </React.StrictMode>
  );
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <div className="flex flex-col jusitfy-center items-center">
    <App />
  </div>
);
