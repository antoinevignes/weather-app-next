"use client";

import { useEffect, useState } from "react";
import { fetchWeather } from "../api/weather";

type Location = {
  latitude: number | null;
  longitude: number | null;
};

export default function Location() {
  const [location, setLocation] = useState<Location>({
    latitude: null,
    longitude: null,
  });

  const [data, setData] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;

      setLocation({ latitude, longitude });
    });
  }, []);

  useEffect(() => {
    const getWeather = async () => {
      if (location.latitude !== null && location.longitude !== null) {
        const data = await fetchWeather(location.latitude, location.longitude);
        setData(data);
      }
    };

    getWeather();
  }, [location]);

  return <>{data ? <div>{data.name}</div> : <p>Chargement...</p>}</>;
}
