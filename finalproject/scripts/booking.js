// Fetch live weather for Harare (mocked for local use)
const weatherInfo = document.getElementById("weather-info");

async function getWeather() {
  try {
    const res = await fetch("https://api.open-meteo.com/v1/forecast?latitude=-17.83&longitude=31.05&current_weather=true");
    const data = await res.json();
    const temp = data.current_weather.temperature;
    const wind = data.current_weather.windspeed;
    weatherInfo.innerText = `Temperature: ${temp}°C, Wind: ${wind} km/h`;
  } catch (e) {
    weatherInfo.innerText = "Unable to load weather.";
    console.error("Weather fetch error:", e);
  }
}

document.addEventListener("DOMContentLoaded", getWeather);

// Booking form validation and submission (example only)
document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  alert("Booking submitted! We'll contact you shortly.");
});