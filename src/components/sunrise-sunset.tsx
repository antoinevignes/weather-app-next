import { Sunrise, Sunset } from "lucide-react";

export function SunriseSunset() {
  return (
    <div className="mt-4 pt-4 border-t border-gray-200">
      <h2 className="text-lg font-semibold mb-2">Lever et coucher du soleil</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center">
          <Sunrise className="w-5 h-5 mr-2 text-orange-500" />
          <span>Lever: 06:45</span>
        </div>
        <div className="flex items-center">
          <Sunset className="w-5 h-5 mr-2 text-red-500" />
          <span>Coucher: 20:30</span>
        </div>
      </div>
    </div>
  );
}
