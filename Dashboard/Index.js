//sets the current time
function setCurrentTime() {
  let today = new Date();
  let h = today.getHours();
  let m = today.getMinutes();
  let s = today.getSeconds();
  m = formatMinAndSec(m);
  s = formatMinAndSec(s);
  h = ((h + 11) % 12) + 1;
  document.getElementById("clock").innerHTML = h + ":" + m;
  document.getElementById("clock-seconds").innerHTML = s;
  setTimeout(setCurrentTime);
}

//adds a 0 to the end of the MM and SS place if needed
function formatMinAndSec(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

//sets the current date
function setCurrentDate() {
  let today = new Date();
  let day = today.getDay();
  let dayOfMonth = today.getDate();
  let theMonth = today.getMonth();
  let months = [
    "January",
    "Febuary",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
  ];

  let daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  document.getElementById("day-of-week").innerHTML = daysOfWeek[day] + ", ";
  document.getElementById("day-of-month").innerHTML = formatDate(dayOfMonth);
  document.getElementById("month").innerHTML = months[theMonth] + " ";
}

//formats the day of the month to have the correct ending
function formatDate(i) {
  var j = i % 10,
    k = i % 100;
  if (j == 1 && k != 11) {
    return i + "st";
  }
  if (j == 2 && k != 12) {
    return i + "nd";
  }
  if (j == 3 && k != 13) {
    return i + "rd";
  }
  return i + "th";
}

//sets the daily weather data
function setDailyWeatherData(city, lat, lon) {
  const key = "d2271c51ac924c325f42b6450e49d991";
  const URL =
    "https://api.openweathermap.org/data/2.5/onecall?units=imperial&lat=" +
    lat +
    "&lon=" +
    lon +
    "&&exclude=hourly,minutely&appid=" +
    key;
  fetch(URL)
    .then(function (resp) {
      return resp.json();
    })
    .then(function (data) {
      console.log(data);
      let max = Math.round(data["daily"][0]["temp"]["max"]);
      let min = Math.round(data["daily"][0]["temp"]["min"]);
      let sunrise = data["daily"][0]["sunrise"];
      let sunset = data["daily"][0]["sunset"];

      document.getElementById("city").innerHTML = city;
      document.getElementById("max").innerHTML = max + "°";
      document.getElementById("min").innerHTML = min + "°";
      document.getElementById("sunrise").innerHTML = formatTime(sunrise);
      document.getElementById("sunset").innerHTML = formatTime(sunset);
    })
    .catch(function () {
      console.log("error");
    });
}

//sets the current weather data
function setCurrentWeatherData(lat, lon) {
  const key = "d2271c51ac924c325f42b6450e49d991";
  const URL =
    "https://api.openweathermap.org/data/2.5/onecall?units=imperial&lat=" +
    lat +
    "&lon=" +
    lon +
    "&&exclude=hourly,minutely&appid=" +
    key;
  fetch(URL)
    .then(function (resp) {
      return resp.json();
    })
    .then(function (data) {
      console.log(data);
      let temp = Math.round(data["current"]["temp"]);
      let currentIcon = data["current"]["weather"][0]["main"];
      let sunsetTime = data["current"]["sunset"];
      document.getElementById("temp").innerHTML = temp + "°";
      console.log(currentIcon);
      formatCurrentIcon(currentIcon, sunsetTime);
    })
    .catch(function () {
      console.log("error");
    });
}

//formats current weather icon
function formatCurrentIcon(s, sunsetTime) {
  let currentTime = new Date().getTime();
  switch (s) {
    case "Thunderstorm":
      document.getElementById("currentIcon").className = "wi wi-thunderstorm";
      break;

    case "Drizzle":
      document.getElementById("currentIcon").className = "wi wi-showers";
      break;

    case "Rain":
      document.getElementById("currentIcon").className = "wi wi-rain";
      break;

    case "Snow":
      document.getElementById("currentIcon").className = "wi wi-snow";
      break;

    case "Clear":
      document.getElementById("weatherIcon").className =
        "weather-icon-more-top";
      if (currentTime > sunsetTime) {
        document.getElementById("currentIcon").className = "wi wi-day-sunny";
      } else {
        document.getElementById("currentIcon").className = "wi wi-night-clear";
      }
      break;

    case "Clouds":
      document.getElementById("weatherIcon").className =
        "weather-icon-more-top";
      document.getElementById("currentIcon").className = "wi wi-cloudy";
      break;

    default:
      document.getElementById("weatherIcon").className =
        "weather-icon-more-top";
      document.getElementById("currentIcon").className = "wi wi-dust";
  }
}

//formats the time from UNIX to HH:MM
function formatTime(unix_timestamp) {
  let date = new Date(unix_timestamp * 1000);
  let hours = date.getHours();
  hours = ((hours + 11) % 12) + 1;
  let minutes = "0" + date.getMinutes();
  return hours + ":" + minutes.substr(-2);
}

//sets current weather data every 30 minutes
window.setInterval(function () {
  this.setCurrentWeatherData();
}, 60000 * 30);

//is called when the window is loaded or refreshed
window.onload = function () {
  const lat = "41.0148";
  const lon = "-74.0120";
  this.setCurrentTime();
  this.setCurrentDate();
  this.setCurrentWeatherData(lat, lon);
  this.setDailyWeatherData("River Vale", lat, lon);
};
