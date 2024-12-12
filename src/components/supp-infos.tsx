import { AirData, WeatherData } from "@/app/types/location";
import { getAirQuality } from "@/lib/getAirQuality";
import { Gauge, Leaf } from "lucide-react";

export function SuppInfo({
  weatherData,
  airData,
}: {
  weatherData: WeatherData;
  airData: AirData;
}) {
  return (
    <div className="mt-4 pt-4 border-t border-gray-200">
      <h2 className="text-lg font-semibold mb-2">
        Informations supplémentaires
      </h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center">
          <Gauge className="w-5 h-5 mr-2 text-blue-500" />
          <span>
            Pression: {Math.round(weatherData?.current.surfacePressure ?? 0)}{" "}
            hPa
          </span>
        </div>
        <div className="flex items-center">
          <Leaf className="w-5 h-5 mr-2 text-green-500" />
          <span>
            Qualité de l&apos;air:{" "}
            {getAirQuality(airData?.current.europeanAqi ?? 0)}
          </span>
        </div>
      </div>
    </div>
  );
}
