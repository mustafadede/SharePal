const useSearchWithYear = async (title, year) => {
  try {
    const response = await fetch(`https://api.themoviedb.org/3/search/multi?query=${title}&include_adult=false&language=en-US&page=1`, {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_REACT_APP_ACCESS_TOKEN}`,
      },
    });
    console.log("hello");
    const data = await response.json();
    const filteredData = data.results.filter((item) =>
      item.release_date?.includes(year) ? item : item.first_air_date?.includes(year) ? item : null
    );
    console.log(filteredData[0]);
    return filteredData[0];
  } catch (err) {
    console.log(err);
  }
};

export default useSearchWithYear;
