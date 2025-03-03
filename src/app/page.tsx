"use client"

import type React from "react"

import { useState } from "react"
import { NavBar } from "./Components/NavBar"
import { Hero } from "./Components/Hero"
import { SearchBar } from "./Components/SearchBar"
import { LoadingSpinner } from "./Components/LoadingSpinner"
import { ForecastCard } from "./Components/ForecastCard"
import { WeatherCard } from "./Components/WeatherCard"
// import { WeatherCard } from "./components/WeatherCard"
// import { ForecastCard } from "./components/ForecastCard"
// import { TemperatureToggle } from "./components/TemperatureToggle"
// import { LoadingSpinner } from "./components/LoadingSpinner"
// import { ErrorMessage } from "./components/ErrorMessage"
// import { Footer } from "./components/Footer"

type WeatherData = {
  city: string
  country: string
  temperature: number
  condition: string
  humidity: number
  windSpeed: number
  sunrise: string
  sunset: string
  feelsLike: number
}

type ForecastDay = {
  date: string
  temperature: number
  condition: string
}

export default function WeatherApp() {
  const [searchQuery, setSearchQuery] = useState("")
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [forecast, setForecast] = useState<ForecastDay[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [unit, setUnit] = useState<"celsius" | "fahrenheit">("celsius")

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!searchQuery.trim()) return

    setLoading(true)
    setError(null)

    try {
      // Simulate API call with timeout
      await new Promise((resolve) => setTimeout(resolve, 1500))

      if (searchQuery.toLowerCase() === "error") {
        throw new Error("City not found")
      }

      // Mock weather data
      const mockWeatherData: WeatherData = {
        city: searchQuery,
        country: "Country",
        temperature: Math.floor(Math.random() * 30) + 5,
        condition: ["Sunny", "Cloudy", "Rainy"][Math.floor(Math.random() * 3)],
        humidity: Math.floor(Math.random() * 100),
        windSpeed: Math.floor(Math.random() * 30),
        sunrise: "6:00 AM",
        sunset: "6:00 PM",
        feelsLike: Math.floor(Math.random() * 30) + 5,
      }

      // Mock forecast data
      const mockForecast: ForecastDay[] = Array.from({ length: 5 }, (_, i) => ({
        date: new Date(Date.now() + (i + 1) * 24 * 60 * 60 * 1000).toLocaleDateString("en-US", { weekday: "short" }),
        temperature: Math.floor(Math.random() * 30) + 5,
        condition: ["Sunny", "Cloudy", "Rainy"][Math.floor(Math.random() * 3)],
      }))

      setWeather(mockWeatherData)
      setForecast(mockForecast)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch weather data")
    } finally {
      setLoading(false)
    }
  }

  const getBackgroundClass = () => {
    if (!weather) return "bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800"

    switch (weather.condition.toLowerCase()) {
      case "sunny":
        return "bg-gradient-to-br from-yellow-50 to-orange-100 dark:from-yellow-900 dark:to-orange-900"
      case "cloudy":
        return "bg-gradient-to-br from-gray-50 to-gray-200 dark:from-gray-900 dark:to-gray-800"
      case "rainy":
        return "bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800"
      default:
        return "bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800"
    }
  }

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-500 ${getBackgroundClass()}`}>
      <NavBar />
      <main className="flex-1 container max-w-6xl mx-auto px-4 py-8">
        <Hero />
        <div className="flex flex-col gap-8">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <SearchBar value={searchQuery} onChange={setSearchQuery} onSubmit={handleSearch} />
            {/* <TemperatureToggle unit={unit} onToggle={() => setUnit(unit === "celsius" ? "fahrenheit" : "celsius")} /> */}
          </div>

          {loading && <LoadingSpinner />}

          {weather && !loading && !error && (
            <div className="space-y-6">
              <WeatherCard weather={weather} unit={unit} />
              <ForecastCard forecast={forecast} unit={unit} />
            </div>
          )}
        </div>
      </main>
      {/* <Footer /> */}
    </div>
  )
}

