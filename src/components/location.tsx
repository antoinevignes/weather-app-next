"use client";

import { useEffect, useState } from "react";
import { Droplets, Wind } from "lucide-react";
import {
  AirData,
  CityData,
  LocationData,
  WeatherData,
} from "@/app/types/location";
import { getWeather } from "@/app/api/fetch-open-meteo";
import { getAirData } from "@/app/api/fetch-air-quality";
import { DailyForecast } from "./daily-forecast";
import { CurrentForecast } from "./current-forecast";
import { SuppInfo } from "./supp-infos";
import { SunriseSunset } from "./sunrise-sunset";
import { getCity } from "@/app/api/fetch-city";

export default function Location() {
  const [location, setLocation] = useState<LocationData>({
    latitude: null,
    longitude: null,
  });
  const [city, setCity] = useState<CityData | null>(null);
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
      if (location.latitude !== null && location.longitude !== null)
        try {
          const weatherData = await getWeather(
            location.latitude,
            location.longitude
          );
          setWeatherData(weatherData);
          const airData = await getAirData(
            location.latitude,
            location.longitude
          );
          setAirData(airData);
          const cityData = await getCity(location.latitude, location.longitude);
          setCity(cityData);
        } catch (err) {
          console.error("Erreur API :", err);
          setError("Erreur lors de la récupération des données.");
        }
    };
    fetchData();
  }, [location]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-400 to-blue-600 flex items-center justify-center p-4">
      {weatherData && city && airData ? (
        <div className="bg-white rounded-lg shadow-xl p-6 max-w-lg w-full">
          <CurrentForecast weatherData={weatherData} city={city} />

          <DailyForecast weatherData={weatherData} />

          <div className="flex justify-between text-sm">
            <div className="flex items-center">
              <Droplets className="w-4 h-4 mr-1" />
              <span>Humidité: {weatherData?.current.relativeHumidity2m}%</span>
            </div>
            <div className="flex items-center">
              <Wind className="w-4 h-4 mr-1" />
              <span>
                Vent: {Math.round(weatherData?.current.windSpeed10m ?? 0)}km/h
              </span>
            </div>
          </div>

          <SuppInfo weatherData={weatherData} airData={airData} />

          <SunriseSunset />
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-xl p-6 max-w-lg w-full">
          <p className="m-10 text-center">Chargement...</p>
        </div>
      )}
    </div>
  );
}
