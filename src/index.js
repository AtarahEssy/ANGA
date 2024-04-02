function refreshWeather (response){
    let temperatureElement = document.querySelector("#temperature");
        let temperature=response.data.temperature.current;
    temperatureElement.innerHTML = Math.round(temperature);

    let humidityElement = document.querySelector("#humidity");
    humidityElement.innerHTML=`${response.data.temperature.humidity}%`;

    let windSpeedElement = document.querySelector("#wind-speed");
    windSpeedElement.innerHTML=`${response.data.wind.speed}km/h`;

    let descriptionElement= document.querySelector("#description");
    descriptionElement.innerHTML=response.data.condition.description;

    let cityElement=document.querySelector("#city");
    cityElement.innerHTML=response.data.city;

    let date= new Date(response.data.time*1000);
    let timeElement=document.querySelector("#time");
    timeElement.innerHTML = formatDate(date);

    let iconElement = document.querySelector("#icon");
    console.log(response.data.condition.icon_url);
    iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" /> `;
    

    getForecast(response.data.city);


}

function formatDate(date){
      let minutes=date.getMinutes();
    let hours=date.getHours();
    let days=["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[date.getDay()];
    
    if (minutes < 10){
        minutes= `0${minutes}`;
    }

    return `${day} ${hours}:${minutes}`;
}


function searchCity(city){
let apiKey= "9e0abb01a4f2312b4c89d4atfo58c538";
let apiUrl=`https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&unit=metric`;
axios.get(apiUrl).then(refreshWeather);
}

function  handleSearchSubmit(event){
    event.preventDefault();
    let searchInput=document.querySelector("#search-form-input");
    searchCity(searchInput.value);
}

let searchFormElement=document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Paris");


function displayForecast(response){

console.log(response.data);

let forecastElement=document.querySelector("#forecast");
let days = ["Tue", "Wed", "Thur", "Fri", "Sat", "Sun"];

let forecastHtml="";

days.forEach(function(day){
   
    forecastHtml = 
    forecastHtml + `
    <div class="weather-forecast">
    <div class="forecast-1"> 
        <div class="weather-forecast-date">
        ${day}
    </div>
       <div>
        <img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/scattered-clouds-day.png" alt="" width="60" />
    </div>
    <div class="weather-forecast-temperature">
        <span class="weather-forecast-temperature-maximum"><strong>18°</strong></span>
        <span class="weather-forecast-temperature-minimum">12°</span>
    </div>
    </div>
    </div>
    `;
});

forecastElement.innerHTML= forecastHtml;

}
getForecast("Paris");


function getForecast (city){
    let apiKey= "9e0abb01a4f2312b4c89d4atfo58c538";
    let apiUrl=`https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&unit=metric`;
    axios(apiUrl).then(displayForecast);
}

