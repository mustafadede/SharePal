import React from "react";
import { NavLink } from "react-router-dom";
import useSearchWithYear from "../../../../hooks/useSearchWithYear";
import { modalActions } from "../../../../store/modalSlice";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

function FeedActionCardWantToWatchComponent({ data, title, user }) {
  const dispatch = useDispatch();
  const { i18n } = useTranslation();
  const onClickHandler = () => {
    const movieInfoHandler = () => {
      useSearchWithYear(data.attachedAction.title, data.attachedAction.releaseDate).then((data) => {
        if (data) {
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
        }
      });
    };
    movieInfoHandler();
  };
  return (
    <div className="flex">
      <div className="flex items-center gap-1">
        <NavLink to={data?.nick === user ? `/profile` : `/user/${data?.nick}`}>
          <img className="object-cover w-10 h-10 mr-1 rounded-full cursor-pointer" src={data?.photoURL} alt="avatar" />
        </NavLink>
        {i18n.language === "en" ? (
          <>
            <NavLink to={data?.nick === user ? `/profile` : `/user/${data?.nick}`}>
              <p className="w-full transition-all duration-300 hover:underline text-md lg:text-lg text-end text-fuchsia-600 hover:cursor-pointer hover:text-white">
                {data?.nick.length < 14 ? data?.nick : data?.nick.slice(0, 14) + "..."}
              </p>
            </NavLink>
            <span className="duration-150 text-md lg:text-lg text-slate-400 group-hover:text-slate-200">wants to watch</span>
            <button
              className="transition-all duration-300 w-fit text-md lg:text-lg text-fuchsia-600 hover:cursor-pointer hover:text-white hover:underline"
              onClick={onClickHandler}
            >
              {title}
            </button>
          </>
        ) : (
          <>
            <NavLink to={data?.nick === user ? `/profile` : `/user/${data?.nick}`}>
              <p className="w-full transition-all duration-300 hover:underline text-md lg:text-lg text-end text-fuchsia-600 hover:cursor-pointer hover:text-white">
                {data?.nick.length < 14 ? data?.nick : data?.nick.slice(0, 14) + "..."}
              </p>
            </NavLink>
            <button
              className="transition-all duration-300 w-fit text-md lg:text-lg text-fuchsia-400 hover:cursor-pointer hover:text-white hover:underline"
              onClick={onClickHandler}
            >
              {title}
            </button>
            <span className="duration-150 text-md lg:text-lg text-slate-400 group-hover:text-slate-200">izlemek istiyor </span>
          </>
        )}
      </div>
    </div>
  );
}

export default FeedActionCardWantToWatchComponent;
