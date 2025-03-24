document.addEventListener("DOMContentLoaded", function () {
    const apiKey = "1af5ec6386fb0b84fd7b909557a06290"; // Your OpenWeatherMap API key

    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(async function (position) {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

            try {
                const response = await fetch(apiUrl);
                const data = await response.json();

                // Extract weather details
                const temperature = Math.round(data.main.temp) + "°C";
                const condition = data.weather[0].description;
                const cityName = data.name;
                const country = data.sys.country;

                // Get current day
                const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
                const currentDay = days[new Date().getDay()];

                // Determine weather emoji based on condition
                let weatherEmoji = "❓";
                if (condition.includes("clear")) weatherEmoji = "☀️";
                else if (condition.includes("cloud")) weatherEmoji = "☁️";
                else if (condition.includes("rain")) weatherEmoji = "🌧️";
                else if (condition.includes("storm")) weatherEmoji = "⛈️";
                else if (condition.includes("snow")) weatherEmoji = "❄️";
                else if (condition.includes("mist") || condition.includes("fog")) weatherEmoji = "🌫️";

                // Update the DOM elements
                document.getElementById("city").textContent = cityName;
                document.getElementById("location").textContent = `📍 ${cityName}, ${country}`;
                document.getElementById("temperature").textContent = temperature;
                document.getElementById("condition").textContent = condition.charAt(0).toUpperCase() + condition.slice(1);
                document.getElementById("day").textContent = currentDay;
                document.getElementById("weather-icon").textContent = weatherEmoji;
            } catch (error) {
                console.error("Error fetching weather data:", error);
                document.getElementById("condition").textContent = "Failed to load weather.";
            }
        }, function (error) {
            console.error("Geolocation error:", error);
            document.getElementById("condition").textContent = "Location permission denied.";
        });
    } else {
        document.getElementById("condition").textContent = "Geolocation not supported.";
    }
});
