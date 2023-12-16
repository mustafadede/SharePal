import { BookmarkFilledIcon, BookmarkIcon, Cross1Icon, DotsHorizontalIcon, LockClosedIcon, Pencil1Icon } from "@radix-ui/react-icons";
import React, { useState } from "react";
import FeedCardButtons from "./Buttons/FeedCardButtons";
import { motion } from "framer-motion";
import FeedCardActionsSkeleton from "./FeedCardActions/FeedCardActionsSkeleton";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { modalActions } from "../../../store/modalSlice";
import { deleteSelectedPost, updatePinnedList } from "../../../firebase/firebaseActions";
import ActionDetailsCard from "../ActionDetailsCard";
import { toast } from "react-toastify";
import { postsActions } from "../../../store/postsSlice";
import useSearchWithYear from "../../../hooks/useSearchWithYear";
import { DateFormatter } from "../../../utils/formatter";
import OnlineStatus from "../ProfileOnlineStatus";
function FeedAttachedCard({ data, attachedData, notification }) {
  const [settings, setSettings] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const user = useSelector((state) => state.user.user?.nick);
  const dispatch = useDispatch();

  const date = DateFormatter(data);

  // const onClickHandler = () => {
  //   dispatch(modalActions.openModal({ name: "pinnedModal", data: data.attachedFilm }));
  //   setBookmarked(!bookmarked);
  // };

  const handleSpoiler = (e) => {
    if (e.target.classList.contains("blur-sm")) {
      e.target.classList.remove("blur-sm");
    } else {
      e.target.classList.add("blur-sm");
    }
  };

  const deleteHandler = () => {
    deleteSelectedPost(localStorage.getItem("user"), data.postId).then(() => {
      dispatch(postsActions.deletePost(data.postId)) && toast.success("Post deleted successfully");
    });
  };

  const onClickHandler = () => {
    const movieInfoHandler = () => {
      useSearchWithYear(data.attachedFilm.title, data.attachedFilm.releaseDate).then((data) => {
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
    <div className="flex flex-col w-full">
      <motion.div
        className="flex flex-col w-full p-4 mb-4 bg-slate-900 rounded-xl"
        initial={{ opacity: 0, y: -20, transition: { duration: 2 } }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex justify-between w-full">
          <div className="flex gap-4">
            {!data.photoURL && (
              <div className="relative w-12 h-12">
                <img className="object-cover w-12 h-12 rounded-full bg-fuchsia-600" loading="lazy" src={data.photoURL}></img>
              </div>
            )}
            {data.photoURL && (
              <div className="relative w-12 h-12">
                <img className="object-cover w-12 h-12 rounded-full bg-fuchsia-600" loading="lazy" src={data.photoURL}></img>
              </div>
            )}
            <div className="flex flex-col">
              <NavLink to={data.nick === user ? `/profile` : `/user/${data.nick}`}>
                <p className="transition-all duration-300 text-md text-slate-200 hover:cursor-pointer w-fit hover:underline hover:text-fuchsia-600">
                  @{data.nick}
                </p>
              </NavLink>
              <p className="text-xs text-slate-400">{date}</p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-4">
            {data.spoiler && (
              <div className="flex gap-2">
                <LockClosedIcon className="w-4 h-4 text-slate-200" />
                <p className="text-sm text-slate-400">Spoiler!</p>
              </div>
            )}
            {!notification && data.nick === user && (
              <div className="flex flex-col">
                <button onClick={() => setSettings(!settings)}>
                  <DotsHorizontalIcon className="w-6 h-6 transition-colors text-slate-400 hover:text-slate-200" />
                </button>
              </div>
            )}
          </div>
        </div>
        {data.spoiler && (
          <p className={"py-4 text-slate-200 cursor-pointer duration-150 transition-all  blur-sm select-none"} onClick={handleSpoiler}>
            {data.text || data.content}
          </p>
        )}
        {!data.spoiler && <p className="py-4 text-slate-200">{data.text || data.content}</p>}
        <button
          className="flex items-center justify-between w-full gap-4 p-2 transition-all duration-700 border rounded-2xl border-slate-700 group hover:bg-cGradient2 hover:border-slate-600"
          onClick={onClickHandler}
        >
          <div className="flex items-center gap-4">
            <img
              src={`https://image.tmdb.org/t/p/w500/${attachedData?.poster || data.attachedFilm.poster}`}
              className="object-cover transition-all duration-700 rounded-full w-14 h-14 grayscale group-hover:grayscale-0"
              loading="lazy"
            ></img>
            <div className="flex items-center justify-center gap-1">
              <p className="transition-all duration-700 text-slate-400 group-hover:text-slate-200">
                {attachedData?.title || data.attachedFilm.title}
              </p>
              <p className="transition-all duration-700 text-slate-400 group-hover:text-slate-200">
                ({attachedData?.releaseDate.slice(0, 4) || data.attachedFilm.releaseDate.slice(0, 4)})
              </p>
            </div>
          </div>
          {/* <button onClick={onClickHandler}>
          {!bookmarked ? (
            <BookmarkIcon className="w-6 h-6 transition-all duration-700 text-slate-400 group-hover:text-slate-200" />
          ) : (
            <BookmarkFilledIcon className="w-6 h-6 transition-all duration-700 text-fuchsia-600" />
          )}
        </button> */}
        </button>
        {!notification && (
          <div className="flex gap-2">
            <FeedCardActionsSkeleton action={"likes"} number={data.likes} data={data} />
            <FeedCardActionsSkeleton action={"comments"} number={data.comments} data={data} />
            <FeedCardActionsSkeleton action={"reposts"} number={data.repost} data={data} />
          </div>
        )}
        {!notification && <FeedCardButtons data={data} />}
      </motion.div>
      {!notification && settings && (
        <ActionDetailsCard
          haveBorder={false}
          icon1={
            <button className="flex items-center w-full px-4 py-2 text-sm text-left transition-all text-slate-200 rounded-xl hover:bg-slate-800">
              <Pencil1Icon className="w-5 h-5 mr-2" />
              Edit
            </button>
          }
          icon2={
            <button
              className="flex items-center w-full px-4 py-2 text-sm text-left transition-all bg-fuchsia-800/20 text-slate-200 rounded-xl hover:bg-slate-800"
              onClick={deleteHandler}
            >
              <Cross1Icon className="w-5 h-5 mr-2" />
              Delete
            </button>
          }
        />
      )}
    </div>
  );
}

export default FeedAttachedCard;
