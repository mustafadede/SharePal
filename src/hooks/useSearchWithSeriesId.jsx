const useSearchWithSeriesId = async (id) => {
  try {
    const response = await fetch(`https://api.themoviedb.org/3/tv/${id}&include_adult=false&language=en-US&page=1`, {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_REACT_APP_ACCESS_TOKEN}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export default useSearchWithSeriesId;
