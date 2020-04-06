const path = require("path");
const express = require("express");
const hbs = require("hbs");
const url = require("url");
const getweather = require("./getweather");
// const request = require("request");

const app = express();
const publicDirPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialsPath);
app.use(express.static(publicDirPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Logan",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Betty",
    src: "./img/IMG_4759.JPG",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Lingao",
    message: "What can I do for you?",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.city) {
    return res.send({
      Error: "You must provide a city term",
    });
  }

  const city = req.query.city;
  const url =
    "http://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=66434ea60591f6b5c68a8b40db4a5009";

  const weather = getweather(url, (error, data) => {
    // console.log(error, data);
    // res.send({
    //   weather: data.weather,
    //   wind: data.wind,
    //   humidity: data.humidity,
    //   city: data.city,
    // });

    res.render("index", {
      title: "Weather",
      name: "Logan",
      weather: "Weather: " + data.weather,
      wind: "Wind: " + data.wind,
      temp: "Temperature: " + data.temp,
      humidity: "Humidity: " + data.humidity,
      city: "City: " + data.city,
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    res.send({
      Error: "You must provide a search term",
    });
  } else {
    console.log(req.query.search);
    res.send({
      products: [],
    });
  }
});

app.get("/help/*", (req, res) => {
  res.render("help404", {
    title: "Oops",
    name: "Logan",
    errMsg: "Article not found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Logan",
    errMsg: "Page not found",
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000...");
});
