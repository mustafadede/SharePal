const useGetAllCreditsForPeople = async (personId) => {
  try {
    if (!personId) return null;

    const response = await fetch(`https://api.themoviedb.org/3/person/${personId}/combined_credits?language=en-US`, {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_REACT_APP_ACCESS_TOKEN}`,
      },
    });

    const data = await response.json();
    return {
      cast: data.cast || [],
      crew: data.crew || [],
    };
  } catch (err) {
    console.error("Error fetching credits:", err);
    return { cast: [], crew: [] };
  }
};

export default useGetAllCreditsForPeople;
