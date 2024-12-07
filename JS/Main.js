let searchInput = document.querySelector("#Search");
let searchbtn = document.querySelector("#submit");
let alertMsg = document.querySelector("#alertMsg");

searchInput.addEventListener("input", function () {
    let city = searchInput.value;
    if (city) {
        getWeather(city);
    }
});

getWeather("cairo");

let allWeather = []

async function getWeather(city) {
    try {
        alertMsg.classList.add("d-none")
        let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=054b0161f4d34d1d855153330240412&q=${city}&days=3`);

        if (response.ok) {
            let data = await response.json();
            displayData(data.forecast.forecastday, city);

        } else {
            alertMsg.classList.remove("d-none")
        }
    }
    catch (error) {
        alertMsg.classList.remove("d-none")
    }
}
function displayData(allWeather, city) {
    let cartona = "";
    const days = getUpcomingDays();

    cartona += `<div class="row justify-content-center">`;

    for (let i = 0; i < allWeather.length; i++) {
        let dayData = allWeather[i];
        let dayName = days[i];

        if (i === 0) {
            cartona += `
            <div class="col-lg-4 col-md-6 col-sm-12 day-first">
                <div class=" today ${dayName}">
                    <div class="d-flex align-items-center justify-content-between bg-first ${dayName.toLowerCase()}">
                        <div>${dayName}</div>
                        <div class="date">${dayData.date}</div>
                    </div>
                    <p class="cairo p-3 fs-3">${city}</p>
                    <p class="temp ps-3">${dayData.day.avgtemp_c}°C</p>
                    <img class="weather-icon p-3" src="https:${dayData.day.condition.icon}" alt="weather icon">
                    <p class="text-info ps-3">${dayData.day.condition.text}</p>
                    <span class="icon-monday"><img src="./icon-umberella.png" alt="umbrella"> 20%</span>
                    <span class="icon-monday"><img src="./icon-wind.png" alt="wind"> 18km/h</span>
                    <span class="icon-monday"><img src="./icon-compass.png" alt="compass"> East</span>
                </div>
            </div>
        `;
        } else if (i === 1) {
            cartona += `
            <div class="col-lg-4 col-md-6 col-sm-12">
                <div class="day-second ${dayName} text-center">
                    <div class="pt-5">
                        <div class="bg-tues mb-3 ${dayName.toLowerCase()}">${dayName}</div>
                        <span><img src="https:${dayData.day.condition.icon}" alt="weather icon" class="mb-5"></span>
                        <p class="text-white fs-3 mb-5">${dayData.day.avgtemp_c}°C</p>
                        <p class="temp-day mb-5">${dayData.day.mintemp_c}°</p>
                        <p class="text-info mb-5">${dayData.day.condition.text}</p>
                    </div>
                </div>
            </div>
        `;
        } else {
            cartona += `
            <div class="col-lg-4 col-md-6 col-sm-12">
                <div class="day-first ${dayName} text-center">
                    <div class="pt-5">
                        <div class="bg-wed mb-3 ${dayName.toLowerCase()}">${dayName}</div>
                        <span><img src="https:${dayData.day.condition.icon}" alt="weather icon" class="mb-5"></span>
                        <p class="text-white fs-3 mb-5">${dayData.day.avgtemp_c}°C</p>
                        <p class="temp-day mb-5">${dayData.day.mintemp_c}°</p>
                        <p class="text-info mb-5">${dayData.day.condition.text}</p>
                    </div>
                </div>
            </div>
        `;
        }
    }
    document.getElementById("row-id").innerHTML = cartona;
}

function getUpcomingDays() {
    const today = new Date();
    const days = [];
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    for (let i = 0; i < 3; i++) {
        const nextDay = new Date(today);
        nextDay.setDate(today.getDate() + i);
        days.push(dayNames[nextDay.getDay()]);
    }
    return days;
}

