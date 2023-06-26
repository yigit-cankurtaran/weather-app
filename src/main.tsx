import React from "react";
import ReactDOM from "react-dom/client";
import CurrentWeather from "./CurrentWeather.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <CurrentWeather />
  </React.StrictMode>
);
