function search(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  searchCity(city);
}

function searchCity(city) {
  let apiKey = "082d2f0ddfc4d383f1612a6be862696d";
  let units = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayTemperature);

  getForecast(city);
}
function getForecast(city) {
  console.log("Fetching forecast for city:", city); // Debugging log
  let apiKey = "082d2f0ddfc4d383f1612a6be862696d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`;

  axios
    .get(apiUrl)
    .then((response) => {
      console.log("3-Hour Forecast API Response:", response.data); // Debugging log
      displayHourlyforecast(response.data.list.slice(0, 5)); // Display hourly forecast
      displayDailyForecast(response.data.list); // Process and display daily forecast
    })
    .catch((error) => {
      console.error("Error fetching forecast data:", error); // Debugging log
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

  getForecast(response.data.name);
}

function showPosition(position) {
  let apiKey = "082d2f0ddfc4d383f1612a6be862696d";
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

  let hourlyforecastHTML = `<div class="row justify-content-center g-3">
                <h1 class="Three-Hour Forecast border border-5"> 
                  <span class="Three-Hour"> Upcoming Weather </span>
                </h1>`;

  hourlyData = hourlyData.slice(0, 5);
  hourlyData.forEach((forecastHour) => {
    console.log({ forecastHour });
    hourlyforecastHTML += `
                <div class="col-12 col-sm-6 col-md-4 col-lg-2 d-flex align-items-stretch">
                  <div class="card text-center mb-3">
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
                        forecastHour.main.temp
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
function displayDailyForecast(forecastData) {
  //console.log(response.data);
  let dailyData = {};
  forecastData.forEach((entry) => {
    let date = formatDay(entry.dt); // Showing the day of the week
    if (!dailyData[date]) {
      dailyData[date] = [];
    }
    dailyData[date].push(entry);
  });

  let forecastHTML = `<div class="row"> 
  <h1 class="Five-Day Forecast border border-5">
  <span class="Five-Day"> 5-Day Forecast</span> 
  </h1>`;

  Object.keys(dailyData).forEach((date, index) => {
    if (index < 5) {
      //Limit to 5 days
      let dayData = dailyData[date];
      let temps = dayData.map((d) => d.main.temp);
      let maxTemp = Math.max(...temps);
      let minTemp = Math.min(...temps);

      forecastHTML += `
                <div class="card-group col">
                  <div class="card">
                    <div class="card-body">
                      <h2 class="time-day">
                        <div class="weather-forecast-date"> ${date}
                        </div>
                      </h2>
                      <p class="card-text">               
                        <img src="http://openweathermap.org/img/wn/${
                          dayData[0].weather[0].icon
                        }@2x.png" id="forecast-icon"  </img>
                      </p>
                    </div>

                    <div class="card-footer">
                      <small class="degree">
                      <span class="weather-forecast-temperature-max">
                        ${Math.round(maxTemp)}°</span>/
                        <span class="weather-forecast-temperature-min">${Math.round(
                          minTemp
                        )}°
                      </span>
                      </small>
                    </div>
                  </div>
             </div>`;
    }
  });

  forecastHTML += `</div>`;
  let forecastElement = document.querySelector("#daily-forecast");
  forecastElement.innerHTML = forecastHTML;
}
function formatTime() {
  let now = new Date();
  let currentDay = now.getDay();
  let hours = now.getHours();
  let minutes = now.getMinutes().toString().padStart(2, "0");

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let currentDayName = days[currentDay];

  //Determine AM/PM
  let period = hours >= 12 ? "PM" : "AM";

  // Convert 0 (midnight) to 12 AM and 13-23 to 1-11 PM
  hours = hours % 12 || 12;

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
