import {
  Cloud,
  CloudDrizzle,
  CloudFog,
  CloudRain,
  CloudSnow,
  CloudSun,
  Sun,
} from "lucide-react";

export function getWeatherIcon(weatherCode: number, params: string) {
  switch (weatherCode) {
    case 0:
      return <Sun className={`${params} text-yellow-400`} />;
      break;
    case 1:
    case 2:
      return <CloudSun className={`${params}`} />;
      break;
    case 3:
      return <Cloud className={`${params} text-gray-400`} />;
      break;
    case 45:
    case 48:
      return <CloudFog className={`${params} text-gray-400`} />;
      break;
    case 51:
    case 53:
    case 55:
    case 56:
    case 57:
      return <CloudDrizzle className={`${params} text-gray-400`} />;
      break;
    case 61:
    case 63:
    case 65:
    case 66:
    case 67:
    case 80:
    case 81:
    case 82:
    case 95:
    case 96:
    case 99:
      return <CloudRain className={`${params} text-gray-400`} />;
      break;
    case 71:
    case 73:
    case 75:
    case 77:
    case 85:
    case 86:
      return <CloudSnow className={`${params} text-gray-400`} />;
      break;
    default:
      break;
  }
}
