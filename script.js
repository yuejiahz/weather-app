
const input = document.querySelector('input');
const submit = document.querySelector('button');
const main = document.querySelector('main');
const city = document.querySelector('#name');
const weather = document.querySelector('#weather');
const temp = document.querySelector('#temp');
const max = document.querySelector('#max');
const min = document.querySelector('#min');
const sunrise = document.querySelector('#sunrise');
const sunset = document.querySelector('#sunset');
const humid = document.querySelector('#humidity');
const windSpeed = document.querySelector('#wind-speed');
input.value = 'KK';

submit.addEventListener('click', getWeather);
window.addEventListener('load', getWeather);

async function getWeather() {
    const response = fetch('https://api.openweathermap.org/data/2.5/weather?q=kuala lumpur&appid=522d55a60d2bd49455bcaca58f801f97');
    response.then(function (response) {
        return response.json();
    })
        .then(function (response) {
            console.log(response);
            console.log(input.value);
            city.innerHTML = response.name + ', ' + response.sys.country;
            weather.innerHTML = response.weather[0].main + ' : ' + response.weather[0].description;
            const icon = response.weather[0].icon;
            const img = document.createElement('img');
            img.src = `http://openweathermap.org/img/wn/${icon}@2x.png`;
            main.insertBefore(img, temp);
            temp.innerHTML = convertToCelcius(response.main.temp) + '℃';
            max.innerHTML = 'max ' + convertToCelcius(response.main.temp_max) + '℃';
            min.innerHTML = 'min ' + convertToCelcius(response.main.temp_min) + '℃';
            sunrise.innerHTML = 'sunrise ' + unixToTimeStamp(response.sys.sunrise);
            sunset.innerHTML = 'sunset ' + unixToTimeStamp(response.sys.sunset);
            humid.innerHTML = 'humidity : ' + response.main.humidity + ' %';
            windSpeed.innerHTML = 'wind speed : ' + response.wind.speed + ' m/s';
        })
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
