// assign DOM elements to JavaScript variables
var userFormEl = document.querySelector("#form");
var userInputEl = document.querySelector("#input-location");

// store openweather API key in variable
const myWeatherApiKey = "&appid=db5c0fd2b45b6f4bb5fa58e25f4eec1d";

// check the user has at least entered a comma (",") in the input field
var checkSyntaxAndReturnArray = function(location){
    // console.log('Inside checkSyntaxAndReturnArray');
    var hasComma = location.includes(',');
    
    if(hasComma){
        let array = location.split(',').map( string => string.trim());
        console.log(array);
        return array;
    }else{
        return false;
    }
}

async function getLatAndLong(locationArray){
    // console.log('Inside getLatAndLong');
    const geocodeUrl = "http://api.openweathermap.org/geo/1.0/direct";
    const limit = "&limit=5";
    const locationString = locationArray.join();
    const apiUrl = geocodeUrl + "?q=" + locationString + limit + myWeatherApiKey;

    try{
        let response = await fetch(apiUrl);
        let data = await response.json();
        return data;
    }catch(error){
        console.log(error);
    }
}

// get weather information
async function getAllWeather(locationObj){
    const lon = "&lon=" + locationObj.lon;
    const lat = "lat=" + locationObj.lat;
    const baseUrl = "https://api.openweathermap.org/data/2.5/onecall";
    const myUnits = "&units=imperial";
    const exclude = "&exclude=minutely,hourly,";
    const apiUrl = baseUrl + "?" + lat + lon + exclude + myWeatherApiKey + myUnits;
    
    try{
        let response = await fetch(apiUrl);
        let data = await response.json();
        return data;
    }catch(error){
        console.log(error);
    }
};

function displayWeather(locationObj){

}

// function to handle user submission
async function formSubmitHandler(event){
    // prevent default behavior of browser to refresh web page upon user submission
    event.preventDefault();
    // remove whitespace from both ends of string
    const location = userInputEl.value.trim();
    var weatherData = {};
    // check to make sure user entered some string
    if(location){
        // reset input field value to empty string
        userInputEl.value = "";
        // check for syntax and return array
        var locationArray = checkSyntaxAndReturnArray(location);
        
        if(locationArray.length){
            const [ returnedLocation ] = await getLatAndLong(locationArray);
            weatherData = await getAllWeather(returnedLocation);
            console.log('The weather is', weatherData);

            // displayWeather(weatherData);
        }else{
            alert("It appears you did not enter the information as required."
            +"\nEnter the city,state(,country) separating them with a comma."
            +"\nFor example: Des Moines,Iowa,US or Des Moines, IA, US");
        }
        
        
    } else{
        alert("Empty string detected. Please enter a location.");
    }
}

userFormEl.addEventListener("submit", formSubmitHandler);

// userInputEl.addEventListener("keyup", (e) => {
//     console.log(e.target.value);
// })