const useNowPlaying = async () => {
  const response = await fetch("https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1", {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_REACT_APP_ACCESS_TOKEN}`,
    },
  });
  const data = await response.json();
  return data;
};

export default useNowPlaying;
