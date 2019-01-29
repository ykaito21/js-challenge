class AjaxWeather {
  constructor() {
    this.apiKey = "6bb98cabea90a1b777aa5860d442ad87";
  }
  async getWeather(city) {
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${
      this.apiKey
    }&units=metric
    `;
    const weatherData = await fetch(url);
    const weather = await weatherData.json();
    return weather;
  }
}

class Display {
  constructor() {
    this.results = document.querySelector(".results");
    this.cityName = document.getElementById("cityName");
    this.cityCountry = document.getElementById("cityCountry");
    this.cityIcon = document.getElementById("cityIcon");
    this.cityTemp = document.getElementById("cityTemp");
    this.cityHumidity = document.getElementById("cityHumidity");
  }

  showWeather(data) {
    const {
      name,
      sys: { country },
      main: { temp, humidity }
    } = data;
    const { icon } = data.weather[0];

    this.results.classList.add("showItem");
    this.cityName.textContent = name;
    this.cityCountry.textContent = country;
    this.cityIcon.src = `http://openweathermap.org/img/w/${icon}.png`;
    this.cityTemp.textContent = temp;
    this.cityHumidity.textContent = humidity;
  }
}

(function() {
  const form = document.getElementById("weatherForm");
  const cityInput = document.getElementById("cityInput");
  const feedback = document.querySelector(".feedback");

  const ajax = new AjaxWeather();
  const display = new Display();

  form.addEventListener("submit", e => {
    e.preventDefault();
    const city = cityInput.value;

    if (city.length === 0) {
      showFeedbcak("Please enter a valid value");
    } else {
      cityInput.value === "";
      ajax.getWeather(city).then(data => {
        if (data.message === "city not found") {
          showFeedbcak("Please make sure city name");
        } else {
          display.showWeather(data);
        }
      });
    }
  });

  function showFeedbcak(text) {
    feedback.classList.add("showItem");
    feedback.textContent = text;
    setTimeout(() => {
      feedback.classList.remove("showItem");
    }, 3000);
  }
})();
