const request = require("request");

const getweather = (url, callback) => {
  request({ url, json: true }, (error, response) => {
    if (error) {
      callback("Net Err", undefined);
    } else if (response.cod === "401") {
      callback("Key Err:" + response.message, undefined);
    } else if (response.cod === "404") {
      callback("Location Err: " + response.message, undefined);
    } else {
      callback(undefined, {
        weather: response.body.weather[0].main,
        wind: response.body.wind.speed,
        temp: (response.body.main.temp - 273.15).toFixed(2),
        humidity: response.body.main.humidity,
        city: response.body.name,
      });
    }
  });
};

module.exports = getweather;
