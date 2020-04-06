const request = require("request");

const forecast = (longitude, latitude, callback) => {
  const url =
    "http://api.aerisapi.com/places/closest?p=" +
    encodeURIComponent(latitude) +
    "," +
    encodeURIComponent(longitude) +
    "&limit=5&client_id=CBFpzCpHsWOsLZWcrFwGe&client_secret=4jcwpc0EoyXwWFgtoKPgIToxa6caX8esUx9Km6oz";
  // console.log(url);
  request({ url, json: true }, (error, {success, body}) => {
    if (error) {
      callback("Net Err", undefined);
    } else if (success === false) {
      callback("User Err", undefined);
    } else {
      console.log(
        "City: " +
          body.response[0].place.name +
          " Population: " +
          body.response[0].profile.pop
      );
      callback(undefined, {
        location: body.response[0].place.name,
        population: body.response[0].profile.pop
      });
    }
  });
};

module.exports = forecast;
