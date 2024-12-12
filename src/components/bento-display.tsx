"use client";

import { BentoGrid, BentoGridItem } from "./ui/bento-grid";
import { WeatherDetailsProps } from "@/app/types/location";
import { formatTime } from "@/lib/formatTime";
import { Sunrise, Sunset, Wind } from "lucide-react";

export const BentoDisplay: React.FC<WeatherDetailsProps> = ({
  weatherData,
  airData,
}) => {
  const sunrise = formatTime(weatherData.sys.sunrise);
  const sunset = formatTime(weatherData.sys.sunset);
  const iconUrl = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`;

  const items = [
    {
      title: `${weatherData?.name}, ${weatherData.sys.country}`,
      description: `${weatherData.weather[0].description}, ${Math.round(
        weatherData?.main.temp ?? 0
      )}°C, ressenti ${Math.round(weatherData.main.feels_like)}°C`,
      header: (
        <img
          src={iconUrl}
          alt="weather icon"
          className="h-36 w-36 mx-auto mt-5"
        />
      ),
      className: "md:col-span-2",
    },
    {
      title: `${weatherData.wind.speed} m/s`,
      description: "",
      header: <Wind className="mt-5 h-28 w-28 mx-auto" />,
      className: "md:col-span-1",
    },
    {
      title: "Lever",
      description: `${sunrise}`,
      header: <Sunrise className="mt-5 h-28 w-28 mx-auto" />,
      className: "md:col-span-1",
    },
    {
      title: "Coucher",
      description: `${sunset}`,
      header: <Sunset className="mt-5 h-28 w-28 mx-auto" />,
    },
    {
      title: "The Power of Communication",
      description:
        "Understand the impact of effective communication in our lives.",
      header: "Hello",
      className: "md:col-span-2",
    },
  ];

  return (
    <BentoGrid className="max-w-4xl mx-auto md:auto-rows-[20rem]">
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.title}
          description={item.description}
          header={item.header}
          className={item.className}
          icon={item.icon}
        />
      ))}
    </BentoGrid>
  );
};
