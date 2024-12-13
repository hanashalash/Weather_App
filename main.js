var searchInput = document.getElementById("search");
var searchBtn = document.getElementById("submit");
var myWeather = [];

getWeather("cairo");

function getWeather(city) {
  var myHttp = new XMLHttpRequest();
  myHttp.open(
    "GET",
    `https://api.weatherapi.com/v1/forecast.json?key=8c3f90441c2c488f919212256241212&q=${city}&days=3`
  );
  myHttp.send();

  myHttp.addEventListener("load", function () {
    myWeather = JSON.parse(myHttp.response);
    console.log(myWeather);
    displayCurrent();
    displayForecast();
  });
}

function displayCurrent() {
  objectDate = new Date(myWeather.forecast.forecastday[0].date);

  var day = objectDate.toLocaleDateString("en-US", { weekday: "long" });
  var date = objectDate.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
  });

  var weather = `
              <div class="forecast now lightBg rounded-2 h-100">
                <div
                  class="header p-2 d-flex justify-content-between align-items-center"
                >
                  <div class="day">
                  ${day}
                  </div>
                  <div class="date">${date}</div>
                </div>
                <div class="weather-content p-3" id="now">
                  <div class="location colorGrey fs-20">${myWeather.location.name}</div>
                  <div class="degree">
                    <div class="num fs-40 fw-bolder">
                      ${myWeather.current.temp_c}
                      <sup>o</sup>
                      C
                    </div>
                    <div class="weather-icon">
                      <img src="http:${myWeather.current.condition.icon}" alt="" width="100" />
                    </div>
                    <div class="desc lightBlue fw-lighter m-2">
                    ${myWeather.current.condition.text}
                    </div>
                    <span class="mx-2"
                      ><img
                        class="mx-1"
                        src="./Images/icon-umberella.png"
                        alt="umbrella"
                      />${myWeather.current.precip_mm}%</span
                    >
                    <span class="mx-2"
                      ><img
                        class="mx-1"
                        src="./Images/icon-wind.png"
                        alt="wind"
                      />${myWeather.current.wind_kph}</span
                    >
                    <span class="mx-2"
                      ><img
                        class="mx-1"
                        src="./Images/icon-compass.png"
                        alt="compass"
                      />${myWeather.current.wind_dir}</span
                    >
                  </div>
                </div>
              </div>
            `;

  document.getElementById("today").innerHTML = weather;
}

function displayForecast() {
  var forecast = "";
  for (var i = 1; i < myWeather.forecast.forecastday.length; i++) {
    objectDate = new Date(myWeather.forecast.forecastday[i].date);
    var day = objectDate.toLocaleDateString("en-US", { weekday: "long" });
    var date = objectDate.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
    });

    forecast += `
    <div class="col-md-6 mb-2">
        <div class="forecast now lightBg rounded-2 h-100">
                  <div
                    class="header p-2 d-flex justify-content-between align-items-center"
                  >
                    <div class="day">
                    ${day}
                    </div>
                    <div class="date">${date}</div>
                  </div>
                  <div class="weather-content p-3 d-flex align-items-center text-center flex-column">
                  <div class="weather-icon">
                        <img src="http:${myWeather.forecast.forecastday[i].day.condition.icon}" alt="" width="100" />
                      </div>
                    <div class="degree">
                      <div class="num fs-30 fw-bolder">
                        ${myWeather.forecast.forecastday[i].day.maxtemp_c}
                        <sup>o</sup>
                        C
                      </div>
                      <div class="num fs-25 fw-lighter">
                        ${myWeather.forecast.forecastday[i].day.mintemp_c}
                        <sup>o</sup>
                        C
                      </div>
                      
                      <div class="desc lightBlue fw-lighter m-2">
                      ${myWeather.forecast.forecastday[i].day.condition.text}
                      </div>
                    </div>
                  </div>
                </div>
                </div>
        
        
        `;
  }
  document.getElementById("forecast").innerHTML = forecast;
}

searchInput.addEventListener("input", function () {
  getWeather(searchInput.value);
});
