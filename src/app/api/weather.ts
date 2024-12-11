export async function fetchApi(
  latitude: number,
  longitude: number,
  fetchType: string
) {
  const API_KEY = "d91e40b3ac363f5aded3207f4ee0c2c1";
  const url = `https://api.openweathermap.org/data/2.5/${fetchType}?lat=${latitude}&lon=${longitude}&units=metric&lang=fr&appid=${API_KEY}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Erreur lors de la récupération des données météo");
  }

  const data = await response.json();

  console.log(data);

  return data;
}
