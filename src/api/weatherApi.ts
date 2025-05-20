
import { WeatherData, ForecastDay, CurrentWeather, WeatherCondition } from "../types/weather";

// OpenWeather API configuration
const API_KEY = "YOUR_API_KEY"; // Replace with your actual API key or create an input for users to enter their key
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export const getWeatherByCity = async (city: string): Promise<WeatherData> => {
  try {
    // Fetch current weather data
    const currentResponse = await fetch(
      `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    
    if (!currentResponse.ok) {
      const errorData = await currentResponse.json();
      throw new Error(errorData.message || "Failed to fetch current weather");
    }
    
    const currentData = await currentResponse.json();
    
    // Fetch 5-day forecast
    const forecastResponse = await fetch(
      `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`
    );
    
    if (!forecastResponse.ok) {
      const errorData = await forecastResponse.json();
      throw new Error(errorData.message || "Failed to fetch forecast");
    }
    
    const forecastData = await forecastResponse.json();
    
    // Process and format the data
    return formatWeatherData(currentData, forecastData);
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
};

export const getWeatherByCoords = async (lat: number, lon: number): Promise<WeatherData> => {
  try {
    // Fetch current weather data
    const currentResponse = await fetch(
      `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );
    
    if (!currentResponse.ok) {
      const errorData = await currentResponse.json();
      throw new Error(errorData.message || "Failed to fetch current weather");
    }
    
    const currentData = await currentResponse.json();
    
    // Fetch 5-day forecast
    const forecastResponse = await fetch(
      `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );
    
    if (!forecastResponse.ok) {
      const errorData = await forecastResponse.json();
      throw new Error(errorData.message || "Failed to fetch forecast");
    }
    
    const forecastData = await forecastResponse.json();
    
    // Process and format the data
    return formatWeatherData(currentData, forecastData);
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
};

// Helper function to format raw API data
const formatWeatherData = (current: any, forecast: any): WeatherData => {
  // Format current weather
  const currentWeather: CurrentWeather = {
    temp: Math.round(current.main.temp),
    tempMin: Math.round(current.main.temp_min),
    tempMax: Math.round(current.main.temp_max),
    feelsLike: Math.round(current.main.feels_like),
    humidity: current.main.humidity,
    windSpeed: current.wind.speed,
    windDirection: current.wind.deg,
    pressure: current.main.pressure,
    description: current.weather[0].description,
    icon: current.weather[0].icon,
    sunrise: current.sys.sunrise,
    sunset: current.sys.sunset,
    visibility: current.visibility,
    timeZone: current.timezone
  };

  // Process forecast data to get one entry per day (noon forecast)
  const processedForecast: ForecastDay[] = [];
  const dayMap = new Map<string, any[]>();
  
  // Group forecast data by day
  forecast.list.forEach((item: any) => {
    const date = new Date(item.dt * 1000).toISOString().split('T')[0];
    if (!dayMap.has(date)) {
      dayMap.set(date, []);
    }
    dayMap.get(date)?.push(item);
  });
  
  // Take the noon forecast for each day
  dayMap.forEach((items, date) => {
    // Find forecast closest to noon
    const noonForecast = items.reduce((closest, item) => {
      const itemHour = new Date(item.dt * 1000).getHours();
      const closestHour = new Date(closest.dt * 1000).getHours();
      return Math.abs(itemHour - 12) < Math.abs(closestHour - 12) ? item : closest;
    }, items[0]);
    
    const dayOfWeek = new Date(date).toLocaleDateString('en-US', { weekday: 'short' });
    
    processedForecast.push({
      date,
      dayOfWeek,
      temp: Math.round(noonForecast.main.temp),
      tempMin: Math.round(noonForecast.main.temp_min),
      tempMax: Math.round(noonForecast.main.temp_max),
      description: noonForecast.weather[0].description,
      icon: noonForecast.weather[0].icon,
      humidity: noonForecast.main.humidity,
      windSpeed: noonForecast.wind.speed
    });
  });
  
  // Sort forecast by date
  processedForecast.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  
  // Limit to 5 days
  const fiveDayForecast = processedForecast.slice(0, 5);

  return {
    city: current.name,
    country: current.sys.country,
    current: currentWeather,
    forecast: fiveDayForecast,
    lastUpdated: new Date().toISOString()
  };
};

// Helper to get weather background based on condition and time
export const getWeatherBackground = (icon: string): string => {
  // Check if it's day or night (icon ends with d for day, n for night)
  const isDay = icon.endsWith('d');
  
  // Parse the weather condition from icon (first 2 characters)
  const conditionCode = icon.slice(0, 2);
  let condition: WeatherCondition = 'unknown';
  
  // Map icon codes to conditions
  switch (conditionCode) {
    case '01': condition = 'clear'; break;
    case '02':
    case '03':
    case '04': condition = 'clouds'; break;
    case '09': condition = 'drizzle'; break;
    case '10': condition = 'rain'; break;
    case '11': condition = 'thunderstorm'; break;
    case '13': condition = 'snow'; break;
    case '50': condition = 'mist'; break;
    default: condition = 'unknown';
  }
  
  // Return appropriate background based on condition and time
  if (condition === 'clear' && isDay) return 'bg-sunny-gradient';
  if (condition === 'clear' && !isDay) return 'bg-night-gradient';
  if (condition === 'clouds') return 'bg-cloudy-gradient';
  if (['rain', 'drizzle', 'thunderstorm'].includes(condition)) return 'bg-rainy-gradient';
  
  // Default background
  return isDay ? 'bg-sunny-gradient' : 'bg-night-gradient';
};

// Mock function for development/testing
export const getMockWeatherData = (): WeatherData => {
  return {
    city: "New York",
    country: "US",
    current: {
      temp: 22,
      tempMin: 19,
      tempMax: 24,
      feelsLike: 23,
      humidity: 65,
      windSpeed: 5.2,
      windDirection: 120,
      pressure: 1012,
      description: "Partly cloudy",
      icon: "02d",
      sunrise: 1621232421,
      sunset: 1621284048,
      visibility: 10000,
      timeZone: -14400
    },
    forecast: [
      {
        date: "2023-05-19",
        dayOfWeek: "Mon",
        temp: 22,
        tempMin: 19,
        tempMax: 24,
        description: "Partly cloudy",
        icon: "02d",
        humidity: 65,
        windSpeed: 5.2
      },
      {
        date: "2023-05-20",
        dayOfWeek: "Tue",
        temp: 24,
        tempMin: 20,
        tempMax: 26,
        description: "Sunny",
        icon: "01d",
        humidity: 60,
        windSpeed: 4.5
      },
      {
        date: "2023-05-21",
        dayOfWeek: "Wed",
        temp: 25,
        tempMin: 21,
        tempMax: 27,
        description: "Clear sky",
        icon: "01d",
        humidity: 55,
        windSpeed: 3.8
      },
      {
        date: "2023-05-22",
        dayOfWeek: "Thu",
        temp: 23,
        tempMin: 19,
        tempMax: 25,
        description: "Light rain",
        icon: "10d",
        humidity: 70,
        windSpeed: 6.1
      },
      {
        date: "2023-05-23",
        dayOfWeek: "Fri",
        temp: 20,
        tempMin: 18,
        tempMax: 22,
        description: "Moderate rain",
        icon: "10d",
        humidity: 80,
        windSpeed: 7.3
      }
    ],
    lastUpdated: new Date().toISOString()
  };
};
