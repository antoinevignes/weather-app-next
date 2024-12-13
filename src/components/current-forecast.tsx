import { CityData, WeatherData } from "@/app/types/location";
import { getWeatherIcon } from "@/lib/getWeatherIcon";

export function CurrentForecast({
  weatherData,
  city,
}: {
  weatherData: WeatherData;
  city: CityData;
}) {
  return (
    <div>
      <h1 className="text-3xl font-bold text-center mb-4">
        {city.city}, {city.countryCode}
      </h1>

      <div className="flex items-center justify-center mb-6">
        {getWeatherIcon(weatherData.current.weatherCode, "w-16 h-16 mr-4")}
        <span className="text-5xl font-bold">
          {Math.round(weatherData.current.temperature2m)}°C
        </span>
      </div>

      <p className="text-center text-xl mb-6">
        Ressenti : {Math.round(weatherData.current.apparentTemperature)}
        °C
      </p>
    </div>
  );
}
