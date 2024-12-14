export const getSunriseSunset = async (latitude: number, longitude: number) => {
  const url = `https://api.sunrisesunset.io/json?lat=${latitude}&lng=${longitude}&time_format=24`;

  const response = await fetch(url);
  const data = await response.json();

  console.log(data);

  return data;
};
