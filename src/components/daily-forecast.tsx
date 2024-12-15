import { WeatherData } from "@/app/types/location";
import { getWeatherIcon } from "@/lib/getWeatherIcon";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";

export function DailyForecast({ weatherData }: { weatherData: WeatherData }) {
  return (
    <ScrollArea className="ml-4 mb-4">
      <div className="flex gap-6 mb-6">
        {weatherData.daily.time.map((day: Date, index: number) => {
          const formattedDate = new Date(day).toLocaleDateString("fr-FR", {
            weekday: "short",
          });
          const weatherCode = weatherData.daily.weatherCode[index];

          return (
            <div
              key={day.toISOString()}
              className="text-center border-2 rounded-md border-transparent hover:border-[#4c4f69] dark:hover:border-[#cdd6f4] transition duration-200 cursor-pointer px-3"
            >
              <p className="font-semibold">{formattedDate}</p>
              {getWeatherIcon(weatherCode, "w-8 h-8 mx-auto my-2")}
              <p>
                {Math.round(weatherData.daily.temperature2mMin[index])}°C/
                {Math.round(weatherData.daily.temperature2mMax[index])}°C
              </p>
            </div>
          );
        })}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
