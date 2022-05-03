var APIKey = "9a721b9d54b0807c9597675727d44009";
// get input value of city form the user
// print out the JSON file with the weather info
var weatherContainer = document.querySelector('#weather-container');
var cityE1 = document.querySelector('#cityName');
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
  forecastWeatherData(APIKey);
  // currentWeatherData(APIKey);
});



// var currentWeatherData = function (APIKey) {
//   var city = locationInputEl.value.trim();
//   // cityE1.textContent = city.charAt(0).toUpperCase() + city.slice(1);
//   console.log("city", city);
//   var queryURL = "http://api.openweathermap.org/data/2.5/onecall?q=" + city + "&exclude=minutely,hourly,daily,alerts" + "&appid=" + APIKey + "&units=imperial";

//   fetch(queryURL)
//   .then(function (response) {
//     return response.json();
//   }).then(function (obj) {
//     console.log(obj);
//     // displayCurrent(obj);
//   }).catch(function (error) {
//     console.error("something went wrong!");
//     console.error(error);
//   });
// };








var forecastWeatherData = function (APIKey) {
    var city = locationInputEl.value.trim();
    // cityE1.textContent = city.charAt(0).toUpperCase() + city.slice(1);
    console.log("city", city);
    var queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIKey + "&units=imperial";

    fetch(queryURL)
    .then(function (response) {
      return response.json();
    }).then(function (obj) {
      console.log(obj);
      displayForecast(obj);
    }).catch(function (error) {
      console.error("something went wrong!");
      console.error(error);
    });
};

// https://w3collective.com/fetch-display-api-data-javascript/
var displayForecast = function (obj) {

  var name = obj.city.name;
  var nameDiv = document.getElementById("cityName");
  var divName = document.createElement("h4");
  divName.innerHTML = name;
  nameDiv.appendChild(divName);

  var temp = obj.list[0].main.temp;
  var tempDiv = document.getElementById("temp");
  var div = document.createElement("h4");
  div.innerHTML = temp;
  tempDiv.appendChild(div);

  var wind = obj.list[0].wind.speed;
  var windDiv = document.getElementById("wind");
  var divwind = document.createElement("h4");
  divwind.innerHTML = wind;
  windDiv.appendChild(divwind);

  var humidity = obj.list[0].main.humidity;
  var humidityDiv = document.getElementById("humidity");
  var divHumidity = document.createElement("h4");
  divHumidity.innerHTML = humidity;
  humidityDiv.appendChild(divHumidity);

  // var coordinates = obj.city.coord.lat;
  // var coordDiv = document.getElementById("coords");
  // var divCoord = document.createElement("h4");
  // divCoord.innerHTML = coordinates;
  // coordDiv.appendChild(divCoord);

}





/*
try using template literals

1. get info when user enters in a city name.
2. enable feature for when they press the enter key.
3. print the city name to the webpage
4. use the city name as input into the API

5. print something from the API onto the screen
  What from the API needs to written to the screen?
6. print out the info I want from the API onto the screen
7. add localstorage for the city name, so the data remains persistent
8. 
 */