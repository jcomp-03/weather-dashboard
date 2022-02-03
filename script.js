

// assign DOM elements to JavaScript variables
var userFormEl = document.querySelector("#id-weather-form");
var userInputEl = document.querySelector("#id-input-location");
var cityArray = [];

// store openweather API key in variable
var myWeatherApiKey = "&appid=db5c0fd2b45b6f4bb5fa58e25f4eec1d";
var myUnits = "&units=imperial";
var baseUrl = "https://api.openweathermap.org/data/2.5/";

// get weather information function
var getCurrentWeather = function(cityState){
    var timeFrame = "weather"
    var apiUrl = baseUrl + timeFrame + "?q=" + cityState + myWeatherApiKey + myUnits;
    
    // contact server to fetch requested information
    fetch(apiUrl)
    .then(function(response) {
        response.json()
    .then(function(data) {
        console.log(data);
        });    
    });
};


// function to handle user submitting city name
var formSubmitHandler = function(event){
    event.preventDefault();
    var selectedCity = userInputEl.value.trim();
    // check to make sure user entered some string
    if(selectedCity) {
        getCurrentWeather(selectedCity);
        userInputEl.value = "";
    } else {
        alert("Please enter a city");
    }
}

userFormEl.addEventListener("submit", formSubmitHandler);
userInputEl.addEventListener("keyup", (e) => {
    console.log(e.target.value);
})