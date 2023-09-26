const useSimilar = async (id, mediaType) => {
  let data;
  if (mediaType === "tv") {
    const response = await fetch(`https://api.themoviedb.org/3/tv/${id}/recommendations?language=en-US&page=1`, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_REACT_APP_ACCESS_TOKEN}`,
      },
    });
    data = await response.json();
  } else {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/recommendations?language=en-US&page=1`, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_REACT_APP_ACCESS_TOKEN}`,
      },
    });
    data = await response.json();
  }
  return data.results;
};

export default useSimilar;
