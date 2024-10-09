const apiKey = 'ade20b444eb82fb68d9393512bc96ffa';
const weatherDataDiv = document.getElementById('weatherData');
const getWeatherBtn = document.getElementById('getWeatherBtn');
const locationInput = document.getElementById('locationInput');
const weatherIcon = document.getElementById('weatherIcon');
const cityName = document.getElementById('cityName');
const temp = document.getElementById('temp');
const condition = document.getElementById('condition');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('windSpeed');
function fetchWeatherByCity(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    fetchWeatherData(url);
}
function fetchWeatherData(url) {
    fetch(url)
        .then(response => response.json())
        .then(data => displayWeatherData(data))
        .catch(error => {
            console.error('Error fetching weather data:', error);
            weatherDataDiv.innerHTML = `<p>Error fetching data. Please try again later.</p>`;
            weatherDataDiv.classList.remove('hidden');
            weatherDataDiv.classList.remove('show');
        });
}
function displayWeatherData(data) {
    if (data.cod === 200) {
        const { name, weather, main, wind } = data;
        const iconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
        cityName.textContent = name;
        temp.textContent = main.temp;
        condition.textContent = weather[0].description;
        humidity.textContent = main.humidity;
        windSpeed.textContent = wind.speed;
        weatherIcon.src = iconUrl;  
        weatherDataDiv.classList.remove('hidden');
        weatherDataDiv.classList.add('show');
    } else {
        weatherDataDiv.innerHTML = `<p>Weather data not available. Please try a different location.</p>`;
        weatherDataDiv.classList.remove('hidden');
        weatherDataDiv.classList.remove('show');
    }
}
getWeatherBtn.addEventListener('click', () => {
    const city = locationInput.value.trim();
    if (city) {
        fetchWeatherByCity(city);
    } else {
        weatherDataDiv.innerHTML = `<p>Please enter a city name.</p>`;
        weatherDataDiv.classList.remove('hidden');
        weatherDataDiv.classList.remove('show');
    }
});
;