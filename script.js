const apiKey = "979ce595078dd02934b7a08caa019d7b";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");

async function checkWeather(city) {
    const response = await fetch(`${apiUrl}&q=${city}&appid=${apiKey}`);
    var data = await response.json();

    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    } else {
        document.querySelector(".error").style.display = "none";
    }

    updateWeatherData(data);
}

async function checkWeatherByCoordinates(lat, lon) {
    const response = await fetch(`${apiUrl}&lat=${lat}&lon=${lon}&appid=${apiKey}`);
    var data = await response.json();

    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    } else {
        document.querySelector(".error").style.display = "none";
    }

    updateWeatherData(data);
}

function updateWeatherData(data) {
    console.log(data);

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + "km/hr";

    const image = document.querySelector(".weather-icon");
    if (data.weather[0].main == "Clouds") {
        image.src = 'images/clouds.png';
    } else if (data.weather[0].main == "Clear") {
        image.src = 'images/clear.png';
    } else if (data.weather[0].main == "Rain") {
        image.src = "images/rain.png";
    } else if (data.weather[0].main == "Mist") {
        image.src = "images/mist.png";
    } else if (data.weather[0].main == "Snow") {
        image.src = "images/snow.png";
    } else if (data.weather[0].main == "Drizzle") {
        image.src = "images/drizzle.png";
    } else {
        image.src = "images/wind.png";
    }
    document.querySelector(".weather").style.display = "block";
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            checkWeatherByCoordinates(lat, lon);
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

window.onload = getLocation;
