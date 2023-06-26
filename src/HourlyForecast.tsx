import { useState, useEffect } from "react";

interface HourlyForecastData {
  hourly: {
    time: string[];
    temperature_2m: number[];
    relativehumidity_2m: number[];
    windspeed_10m: number[];
  };
}

interface HourlyForecastProps {
  latitude: number;
  longitude: number;
}

export default function HourlyForecast({
  latitude,
  longitude,
}: HourlyForecastProps) {
  const [forecastData, setForecastData] = useState<HourlyForecastData | null>(
    null
  );

  useEffect(() => {
    async function fetchForecast() {
      // fetch weather data
      const weatherResponse = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,relativehumidity_2m,windspeed_10m`
      );
      const weatherData: HourlyForecastData = await weatherResponse.json();
      setForecastData(weatherData);
    }

    fetchForecast();
  }, [latitude, longitude]);

  return (
    <div>
      <h2>Hourly Forecast:</h2>
      {forecastData && (
        <table>
          <thead>
            <tr>
              <th>Time</th>
              <th>Temperature</th>
              <th>Relative Humidity</th>
              <th>Wind Speed</th>
            </tr>
          </thead>
          <tbody>
            {forecastData.hourly.time.map((time, index) => (
              <tr key={time}>
                <td>{new Date(time).toLocaleString()}</td>
                <td>{forecastData.hourly.temperature_2m[index]}°C</td>
                <td>{forecastData.hourly.relativehumidity_2m[index]}%</td>
                <td>{forecastData.hourly.windspeed_10m[index]} m/s</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
