function startTime() {
  let today = new Date();
  let h = today.getHours();
  let m = today.getMinutes();
  let s = today.getSeconds();
  m = checkTime(m);
  s = checkTime(s);
  h = ((h + 11) % 12) + 1;
  document.getElementById("clock").innerHTML = h + ":" + m;
  document.getElementById("clock-seconds").innerHTML = s;
  setTimeout(startTime);
}

function checkTime(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

function startDate() {
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
    "Wedday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  document.getElementById("day-of-week").innerHTML = daysOfWeek[day] + ", ";
  document.getElementById("day-of-month").innerHTML = formatDate(dayOfMonth);
  document.getElementById("month").innerHTML = months[theMonth] + " ";
}

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

function getDayWeatherData(city) {
  const key = "d2271c51ac924c325f42b6450e49d991";
  const URL =
    "https://api.openweathermap.org/data/2.5/onecall?units=imperial&lat=41.0148&lon=-74.0120&&exclude=hourly,minutely&appid=" +
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

function setCurrentTemp() {
  const key = "d2271c51ac924c325f42b6450e49d991";
  const URL =
    "https://api.openweathermap.org/data/2.5/onecall?units=imperial&lat=41.0148&lon=-74.0120&&exclude=hourly,minutely,daily&appid=" +
    key;
  fetch(URL)
    .then(function (resp) {
      return resp.json();
    })
    .then(function (data) {
      console.log(data);
      let temp = Math.round(data["current"]["temp"]);
      document.getElementById("temp").innerHTML = temp + "°";
    })
    .catch(function () {
      console.log("error");
    });
}

function formatTime(unix_timestamp) {
  let date = new Date(unix_timestamp * 1000);
  let hours = date.getHours();
  hours = ((hours + 11) % 12) + 1;
  let minutes = "0" + date.getMinutes();
  return hours + ":" + minutes.substr(-2);
}

window.setInterval(function () {
  this.setCurrentTemp();
}, 60000 * 30);

window.onload = function () {
  this.startTime();
  this.startDate();
  this.setCurrentTemp();
  this.getDayWeatherData("River Vale");
};
