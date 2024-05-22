import { Link2Icon, RocketIcon } from "@radix-ui/react-icons";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { modalActions } from "../../../store/modalSlice";
import { toast } from "react-toastify";
import { createNotification } from "../../../firebase/firebaseActions";
import { useTranslation } from "react-i18next";

function AttachedCard({ title, poster, releaseDate, backdrop, isSuggest = false, id, mediaType }) {
  const { profileUser } = useSelector((state) => state.profile);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { i18n } = useTranslation();

  const handleClick = () => {
    if (isSuggest) {
      createNotification(profileUser.uid, {
        from: {
          uid: localStorage.getItem("user"),
          nick: user.nick,
          photo: user.photoURL,
          attached: {
            title: title,
            poster: poster,
            releaseDate: releaseDate,
            backdrop: backdrop,
            id: id,
            mediaType: mediaType,
          },
        },
        type: "suggest",
        date: Date.now(),
      }).then(() => {
        i18n.language === "en"
          ? toast.success(`You have suggested ${title} to ${profileUser.nick}`)
          : toast.success(`${profileUser.nick} kişisine ${title} önerildi.`);
        dispatch(modalActions.closeModal());
      });
    } else {
      dispatch(modalActions.closeModal({ data: { title, poster, releaseDate, backdrop, id, mediaType } }));
    }
  };
  return poster ? (
    <div className="flex justify-between w-full h-32 p-2 group rounded-2xl">
      <div className="flex">
        <img
          className="object-cover w-20 h-full rounded-2xl"
          src={`https://image.tmdb.org/t/p/w500/${poster}`}
          loading="lazy"
          alt={title}
        />
        <div className="flex flex-col justify-center ml-2">
          <p className="text-lg font-semibold transition-all text-cWhite group-hover:text-fuchsia-600">{title}</p>
          <p className="text-sm transition-all text-slate-400 group-hover:">{releaseDate.slice(0, 4)}</p>
        </div>
      </div>
      <button
        className="px-2 py-1 text-white transition-all bg-transparent rounded-xl hover:text-fuchsia-800"
        onClick={(movie) => handleClick(movie)}
      >
        {isSuggest ? <RocketIcon className="w-5 h-5" /> : <Link2Icon className="w-6 h-6" />}
      </button>
    </div>
  ) : null;
}

export default AttachedCard;
