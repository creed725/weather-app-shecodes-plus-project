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
function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "6f578b96aa9505bcce148ac22cb85794";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then((response) => {
    displayForecast(response);
    displayHourlyforecast(response.data.hourly); //Display hourly forecast
  });
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
  lowTemp = response.data.main.temp_min;
  highTemp = response.data.main.temp_max;

  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);

  getForecast(response.data.coord);
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

function formatAMPM(date) {
  let hours = date.getHours();
  let ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12;
  let strTime = hours + ampm;
  return strTime;
}
function formatHour(timestamp) {
  let date = new Date(timestamp * 1000);
  let dailyhour = formatAMPM(date);

  return dailyhour;
}

function displayHourlyforecast(hourlyData) {
  let hourlyforecastElement = document.querySelector("#hour-forecast");

  let hourlyforecastHTML = `<div class="row">
                <h1 class="Hourly Forecast border border-5">
                  <span class="Hourly"> Hourly Forecast </span>
                </h1>`;

  hourlyData = hourlyData.slice(0, 5);
  hourlyData.forEach((forecastHour) => {
    console.log({ forecastHour });
    hourlyforecastHTML += `
                <div class="card-group col">
                  <div class="card">
                    <div class="card-body">
                      <h2 class="time-day">
                      <div class="weather-forecast-hour">
                        ${formatHour(forecastHour.dt)}
                      </div>
                      </h2>
                      <p class="card-text">
                        <img src="http://openweathermap.org/img/wn/${
                          forecastHour.weather[0].icon
                        }@2x.png" id="hourly-icon" </img>
                      </p>
                    </div>

                    <div class="card-footer">
                      <small class="degree">${Math.round(
                        forecastHour.temp
                      )}°</small>
                    </div>
                  </div>
                  
                </div>
  `;
  });
  hourlyforecastHTML += `</div>`;
  hourlyforecastElement.innerHTML = hourlyforecastHTML;
}
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}
function displayForecast(response) {
  console.log(response.data);
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#daily-forecast");

  let forecastHTML = `<div class="row"> 
  <h1 class="Five-Day Forecast border border-5">
  <span class="Five-Day"> 5-Day Forecast</span> 
  </h1>`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
                <div class="card-group col">
                  <div class="card">
                    <div class="card-body">
                      <h2 class="time-day">
                        <div class="weather-forecast-date"> ${formatDay(
                          forecastDay.dt
                        )}
                        </div>
                      </h2>
                      <p class="card-text">               
                        <img src="http://openweathermap.org/img/wn/${
                          forecastDay.weather[0].icon
                        }@2x.png" id="forecast-icon"  </img>
                      </p>
                    </div>

                    <div class="card-footer">
                      <small class="degree">
                      <div class="weather-forecast-temperatures">  
                       <span class="weather-forecast-temperature-max">
                        ${Math.round(
                          forecastDay.temp.max
                        )}°</span>/<span class="weather-forecast-temperature-min">${Math.round(
          forecastDay.temp.min
        )}°
                      </span>
                      </div>
                      </small>
                    </div>
                  </div>
             </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
function formatTime(){
let now = new Date();
let currentDay = now.getDay();
let hours = now.getHours().toString().padStart(2, "0");
let minutes = now.getMinutes().toString().padStart(2, "0");

let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let currentDayName = days[currentDay];

let period = "AM";
if (hours >= 12) {
  period = "PM";
  if (hours > 12) {
    hours -= 12;
  }
}
let currentTime = document.querySelector("#time");
currentTime.innerHTML = `${currentDayName}, ${hours}:${minutes} ${period}`;
}
formatTime();
let form = document.querySelector("#search-form");
form.addEventListener("submit", search);


function convertToFahrenheit(event) {
  event.preventDefault();
  let tempConversion = document.querySelector("#current-HighTemp");
  let tConversion = document.querySelector("#current-LowTemp");
  tempConversion.innerHTML = Math.round(highTemp);
  tConversion.innerHTML = Math.round(lowTemp);
}

function convertToCelsius(event) {
  event.preventDefault();
  let tempConversion = document.querySelector("#current-HighTemp");
  let tConversion = document.querySelector("#current-LowTemp");
  tempConversion.innerHTML = Math.round(((highTemp - 32) * 5) / 9);
  tConversion.innerHTML = Math.round(((lowTemp - 32) * 5) / 9);
}

let fahrenheitLink = document.querySelector("#fahrenheitLink");
fahrenheitLink.addEventListener("click", convertToFahrenheit);
let celsiusLink = document.querySelector("#celsiusLink");
celsiusLink.addEventListener("click", convertToCelsius);

searchCity("Kansas City");
