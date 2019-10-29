class UI {
  constructor() {
    this.location = document.getElementById('w-location');
    this.desc = document.getElementById('w-desc');
    this.string = document.getElementById('w-string');
    this.icon = document.getElementById('w-icon');
    this.humidity = document.getElementById('w-humidity');
    this.wind = document.getElementById('w-wind');
    this.pressure = document.getElementById('w-pressure');
    this.sunrise = document.getElementById('w-sunrise');
    this.temp = document.getElementById('w-temp');
  }

  paint(weather) {
    this.location.textContent = `${weather.name}, ${weather.sys.country}`;
    this.desc.textContent = weather.weather[0].description;
    this.string = this.icon.setAttribute(
      'src',
      `http://openweathermap.org/img/w/${weather.weather[0].icon}.png`
    );
    this.humidity.textContent = `Humidty: ${weather.main.humidity}%`;
    this.wind.textContent = `Wind: ${weather.wind.speed} m/s`;
    this.temp.textContent = `Temperature: ${weather.main.temp} Degrees`;
    const date = new Date(weather.sys.sunrise * 1000);
    const hours = date.getHours();
    const minutes = '0' + date.getMinutes();
    const seconds = '0' + date.getSeconds();
    const formattedTime = `${hours} : ${minutes.substr(-2)} : ${seconds.substr(
      -2
    )}`;
    this.sunrise.textContent = `Sunrise: ${formattedTime}`;
  }
}
