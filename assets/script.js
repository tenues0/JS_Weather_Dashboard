var APIKey = "9a721b9d54b0807c9597675727d44009";
// get input value of city form the user
// print out the JSON file with the weather info
var weatherContainer = document.querySelector('#weather-container');
var cityE1 = document.querySelector('#cityName');
var locationInputEl = document.querySelector("#location");
var submitButton = document.querySelector("#submit");
var inputHistoryButton = document.querySelector("#inputHistory");
var currentCityEl = document.getElementsByClassName(".currentCity");

var latCoordinate = 0;
var lonCoordinate = 0;

var forecastWeatherData = function (APIKey) {
  var city = locationInputEl.value.trim();
  // cityE1.textContent = city.charAt(0).toUpperCase() + city.slice(1);
  console.log("city", city);
  var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIKey + "&units=imperial";

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

  // Using the forecast API to get the city name and coordinates
  // for the onecall API
  var name = obj.city.name;
  var nameDiv = document.getElementById("cityName");
  var divName = document.createElement("h4");
  divName.innerHTML = name;
  nameDiv.appendChild(divName);

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

  // sending the coordinates into the onecall API
  currentWeatherData(APIKey, latCoordinate, lonCoordinate);

  var day1Date = new Date(obj.list[1].dt * 1000).toLocaleDateString("en-US");
  console.log("the day1Date is ", day1Date);
  var day1Div = document.getElementById("day1");
  var divDay1 = document.createElement("p");
  divDay1.innerHTML = day1Date;
  day1Div.appendChild(divDay1);

  var day1Temp = obj.list[1].main.temp;
  console.log("day1Temp ", day1Temp);
  var temp1Div = document.getElementById("day1");
  var divTemp1 = document.createElement("p");
  divTemp1.innerHTML = day1Temp;
  temp1Div.appendChild(divTemp1);

  var day1Wind = obj.list[1].wind.speed;
  console.log("day1Wind ", day1Wind);
  var wind1Div = document.getElementById("day1");
  var divWind1 = document.createElement("p");
  divWind1.innerHTML = day1Wind;
  wind1Div.appendChild(divWind1);

  var day1Hum = obj.list[1].main.humidity;
  console.log("day1Hum ", day1Hum);
  var hum1Div = document.getElementById("day1");
  var divHum1 = document.createElement("p");
  divHum1.innerHTML = day1Hum;
  hum1Div.appendChild(divHum1);

  // var day2Date = new Date(obj.list[2].dt * 1000).toLocaleDateString("en-US");
  // console.log("the day2Date is ", day2Date);
  // var day2Div = document.getElementById("day2");
  // var divDay2 = document.createElement("p");
  // divDay2.innerHTML = day2Date;
  // day2Div.appendChild(divDay2);
}

var currentWeatherData = function (APIKey, latCoordinate, lonCoordinate) {
  console.log("lat coord within onecall API ", latCoordinate);
  console.log("lon coord within onecall API ", lonCoordinate);
  var queryURL = "https://api.openweathermap.org/data/2.5/onecall?" + "lat=" + latCoordinate + "&lon=" + lonCoordinate + "&exclude=minutely,hourly,daily,alerts" + "&appid=" + APIKey + "&units=imperial";

  fetch(queryURL)
    .then(function (response) {
      return response.json();
    }).then(function (data) {
      console.log(data);
      // function to clear previous city current forecast
      // clearData(currentCityEl)
      displayCurrent(data);
    }).catch(function (error) {
      console.error("Emotional Damage! currentWeatherData failure!");
      console.error(error);
    });
};

function clearData(currentCityEl) {
  document.querySelector(currentCityEl).innerHTML = "";
};

var displayCurrent = function (data) {

  var dateToday = new Date(data.current.dt * 1000).toLocaleDateString("en-US");
  console.log("dateToday ", dateToday);
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


// trying to save the user history and create buttons
var userInputHistory;

  if (localStorage.getItem("userInputHistory")) {
     userInputHistory = JSON.parse(localStorage.getItem("userInputHistory"));
  } else {
     userInputHistory = [];
  };
console.log(typeof userInputHistory)
console.log( userInputHistory)

for (let i = 0; i < userInputHistory.length; i++) {
  const button = document.createElement("button");
  inputHistoryButton.append(button);
  button.innerHTML = userInputHistory[i];
  button.classList.add("button-history");
  
}

// var histBtn = $(".button-history")
// histBtn.click(funciton(e){
// e.preventDefault()
//     var city = $(this).val().trim();
//   // cityE1.textContent = city.charAt(0).toUpperCase() + city.slice(1);
//   console.log("city", city);
//   var queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIKey + "&units=imperial";

//   fetch(queryURL)
//     .then(function (response) {
//       return response.json();
//     }).then(function (obj) {
//       console.log(obj);
//       displayForecast(obj);
//     }).catch(function (error) {
//       console.error("something went wrong!");
//       console.error(error);
//     });
// };


submitButton.addEventListener("click", function (event) {
  event.preventDefault();

  // create user object from submission

  //document.querySelector(".currentCity").innerHTML = "";

  var userInput = {
    location: locationInputEl.value.trim(),
  };
  userInputHistory.push(userInput.location);
  // set new submission to local storage 
  localStorage.setItem('userInputHistory', JSON.stringify(userInputHistory));

  // run the function to get the weather data
  forecastWeatherData(APIKey);

});








/*
Problems:
1. the date from the forecast API call is off
line 59

2. when a new city is inputted it lays data over the old, the page does not reset.
Need to find a way to clear out the old data so when the new data publishes it remains on top.
 
look at giphy example


3. history buttons only show up when the page is refreshed.


todo list:
1. review giphy example and use the template literals to
generate the output. that might get ridof some of the 
other problems.

Put 5-day forecast into the html

localstorage for each day

create buttons for each city searched

learn about putting icons in

*/