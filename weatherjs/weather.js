class Weather {
  constructor(cityname, countrycode) {
    this.apikey = '8f318c72ff95e1ea341240c9406c0692';
    this.cityname = cityname;
    this.countrycode = countrycode;
  }

  // Fetch weather from API
  async getWeather() {
    const response = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${this.cityname},${
        this.countrycode
      }&APPID=${this.apikey}&units=metric`
    );
    const responseData = await response.json();
    console.log(responseData.main.temp);
    return responseData;
  }

  // change weather location
  changeLocation(city, country) {
    this.cityname = city;
    this.countrycode = country;
  }
}
//http://datapoint.metoffice.gov.uk/public/data/val/wxfcs/all/xml/3840?res=3hourly&key=01234567-89ab-cdef-0123-456789abcdef
