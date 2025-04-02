import { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";

const getTheme = (condition) => {
  if (condition === "Rain") return "bg-blue-500 text-white";
  if (condition === "Thunderstorm") return "bg-purple-900 text-white";
  if (condition === "Clear") return "bg-amber-300 text-orange-900"; // New sunny variation!
  if (condition === "Snow") return "bg-gray-200 text-black";
  return "bg-gray-600 text-black";
};

const WeatherCard = ({ city }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [hourlyTemps, setHourlyTemps] = useState([]);
  const chartRef = useRef(null); // This is like a memory box for our graph
  const canvasRef = useRef(null); // This remembers where we draw the graph

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

        // Get today's weather
        const weatherRes = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );
        const weatherJson = await weatherRes.json();
        setWeatherData(weatherJson);

        // Get 5-day forecast (fixed the URL to use "forecast" instead of "weather")
        const forecastRes = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
        );
        const forecastJson = await forecastRes.json();

        // Pick one weather report per day for 5 days
        const dailyForecast = {};
        forecastJson.list.forEach((item) => {
          const date = item.dt_txt.split(" ")[0];
          if (!dailyForecast[date]) dailyForecast[date] = item;
        });
        setForecastData(Object.values(dailyForecast));

        // Get the next 24 hours of temperatures (8 reports, 3 hours each)
        const hourlyData = forecastJson.list.slice(0, 8);
        setHourlyTemps(
          hourlyData.map((item) => ({
            time: item.dt_txt.split(" ")[1].slice(0, 5),
            temp: item.main.temp,
          }))
        );
      } catch (error) {
        console.error("Error fetching weather data", error);
      }
    };
    fetchWeather();
  }, [city]);

  // This part draws the graph and makes sure it doesn’t repeat
  useEffect(() => {
    if (hourlyTemps.length > 0 && canvasRef.current) {
      // If we already have a graph, erase it first
      if (chartRef.current) {
        chartRef.current.destroy();
      }

      // Get the drawing board (canvas)
      const ctx = canvasRef.current.getContext("2d");

      // Draw a new graph
      chartRef.current = new Chart(ctx, {
        type: "line",
        data: {
          labels: hourlyTemps.map((data) => data.time), // Times on the bottom
          datasets: [
            {
              label: "Temperature (°C)",
              data: hourlyTemps.map((data) => data.temp), // Temperatures as dots
              borderColor: "#ff5733", // Orange line
              backgroundColor: "rgba(255, 87, 51, 0.2)", // Light orange fill
              borderWidth: 2,
              pointRadius: 3,
              tension: 0.4, // Makes the line curvy
            },
          ],
        },
        options: {
          responsive: true, // Fits the screen size
          maintainAspectRatio: false,
          scales: {
            y: { ticks: { font: { size: 10 } } }, // Small numbers on the side
            x: { ticks: { font: { size: 10 } } }, // Small times on the bottom
          },
          plugins: { legend: { display: false } }, // Hide the label box
        },
      });
    }
  }, [hourlyTemps]);

  return (
    <div
      className={`w-full sm:w-80 md:w-96 lg:w-[400px] xl:w-[450px] p-6 rounded-lg shadow-lg text-center mx-auto ${getTheme(
        weatherData?.weather?.[0]?.main
      )}`}
    >
      {weatherData ? (
        <>
          <h2 className="text-lg sm:text-xl font-semibold">
            {weatherData.name}
          </h2>
          <div className="flex justify-center items-center">
            <img
              src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
              alt="weather icon"
              className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain"
            />
          </div>
          <p className="text-4xl sm:text-5xl my-2">
            {Math.round(weatherData.main.temp)}°C
          </p>
          <p className="text-lg sm:text-xl">
            {weatherData.weather[0]?.description}
          </p>

          <h3 className="text-md font-semibold mt-4">5-Day Forecast</h3>
          <div className="grid grid-cols-5 gap-2 mt-2">
            {forecastData.map((day, index) => (
              <div key={index} className="bg-gray-400 p-2 rounded">
                <p className="text-xs">
                  {new Date(day.dt_txt).toLocaleDateString("en-US", {
                    weekday: "short",
                  })}
                </p>
                <img
                  src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
                  alt="weather icon"
                  className="w-8 mx-auto"
                />
                <p className="text-sm">{Math.round(day.main.temp)}°C</p>
              </div>
            ))}
          </div>

          <h3 className="text-md font-semibold mt-4">
            Temperature Trend (Next 24h)
          </h3>
          <div className="h-40">
            <canvas ref={canvasRef} className="mt-2"></canvas>
          </div>
        </>
      ) : (
        <p className="text-lg sm:text-xl">Loading...</p>
      )}
    </div>
  );
};

export default WeatherCard;
