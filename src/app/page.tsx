"use client";

import axios from "axios";
import { useState } from "react";
import { WeatherCard } from "./Components/WeatherCard";
import { LoadingSpinner } from "./Components/LoadingSpinner";
import { NavBar } from "./Components/NavBar";
import { Hero } from "./Components/Hero";
import { SearchBar } from "./Components/SearchBar";
import { TemperatureToggle } from "./Components/TemperatureToggle";
import { Footer } from "./Components/Footer";
import ForecastCard from "./Components/ForecastCard";
import { ErrorMessage } from "./Components/ErrorMessage";

interface WeatherData {
  city: string;
  country: string;
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  sunrise: string;
  sunset: string;
  feelsLike: number;
}

export default function Home() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [unit, setUnit] = useState<"celsius" | "fahrenheit">("celsius");

  const fetchWeather = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!city.trim()) return;

    setLoading(true);
    setError(null);
    setWeather(null); // Clear previous results on new search
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`;
      const response = await axios.get(url);

      const data = response.data;
      const transformedWeather: WeatherData = {
        city: data.name,
        country: data.sys.country,
        temperature: data.main.temp,
        condition: data.weather[0].description,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        sunrise: new Date(data.sys.sunrise * 1000).toLocaleTimeString(),
        sunset: new Date(data.sys.sunset * 1000).toLocaleTimeString(),
        feelsLike: data.main.feels_like,
      };

      setWeather(transformedWeather);
    } catch (error: any) {
      if (error.response && error.response.status === 404) {
        setError("City not found! Please check the spelling and try again.");
      } else {
        setError("An error occurred while fetching data. Please try again.");
      }
    } finally {
      setLoading(false);
    }
    setCity("");
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <NavBar />
      <Hero />
      <SearchBar
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onSubmit={fetchWeather}
      />
      {error && <ErrorMessage message={error} />}
      {weather && <WeatherCard weather={weather} unit={unit} />}
      {weather && <ForecastCard city={weather.city} unit={unit} />}
      <TemperatureToggle
        unit={unit}
        onToggle={() => setUnit(unit === "celsius" ? "fahrenheit" : "celsius")}
      />
      <Footer />
    </div>
  );
}
