import { AirData, WeatherData } from "../types/location";
import { formatTime } from "../utils/formatTime";

type WeatherDetailsProps = {
  weatherData: WeatherData;
  airData: AirData;
};

export const WeatherDetails: React.FC<WeatherDetailsProps> = ({
  weatherData,
  airData,
}) => {
  const sunrise = formatTime(weatherData.sys.sunrise);
  const sunset = formatTime(weatherData.sys.sunset);
  const iconUrl = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;

  return (
    <div>
      <h1 className="text-4xl font-bold">
        {weatherData.name}, {weatherData.sys.country}
      </h1>
      <p>Température : {Math.round(weatherData.main.temp)}°C</p>
      <p>Humidité : {weatherData.main.humidity}%</p>
      <p>{weatherData.weather[0].description}</p>
      <p>Vent : {weatherData.wind.speed} m/s</p>
      <p>Lever du soleil : {sunrise}</p>
      <p>Coucher du soleil : {sunset}</p>
      <p>Qualité de l&apos;air : {airData.list[0].main.aqi}</p>
      <img src={iconUrl} alt="weather icon" />
    </div>
  );
};
