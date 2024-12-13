export const getCity = async (latitude: number, longitude: number) => {
  const url = `https://api-bdc.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=fr`;

  const response = await fetch(url);
  const data = await response.json();

  console.log(data);

  return data;
};
