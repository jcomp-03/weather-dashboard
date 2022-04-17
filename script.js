// assign DOM elements to JavaScript variables
var userFormEl = document.querySelector("#id-weather-form");
var userInputEl = document.querySelector("#id-input-location");

// store openweather API key in variable
const myWeatherApiKey = "&appid=db5c0fd2b45b6f4bb5fa58e25f4eec1d";



async function getLatAndLong(locationArray){
    console.log('Inside getLatAndLong');
    const geocodeUrl = "http://api.openweathermap.org/geo/1.0/direct";
    const limit = "&limit=5";
    const locationString = locationArray.join();
    const apiUrl = geocodeUrl + "?q=" + locationString + limit + myWeatherApiKey;

    try{
        let response = await fetch(apiUrl);
        let data = await response.json();
        // console.log('data is now', data);
        return data;
    }catch(error){
        console.log(error);
    }
}

// get weather information
async function getCurrentWeather(locationObj){
    const lon = "&lon=" + locationObj.lon;
    const lat = "lat=" + locationObj.lat;
    const baseUrl = "https://api.openweathermap.org/data/2.5/";
    const myUnits = "&units=imperial";
    const timeFrame = "weather"
    const apiUrl = baseUrl + timeFrame + "?" + lat + lon + myWeatherApiKey + myUnits;
    
    try{
        let response = await fetch(apiUrl);
        let data = await response.json();
        console.log('data is now', data);
        return data;
    }catch(error){
        console.log(error);
    }
};

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

// function to handle user submission
async function formSubmitHandler(event){
    // prevent default behavior of browser to refresh web page upon user submission
    event.preventDefault();
    // remove whitespace from both ends of string
    var location = userInputEl.value.trim();
    // var location = 'Des Moines,IA,US';
    // check to make sure user entered some string
    if(location){
        // reset input field value to empty string
        userInputEl.value = "";
        // check for syntax and return array
        var locationArray = checkSyntaxAndReturnArray(location);
        if(locationArray.length){
            const [ returnedLocation ] = await getLatAndLong(locationArray);
            // console.log('**** returnedLocation is ****', returnedLocation);
            // maybe also include function fetch forecast weather???
            const weatherData = await getCurrentWeather(returnedLocation);
            console.log('The weather is', weatherData);
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