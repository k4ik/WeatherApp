async function fetchWeatherData(locationParam) {
    try {
        const weatherData = await (await fetch(`https://api.weatherapi.com/v1/current.json?key=84dbd0102e614019a21133107231511&q=${locationParam}&aqi=no`)).json();

        


        let locationName = document.querySelector(".locationName");
        let temp = document.querySelector(".temp");
        let image = document.querySelector(".image");
        let text = document.querySelector(".text");

        image.innerHTML = 
        `<img src="${weatherData.current.condition.icon}" alt="" width="80px" height="80px">`;
        text.innerHTML = 
        `<p>${weatherData.current.condition.text}</p>`;
        locationName.innerHTML = 
        `<img src="assets/images/map-pin.svg" alt="">
        <span>${weatherData.location.name}</span>`;
        temp.innerHTML = 
        `<img src="assets/images/thermometer.svg" alt="">
        <span>${weatherData.current.temp_c}°C</span>`;
        image.style.display = "flex";
        text.style.display = "flex";
        locationName.style.display = "flex";
        temp.style.display = "flex";
        
        console.log(weatherData);
        return weatherData;
    } catch(e) {
        console.error(e);
        if (e instanceof TypeError && e.message.includes("JSON")) {
            alert("Error parsing weather data. Please try again later.");
        } else {
            alert("Location not found. Please enter a valid location.");
        }
    }
}

let locationInput = document.querySelector("#locationInput");
locationInput.value = "";

let weatherForm = document.querySelector("#weatherForm");

weatherForm.addEventListener('submit', function(event) {
    event.preventDefault();

    fetchWeatherData(locationInput.value);
}); 