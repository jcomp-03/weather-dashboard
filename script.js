// assign DOM elements to JavaScript variables
var userFormEl = document.querySelector("#form");
var userInputEl = document.querySelector("#input-location");
var currentCityDivEl = document.querySelector("#current-city-div");
var cityHeaderEl = document.querySelector("#city-header");
var cityListEl = document.querySelector("#city-list");

// store openweather API key in variable
const myWeatherApiKey = "&appid=db5c0fd2b45b6f4bb5fa58e25f4eec1d";

// check the user has at least entered a comma (",") in the input field
var checkSyntaxAndReturnArray = function (location) {
    // console.log('Inside checkSyntaxAndReturnArray');
    var hasComma = location.includes(',');

    if (hasComma) {
        let array = location.split(',').map(string => string.trim());
        console.log(array);
        return array;
    } else {
        return false;
    }
}

async function getLocationWeatherObject(locationArray) {
    // console.log('Inside getLatAndLong');
    const weatherUrl = "https://api.openweathermap.org/data/2.5/weather";
    const limit = "&limit=3";
    const locationString = locationArray.join(', ');
    // console.log('locationString is', locationString);
    const apiUrl = weatherUrl + "?q=" + locationString + limit + myWeatherApiKey;
    try {
        let response = await fetch(apiUrl);
        let data = await response.json();
        // console.log(data);
        if (data.cod === "404") {
            return;
        }
        return { data, locationString };
    } catch (error) {
        console.log(error);
    }
}

// get weather information
async function getCurrentAndForecastWeather(locationObj) {
    const lon = "&lon=" + locationObj.data.coord.lon;
    const lat = "lat=" + locationObj.data.coord.lat;
    const baseUrl = "https://api.openweathermap.org/data/2.5/onecall";
    const myUnits = "&units=imperial";
    const exclude = "&exclude=minutely,hourly,alerts";
    const apiUrl = baseUrl + "?" + lat + lon + exclude + myWeatherApiKey + myUnits;

    try {
        let response = await fetch(apiUrl);
        let data = await response.json();
        return data;
    } catch (error) {
        console.log(error);

    }
};

function displayWeather(weatherObj, inputLocation) {
    // cityHeaderEl.innerHTML = 
    const details = `
    <p class="" id="city-header">
        ${inputLocation} (approx. lat/long: ${Math.round(weatherObj.lat)} / ${Math.round(weatherObj.lon)})
    </p>
    <hr>
    <div class="d-flex flex-column flex-">
        <ul class="border col-6" id="city-list">
            <li>Temperature: ${Math.round(weatherObj.current.temp)} °F (feels like ${Math.round(weatherObj.current.feels_like)} °F)</li>
            <li>Humidity: ${weatherObj.current.humidity} %</li>
            <li>Wind speed: ${weatherObj.current.wind_speed} mph (gusting ${weatherObj.current.wind_gust ? Math.round(weatherObj.current.wind_gust) : 0})</li>
            <li>UV index: ${weatherObj.current.uvi}</li>
        </ul>
        <img class="border col-6" src="http://openweathermap.org/img/wn/${weatherObj.current.weather[0].icon}@2x.png">
    </div>
    
    `
    currentCityDivEl.innerHTML = details;
}

// function to handle user submission
async function formSubmitHandler(event) {
    // prevent default behavior of browser to refresh web page upon user submission
    event.preventDefault();
    // remove whitespace from both ends of string
    const location = "Miami, Florida, USA";
    // const location = userInputEl.value.trim();
    var locationObject = {};
    // check to make sure user entered some string
    if(!location) {
        alert("Empty string detected. Please enter a location.");
    }else{
        // reset input field value to empty string
        userInputEl.value = "";
        // check for syntax and return array
        var inputSplitArray = checkSyntaxAndReturnArray(location);
        if(!inputSplitArray) {
            alert("It appears you did not enter the information as required."
                + "\nEnter the city,state(,country) separating them with a comma."
                + "\nFor example: Des Moines,Iowa,USA");
        }else{
            locationObject = await getLocationWeatherObject(inputSplitArray);
            console.log('locationObject is', locationObject);

            locationObject ?
            weatherData = await getCurrentAndForecastWeather(locationObject) :
            alert("It appears there was a problem in the process of carrying out the search."
            + "\nThis is likely an Error 404: resource not found. Please try your search again.");
            
            console.log(weatherData);
            displayWeather(weatherData, locationObject.locationString)
        }
    }
}

userFormEl.addEventListener("submit", formSubmitHandler);

// userInputEl.addEventListener("keyup", (e) => {
//     console.log(e.target.value);
// })