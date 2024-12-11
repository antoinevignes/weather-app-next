export async function fetchWeather(latitude: number, longitude: number) {
  const API_KEY = "cf3d446e708730b22a30e7e49053883c";
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Erreur lors de la récupération des données météo");
  }

  const data = await response.json();

  console.log(data);

  return data;
}
