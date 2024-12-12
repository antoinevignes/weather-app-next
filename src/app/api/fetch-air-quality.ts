import { fetchWeatherApi } from "openmeteo";

export const getAirData = async (latitude: number, longitude: number) => {
  const params = {
    latitude: latitude,
    longitude: longitude,
    current: "european_aqi",
    timezone: "Europe/London",
    forecast_days: 1,
    domains: "cams_europe",
  };
  const url = "https://air-quality-api.open-meteo.com/v1/air-quality";
  const responses = await fetchWeatherApi(url, params);

  // Helper function to form time ranges
  //   const range = (start: number, stop: number, step: number) =>
  //     Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

  // Process first location. Add a for-loop for multiple locations or weather models
  const response = responses[0];

  // Attributes for timezone and location
  const utcOffsetSeconds = response.utcOffsetSeconds();
  //   const timezone = response.timezone();
  //   const timezoneAbbreviation = response.timezoneAbbreviation();
  //   const latitude = response.latitude();
  //   const longitude = response.longitude();

  const current = response.current()!;

  // Note: The order of weather variables in the URL query and the indices below need to match!
  const weatherData = {
    current: {
      time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
      europeanAqi: current.variables(0)!.value(),
    },
  };

  console.log(weatherData);

  return weatherData;
};
