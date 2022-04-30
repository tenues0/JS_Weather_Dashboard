var APIKey = "9a721b9d54b0807c9597675727d44009";
// get input value of city form the user
// print out the JSON file with the weather info
var weatherContainer = document.querySelector('#weather-container');
var cityE1 = document.querySelector('.cityName');
var _locationInput = document.querySelector("#location");
var submitButton = document.querySelector("#submit");

submitButton.addEventListener("click", function(event) {
  event.preventDefault();
  
  // create user object from submission
  var userInput = {
    location: _locationInput.value.trim(),
  };

  // set new submission to local storage 
  localStorage.setItem("userInput", JSON.stringify(userInput));
  
});



// https://www.w3schools.com/howto/howto_js_trigger_button_enter.asp


var getWeatherData = function (city, APIKey) {
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

    fetch(queryURL)
    .then(function (response) {
        if (response.ok) {
          console.log(response);
          response.json().then(function (data) {
            console.log(data);
            displayWeather(data, city);
          });
        } else {
          alert('Error: ' + response.statusText);
        }
      })
      .catch(function (error) {
        alert('Unable to connect');
      });
};

var displayWeather = function (weather, searchTerm) {
    if (weather.length === 0) {
      weatherContainer.textContent = 'No weather data found.';
      // Without a `return` statement, the rest of this function will continue to run and perhaps throw an error if `repos` is empty
      return;
    }
}



  // https://stackoverflow.com/questions/51851391/fetch-json-data-from-api-javascript


// var city = 'san diego';
// console.log(city);
// var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
// console.log(queryURL);
// fetch(queryURL)
// .then(function (response) {
//   return response.json();
// }).then(function (obj) {
//   console.log(obj);
// }).catch(function (error) {
//   console.error("something went wrong!");
//   console.error(error);
// });



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