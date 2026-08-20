import "./weather.css";
import bodyicon from "./pero-kalimero-9BJRGlqoIUk-unsplash.jpg";

const img = document.createElement("img");
img.src = bodyicon;
img.className = "img";
document.querySelector("body").appendChild(img);

const container = document.querySelector(".container");

const iconMap = {
    "clear-day": "☀️",
    "clear-night": "🌙",
    "partly-cloudy-day": "⛅",
    "partly-cloudy-night": "☁️",
    "cloudy": "☁️",
    "rain": "🌧️",
    "showers-day": "🌦️",
    "showers-night": "🌦️",
    "thunder-rain": "⛈️",
    "thunder-showers-day": "⛈️",
    "thunder-showers-night": "⛈️",
    "snow": "❄️",
    "snow-showers-day": "🌨️",
    "snow-showers-night": "🌨️",
    "fog": "🌫️",
    "wind": "💨"
};

async function weather(location) {
    try {
        container.innerHTML="";
        const res = await fetch(
            `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/next7days?unitGroup=metric&key=C7KRQQ6NL9LJA4E88USR23RW9`
        );
        container.classList.add("active");

        if (!res.ok) {
            throw new Error(`error: ${res.status}`);
 
        }

        const data = await res.json();
        console.log(data);

        const icon = document.createElement("p");
        icon.className = "weather-icon";
        icon.textContent = iconMap[data.currentConditions.icon] || "🌡️";

        const address = document.createElement("p");
        address.textContent = "Location:"+data.address;

        const timezone = document.createElement("p");
        timezone.textContent = "Timezone:"+data.timezone;

        const temp = document.createElement("p");
        temp.textContent = "Temperature:"+data.currentConditions.temp+"°C";

        const humidity = document.createElement("p");
        humidity.textContent = "Humidity:"+data.currentConditions.humidity;

        const description = document.createElement("p");
        description.textContent = "Description:"+data.currentConditions.conditions;

        container.appendChild(icon);
        container.appendChild(address);
        container.appendChild(timezone);
        container.appendChild(temp);
        container.appendChild(humidity);
        container.appendChild(description);

    } catch (error) {
           container.innerHTML="";
            const p = document.createElement("p");
            p.textContent = "Error";
            p.className = "error";
            container.appendChild(p);
        console.log("Something went wrong", error);
    }
}

document.querySelector("form").addEventListener("submit", (e) =>{
    e.preventDefault();
    const location = document.querySelector("input").value;
    if (location === "") return;
    weather(location);
})