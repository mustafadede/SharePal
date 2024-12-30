import React, { useState } from "react";
import { CheckIcon, Cross1Icon, InfoCircledIcon, ShuffleIcon } from "@radix-ui/react-icons";
import ActionDetailsCard from "../../../common/ActionDetailsCard";
import {
  deleteSelectedUserListsItem,
  deleteSelectedUserSuggestionListsListItem,
  updateWatched,
} from "../../../../firebase/firebaseActions";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import useSearchWithYear from "../../../../hooks/useSearchWithYear";
import { modalActions } from "../../../../store/modalSlice";
import { useTranslation } from "react-i18next";

function ListModalCard({ id, itemId, title, poster, releaseDate, backdrop, mediaType, username, listNumber }) {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const { modalHasData } = useSelector((state) => state.modal);
  const { user } = useSelector((state) => state.user);
  const deleteHandler = () => {
    deleteSelectedUserListsItem(localStorage.getItem("user"), id);
    dispatch(modalActions.closeModal({ name: "listModal" }));
    i18n.language === "tr" ? toast.success("Listeden başarıyla kaldırıldı!") : toast.success("Successfully removed from the list!");
  };
  const movieInfoHandler = () => {
    useSearchWithYear(title, releaseDate).then((data) => {
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

  const watchedHandler = () => {
    updateWatched({ id: itemId, mediaType: mediaType, name: user.nick, photoURL: user.photoURL, additionDate: Date.now() }).then(() => {
      dispatch(modalActions.closeModal({ name: "listModal" }));
    });
    deleteSelectedUserSuggestionListsListItem(localStorage.getItem("user"), modalHasData?.id, id);
  };

  return (
    <div>
      <button
        className="relative flex items-center w-full h-24 gap-4 my-2 cursor-pointer group rounded-2xl"
        onClick={() => setIsOpen(!isOpen)}
      >
        {backdrop ? (
          <img
            src={`https://image.tmdb.org/t/p/w500/${backdrop}`}
            alt={title}
            loading="lazy"
            className={
              isOpen
                ? "absolute inset-0 object-cover w-full h-full transition-opacity duration-700 rounded-2xl opacity-40"
                : "absolute inset-0 object-cover w-full h-full transition-opacity duration-700 opacity-0 rounded-2xl group-hover:opacity-40"
            }
          />
        ) : (
          <img
            src={`https://image.tmdb.org/t/p/w500/${poster}`}
            loading="lazy"
            alt={title}
            className="absolute inset-0 object-cover w-full h-full transition-opacity duration-700 opacity-0 rounded-2xl group-hover:opacity-40"
          />
        )}
        <img src={`https://image.tmdb.org/t/p/w500/${poster}`} alt={title} loading="lazy" className="z-10 w-16 h-full rounded-xl" />
        <div className="flex justify-between w-full gap-1 pr-4">
          <p className="z-10 text-lg text-left text-slate-200">
            {listNumber}. {title}
          </p>
          <p className="z-10 text-lg text-slate-400">({releaseDate?.slice(0, 4)})</p>
        </div>
      </button>
      {isOpen && !username && !modalHasData?.from && (
        <ActionDetailsCard
          // icon1={
          //   <button
          //     className="flex items-center w-full px-4 py-2 text-sm text-left transition-all text-slate-200 rounded-xl hover:bg-slate-800"
          //     onClick={() => toast("Coming soon!")}
          //   >
          //     <ShuffleIcon className="w-5 h-5 mr-2" />
          //     Swap
          //   </button>
          // }
          icon2={
            <button
              className="flex items-center w-full px-4 py-2 text-sm text-left transition-all text-slate-200 rounded-xl hover:bg-slate-800"
              onClick={movieInfoHandler}
            >
              <InfoCircledIcon className="w-5 h-5 mr-2" />
              {t("list.details")}
            </button>
          }
          icon3={
            <button
              className="flex items-center w-full px-4 py-2 text-sm text-left transition-all bg-fuchsia-800/20 text-slate-200 rounded-xl hover:bg-slate-800"
              onClick={deleteHandler}
            >
              <Cross1Icon className="w-5 h-5 mr-2" />
              {t("notification.delete")}
            </button>
          }
        />
      )}
      {isOpen && !username && modalHasData?.from && modalHasData?.from?.uid !== localStorage.getItem("user") && (
        <ActionDetailsCard
          icon2={
            <button
              className="flex items-center w-full px-4 py-2 text-sm text-left transition-all text-slate-200 rounded-xl hover:bg-slate-800"
              onClick={watchedHandler}
            >
              <CheckIcon className="w-5 h-5 mr-2" />
              {t("notification.watched")}
            </button>
          }
        />
      )}
      {isOpen && username && !modalHasData?.from && (
        <ActionDetailsCard
          icon2={
            <button
              className="flex items-center w-full px-4 py-2 text-sm text-left transition-all text-slate-200 rounded-xl hover:bg-slate-800"
              onClick={movieInfoHandler}
            >
              <InfoCircledIcon className="w-5 h-5 mr-2" />
              {t("list.details")}
            </button>
          }
        />
      )}
    </div>
  );
}

export default ListModalCard;
