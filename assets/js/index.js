async function fetchWeatherData(locationParam) {
    try {
        const weatherData = await (await fetch(`http://api.weatherapi.com/v1/current.json?key=84dbd0102e614019a21133107231511&q=${locationParam}&aqi=no`)).json();

        let locationName = document.querySelector(".locationName");
        let temp = document.querySelector(".temp");

        locationName.innerHTML = `${weatherData.location.name}`;
        temp.innerHTML = `${weatherData.current.temp_c}°C`;

        console.log(weatherData);
        return weatherData;
    } catch(e) {
        console.log(e);
    }
}

let locationInput = document.querySelector("#locationInput");

let weatherForm = document.querySelector("#weatherForm");

weatherForm.addEventListener('submit', function(event) {
    event.preventDefault();

    fetchWeatherData(locationInput.value);
});