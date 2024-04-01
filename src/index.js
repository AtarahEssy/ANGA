function refreshWeather (response){
    let temperatureElement = document.querySelector("#temperature");
    let temperature=response.data.temperature.current;
    temperatureElement.innerHTML = Math.round(temperature);
    let cityElement=document.querySelector("#city");
    cityElement.innerHTML=response.data.city;
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