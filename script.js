
const input = document.querySelector('input');
const main = document.querySelector('main');
const submit = document.querySelector('button');
const city = document.querySelector('#name');
const weather = document.querySelector('#weather');
const img = document.querySelector('img');
const temp = document.querySelector('#temp');
const feels = document.querySelector('#feels-like');

const max = document.querySelector('#max');
const min = document.querySelector('#min');
const sunrise = document.querySelector('#sunrise');
const sunset = document.querySelector('#sunset');
const humid = document.querySelector('#humidity');
const windSpeed = document.querySelector('#wind-speed');
input.value = 'Kuala Lumpur';

submit.addEventListener('click', getWeather);
window.addEventListener('load', getWeather);

async function getWeather() {
    const response = fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=522d55a60d2bd49455bcaca58f801f97`,{type:"cors"});
    response.then(function(response){
        return response.json();
    })
        .then(function (response) {
            cityCurrentTime(response.timezone)
            city.innerHTML = response.name + ', ' + response.sys.country;
            weather.innerHTML = response.weather[0].main + ' : ' + response.weather[0].description;
            const icon = response.weather[0].icon;
            img.src = `http://openweathermap.org/img/wn/${icon}@2x.png`;
            temp.innerHTML = convertToCelcius(response.main.temp) + '℃';
            feels.innerHTML = 'feels like ' + convertToCelcius(response.main.feels_like) + '℃';
            max.innerHTML = 'max ' + convertToCelcius(response.main.temp_max) + '℃';
            min.innerHTML = 'min ' + convertToCelcius(response.main.temp_min) + '℃';
            sunrise.innerHTML = 'sunrise ' + unixToTimeStamp(response.sys.sunrise);
            sunset.innerHTML = 'sunset ' + unixToTimeStamp(response.sys.sunset);
            humid.innerHTML = 'humidity : ' + response.main.humidity + ' %';
            windSpeed.innerHTML = 'wind speed : ' + response.wind.speed + ' m/s';
        })
}

function cityCurrentTime(timezone) {
    let result;
    let cityTime = new Date().getUTCHours() + (timezone / 3600);
    if (cityTime >= 24) {
        result = cityTime - 24;
    }
    else if (cityTime < 0) {
        result = 24 - cityTime;
    }
    else {
        result = cityTime;
    }
   changeBackground(result);
}

function changeBackground(currentTime){
    const body = document.querySelector('body');
    body.classList.remove('daytime');
    body.classList.remove('nightTime');
    main.classList.remove('whiteText');
    if (currentTime >= 7 && currentTime <= 19) {
        body.classList.add('daytime');
    } else {
        body.classList.add('nightTime');
        main.classList.add('whiteText');
    }
}

function unixToTimeStamp(unixTimestamp) {
    let day = '';
    var date = new Date(unixTimestamp * 1000);
    // Hours part from the timestamp
    var hours = date.getHours();
    // Minutes part from the timestamp
    var minutes = "0" + date.getMinutes();

    if (hours >= 12) {
        day = ' pm';
    } else {
        day = ' am';
    }
    return hours + ':' + minutes.substr(-2) + day;
}

function convertToCelcius(K) {
    return (K - 273.15).toFixed(1);
}
