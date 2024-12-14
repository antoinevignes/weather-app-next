import { useEffect, useState } from "react";
import { AirData, CityData, SunData, WeatherData } from "../types/location";
import { getWeather } from "./fetch-open-meteo";
import { getAirData } from "./fetch-air-quality";
import { getCity } from "./fetch-city";
import { getSunriseSunset } from "./fetch-sunrise-sunset";
import { GetGeolocation } from "@/lib/getGeolocation";

export function GetAllData() {
  const { location } = GetGeolocation();
  const [weatherData, setWeatherData] = useState<WeatherData>();
  const [airData, setAirData] = useState<AirData>();
  const [city, setCity] = useState<CityData>();
  const [sunData, setSunData] = useState<SunData>();

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
          const sunData = await getSunriseSunset(
            location.latitude,
            location.longitude
          );
          setSunData(sunData);
        } catch (err) {
          console.error("Erreur API :", err);
        }
    };
    fetchData();
  }, [location]);

  return { weatherData, airData, city, sunData };
}
