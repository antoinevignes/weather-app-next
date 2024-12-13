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
    temperature2mMin: Float32Array;
    uvIndexMax: Float32Array;
  };
};

export type AirData = {
  current: {
    europeanAqi: number;
  };
};

export type CityData = {
  city: string;
  countryCode: string;
};
