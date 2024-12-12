export type LocationData = {
  latitude: number | null;
  longitude: number | null;
};

export type WeatherData = {
  current: {
    time: Date;
    temperature2m: number;
    relativeHumidity2m: number;
    apparentTemperature: number;
    isDay: number;
    precipitation: number;
    rain: number;
    showers: number;
    windGusts10m: number;
  };
};
