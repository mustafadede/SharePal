export const useCredits = async (movie_id, type) => {
  const response = await fetch(`https://api.themoviedb.org/3/${type}/${movie_id}/credits?language=en-US`, {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_REACT_APP_ACCESS_TOKEN}`,
    },
  });
  const data = await response.json();
  return data.cast;
};
