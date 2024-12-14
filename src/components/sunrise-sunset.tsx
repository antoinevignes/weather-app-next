import { SunData } from "@/app/types/location";
import { Sunrise, Sunset } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

export function SunriseSunset({ sunData }: { sunData: SunData }) {
  const formatTime = (time: string) => {
    return time.substring(0, 5);
  };

  return (
    <div className="mt-4 pt-4 border-t border-gray-200">
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Lever et coucher du soleil</AccordionTrigger>
          <AccordionContent className="grid grid-cols-2 gap-4">
            <div className="flex items-center">
              <Sunrise className="w-5 h-5 mr-2 text-orange-500" />
              <span>{formatTime(sunData.results.dawn)}</span>
            </div>
            <div className="flex items-center">
              <Sunset className="w-5 h-5 mr-2 text-red-500" />
              <span>{formatTime(sunData.results.dusk)}</span>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
