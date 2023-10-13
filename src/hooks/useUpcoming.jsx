const useUpcoming = async (setUpcoming) => {
  const min_date = new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString().slice(0, 10);
  const max_date = new Date(new Date().setMonth(new Date().getMonth() + 3)).toISOString().slice(0, 10);
  const response = await fetch(
    `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&page=1&primary_release_date.gte=${min_date}&primary_release_date.lte=${max_date}&sort_by=popularity.desc`,
    {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_REACT_APP_ACCESS_TOKEN}`,
      },
    }
  );
  const data = await response.json();
  setUpcoming(data);
};

export default useUpcoming;
