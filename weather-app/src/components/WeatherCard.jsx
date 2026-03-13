import React from "react";

function WeatherCard({ city, temp, unit, condition }) {
//       const getIcon = () => {
//     if (condition === "Clouds") return "☁️";
//     if (condition === "Rain") return "🌧️";
//     if (condition === "Clear") return "☀️";
//     if (condition === "Snow") return "❄️";
//     return "🌤️";
//   };
  return (
    <div className="weather-card">
      <h2>{city}</h2>
      <p className="temp">
        {temp.toFixed(1)}°{unit}
      </p>
      <p>{condition}</p>
    </div>
  );
}

export default WeatherCard;