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
    weatherCode: number;
    surfacePressure: number;
    windSpeed10m: number;
  };
  daily: {
    time: Date[];
    weatherCode: number[];
    temperature2mMax: Float32Array;
  };
};

export type AirData = {
  current: {
    europeanAqi: number;
  };
};
