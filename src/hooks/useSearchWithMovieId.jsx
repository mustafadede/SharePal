const useSearchWithMovieId = async (id) => {
  const response = await fetch(`https://api.themoviedb.org/3/movie/${id}&include_adult=false&language=en-US&page=1`, {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_REACT_APP_ACCESS_TOKEN}`,
    },
  });
  const data = await response.json();
  return data;
};

export default useSearchWithMovieId;
