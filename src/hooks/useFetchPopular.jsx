const useFetchPopular = async (setData, mediaType) => {
  if (mediaType === "tv") {
    const response = await fetch(`https://api.themoviedb.org/3/trending/tv/day`, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_REACT_APP_ACCESS_TOKEN}`,
      },
    });
    const data = await response.json();
    const populerDatas = data.results.slice(0, 4);
    setData(populerDatas);
    return;
  } else {
    const response = await fetch(`https://api.themoviedb.org/3/trending/movie/day`, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_REACT_APP_ACCESS_TOKEN}`,
      },
    });
    const data = await response.json();
    const populerDatas = data.results.slice(0, 4);
    setData(populerDatas);
    return;
  }
};
export default useFetchPopular;
