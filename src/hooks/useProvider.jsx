const useProvider = async (id, mediaType) => {
  let data;
  if (mediaType === "movie") {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/watch/providers`, {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_REACT_APP_ACCESS_TOKEN}`,
      },
    });
    data = await response.json();
  } else {
    const response = await fetch(
      `
    https://api.themoviedb.org/3/tv/${id}/watch/providers`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_REACT_APP_ACCESS_TOKEN}`,
        },
      }
    );
    data = await response.json();
  }
  return data.results;
};

export default useProvider;
