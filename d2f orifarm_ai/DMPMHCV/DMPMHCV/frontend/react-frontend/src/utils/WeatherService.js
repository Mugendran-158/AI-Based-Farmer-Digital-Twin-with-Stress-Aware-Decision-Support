/**
 * WeatherService.js
 * 
 * Fetches real-time weather data from Open-Meteo (Free, no key required).
 * Provides current, hourly (24h), and weekly (7d) forecasts.
 */

const BASE_URL = 'https://api.open-meteo.com/v1/forecast';

export const fetchWeatherIntelligence = async (coords = null) => {
    try {
        let lat = 28.6139; // Default: New Delhi
        let lon = 77.2090;

        if (!coords) {
            // Try browser geolocation
            const pos = await new Promise((resolve) => {
                navigator.geolocation.getCurrentPosition(
                    (p) => resolve({ lat: p.coords.latitude, lon: p.coords.longitude }),
                    () => resolve(null),
                    { timeout: 5000 }
                );
            });
            if (pos) {
                lat = pos.lat;
                lon = pos.lon;
            }
        } else {
            lat = coords.lat;
            lon = coords.lon;
        }

        const url = `${BASE_URL}?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m,cloud_cover&hourly=temperature_2m,precipitation_probability,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=auto`;

        const response = await fetch(url);
        if (!response.ok) throw new Error('Weather API failed');

        const data = await response.json();

        // Map Weather Codes to human-readable conditions
        const getCondition = (code) => {
            if (code === 0) return 'Clear';
            if (code <= 3) return 'Partly Cloudy';
            if (code <= 48) return 'Foggy';
            if (code <= 67) return 'Rainy';
            if (code <= 77) return 'Snowy';
            if (code <= 82) return 'Rain Showers';
            if (code <= 99) return 'Thunderstorm';
            return 'Clouds';
        };

        const weatherIntelligence = {
            location: { lat, lon, city: 'Local Field' },
            current: {
                temp: Math.round(data.current.temperature_2m),
                feelsLike: Math.round(data.current.apparent_temperature),
                humidity: data.current.relative_humidity_2m,
                windSpeed: data.current.wind_speed_10m,
                condition: getCondition(data.current.weather_code),
                precipitation: data.current.precipitation,
                cloudCover: data.current.cloud_cover
            },
            hourly: data.hourly.time.slice(0, 24).map((time, i) => ({
                time: new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                temp: Math.round(data.hourly.temperature_2m[i]),
                rainProb: data.hourly.precipitation_probability[i],
                condition: getCondition(data.hourly.weather_code[i])
            })),
            weekly: data.daily.time.map((time, i) => ({
                date: new Date(time).toLocaleDateString([], { weekday: 'short' }),
                maxTemp: Math.round(data.daily.temperature_2m_max[i]),
                minTemp: Math.round(data.daily.temperature_2m_min[i]),
                rainProb: data.daily.precipitation_probability_max[i],
                condition: getCondition(data.daily.weather_code[i])
            })),
            insights: generateInsights(data)
        };

        return weatherIntelligence;
    } catch (error) {
        console.error('WeatherService Error:', error);
        return null;
    }
};

const generateInsights = (data) => {
    const next6hRain = data.hourly.precipitation_probability.slice(0, 6).some(p => p > 30);
    const isHot = data.current.temperature_2m > 35;

    let insights = "Atmospheric conditions remain stable.";
    if (next6hRain) insights = "High rain probability in the next 6 hours. Irrigation schedules may be adjusted.";
    if (isHot) insights = "High temperature detected. Monitor crops for heat stress.";

    return insights;
};
