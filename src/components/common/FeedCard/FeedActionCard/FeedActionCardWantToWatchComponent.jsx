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
    <>
      <div className="inline md:flex md:items-center">
        <NavLink to={data?.nick === user ? `/profile` : `/user/${data?.nick}`} className="hidden lg:block">
          <img className="inline object-cover w-10 h-10 mr-4 rounded-full cursor-pointer" src={data?.photoURL} alt="avatar" />
        </NavLink>
        {i18n.language === "en" ? (
          <>
            <NavLink to={data?.nick === user ? `/profile` : `/user/${data?.nick}`} className="inline">
              <p className="inline pr-2 transition-all duration-300 hover:underline text-md lg:text-lg text-end text-fuchsia-600 hover:cursor-pointer hover:text-white">
                {data?.nick.length < 14 ? data?.nick : data?.nick.slice(0, 14) + "..."}
              </p>
            </NavLink>
            <span className="inline pr-2 duration-150 text-md lg:text-lg text-slate-400 group-hover:text-slate-200">wants to watch</span>
            <button
              className="transition-all duration-300 w-fit text-md lg:text-lg text-fuchsia-600 hover:cursor-pointer hover:text-white hover:underline"
              onClick={onClickHandler}
            >
              {title.length < 24 ? title : title.slice(0, 24) + "..."}
            </button>
          </>
        ) : (
          <div className="w-fit">
            <NavLink to={data?.nick === user ? `/profile` : `/user/${data?.nick}`} className="inline">
              <p className="inline w-full transition-all duration-300 hover:underline text-md lg:text-lg text-end text-fuchsia-600 hover:cursor-pointer hover:text-white">
                {data?.nick.length < 14 ? data?.nick + " " : data?.nick.slice(0, 14) + "... "}
              </p>
            </NavLink>
            <button
              className="transition-all duration-300 w-fit text-md lg:text-lg text-fuchsia-400 hover:cursor-pointer hover:text-white hover:underline"
              onClick={onClickHandler}
            >
              {title.length < 24 ? title : title.slice(0, 24) + "..."}
            </button>
            <span className="duration-150 text-md lg:text-lg text-slate-400 group-hover:text-slate-200">{" izlemek istiyor "}</span>
          </div>
        )}
      </div>
    </>
  );
}

export default FeedActionCardWantToWatchComponent;
