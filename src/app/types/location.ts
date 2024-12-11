export type LocationData = {
  latitude: number | null;
  longitude: number | null;
};

export type WeatherData = {
  name: string;
  main: {
    temp: number;
    humidity: number;
  };
  weather: {
    description: string;
  }[];
  wind: {
    speed: number;
  };
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
};

export type AirData = {
  list: {
    main: {
      aqi: number;
    };
  }[];
};
