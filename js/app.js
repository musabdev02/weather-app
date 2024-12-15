// DOM
const userSearch = document.getElementById("userSearch");
const getData = document.querySelector(".search_inps button");
const search_form = document.querySelector(".search_form");
// main
const main = document.querySelector(".main");
const searchAnother = document.querySelector(".main button");
const locationTitle = document.getElementById("locationTitle");
const chancesOfRain = document.getElementById("chancesOfRain");
const weatherIcon = document.getElementById("weatherIcon");
const locationTemp = document.getElementById("locationTemp");
const uvIndex = document.getElementById("uvIndex");
const wind = document.getElementById("wind");
const humidity = document.getElementById("humidity");
const visibility = document.getElementById("visibility");
const feelsLike = document.getElementById("feelsLike");
const pressure = document.getElementById("pressure");
// Search
const search_history = document.querySelector(".search_history");
const history_container = document.querySelector(".history_container");
const histroyTitle = document.querySelector(".histroy_content h4");
const historyTemp = document.querySelector(".history_card h2");


// others
let usrInp;
let uTitle;
let uTemp;
// get the data API
const fetchWeather = async (city) => {
    const API_KEY = "e9f0eb3b47eae03cf027f9a5ab69936c";
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    try {
        const res = await fetch(URL);
        if (res.cod !== 200) {
            console.log("error")
        }
        else {
            const data = await res.json();
            locationTitle.textContent = data.name;
            locationTemp.textContent = `${data.main.temp.toFixed(2)}°`;
            wind.textContent = `${data.wind.speed}km/h`;
            humidity.textContent = `${data.main.humidity}%`;
            visibility.textContent = `${(Math.floor(data.visibility / 1000))}km`;
            feelsLike.textContent = `${data.main.feels_like}°`;
            pressure.textContent = `${data.main.pressure}hPa`;

            data.weather[0].main.toLowerCase() === "mist" ? weatherIcon.src = "assets/mist.png" : "assets/clear.png";
            data.weather[0].main.toLowerCase() === "clear" ? weatherIcon.src = "assets/clear.png" : "assets/clear.png";
            data.weather[0].main.toLowerCase() === "clouds" ? weatherIcon.src = "assets/clouds.png" : "assets/clear.png";
            data.weather[0].main.toLowerCase() === "drizzle" ? weatherIcon.src = "assets/drizzle.png" : "assets/clear.png";
            data.weather[0].main.toLowerCase() === "hummidity" ? weatherIcon.src = "assets/hummidity.png" : "assets/clear.png";
            data.weather[0].main.toLowerCase() === "rain" ? weatherIcon.src = "assets/rain.png" : "assets/clear.png";
            data.weather[0].main.toLowerCase() === "snow" ? weatherIcon.src = "assets/snow.png" : "assets/clear.png";
            data.weather[0].main.toLowerCase() === "wind" ? weatherIcon.src = "assets/wind.png" : "assets/clear.png";
            uTitle = locationTitle.textContent;
            uTemp = locationTemp.textContent;
            historyCards();

        }
    } catch (error) {
        console.error(error);
    }
};

getData.addEventListener("click", () => {
    usrInp = userSearch.value.toLowerCase();
    if (usrInp !== "") {
        search_form.style.display = "none";
        main.style.display = "flex";
        fetchWeather(usrInp);
    }
});

// 
const historyCards = () => {
    const userHistory = JSON.parse(localStorage.getItem("userHistory")) ?? [];
    userHistory.push({
        title: uTitle,
        temp: uTemp
    });
    localStorage.setItem("userHistory", JSON.stringify(userHistory));
};
const createhistoryCards = (title, temp) => {
    const historyRaw = `<div class="histroy_content">
    <h4>${title}</h4>
    <p>10:24</p>
  </div>
  <h2>${temp}</h2>`;
    const newElem = document.createElement("div");
    newElem.classList.add("history_card", "dp_flex");
    newElem.innerHTML = historyRaw;
    history_container.appendChild(newElem);
};

const appendCardInDom = () => {
    const searchHistory = JSON.parse(localStorage.getItem("userHistory"));
    if (searchHistory !== null) {
        search_history.style.display = "block";
        searchHistory.forEach(element => {
            createhistoryCards(element.title, element.temp);
        });
    }
};

window.onload = appendCardInDom;