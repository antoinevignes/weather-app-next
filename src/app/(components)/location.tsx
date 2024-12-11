"use client";

import { useEffect, useState } from "react";
import { AirData, LocationData, WeatherData } from "../types/location";
import { getWeatherAndAirData } from "../api/weather";
import { WeatherDetails } from "./weather-bento";

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

  return (
    <div className="h-screen flex justify-center items-center text-center">
      {error && <p>{error}</p>}
      {weatherData && airData ? (
        <WeatherDetails weatherData={weatherData} airData={airData} />
      ) : (
        <p>Chargement de la météo...</p>
      )}
    </div>
  );
}
