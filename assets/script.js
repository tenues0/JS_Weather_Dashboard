var APIKey = "9a721b9d54b0807c9597675727d44009";
// get input value of city form the user
// print out the JSON file with the weather info
var weatherContainer = document.querySelector('#weather-container');
var cityE1 = document.querySelector('#cityName');
var locationInputEl = document.querySelector("#location");
var submitButton = document.querySelector("#submit");


var latCoordinate = 0;
var lonCoordinate = 0;

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

  // var temp = obj.list[0].main.temp;
  // var tempDiv = document.getElementById("temp");
  // var div = document.createElement("h4");
  // div.innerHTML = temp;
  // tempDiv.appendChild(div);

  // var wind = obj.list[0].wind.speed;
  // var windDiv = document.getElementById("wind");
  // var divwind = document.createElement("h4");
  // divwind.innerHTML = wind;
  // windDiv.appendChild(divwind);

  // var humidity = obj.list[0].main.humidity;
  // var humidityDiv = document.getElementById("humidity");
  // var divHumidity = document.createElement("h4");
  // divHumidity.innerHTML = humidity;
  // humidityDiv.appendChild(divHumidity);

  var latCoordinate = obj.city.coord.lat;
  console.log("lat coord ", latCoordinate);
  var latCoord = document.getElementById("lat");
  var coordLat = document.createElement("p");
  coordLat.innerHTML = latCoordinate;
  latCoord.appendChild(coordLat);

  var lonCoordinate = obj.city.coord.lon;
  console.log("lon coord ", lonCoordinate);
  var lonCoord = document.getElementById("lon");
  var coordLon = document.createElement("p");
  coordLon.innerHTML = lonCoordinate;
  lonCoord.appendChild(coordLon);

  currentWeatherData(APIKey, latCoordinate, lonCoordinate);
}

var currentWeatherData = function (APIKey, latCoordinate, lonCoordinate) {
  console.log("lat coord within onecall API ", latCoordinate);
  console.log("lon coord within onecall API ", lonCoordinate);
  var queryURL = "http://api.openweathermap.org/data/2.5/onecall?" + "lat=" + latCoordinate + "&lon=" + lonCoordinate + "&exclude=minutely,hourly,daily,alerts" + "&appid=" + APIKey + "&units=imperial";

  fetch(queryURL)
  .then(function (response) {
    return response.json();
  }).then(function (data) {
    console.log(data);
    displayCurrent(data);
  }).catch(function (error) {
    console.error("Emotional Damage! currentWeatherData failure!");
    console.error(error);
  });
};

var displayCurrent = function (data) {

  var dateToday = new Date(1651611941 * 1000).toLocaleDateString("en-US");
  console.log("the date is ", dateToday);
  var dateDiv = document.getElementById("date");
  var divDate = document.createElement("p");
  divDate.innerHTML = dateToday;
  dateDiv.appendChild(divDate);

  var temp = data.current.temp;
  var tempDiv = document.getElementById("temp");
  var div = document.createElement("p");
  div.innerHTML = temp;
  tempDiv.appendChild(div);

  var wind = data.current.wind_speed;
  var windDiv = document.getElementById("wind");
  var divwind = document.createElement("p");
  divwind.innerHTML = wind;
  windDiv.appendChild(divwind);

  var humidity = data.current.humidity;
  var humidityDiv = document.getElementById("humidity");
  var divHumidity = document.createElement("p");
  divHumidity.innerHTML = humidity;
  humidityDiv.appendChild(divHumidity);

  var uviIndex = data.current.uvi;
  var uviDiv = document.getElementById("uvindex");
  var divUVI = document.createElement("p");
  divUVI.innerHTML = uviIndex;
  uviDiv.appendChild(divUVI);

};





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
  
});

