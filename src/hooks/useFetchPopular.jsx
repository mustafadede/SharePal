const useFetchPopular = async (setData) => {
  const response = await fetch(`https://api.themoviedb.org/3/trending/all/day`, {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_REACT_APP_ACCESS_TOKEN}`,
    },
  });
  const data = await response.json();
  const populerDatas = data.results.slice(0, 4);
  setData(populerDatas);
};
export default useFetchPopular;
