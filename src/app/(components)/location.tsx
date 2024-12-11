"use client";

import { useEffect, useState } from "react";
import { AirData, LocationData, WeatherData } from "../types/location";
import { formatTime } from "../utils/formatTime";
import { getWeatherAndAirData } from "../api/weather";

export default function Location() {
  const [location, setLocation] = useState<LocationData>({
    latitude: null,
    longitude: null,
  });
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [airData, setAirData] = useState<AirData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
        },
        () => {
          setError("Erreur lors de la récupération de la position");
        }
      );
    } else {
      setError("Geolocation n'est pas compatible avec votre navigateur");
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (location.latitude !== null && location.longitude !== null) {
        try {
          const { weatherData, airData } = await getWeatherAndAirData(
            location.latitude,
            location.longitude
          );
          setWeatherData(weatherData);
          setAirData(airData);
        } catch (err) {
          setError("Erreur lors de la récupération des données.");
        }
      }
    };

    fetchData();
  }, [location]);

  const sunrise = weatherData ? formatTime(weatherData.sys.sunrise) : "N/A";
  const sunset = weatherData ? formatTime(weatherData.sys.sunset) : "N/A";
  const iconUrl = `https://openweathermap.org/img/wn/${weatherData?.weather[0].icon}@2x.png`;

  return (
    <div className="h-screen flex justify-center items-center text-center">
      {error && <p>{error}</p>}
      {weatherData && airData ? (
        <div>
          <h1 className="text-4xl font-bold">
            {weatherData.name}, {weatherData.sys.country}
          </h1>
          <p>Température : {Math.round(weatherData.main.temp)}°C</p>
          <p>Ressenti : {Math.round(weatherData.main.feels_like)}°C</p>
          <p>Humidité : {weatherData.main.humidity}%</p>
          <p>{weatherData.weather[0].description}</p>
          <p>Vent : {weatherData.wind.speed} m/s</p>
          <p>Lever du soleil: {sunrise}</p>
          <p>Coucher du soleil: {sunset}</p>
          <p>Qualité de l&apos;air: {airData.list[0].main.aqi}</p>
          <img src={iconUrl} alt="weather icon" />
        </div>
      ) : (
        <p>Chargement de la météo...</p>
      )}
    </div>
  );
}
