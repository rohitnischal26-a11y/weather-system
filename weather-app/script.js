async function getWeather() {
  const city = document.getElementById("city").value;

  const geo = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}`);
  const geoData = await geo.json();

  if (!geoData.results) {
    document.getElementById("result").innerHTML = "❌ City not found";
    return;
  }

  const lat = geoData.results[0].latitude;
  const lon = geoData.results[0].longitude;
  const name = geoData.results[0].name;

  const weather = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`);
  const weatherData = await weather.json();

  const temp = weatherData.current_weather.temperature;
  const wind = weatherData.current_weather.windspeed;

  const now = new Date();
  const date = now.toLocaleDateString();
  const time = now.toLocaleTimeString();

  let emoji = "🌤️";

  if (temp > 35) emoji = "🔥";
  else if (temp > 25) emoji = "☀️";
  else if (temp > 15) emoji = "🌤️";
  else emoji = "❄️";

  document.getElementById("result").innerHTML = `
    <h2>${name}</h2>
    <p>📅 ${date}</p>
    <p>⏰ ${time}</p>
    <h3>${emoji} ${temp}°C</h3>
    <p>💨 Wind Speed: ${wind} km/h</p>
  `;
}