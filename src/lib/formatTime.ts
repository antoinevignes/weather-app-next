export const formatTime = (timestamp: number) => {
  const date = new Date(timestamp * 1000);
  const hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}h${minutes}`;
};
