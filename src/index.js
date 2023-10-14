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
  let iconElement = document.querySelector("#icon");

  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);
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

function displayForecast() {
  let forecastElement = document.querySelector("#daily-forecast");

  let forecastHTML = `<div class="row"> 
  <h1 class="Five-Day Forecast border border-5">
  <span class="Five-Day"> 5-Day Forecast</span> 
  </h1>`;
  let days = ["Sun", "Mon", "Tues", "Wed", "Thur","Fri","Sat"];
  days.forEach(function(day){

  })
  forecastHTML =
    forecastHTML +
    `
                <div class="card-group">
                  <div class="card">
                    <div class="card-body">
                      <h2 class="time-day">
                        <div class="weather-forecast-date">
                        FRI
                        </div>
                      </h2>
                      <p class="card-text">
                        <img src="" id="icon" class="fa-solid fa-cloud-showers-heavy"> </img>
                      </p>
                    </div>

                    <div class="card-footer">
                      <small class="degree">
                      <div class="weather-forecast-temperatures">  
                       <span class="weather-forecast-temperature-max">
                        77°</span>/<span class="weather-forecast-temperature-min">73°
                      </span>
                      </div>
                      </small>
                    </div>
                  </div>
             </div>`;

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
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

displayForecast();
