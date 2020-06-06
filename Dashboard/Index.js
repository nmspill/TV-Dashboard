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

    let daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wedday", "Thursday", "Friday", "Saturday"];

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

// KEY = "d2271c51ac924c325f42b6450e49d991";
// location = "River Vale, US";


window.onload = function () {
    this.startTime();
    this.startDate();
};
