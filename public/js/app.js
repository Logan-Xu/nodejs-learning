// fetch(
//   "http://api.openweathermap.org/data/2.5/weather?q=hobart&appid=66434ea60591f6b5c68a8b40db4a5009"
// ).then((response) => {
//   response.json().then((data) => {
//     console.log(data);
//   });
// });

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");
const messageThree = document.querySelector("#message-3");
const messageFour = document.querySelector("#message-4");
const messageFive = document.querySelector("#message-5");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const location = search.value;
  const url =
    "http://api.openweathermap.org/data/2.5/weather?q=" +
    location +
    "&appid=66434ea60591f6b5c68a8b40db4a5009";
  fetch(url).then((response) => {
    response.json().then((data) => {
      console.log(data);
      if (data.cod === "404") {
        messageOne.textContent = data.message;
      } else {
        messageTwo.textContent = "Weather: " + data.weather[0].main;
        messageFour.textContent = "Wind: " + data.wind.speed;
        messageThree.textContent =
          "Temperature: " + (data.main.temp - 273.15).toFixed(2);
        messageFive.textContent = "Humidity: " + data.main.humidity;
        messageOne.textContent = "City: " + data.name;
      }
    });
  });
});
