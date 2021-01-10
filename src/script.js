// Pop-up
//let weather = {
//"paris": {
//temp: 19.7,
//humidity: 80
//},
//"tokyo": {
//temp: 17.3,
//humidity: 50
//},
//"lisbon": {
//temp: 30.2,
//humidity: 20
//},
//"san francisco": {
//temp: 20.9,
//humidity: 100
//},
//"moscow": {
//temp: -5,
//humidity: 20
//}
//};

//let city = prompt("Enter a City");
// city = city.toLowerCase();
//if (weather[city] !== undefined) {
      //let temperature = weather[city].temp; 
      //let tempfahrenheit = ((temperature*9/5) + 32);
      //let humidity = weather[city].humidity;

//alert(`It is currently ${temperature}°C (${tempfahrenheit}°F) degrees in ${city} with a humidity of ${humidity}%`);
//} else {
// alert(`Sorry, we don't know the weather for this city, try going to
//  https://www.google.com/search?q=weather+ ${city}`);
//}


// Search result
//function searchCity(event) {
  //event.preventDefault();
  //let cityInput = document.querySelector("#city-input");

  //let h1 = document.querySelector("h1");
  //h1.innerHTML = cityInput.value;
//}

//let searchForm = document.querySelector("form");
//searchForm.addEventListener("submit", searchCity);


// Current date
let now = new Date();

let current = document.querySelector("p .current");

let date = now.getDate();
let hours = now.getHours();
let minutes = now.getMinutes();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[now.getDay()];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
let month = months[now.getMonth()];

document.getElementById(
  "current"
).innerHTML = `${day} ${date} ${month} ${hours}:${minutes}`;

// Celsius to Fahrenheit


//Week 5 Homework
function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
}

function displayWeatherCondition(response) {
document.querySelector("#city").innerHTML = response.data.name;
document.querySelector("#current-temperature").innerHTML = Math.round(response.data.main.temp);

document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;

  document.querySelector("#feels-like").innerHTML =
    Math.round(response.data.main.feels_like);  

  document.querySelector("#high").innerHTML =
    Math.round(response.data.main.temp_max); 
  
  document.querySelector("#low").innerHTML =
    Math.round(response.data.main.temp_min);   

  celsiusTemperature = response.data.main.temp;  

  let iconElement = document.querySelector("#icon");
   iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);  
}

function dispalyForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;
  
  for (let index = 0; index < 6; index++) {
    forecast = response.data.list[index];
    
  forecastElement.innerHTML += `
    <div class="col-2" class="hours">
            <p>
            ${formatHours(forecast.dt * 1000)}
            </p>
            <img class="forecast-img" 
            src="http://openweathermap.org/img/wn/${
          forecast.weather[0].icon
        }@2x.png" 
        <div class="weather-forecast-tempterature">
          <p>
              <strong>
              ${Math.round(forecast.main.temp_max)}°
              </strong> ${Math.round(forecast.main.temp_min)}°
          </p>
        </div>
        </div>
  `;
   }
  }

function searchCity(city) {
  let apiKey = "2613244abb4a0a70a1aa2acdd9be4366";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(dispalyForecast);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "2613244abb4a0a70a1aa2acdd9be4366";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temperature");

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheiTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheiTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#current-temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

searchCity("London");
