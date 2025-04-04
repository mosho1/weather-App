# Weather App 🌞☔❄️

Hey there! This is my Weather App—a super fun tool that lets you check the weather for any city you want! Type a city, hit search, and boom—it shows you the weather now, the next 5 days, and a 24-hour temp graph. It’s like a magic weather toy box!

“

## What It Does

- **Search a City**: Type any city (like “Lagos” or “Tokyo”) and search for its weather.
- **Current Weather**: Shows the temp, weather type (like “clear” or “rain”), and a cool icon.
- **5-Day Forecast**: A quick peek at the next 5 days with tiny icons and temps.
- **24-Hour Trend**: A neat line graph of the temp for the next 24 hours—like a weather rollercoaster!
- **Color Themes**: Changes colors based on the weather—amber for sunny, blue for rain, purple for storms!

## How It Works

- Built with **React** to make the screen interactive.
- Uses the **OpenWeather API** for weather data (grab your own key!).
- **Chart.js** draws the awesome temp graph.

## Getting Started

Want to play with it? Here’s how to set it up!

### What You Need

- **Node.js**: Get it from [nodejs.org](https://nodejs.org/)—it’s the engine!
- **Git**: To grab my code.
- **API Key**: Sign up at [openweathermap.org](https://openweathermap.org/) for a free key.

### Steps

1. **Clone It**:
   git clone https://github.com/mosho1/weather-App.git
   cd weather-App

2. **Install**:
   npm install

3. **Add Your Key**:

- Make a `.env` file in the folder and add:
  ```
  REACT_APP_WEATHER_API_KEY=your-key-here
  ```

4. **Run It**:
   npm start

- It’ll pop up at `http://localhost:3000` in your browser!

5. **Use It**:

- Type a city in the search bar, click “Search,” and watch the weather appear!

## Cool Bits

- **Search Bar**: A fancy input box with a button to find any city’s weather.
- **Pretty Design**: A purple gradient background that looks great on phones or computers.
- **Weather Card**: Shows all the weather details with cool colors (e.g., `bg-amber-300` for sunny).
- **Smooth Graph**: The 24-hour temp line is curvy and fun.

## Files

- `WeatherApp.js`: The main app with the search bar and layout.
- `WeatherCard.js`: The weather details magic.
- `.env`: Keeps the API key secret (not in this repo!).

## Updating It

Made a change? Push it:
git add .
git commit -m "Added something cool"
git push

- Then, update the app with `npm start` again!

## Check It Out

Live at: [https://github.com/mosho1/weather-App](https://github.com/mosho1/weather-App). Clone it, run it, and tell me what you think!

## Live Demo

Check it out here: [https://weather-app-six-beta-85.vercel.app](https://weather-app-six-beta-85.vercel.app)
