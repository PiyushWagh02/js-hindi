const apiKey = "a3e41b1a1ab6ac4ae1c51bc16814550f"; // 🔑 Replace with your key

//  🔑 Replace with your key
// const apiKey = "YOUR_API_KEY"; // Replace with your OpenWeather key
const searchBtn = document.getElementById("searchBtn");
const locBtn = document.getElementById("locBtn");
const cityInput = document.getElementById("cityInput");
const weatherBox = document.getElementById("weatherBox");
const message = document.getElementById("message");

// 🔹 Change background based on weather type
function setBackground(weather) {
  let bgImage = "images/default.jpg"; // fallback

  if (weather.includes("rain")) {
    bgImage = "images/rainy.jpg";
  } else if (weather.includes("clear")) {
    bgImage = "images/sunny.jpg";
  } else if (weather.includes("cloud")) {
    bgImage = "images/cloudy.jpg";
  } else if (weather.includes("snow")) {
    bgImage = "images/snowy.jpg";
  } else if (weather.includes("thunder")) {
    bgImage = "images/storm.jpg";
  } else if (weather.includes("mist") || weather.includes("fog") || weather.includes("haze")) {
    bgImage = "images/foggy.jpg";
  }

  document.body.style.background = `url('${bgImage}') no-repeat center center/cover`;
}

// 🔹 Fetch weather data
function fetchWeather(url) {
  message.textContent = "Loading... ⏳";
  weatherBox.classList.add("hidden");

  fetch(url)
    .then(res => res.json())
    .then(data => {
      if (data.cod !== 200) {
        message.textContent = "⚠️ " + data.message;
        return;
      }

      message.textContent = "";
      weatherBox.classList.remove("hidden");

      document.getElementById("cityName").textContent = `${data.name}, ${data.sys.country}`;
      document.getElementById("weatherIcon").src =
        `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
      document.getElementById("temp").textContent =
        `🌡️ ${data.main.temp}°C (Feels like ${data.main.feels_like}°C)`;
      document.getElementById("details").textContent =
        `${data.weather[0].description}`;
      document.getElementById("extra").textContent =
        `💧 Humidity: ${data.main.humidity}% | 🌬️ Wind: ${data.wind.speed} m/s`;

      // 🌄 Set background
      setBackground(data.weather[0].main.toLowerCase());
    })
    .catch(err => {
      message.textContent = "❌ Error fetching weather.";
      console.error(err);
    });
}

// 🔹 Search by city
searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    fetchWeather(url);
  }
});

// 🔹 Search by location
locBtn.addEventListener("click", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(pos => {
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
      fetchWeather(url);
    }, () => {
      message.textContent = "⚠️ Location access denied.";
    });
  } else {
    message.textContent = "⚠️ Geolocation not supported.";
  }
});

navigator.geolocation.getCurrentPosition(console.log, console.error)


