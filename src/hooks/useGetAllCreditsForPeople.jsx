const useGetAllCreditsForPeople = async (search, setCredit) => {
  try {
    if (search === "") return;
    if (search) {
      const response = await fetch(`https://api.themoviedb.org/3/person/${search}/combined_credits?language=en-US`, {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_REACT_APP_ACCESS_TOKEN}`,
        },
      });
      const data = await response.json();
      setCredit(data.results);
    }
  } catch (err) {
    console.log(err);
  }
};

export default useGetAllCreditsForPeople;
