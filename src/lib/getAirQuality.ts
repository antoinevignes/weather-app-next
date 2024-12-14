export function getAirQuality(aqi: number) {
  switch (true) {
    case aqi < 10:
      return "Très bon";
    case aqi < 20:
      return "Bon";
    case aqi < 25:
      return "Moyen";
    case aqi < 50:
      return "Médiocre";
    case aqi < 75:
      return "Très mauvais";
    case aqi < 800:
      return "Extrèmement mauvais";
    default:
      break;
  }
}
