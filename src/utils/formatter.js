export function DateFormatter(data) {
  const day = new Date(data.date || data).getDate();
  const month = new Date(data.date || data).getMonth() + 1;
  const year = new Date(data.date || data).getFullYear();
  const hour = new Date(data.date || data).getHours();
  const minute = new Date(data.date || data).getMinutes();
  return `${day}/${month}/${year} ${hour}:${minute < 10 ? "0" + minute : minute}`;
}
