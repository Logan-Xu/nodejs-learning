const request = require("request");

const geocode = (city, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(city) +
    ".json?access_token=pk.eyJ1IjoieGxpbmdhbyIsImEiOiJjazhqZ3huMnowZ29sM25xb3hmNnlwanRiIn0.gzFbxXuMWEjCskfkT-N5sQ&limit=1&language=zh";

  request({ url, json: true }, (error, {message, body}) => {
    if (error) {
      // console.log("Something critic wrong!");
      // console.log(error);
      callback("Net error!", undefined);
    } else if (message) {
      // console.log(message);
      callback("Key error", undefined);
    } else if (body.features[0].length === 0) {
      // console.log("Something trival wrong...");
      callback("Location error", undefined);
    } else {
      //   const longitude = response.body.features[0].center[0];
      //   const latitude = response.body.features[0].center[1];
      //   console.log(longitude, latitude);
      //   getWeather(latitude, longitude);
      callback(undefined, {
        longitude: body.features[0].center[0],
        latitude: body.features[0].center[1],
        location: body.features[0].place_name
      });
    }
  });
};

module.exports = geocode;
