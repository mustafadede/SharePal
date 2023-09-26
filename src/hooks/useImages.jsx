const useImages = async (id, mediaType) => {
  let data;
  if (mediaType === "movie") {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/images?api_key=${import.meta.env.VITE_REACT_APP_API_KEY}&include_image_language=en,null`,
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_REACT_APP_ACCESS_TOKEN}`,
        },
      }
    );
    data = await response.json();
  } else {
    const response = await fetch(
      `https://api.themoviedb.org/3/tv/${id}/images?api_key=${import.meta.env.VITE_REACT_APP_API_KEY}}&include_image_language=en,null`,
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_REACT_APP_ACCESS_TOKEN}`,
        },
      }
    );
    data = await response.json();
  }
  return data;
};

export default useImages;
