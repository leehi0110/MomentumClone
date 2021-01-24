const weatherContainer = document.querySelector(".weatherContainer");
const weatherText = weatherContainer.querySelector('.weather');

const API_KEY = "532fba2827fd124879447c362b9ffdb7"
const COORDS = 'coords';

function getWeather(lat,lng) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
    ).then(response => {
      return response.json();
    }).then(json => {
        const temperature = json.main.temp;
        const place = json.name;

        console.log(temperature, place);

        weatherText.innerText = `${temperature}˚C @ ${place}`;
    });
 }

function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude

  const coordsObj = {
    latitude,
    longitude,
  };

  saveCoords(coordsObj);
  getWeather(latitude,longitude);
}

function handleGeoError(){
  console.log("Can't access geo location");
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS);

  if(loadedCoords === null) {
    askForCoords();
  } else {
    const parseCoords = JSON.parse(loadedCoords);
    getWeather(parseCoords.latitude,parseCoords.longitude);
  }
}

function init() {
  loadCoords();
};

init();