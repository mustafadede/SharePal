import { modalActions } from "../../../store/modalSlice";
import { DateFormatter, TextShorter } from "../../../utils/formatter";

function PopularItem({ data, dispatch }) {
  const handleClick = () => {
    dispatch(
      modalActions.openModal({
        name: "searchCardModal",
        data: {
          id: data.id,
          title: data.original_title || data.original_name,
          poster: data.poster_path,
          releaseDate: data.release_date || data.first_air_date,
          overview: data.overview,
          vote: data.vote_average,
          backdrop: data.backdrop_path,
          genres: data.genre_ids,
          mediaType: data.media_type,
          upcoming: data.upcoming,
        },
      })
    );
  };
  // utils functions
  const date = DateFormatter(data.release_date || data.first_air_date, "popular");
  const title = TextShorter(data.original_title || data.original_name);

  return (
    <button className="py-2 mt-4 text-left cursor-pointer group" onClick={handleClick}>
      <div>
        <p className="pb-1 transition-colors xl:text-lg lg:text-md text-fuchsia-600 group-hover:text-slate-300">{title}</p>
        <p className="text-sm transition-colors text-slate-600 group-hover:text-slate-700">{date}</p>
      </div>
    </button>
  );
}

export default PopularItem;
