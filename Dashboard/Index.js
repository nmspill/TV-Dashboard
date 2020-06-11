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
function setDailyWeatherData(city, lat, lon, key) {
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

      let day1 = data["daily"][1]["dt"];
      let day2 = data["daily"][2]["dt"];
      let day3 = data["daily"][3]["dt"];
      let day4 = data["daily"][4]["dt"];
      let day5 = data["daily"][5]["dt"];
      let day6 = data["daily"][6]["dt"];

      let temp1 = Math.round(data["daily"][1]["temp"]["day"]);
      let temp2 = Math.round(data["daily"][2]["temp"]["day"]);
      let temp3 = Math.round(data["daily"][3]["temp"]["day"]);
      let temp4 = Math.round(data["daily"][4]["temp"]["day"]);
      let temp5 = Math.round(data["daily"][5]["temp"]["day"]);
      let temp6 = Math.round(data["daily"][6]["temp"]["day"]);

      let icon1 = data["daily"][1]["weather"][0]["main"];
      let icon2 = data["daily"][2]["weather"][0]["main"];
      let icon3 = data["daily"][3]["weather"][0]["main"];
      let icon4 = data["daily"][4]["weather"][0]["main"];
      let icon5 = data["daily"][5]["weather"][0]["main"];
      let icon6 = data["daily"][6]["weather"][0]["main"];

      document.getElementById("day1").innerHTML = setForecastDate(day1);
      document.getElementById("day2").innerHTML = setForecastDate(day2);
      document.getElementById("day3").innerHTML = setForecastDate(day3);
      document.getElementById("day4").innerHTML = setForecastDate(day4);
      document.getElementById("day5").innerHTML = setForecastDate(day5);
      document.getElementById("day6").innerHTML = setForecastDate(day6);

      document.getElementById("temp1").innerHTML = temp1 + "°";
      document.getElementById("temp2").innerHTML = temp2 + "°";
      document.getElementById("temp3").innerHTML = temp3 + "°";
      document.getElementById("temp4").innerHTML = temp4 + "°";
      document.getElementById("temp5").innerHTML = temp5 + "°";
      document.getElementById("temp6").innerHTML = temp6 + "°";

      document.getElementById("icon1").className = setForecastIcon(icon1);
      document.getElementById("icon2").className = setForecastIcon(icon2);
      document.getElementById("icon3").className = setForecastIcon(icon3);
      document.getElementById("icon4").className = setForecastIcon(icon4);
      document.getElementById("icon5").className = setForecastIcon(icon5);
      document.getElementById("icon6").className = setForecastIcon(icon6);
    })
    .catch(function () {
      console.log("error");
    });
}

//sets the current weather data
function setCurrentWeatherData(lat, lon, key) {
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
      document.getElementById("currentIcon").className = setCurrentIcon(
        currentIcon,
        sunsetTime
      );
    })
    .catch(function () {
      console.log("error");
    });
}

//formats current weather icon
function setCurrentIcon(s, sunsetTime) {
  let currentTime = new Date().getTime();
  switch (s) {
    case "Thunderstorm":
      return "wi wi-thunderstorm";

    case "Drizzle":
      return "wi wi-showers";

    case "Rain":
      return "wi wi-rain";

    case "Snow":
      return "wi wi-snow";

    case "Clear":
      document.getElementById("weatherIcon").className =
        "weather-icon-more-top";
      if (currentTime < sunsetTime) {
        return "wi wi-day-sunny";
      } else {
        return "wi wi-night-clear";
      }

    case "Clouds":
      document.getElementById("weatherIcon").className =
        "weather-icon-more-top";
      return "wi wi-cloudy";

    default:
      document.getElementById("weatherIcon").className =
        "weather-icon-more-top";
      return "wi wi-dust";
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

function setForecastDate(unix_timestamp) {
  days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let date = new Date(unix_timestamp * 1000);
  return days[date.getDay()];
}

function setForecastIcon(s) {
  switch (s) {
    case "Thunderstorm":
      return "wi wi-thunderstorm";

    case "Drizzle":
      return "wi wi-showers";

    case "Rain":
      return "wi wi-rain";

    case "Snow":
      return "wi wi-snow";

    case "Clear":
      return "wi wi-day-sunny";

    case "Clouds":
      return "wi wi-cloudy";

    default:
      return "wi wi-dust";
  }
}

//sets current weather data every 30 minutes
window.setInterval(function () {
  this.setCurrentWeatherData();
}, 60000 * 30);

//is called when the window is loaded or refreshed
window.onload = function () {
  const key = "d2271c51ac924c325f42b6450e49d991";
  const lat = "41.0148";
  const lon = "-74.0120";
  this.setCurrentTime();
  this.setCurrentDate();
  this.setCurrentWeatherData(lat, lon, key);
  this.setDailyWeatherData("River Vale", lat, lon, key);
};
