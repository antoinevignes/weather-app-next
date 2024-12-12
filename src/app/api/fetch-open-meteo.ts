import { fetchWeatherApi } from "openmeteo";

export const getWeather = async (latitude: number, longitude: number) => {
  const params = {
    latitude: latitude,
    longitude: longitude,
    current: [
      "temperature_2m",
      "relative_humidity_2m",
      "apparent_temperature",
      "weather_code",
      "surface_pressure",
      "wind_speed_10m",
    ],
    daily: ["weather_code", "temperature_2m_max"],
    timezone: "Europe/London",
    forecast_days: 4,
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
  const daily = response.daily()!;

  // Note: The order of weather variables in the URL query and the indices below need to match!
  const weatherData = {
    current: {
      time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
      temperature2m: current.variables(0)!.value(),
      relativeHumidity2m: current.variables(1)!.value(),
      apparentTemperature: current.variables(2)!.value(),
      weatherCode: current.variables(3)!.value(),
      surfacePressure: current.variables(4)!.value(),
      windSpeed10m: current.variables(5)!.value(),
    },
    daily: {
      time: range(
        Number(daily.time()),
        Number(daily.timeEnd()),
        daily.interval()
      ).map((t) => new Date((t + utcOffsetSeconds) * 1000)),
      weatherCode: daily.variables(0)!.valuesArray()!,
      temperature2mMax: daily.variables(1)!.valuesArray()!,
    },
  };

  // `weatherData` now contains a simple structure with arrays for datetime and weather data
  // for (let i = 0; i < weatherData.daily.time.length; i++) {
  //   console.log(
  //     weatherData.daily.time[i].toISOString(),
  //     weatherData.daily.weatherCode[i],
  //     weatherData.daily.temperature2mMax[i]
  //   );
  // }

  console.log(weatherData);

  return weatherData;
};
