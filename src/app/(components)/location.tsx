"use client";

import { useEffect, useState } from "react";
import { fetchApi } from "../api/weather";
import { AirData, LocationData, WeatherData } from "../types/location";

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
    const getWeather = async () => {
      if (location.latitude !== null && location.longitude !== null) {
        const weatherData = await fetchApi(
          location.latitude,
          location.longitude,
          "weather"
        );
        setWeatherData(weatherData);

        const airData = await fetchApi(
          location.latitude,
          location.longitude,
          "air_pollution"
        );
        setAirData(airData);
      }
    };

    getWeather();
  }, [location]);

  const sunriseTimestamp = weatherData?.sys.sunrise ?? 0;
  const dateSunrise = new Date(sunriseTimestamp * 1000);
  const sunriseHours = dateSunrise.getHours();
  const sunriseMinutes = dateSunrise.getMinutes();

  const sunsetTimestamp = weatherData?.sys.sunset ?? 0;
  const dateSunset = new Date(sunsetTimestamp * 1000);
  const sunsetHours = dateSunset.getHours();
  const sunsetMinutes = dateSunset.getMinutes();

  return (
    <div className="h-screen flex justify-center items-center text-center">
      {error && <p>{error}</p>}
      {weatherData && airData ? (
        <div>
          <h1 className="text-4xl font-bold">
            {weatherData.name}, {weatherData.sys.country}
          </h1>
          <p>Température : {Math.round(weatherData.main.temp)}°C</p>
          <p>Humidité : {weatherData.main.humidity}%</p>
          <p>{weatherData.weather[0].description}</p>
          <p>Vent : {weatherData.wind.speed} m/s</p>
          <p>
            Lever du soleil: {sunriseHours}h{sunriseMinutes}
          </p>
          <p>
            Coucher du soleil: {sunsetHours}h{sunsetMinutes}
          </p>
          <p>Qualité de l&apos;air: {airData.list[0].main.aqi}</p>
        </div>
      ) : (
        <p>Chargement de la météo...</p>
      )}
    </div>
  );
}
