import { fetchWeatherApi } from "openmeteo";

export const getWeatherAndAirData = async (
  latitude: number,
  longitude: number
) => {
  const params = {
    latitude: latitude,
    longitude: longitude,
    current: [
      "temperature_2m",
      "relative_humidity_2m",
      "apparent_temperature",
      "is_day",
      "precipitation",
      "rain",
      "showers",
      "snowfall",
      "weather_code",
      "cloud_cover",
      "pressure_msl",
      "surface_pressure",
      "wind_speed_10m",
      "wind_direction_10m",
      "wind_gusts_10m",
    ],
    timezone: "auto",
  };
  const url = "https://api.open-meteo.com/v1/forecast";
  const responses = await fetchWeatherApi(url, params);

  // Helper function to form time ranges
  // const range = (start: number, stop: number, step: number) =>
  //   Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

  // Process first location. Add a for-loop for multiple locations or weather models
  const response = responses[0];

  // Attributes for timezone and location
  const utcOffsetSeconds = response.utcOffsetSeconds();
  // const timezone = response.timezone();
  // const timezoneAbbreviation = response.timezoneAbbreviation();
  // const latitude = response.latitude();
  // const longitude = response.longitude();

  const current = response.current()!;

  // Note: The order of weather variables in the URL query and the indices below need to match!
  const weatherData = {
    current: {
      time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
      temperature2m: current.variables(0)!.value(),
      relativeHumidity2m: current.variables(1)!.value(),
      apparentTemperature: current.variables(2)!.value(),
      isDay: current.variables(3)!.value(),
      precipitation: current.variables(4)!.value(),
      rain: current.variables(5)!.value(),
      showers: current.variables(6)!.value(),
      snowfall: current.variables(7)!.value(),
      weatherCode: current.variables(8)!.value(),
      cloudCover: current.variables(9)!.value(),
      pressureMsl: current.variables(10)!.value(),
      surfacePressure: current.variables(11)!.value(),
      windSpeed10m: current.variables(12)!.value(),
      windDirection10m: current.variables(13)!.value(),
      windGusts10m: current.variables(14)!.value(),
    },
  };
  console.log(weatherData);

  return weatherData;
};
