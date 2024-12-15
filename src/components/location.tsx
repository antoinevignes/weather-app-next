"use client";

import { Droplets, Wind } from "lucide-react";
import { DailyForecast } from "./daily-forecast";
import { CurrentForecast } from "./current-forecast";
import { SuppInfo } from "./supp-infos";
import { SunriseSunset } from "./sunrise-sunset";
import { GetAllData } from "@/app/api/fetch-all-data";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

export default function Location() {
  const { weatherData, airData, city, sunData } = GetAllData();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#e6e9ef] to-[#dce0e8] flex items-center justify-center p-4 dark:from-[#181825] dark:to-[#11111b]">
      {weatherData && city && airData && sunData ? (
        <div className="bg-[#eff1f5] dark:bg-[#1e1e2e] rounded-lg shadow-xl p-6 max-w-lg w-full">
          <CurrentForecast weatherData={weatherData} city={city} />

          <DailyForecast weatherData={weatherData} />

          <div className="flex justify-between text-sm">
            <div className="flex items-center">
              <Droplets className="w-4 h-4 mr-1" />
              <span>Humidité: {weatherData?.current.relativeHumidity2m}%</span>
            </div>
            <div className="flex items-center">
              <Wind className="w-4 h-4 mr-1" />
              <span>
                Vent: {Math.round(weatherData?.current.windSpeed10m ?? 0)}km/h
              </span>
            </div>
          </div>

          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-lg font-semibold mt-3">
                Informations supplémentaires
              </AccordionTrigger>
              <AccordionContent>
                <SuppInfo weatherData={weatherData} airData={airData} />

                <SunriseSunset sunData={sunData} />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      ) : (
        <div className="bg-[#eff1f5] dark:bg-[#1e1e2e] rounded-lg shadow-xl p-6 max-w-lg w-full">
          <p className="m-10 text-center">Chargement...</p>
        </div>
      )}
    </div>
  );
}
