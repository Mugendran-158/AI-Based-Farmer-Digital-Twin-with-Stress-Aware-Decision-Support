const API_KEY = ''; // OpenWeatherMap API Key
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

/**
 * Fetches current weather and 5-day forecast based on user location or default.
 */
export const fetchWeatherData = async () => {
    try {
        let lat = 28.6139; // Default (New Delhi)
        let lon = 77.2090;

        // Try geolocation
        const coords = await new Promise((resolve) => {
            navigator.geolocation.getCurrentPosition(
                (pos) => resolve({ lat: pos.coords.latitude, lon: pos.coords.longitude }),
                () => resolve(null),
                { timeout: 5000 }
            );
        });

        if (coords) {
            lat = coords.lat;
            lon = coords.lon;
        }

        if (!API_KEY) {
            console.warn('Weather API Key missing. Using highly realistic mock data.');
            return getRealisticMockData();
        }

        const [currentRes, forecastRes] = await Promise.all([
            fetch(`${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`),
            fetch(`${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
        ]);

        const currentData = await currentRes.json();
        const forecastData = await forecastRes.json();

        return {
            current: {
                temp: Math.round(currentData.main.temp),
                condition: currentData.weather[0].main,
                humidity: currentData.main.humidity,
                windSpeed: currentData.wind.speed,
                city: currentData.name
            },
            forecast: forecastData.list.filter((_, i) => i % 8 === 0).map(f => ({
                date: new Date(f.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' }),
                temp: Math.round(f.main.temp),
                condition: f.weather[0].main
            }))
        };
    } catch (error) {
        console.error('Weather fetch error:', error);
        return getRealisticMockData();
    }
};

const getRealisticMockData = () => {
    const conditions = ['Clear', 'Clouds', 'Rain', 'Mist'];
    const currentCondition = conditions[Math.floor(Math.random() * conditions.length)];

    return {
        current: {
            temp: 24,
            condition: currentCondition,
            humidity: 65,
            windSpeed: 4.5,
            city: 'Agri-Tech Valley'
        },
        forecast: [
            { date: 'Mon', temp: 26, condition: 'Clear' },
            { date: 'Tue', temp: 24, condition: 'Clouds' },
            { date: 'Wed', temp: 22, condition: 'Rain' },
            { date: 'Thu', temp: 25, condition: 'Clear' },
            { date: 'Fri', temp: 27, condition: 'Clear' }
        ]
    };
};
