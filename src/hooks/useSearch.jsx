let value = 0;

const useSearch = async (search, setMovies) => {
  try {
    if (search === "") return;
    if (search) {
      console.log(search);
      const response = await fetch(`https://api.themoviedb.org/3/search/multi?query=${search}&include_adult=false&language=en-US&page=1`, {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_REACT_APP_ACCESS_TOKEN}`,
        },
      });
      const data = await response.json();
      console.log(value++);
      setMovies(data.results);
    }
  } catch (err) {
    console.log(err);
  }
};

export default useSearch;
