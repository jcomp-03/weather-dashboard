// import fs from "fs";

// assign DOM elements to JavaScript variables
var userFormEl = document.querySelector("#id-weather-form");
var userInputEl = document.querySelector("#id-input-location");
var locationArray = [
    {
        "id": 4046255,
        "name": "Bay Minette",
        "state": "AL",
        "country": "US",
        "coord": {
            "lon": -87.773048,
            "lat": 30.882959
        }
    },
    {
        "id": 4046274,
        "name": "Edna",
        "state": "TX",
        "country": "US",
        "coord": {
            "lon": -96.646088,
            "lat": 28.97859
        }
    },
    {
        "id": 4046319,
        "name": "Bayou La Batre",
        "state": "AL",
        "country": "US",
        "coord": {
            "lon": -88.24852,
            "lat": 30.403521
        }
    },
    {
        "id": 4046332,
        "name": "Henderson",
        "state": "TX",
        "country": "US",
        "coord": {
            "lon": -94.799377,
            "lat": 32.153221
        }
    }];
var theCity = "";
var theState = "";

// store openweather API key in variable
var myWeatherApiKey = "&appid=db5c0fd2b45b6f4bb5fa58e25f4eec1d";
var myUnits = "&units=imperial";
var baseUrl = "https://api.openweathermap.org/data/2.5/";


// get weather information function
var getCurrentWeather = function(city, state){
    var timeFrame = "weather"
    var apiUrl = baseUrl + timeFrame + "?q=" + city + "," + state + myWeatherApiKey + myUnits;
    
    // contact server to fetch requested information
    fetch(apiUrl)
    .then(function(response) {
        response.json()
    .then(function(data) {
        console.log(data);
        });    
    });
};

// check theCity and theState string values match to a location provided by OpenWeather's API
// before fetching from the API itself
var checkCityAndState = function(city, state){
    for(var i = 0; i < locationArray.length; i++){
        if(city === locationArray[i].name && state === locationArray[i].state){
            return true;
        } else{
            return false;
        }
    }
}

// check the user has at least entered a comma (",") in the input field
// and if so, assign string values to theCity and theState variables
var checkCorrectSyntax = function(location){
    var isCorrectSyntax = location.includes(',');
    if(isCorrectSyntax){
        var splitIndexAt = location.indexOf(',');
        console.log(`splitIndexAt value is: ${splitIndexAt}`);
        theCity = location.substring(0,splitIndexAt).trim();
        theState = location.substring(splitIndexAt+1).trim();
        return true;
    } else{
        return false;
    }
}

// function to handle user submission
var formSubmitHandler = function(event){
    // prevent default behavior of browser to refresh web page upon user submission
    event.preventDefault();
    // remove whitespace from both ends of string
    var desiredLocation = userInputEl.value.trim();
    // check to make sure user entered some string
    if(desiredLocation) {
        // reset value of input field to empty string
        userInputEl.value = "";
        // check for syntax, populate variables theCity and the State,
        // and return true or false
        var isSyntaxGood = checkCorrectSyntax(desiredLocation);

        if (isSyntaxGood) {
            // if syntax is OK, check for a match of locations provided by OpenWeather's API
            var isLocationGood = checkCityAndState(theCity,theState);
            // if location is OK, fetch the current weather information
            if(isLocationGood){
                getCurrentWeather(theCity, theState);
                // maybe also include function fetch forecast weather???
            } else{
                alert(`Hmm, we're having difficulty finding your desired location at
                ${theCity} for city and ${theState}. Try again.`);
            }
        } else{
            alert(`It appears you did not
            enter the information as required. Enter the
            city,state abbreviation separating them with
            a comma. For example: Des Moines,IA`);
        }  
    } else{
        alert("Empty string detected. Please enter a city and state");
    }
}

// function to populate locationArray and use the
// array as a check against the user-provided location
// before we fetch for weather information from the
// OpenWeather API
// var populateLocationArray = function() {
//     let rawData = fs.readFileSync("citiesUsa.json");
//     // locationArray is now an array of objects of all the cities, towns, & counties
//     // in the USA that OpenWeather has cataloged on its website.
//     locationArray = JSON.parse(rawData);
//     // clear out rawData array
//     rawData = [];
// }

// run populateLocationArray upon script loading first
// populateLocationArray();

userFormEl.addEventListener("submit", formSubmitHandler);
userInputEl.addEventListener("keyup", (e) => {
    console.log(e.target.value);
})