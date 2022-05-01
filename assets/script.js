var APIKey = "9a721b9d54b0807c9597675727d44009";
// get input value of city form the user
// print out the JSON file with the weather info
var weatherContainer = document.querySelector('#weather-container');
var cityE1 = document.querySelector('.cityName');
var locationInputEl = document.querySelector("#location");
var submitButton = document.querySelector("#submit");


submitButton.addEventListener("click", function(event) {
  event.preventDefault();
  // create user object from submission
  var userInput = {
    location: locationInputEl.value.trim(),
  };
  // set new submission to local storage 
  localStorage.setItem('userInput', JSON.stringify(userInput));

  // run the function to get the weather data
  getWeatherData(APIKey);
});


var getWeatherData = function (APIKey) {
    var city = locationInputEl.value.trim();
    cityE1.textContent = city.charAt(0).toUpperCase() + city.slice(1);
    console.log("city", city);
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

    fetch(queryURL)
    .then(function (response) {
      return response.json();
    }).then(function (obj) {
      console.log(obj);
    }).catch(function (error) {
      console.error("something went wrong!");
      console.error(error);
    });
};


// var displayWeather = function (weather, searchTerm) {
//   if (weather.length === 0) {
//     weatherContainer.textContent = 'No weather data found.';
//     // Without a `return` statement, the rest of this function will continue to run and perhaps throw an error if `repos` is empty
//     return;
//   }
// }



/*
1. get info when user enters in a city name.
2. enable feature for when they press the enter key.
3. print the city name to the webpage
4. use the city name as input into the API

5. print something from the API onto the screen
6. print out the info I want from the API onto the screen
7. add localstorage for the city name, so the data remains persistent
8. 
 */