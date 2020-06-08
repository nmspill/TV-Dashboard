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
    "https://api.openweathermap.org/data/2.5/weather?units=imperial&q=" +
    city +
    "&appid=" +
    key;
  fetch(URL)
    .then(function (resp) {
      return resp.json();
    })
    .then(function (data) {
      console.log(data);
      let temp = Math.round(data["main"]["temp"]);
      let temp_min = Math.round(data["main"]["temp_min"]);
      let temp_max = Math.round(data["main"]["temp_max"]);
      let sunrise = data["sys"]["sunrise"];
      let sunset = data["sys"]["sunset"];

      document.getElementById("city").innerHTML = city;
      document.getElementById("temp").innerHTML = temp + "°";
      document.getElementById("temp_min").innerHTML = temp_min + "°";
      document.getElementById("temp_max").innerHTML = temp_max + "°";
      document.getElementById("sunrise").innerHTML = formatTime(sunrise);
      document.getElementById("sunset").innerHTML = formatTime(sunset);
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

window.onload = function () {
  this.startTime();
  this.startDate();
  this.getDayWeatherData("River Vale");
};
