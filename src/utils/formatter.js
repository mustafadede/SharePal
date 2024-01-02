export function DateFormatter(data, infoType = "cards") {
  if (infoType === "cards") {
    const day = new Date(data.date || data).getDate();
    const month = new Date(data.date || data).getMonth() + 1;
    const year = new Date(data.date || data).getFullYear();
    const hour = new Date(data.date || data).getHours();
    const minute = new Date(data.date || data).getMinutes();
    return `${day}/${month}/${year} ${hour}:${minute < 10 ? "0" + minute : minute}`;
  } else {
    const day = new Date(data).getDate();
    const month = new Date(data).getMonth() + 1;
    const year = new Date(data).getFullYear();
    return `${day}/${month}/${year}`;
  }
}

export function TextShorter(data, sliceData = 47) {
  return data.length > sliceData ? (data = data.slice(0, sliceData) + "...") : data;
}
