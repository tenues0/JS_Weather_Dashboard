var APIKey = "9a721b9d54b0807c9597675727d44009";
var APIKeyAgain = "9a721b9d54b0807c9597675727d44009";
// get input value of city form the user
// print out the JSON file with the weather info
var weatherContainer = document.querySelector('#weather-container');
var cityE1 = document.querySelector('#cityName');
var locationInputEl = document.querySelector("#location");
var submitButton = document.querySelector("#submit");
var inputHistoryButton = document.querySelector("#inputHistory");
var currentCityEl = document.getElementsByClassName(".currentCity");

var cityButton = "";

var latCoordinate = 0;
var lonCoordinate = 0;

var forecastWeatherData = function (APIKey) {
  var city = locationInputEl.value.trim();
  console.log("city from first function", city);
  console.log(typeof city);
  var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIKey + "&units=imperial";

  fetch(queryURL)
    .then(function (response) {
      return response.json();
    }).then(function (obj) {
      console.log(obj);

      // https://stackoverflow.com/questions/55882966/how-to-use-json-array-with-template-literal
      document.getElementById("cityName").innerHTML = `${obj.city.name}`;
      document.getElementById("lat").innerHTML = `Latitude ${obj.city.coord.lat}`;
      document.getElementById("lon").innerHTML = `Longitude ${obj.city.coord.lon}`;

      // getting the Lat and Lon coords and sending them into currentWeatherData function
      var latCoordinate = obj.city.coord.lat;
      var lonCoordinate = obj.city.coord.lon;
      currentWeatherData(APIKey, latCoordinate, lonCoordinate);
      fiveDayForecast(APIKey, latCoordinate, lonCoordinate);
      

      var template = "";
      obj.list.forEach(function (datum, i) {
        template +=`
          <div key=${i}>
            <p>${new Date(datum.dt * 1000).toLocaleString("en-US")}</p>
            <p>Temp: ${datum.main.temp} F</p>
            <p>Wind: ${datum.wind.speed} MPH</p>
            <p>Humidity: ${datum.main.humidity} %</p>
          </div>
        `;
      });

      document.querySelector(".weather-container").innerHTML = template;

    }).catch(function (error) {
      console.error("something went wrong!");
      console.error(error);
    });
};

var currentWeatherData = function (APIKey, latCoordinate, lonCoordinate) {
  console.log("lat coord within onecall API ", latCoordinate);
  console.log("lon coord within onecall API ", lonCoordinate);
  var queryURL = "https://api.openweathermap.org/data/2.5/onecall?" + "lat=" + latCoordinate + "&lon=" + lonCoordinate + "&exclude=minutely,hourly,daily,alerts" + "&appid=" + APIKey + "&units=imperial";

  fetch(queryURL)
    .then(function (response) {
      return response.json();
    }).then(function (data) {
      console.log(data);

      // Using template literals to display data from JSON
      document.getElementById("date").innerHTML = `${new Date(data.current.dt * 1000).toLocaleDateString("en-US")}`;
      document.getElementById("temp").innerHTML = `Temp: ${data.current.temp} F`;
      document.getElementById("wind").innerHTML = `Wind: ${data.current.wind_speed} MPH`;
      document.getElementById("humidity").innerHTML = `Humidity: ${data.current.humidity} %`;
      document.getElementById("uvindex").innerHTML = `UV Index ${data.current.uvi}`;

    }).catch(function (error) {
      console.error("Emotional Damage! currentWeatherData failure!");
      console.error(error);
    });
};


var fiveDayForecast = function (APIKey, latCoordinate, lonCoordinate) {
  console.log("lat coord within onecall API ", latCoordinate);
  console.log("lon coord within onecall API ", lonCoordinate);
  var queryURL = "https://api.openweathermap.org/data/2.5/onecall?" + "lat=" + latCoordinate + "&lon=" + lonCoordinate + "&exclude=current,minutely,hourly,alerts" + "&appid=" + APIKey + "&units=imperial";

  fetch(queryURL)
  .then(function (response) {
    return response.json();
  }).then(function (five) {
    console.log("The five day forecast from onecall");
    console.log(five);

    // Using template literals to display data from JSON
    // output the daily forecast

    var template = "";
    five.daily.forEach(function (datum, i) {
      template +=`
        <div key=${i}>
          <p>${new Date(datum.dt * 1000).toLocaleString("en-US")}</p>
          <p>Temp: ${datum.temp.day} F</p>
          <p>Wind: ${datum.wind_speed} MPH</p>
          <p>Humidity: ${datum.humidity} %</p>
        </div>
      `;
    });

    document.querySelector(".forecast-weather-container").innerHTML = template;

    // forecast-weather-container

  }).catch(function (error) {
    console.error("Emotional Damage! fiveDayForecast failure!");
    console.error(error);
  });
};

// copy pasta
// ------------------------------------------------------------------
var forecastWeatherDataHistBtn = function (cityButton, APIKeyAgain) {
  // var city = this.innerText;
  // // cityE1.textContent = city.charAt(0).toUpperCase() + city.slice(1);
  // console.log("city", city);
  // console.log(typeof city);
  var newQueryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityButton + "&appid=" + "9a721b9d54b0807c9597675727d44009" + "&units=imperial";

  fetch(newQueryURL).then(function (res) {return res.json()}).then(function (object) {
      
    console.log(object);

      // https://stackoverflow.com/questions/55882966/how-to-use-json-array-with-template-literal
      document.getElementById("cityName").innerHTML = `${object.city.name}`;
      document.getElementById("lat").innerHTML = `Latitude ${object.city.coord.lat}`;
      document.getElementById("lon").innerHTML = `Longitude ${object.city.coord.lon}`;

      // getting the Lat and Lon coords and sending them into currentWeatherData function
      var latCoordinate = object.city.coord.lat;
      var lonCoordinate = object.city.coord.lon;
      currentWeatherDataHistBtn(APIKey, latCoordinate, lonCoordinate);
      fiveDayForecastHistBtn(APIKey, latCoordinate, lonCoordinate);
      

      var template = "";
      object.list.forEach(function (datum, i) {
        template +=`
          <div key=${i}>
            <p>${new Date(datum.dt * 1000).toLocaleString("en-US")}</p>
            <p>Temp: ${datum.main.temp} F</p>
            <p>Wind: ${datum.wind.speed} MPH</p>
            <p>Humidity: ${datum.main.humidity} %</p>
          </div>
        `;
      });

      document.querySelector(".weather-container").innerHTML = template;

    }).catch(function (error) {
      console.error("something went wrong!");
      console.error(error);
    });
};

var currentWeatherDataHistBtn = function (APIKey, latCoordinate, lonCoordinate) {
  console.log("lat coord within onecall API ", latCoordinate);
  console.log("lon coord within onecall API ", lonCoordinate);
  var queryURL = "https://api.openweathermap.org/data/2.5/onecall?" + "lat=" + latCoordinate + "&lon=" + lonCoordinate + "&exclude=minutely,hourly,daily,alerts" + "&appid=" + APIKey + "&units=imperial";

  fetch(queryURL)
    .then(function (response) {
      return response.json();
    }).then(function (data) {
      console.log(data);

      // Using template literals to display data from JSON
      document.getElementById("date").innerHTML = `${new Date(data.current.dt * 1000).toLocaleDateString("en-US")}`;
      document.getElementById("temp").innerHTML = `Temp: ${data.current.temp} F`;
      document.getElementById("wind").innerHTML = `Wind: ${data.current.wind_speed} MPH`;
      document.getElementById("humidity").innerHTML = `Humidity: ${data.current.humidity} %`;
      document.getElementById("uvindex").innerHTML = `UV Index ${data.current.uvi}`;

    }).catch(function (error) {
      console.error("Emotional Damage! currentWeatherDataHistBtn failure!");
      console.error(error);
    });
};


var fiveDayForecastHistBtn = function (APIKey, latCoordinate, lonCoordinate) {
  console.log("lat coord within onecall API ", latCoordinate);
  console.log("lon coord within onecall API ", lonCoordinate);
  var queryURL = "https://api.openweathermap.org/data/2.5/onecall?" + "lat=" + latCoordinate + "&lon=" + lonCoordinate + "&exclude=current,minutely,hourly,alerts" + "&appid=" + APIKey + "&units=imperial";

  fetch(queryURL)
  .then(function (response) {
    return response.json();
  }).then(function (five) {
    console.log("The five day forecast from onecall");
    console.log(five);

    // Using template literals to display data from JSON
    // output the daily forecast

    var template = "";
    five.daily.forEach(function (datum, i) {
      template +=`
        <div key=${i}>
          <p>${new Date(datum.dt * 1000).toLocaleString("en-US")}</p>
          <p>Temp: ${datum.temp.day} F</p>
          <p>Wind: ${datum.wind_speed} MPH</p>
          <p>Humidity: ${datum.humidity} %</p>
        </div>
      `;
    });

    document.querySelector(".forecast-weather-container").innerHTML = template;

    // forecast-weather-container

  }).catch(function (error) {
    console.error("Emotional Damage! fiveDayForecast failure!");
    console.error(error);
  });
};

// save the user history and create buttons
var userInputHistory;

  if (localStorage.getItem("userInputHistory")) {
     userInputHistory = JSON.parse(localStorage.getItem("userInputHistory"));
     
  } else {
     userInputHistory = [];
  };
// console.log(typeof userInputHistory)
// console.log(userInputHistory)

for (let i = 0; i < userInputHistory.length; i++) {
  const button = document.createElement("button");
  inputHistoryButton.append(button);
  button.innerHTML = userInputHistory[i];
  button.classList.add("button-history");
  
}

var histBtn = $(".button-history")
console.log(histBtn);
histBtn.click(function (event) {
  event.preventDefault()
  var cityButton = this.innerText;
  console.log("cityButton", cityButton)
  forecastWeatherDataHistBtn(cityButton);
});

document.querySelector("#submit").addEventListener("change", forecastWeatherData);
// document.querySelector(".button-history").addEventListener("click", forecastWeatherDataHistBtn);

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

look at giphy example


3. history buttons only show up when the page is refreshed.
can probably use template literals to make them show up.


todo list:


localstorage for each day

learn about putting icons in

*/