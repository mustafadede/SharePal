const useUpcoming = async (setUpcoming) => {
  const min_date = new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString().slice(0, 10);
  const max_date = new Date(new Date().setMonth(new Date().getMonth() + 3)).toISOString().slice(0, 10);
  const response = await fetch(
    `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_release_type=2|3&&primary_release_date.gte=${min_date}&primary_release_date.lte=${max_date}`,
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
