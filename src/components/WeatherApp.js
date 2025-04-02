import { useState } from "react";
import WeatherCard from "./WeatherCard";

const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [searchCity, setSearchCity] = useState("Lagos");

  const handleSearch = () => {
    if (city.trim() !== "") {
      setSearchCity(city);
      setCity("");
    }
  };
  return (
    
<div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-700 p-4">
  <h1 className="text-3xl font-bold text-white mb-4">Weather App</h1>

  {/* Input & Button Wrapper */}
  <div className="pt-3 max-w-md mb-10 mx-auto">
    <div className="flex items-center gap-2 sm:gap-4">
      <input
        type="text"
        placeholder="Enter city..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="flex-1 w-full sm:w-auto p-3 text-black rounded-md text-center focus:outline-none shadow-lg"
      />
      <button
        onClick={handleSearch}
        className="bg-blue-500 text-white px-5 py-3 rounded-md hover:bg-blue-600 transition"
      >
        Search
      </button>
    </div>
  </div>

  <WeatherCard city={searchCity} />
</div>

  );
};

export default WeatherApp;
