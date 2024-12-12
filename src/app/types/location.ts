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
    precipitation: number;
    rain: number;
    showers: number;
    windSpeed10m: number;
    surfacePressure: number;
  };
  daily: {
    time: Array;
    temperature2mMax: Float32Array;
  };
};
