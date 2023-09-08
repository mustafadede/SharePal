import { BookmarkFilledIcon, BookmarkIcon } from "@radix-ui/react-icons";
import React, { useState } from "react";
import FeedCardButtons from "./Buttons/FeedCardButtons";
import { motion } from "framer-motion";
import FeedCardActionsSkeleton from "./FeedCardActions/FeedCardActionsSkeleton";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { modalActions } from "../../../store/modalSlice";

function FeedAttachedCard({ data, index, attachedData }) {
  const [bookmarked, setBookmarked] = useState(false);
  const postAction = useSelector((state) => state.postAction);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const day = new Date(data.date).getDate();
  const month = new Date(data.date).getMonth() + 1;
  const year = new Date(data.date).getFullYear();
  const hour = new Date(data.date).getHours();
  const minute = new Date(data.date).getMinutes();
  const date = `${day}/${month}/${year} ${hour}:${minute < 10 ? "0" + minute : minute}`;
  const onClickHandler = () => {
    console.log(data.attachedFilm);
    dispatch(modalActions.openModal({ name: "pinnedModal", data: data.attachedFilm }));
    setBookmarked(!bookmarked);
  };
  return (
    <motion.div
      className="flex flex-col w-full p-4 mb-4 bg-slate-900 rounded-xl"
      initial={{ opacity: 0, y: -20, transition: { duration: 2 } }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex gap-4">
        {!data.photoURL && <div className="w-12 h-12 rounded-full bg-fuchsia-600"></div>}
        {data.photoURL && <img className="object-cover w-12 h-12 rounded-full bg-fuchsia-600" src={data.photoURL}></img>}
        <div className="flex flex-col">
          <NavLink to={user?.nick !== data.nick ? `/profile/${data.nick}` : "/profile"}>
            <p className="transition-all duration-300 text-md text-slate-200 hover:cursor-pointer w-fit hover:underline hover:text-fuchsia-600">
              @{data.nick}
            </p>
          </NavLink>
          <p className="text-xs text-slate-400">{date}</p>
        </div>
      </div>
      <p className="my-2 text-slate-200">{data?.text || data.content}</p>
      <div className="flex items-center justify-between w-full gap-4 p-2 transition-all duration-700 border rounded-2xl border-slate-700 group hover:bg-cGradient2 hover:border-slate-600">
        <div className="flex items-center gap-4">
          <img
            src={`https://image.tmdb.org/t/p/w500/${attachedData?.poster || data.attachedFilm.poster}`}
            className="object-cover transition-all duration-700 rounded-full w-14 h-14 grayscale group-hover:grayscale-0"
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
        <button onClick={onClickHandler}>
          {!bookmarked ? (
            <BookmarkIcon className="w-6 h-6 transition-all duration-700 text-slate-400 group-hover:text-slate-200" />
          ) : (
            <BookmarkFilledIcon className="w-6 h-6 transition-all duration-700 text-fuchsia-600" />
          )}
        </button>
      </div>
      <div className="flex gap-2">
        <FeedCardActionsSkeleton action={"likes"} number={postAction.postLikesList[index]?.likes} data={data} />
        <FeedCardActionsSkeleton action={"comments"} number={postAction.postCommentsList[index]?.comments} data={data} />
        <FeedCardActionsSkeleton action={"reposts"} number={postAction.postRepostsList[index]?.reposts} data={data} />
      </div>
      <FeedCardButtons data={data} />
    </motion.div>
  );
}

export default FeedAttachedCard;
