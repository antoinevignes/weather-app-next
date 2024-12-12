import { WeatherData } from "@/app/types/location";
import { getWeatherIcon } from "@/lib/getWeatherIcon";

export function DailyForecast({ weatherData }: { weatherData: WeatherData }) {
  return (
    <div className="grid grid-cols-4 gap-4 mb-6">
      {weatherData?.daily.time.map((day: string, index: number) => {
        const formattedDate = new Date(day).toLocaleDateString("fr-FR", {
          weekday: "short",
        });
        const weatherCode = weatherData.daily.weatherCode[index];

        return (
          <div key={day} className="text-center">
            <p className="font-semibold">{formattedDate}</p>
            {getWeatherIcon(weatherCode, "w-8 h-8 mx-auto my-2")}
            <p>{Math.round(weatherData.daily.temperature2mMax[index])}°C</p>
          </div>
        );
      })}
    </div>
  );
}
