import { AirData, WeatherData } from "@/app/types/location";
import { getAirQuality } from "@/lib/getAirQuality";
import { getUvIndex } from "@/lib/getUvIndex";
import { CloudRain, Gauge, Leaf, Sun } from "lucide-react";

export function SuppInfo({
  weatherData,
  airData,
}: {
  weatherData: WeatherData;
  airData: AirData;
}) {
  return (
    <div className="mt-2">
      <h2 className="font-semibold mb-2">Général</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center">
          <Gauge className="w-5 h-5 mr-2 text-[#1e66f5] dark:text-[#89b4fa]" />
          <span>
            Pression: {Math.round(weatherData.current.surfacePressure)} hPa
          </span>
        </div>
        <div className="flex items-center">
          <Leaf className="w-5 h-5 mr-2 text-[#40a02b] dark:text-[#a6e3a1]" />
          <span>
            Qualité de l&apos;air: {getAirQuality(airData.current.europeanAqi)}
          </span>
        </div>
        <div className="flex items-center">
          <Sun className="w-5 h-5 mr-2 text-[#df8e1d] dark:text-[#f9e2af]" />
          <span>
            Indice UV: {Math.round(weatherData.daily.uvIndexMax[0])}{" "}
            {getUvIndex(weatherData.daily.uvIndexMax[0])}
          </span>
        </div>
        <div className="flex items-center">
          <CloudRain className="w-5 h-5 mr-2 text-[#209fb5] dark:text-[#74c7ec]" />
          <span>Précipitations : {weatherData.current.precipitation}mm</span>
        </div>
      </div>
    </div>
  );
}
