import React, { useState } from "react";
import WeatherApp from "./components/WeatherApp";
import WeatherCard from "./components/WeatherCard";

function App() {
  const [searchCity, setSearchCity] = useState("Lagos"); // Default city or use empty string

  return (
    <div className="App">
      <WeatherApp setSearchCity={setSearchCity} /> 
      {/* <WeatherCard city={searchCity} /> */}
    </div>
  );
}

export default App;
