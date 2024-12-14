import { AirData, WeatherData } from "@/app/types/location";
import { getAirQuality } from "@/lib/getAirQuality";
import { getUvIndex } from "@/lib/getUvIndex";
import { Gauge, Leaf, Sun } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

export function SuppInfo({
  weatherData,
  airData,
}: {
  weatherData: WeatherData;
  airData: AirData;
}) {
  return (
    <div className="mt-2">
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Général</AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center">
                <Gauge className="w-5 h-5 mr-2 text-blue-500" />
                <span>
                  Pression: {Math.round(weatherData.current.surfacePressure)}{" "}
                  hPa
                </span>
              </div>
              <div className="flex items-center">
                <Leaf className="w-5 h-5 mr-2 text-green-500" />
                <span>
                  Qualité de l&apos;air:{" "}
                  {getAirQuality(airData.current.europeanAqi)}
                </span>
              </div>
              <div className="flex items-center">
                <Sun className="w-5 h-5 mr-2 text-yellow-500" />
                <span>
                  Indice UV: {Math.round(weatherData.daily.uvIndexMax[0])}{" "}
                  {getUvIndex(weatherData.daily.uvIndexMax[0])}
                </span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
