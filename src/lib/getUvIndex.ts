export function getUvIndex(uvIndex: number) {
  switch (true) {
    case uvIndex < 2:
      return "(Bas)";
    case uvIndex < 5:
      return "(Moyen)";
    case uvIndex < 7:
      return "(Élevé)";
    case uvIndex < 10:
      return "(Très élevé)";
    case uvIndex === 11:
      return "(Extrême)";
    default:
      break;
  }
}
