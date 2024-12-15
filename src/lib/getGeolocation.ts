import { useState, useEffect } from "react";

export function GetGeolocation() {
  const [location, setLocation] = useState<{
    latitude: number | null;
    longitude: number | null;
  }>({
    latitude: null,
    longitude: null,
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
        },
        () => {
          console.error("Erreur lors de la récupération de la position");
        }
      );
    } else {
      console.error("Geolocation n'est pas compatible avec votre navigateur");
    }
  }, []);

  return { location };
}
