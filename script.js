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
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=522d55a60d2bd49455bcaca58f801f97`, { type: "cors" });
        if (response.ok) {
            response.json().then(function (response) {
                let cityTime = getCityCurrentTime(response.timezone);
                changeBackground(cityTime, response.sys.sunrise, response.sys.sunset);

                city.innerHTML = response.name + ', ' + response.sys.country;
                weather.innerHTML = response.weather[0].description;
                //get icon
                const icon = response.weather[0].icon;
                img.src = `http://openweathermap.org/img/wn/${icon}@2x.png`;
                //get weather details
                temp.innerHTML = convertToCelcius(response.main.temp) + '℃';
                feels.innerHTML = 'feels like ' + convertToCelcius(response.main.feels_like) + '℃';
                max.innerHTML = 'max ' + convertToCelcius(response.main.temp_max) + '℃';
                min.innerHTML = 'min ' + convertToCelcius(response.main.temp_min) + '℃';
                sunrise.innerHTML = 'sunrise ' + unixToTimeStamp(response.sys.sunrise);
                sunset.innerHTML = 'sunset ' + unixToTimeStamp(response.sys.sunset);
                humid.innerHTML = 'humidity : ' + response.main.humidity + ' %';
                windSpeed.innerHTML = 'wind speed : ' + response.wind.speed + ' m/s';
            }) 
        } else if(response.status == 404){
            alert('Invalid city name, please try again');
        }
    }
    catch (err) {
        alert('Error, please try again!');
    }
}

function getCityCurrentTime(timezone) {
    let cityTime = new Date().getUTCHours() + (timezone / 3600);
    if (cityTime >= 24) {
        return cityTime - 24;
    }
    else if (cityTime < 0) {
        return 24 - cityTime;
    }
    else {
        return cityTime;
    }
}
function changeBackground(currentHours, sunrise, sunset) {
    const body = document.querySelector('body');
    body.classList.remove('daytime');
    body.classList.remove('nightTime');
    main.classList.remove('whiteText');
    if (currentHours >= unixToHours(sunrise) && currentHours <= unixToHours(sunset)) {
        body.classList.add('daytime');
    } else {
        body.classList.add('nightTime');
        main.classList.add('whiteText');
    }
}
function unixToHours(unixTimestamp) {
    var date = new Date(unixTimestamp * 1000);
    return date.getHours();
}
function unixToTimeStamp(unixTimestamp) {
    var date = new Date(unixTimestamp * 1000);
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    return hours + ':' + minutes.substr(-2);
}
function convertToCelcius(K) {
    return (K - 273.15).toFixed(1);
}
