import { SunData } from "@/app/types/location";
import { Sunrise, Sunset } from "lucide-react";

export function SunriseSunset({ sunData }: { sunData: SunData }) {
  const formatTime = (time: string) => {
    return time.substring(0, 5);
  };

  return (
    <div className="mt-4 pt-4 border-t border-gray-200">
      <h2 className="font-semibold mb-2">Lever et coucher du soleil</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center">
          <Sunrise className="w-5 h-5 mr-2 text-[#df8e1d] dark:text-[#f9e2af]" />
          <span>{formatTime(sunData.results.dawn)}</span>
        </div>
        <div className="flex items-center">
          <Sunset className="w-5 h-5 mr-2 text-[#d20f39] dark:text-[#f38ba8]" />
          <span>{formatTime(sunData.results.dusk)}</span>
        </div>
      </div>
    </div>
  );
}
