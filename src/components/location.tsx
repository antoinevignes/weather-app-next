"use client";

import { useEffect, useState } from "react";
import { Droplets, Gauge, Leaf, Sunrise, Sunset, Wind } from "lucide-react";
import { AirData, LocationData, WeatherData } from "@/app/types/location";
import { getWeatherIcon } from "@/lib/getWeatherIcon";
import { getWeather } from "@/app/api/fetch-open-meteo";
import { getAirData } from "@/app/api/fetch-air-quality";
import { getAirQuality } from "@/lib/getAirQuality";

export default function Location() {
  const [location, setLocation] = useState<LocationData>({
    latitude: null,
    longitude: null,
  });
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [airData, setAirData] = useState<AirData>();
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
        } catch (err) {
          console.error("Erreur API :", err);
          setError("Erreur lors de la récupération des données.");
        }
    };
    fetchData();
  }, [location]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-400 to-blue-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 max-w-lg w-full">
        <h1 className="text-3xl font-bold text-center mb-4">Toulouse</h1>

        <div className="flex items-center justify-center mb-6">
          {getWeatherIcon(
            weatherData?.current.weatherCode ?? 0,
            "w-16 h-16 mr-4"
          )}
          <span className="text-5xl font-bold">
            {Math.round(weatherData?.current.temperature2m ?? 0)}°C
          </span>
        </div>

        <p className="text-center text-xl mb-6">
          Ressenti : {Math.round(weatherData?.current.apparentTemperature ?? 0)}
          °C
        </p>

        <div className="grid grid-cols-4 gap-4 mb-6">
          {weatherData?.daily.time.map((day: string, index: number) => {
            const formattedDate = new Date(day).toLocaleDateString("fr-FR", {
              weekday: "short",
            });
            const weatherCode = weatherData.daily.weatherCode[index];

            return (
              <div key={day} className="text-center">
                <p className="font-semibold">{formattedDate}</p>
                {getWeatherIcon(weatherCode, "w-8 h-8 mx-auto my-2")}
                <p>{Math.round(weatherData.daily.temperature2mMax[index])}°C</p>
              </div>
            );
          })}
        </div>

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
        <div className="mt-4 pt-4 border-t border-gray-200">
          <h2 className="text-lg font-semibold mb-2">
            Informations supplémentaires
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center">
              <Gauge className="w-5 h-5 mr-2 text-blue-500" />
              <span>
                Pression:{" "}
                {Math.round(weatherData?.current.surfacePressure ?? 0)} hPa
              </span>
            </div>
            <div className="flex items-center">
              <Leaf className="w-5 h-5 mr-2 text-green-500" />
              <span>
                Qualité de l&apos;air:{" "}
                {getAirQuality(airData?.current.europeanAqi ?? 0)}
              </span>
            </div>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-gray-200">
          <h2 className="text-lg font-semibold mb-2">
            Lever et coucher du soleil
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center">
              <Sunrise className="w-5 h-5 mr-2 text-orange-500" />
              <span>Lever: 06:45</span>
            </div>
            <div className="flex items-center">
              <Sunset className="w-5 h-5 mr-2 text-red-500" />
              <span>Coucher: 20:30</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
