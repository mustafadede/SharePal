const useTrailer = async (movieId, mediaType) => {
  let data;
  if (mediaType === "movie") {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_REACT_APP_ACCESS_TOKEN}`,
      },
    });
    data = await response.json();
  } else {
    const response = await fetch(`https://api.themoviedb.org/3/tv/${movieId}/videos?language=en-US`, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_REACT_APP_ACCESS_TOKEN}`,
      },
    });
    data = await response.json();
  }
  return data.results.filter((item) => (item.type === "Trailer" || item.type === "Teaser") && item.site === "YouTube");
};

export default useTrailer;
