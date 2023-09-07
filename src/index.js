function search(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  searchCity(city);
}

function searchCity(city) {
  let apiKey = "6f578b96aa9505bcce148ac22cb85794";
  let units = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayTemperature);
}

function displayTemperature(response) {
  console.log(response);
  let cityName = document.querySelector("#city");
  cityName.innerHTML = response.data.name;
  let currentTemp = Math.round(response.data.main.temp_max);
  let currentHighTemp = document.querySelector("#current-HighTemp");
  currentHighTemp.innerHTML = `${currentTemp}`;
  let currentLow = Math.round(response.data.main.temp_min);
  let currentLowTemp = document.querySelector("#current-LowTemp");
  currentLowTemp.innerHTML = `${currentLow}`;
}

function showPosition(position) {
  let apiKey = "6f578b96aa9505bcce148ac22cb85794";
  let units = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayTemperature);
}
function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}
let button = document.querySelector("#current-locationbtn");
button.addEventListener("click", getCurrentPosition);

//Feature #1 from Lesson 4, week 5
let now = new Date();
//console.log(now);
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let currentDay = days[now.getDay()];
let currentTime = document.querySelector("#time");
currentTime.innerHTML = `${currentDay},${hours}:${minutes}`;
let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

function convertToFahrenheit(event) {
  event.preventDefault();
  let tempConversion = document.querySelector("#current-HighTemp");
  let tConversion = document.querySelector("#current-LowTemp");
  tempConversion.innerHTML = 66;
  tConversion.innerHTML = 60;
}

function convertToCelcius(event) {
  event.preventDefault();
  let tempConversion = document.querySelector("#current-HighTemp");
  let tConversion = document.querySelector("#current-LowTemp");
  tempConversion.innerHTML = 25;
  tConversion.innerHTML = 28;
}

let fahrenheitLink = document.querySelector("#fahrenheitLink");
fahrenheitLink.addEventListener("click", convertToFahrenheit);
let celciusLink = document.querySelector("#celciusLink");
celciusLink.addEventListener("click", convertToCelcius);
