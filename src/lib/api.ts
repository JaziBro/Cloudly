const BASE_URL = process.env.NEXT_PUBLIC_WEATHER_API_URL;
const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

export const getWeatherData = async (city: string) => {
  try {
    const res = await fetch(`${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`);
    if (!res.ok) {
      throw new Error('Failed to fetch weather data');
    }
    return await res.json();
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};

export const getForecastData = async (city: string) => {
  try {
    const res = await fetch(`${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`);
    if (!res.ok) {
      throw new Error('Failed to fetch forecast data');
    }
    return await res.json();
  } catch (error) {
    console.error('Error fetching forecast data:', error);
    throw error;
  }
};
