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
import { toast } from "sonner"


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
  const [selectedCity, setSelectedCity] = useState(""); // NEW state for forecast
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [unit, setUnit] = useState<"celsius" | "fahrenheit">("celsius");

  const fetchWeather = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!city.trim()) return;
  
    setLoading(true);
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
      setSelectedCity(city);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.status === 404) {
          toast("City not found, Please check the spelling and try again");
        } else {
          toast("Oops! Something went wrong, Please try again");
        }
      } else {
        toast("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
    setCity("");
  };
  

  if (loading) {
    return <LoadingSpinner />;
  } else {
    return (
      <div>
        <NavBar />
        <main className="flex-1 container max-w-6xl mx-auto px-4 py-8">
          <Hero />
          <div className="flex flex-col gap-8">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <SearchBar
                value={city}
                onChange={(e) => setCity(e.target.value)}
                onSubmit={fetchWeather}
              />
              <TemperatureToggle
                unit={unit}
                onToggle={() =>
                  setUnit(unit === "celsius" ? "fahrenheit" : "celsius")
                }
              />
            </div>
            <div className="space-y-6">
              {weather && <WeatherCard weather={weather} unit={unit} />}
              {selectedCity && <ForecastCard city={selectedCity} unit={unit} />}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
}
