async function fetchWeatherData(locationParam) {
    try {
        const weatherData = await (await fetch(`http://api.weatherapi.com/v1/current.json?key=84dbd0102e614019a21133107231511&q=${locationParam}&aqi=no`)).json();

        let locationName = document.querySelector(".locationName");
        let temp = document.querySelector(".temp");
        let image = document.querySelector(".image");
        let text = document.querySelector(".text");

        image.innerHTML = 
        `<img src="${weatherData.current.condition.icon}" alt="">`;

        text.innerHTML = 
        `<p>${weatherData.current.condition.text}</p>`;

        locationName.innerHTML = 
        `<img src="assets/images/map-pin.svg" alt="">
        <span>${weatherData.location.name}</span>`;

        temp.innerHTML = 
        `<img src="assets/images/thermometer.svg" alt="">
        <span>${weatherData.current.temp_c}°C</span>`;

        console.log(weatherData);

        image.style.display = "flex";
        text.style.display = "flex";
        locationName.style.display = "flex";
        temp.style.display = "flex";

        return weatherData;
    } catch(e) {
        console.log(e);
        alert("location not found");
    }
}

let locationInput = document.querySelector("#locationInput");
locationInput.value = "";

let weatherForm = document.querySelector("#weatherForm");

weatherForm.addEventListener('submit', function(event) {
    event.preventDefault();

    fetchWeatherData(locationInput.value);
}); 