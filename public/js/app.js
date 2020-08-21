const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-one");
const messageTwo = document.querySelector("#message-two");
const img = document.querySelector("#weather-img");

weatherForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const location = search.value;

    messageOne.textContent = "Loading...";
    messageTwo.textContent = "";

    fetch("/weather?address=" + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error;
            } else {
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecast;
                if (data.forecast.includes("Partly cloudy")) {
                    img.src = "./img/partly_cloudy_day.svg";
                } else if (data.forecast.includes("Clear") || data.forecast.includes("Sunny")) {
                    img.src = "./img/sun.svg";
                } else if (data.forecast.includes("Rain") || data.forecast.includes("rain")) {
                    img.src = "./img/rain.svg";
                } else if (data.forecast.includes("Thunderstorm")) {
                    img.src = "./img/storm.svg";
                } else if (data.forecast.includes("Overcast")) {
                    img.src = "./img/windy_weather.svg";
                } else if (data.forecast.includes("Snow") || data.forecast.includes("snow")) {
                    img.src = "./img/snow.svg";
                } else if (data.forecast.includes("Haze")) {
                    img.src = "./img/fog.svg";
                } else {
                    img.src = "./img/autumn.svg";
                }
            }
        })
    });
});