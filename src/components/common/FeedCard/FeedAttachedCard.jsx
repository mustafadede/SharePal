import { BookmarkIcon } from "@radix-ui/react-icons";
import React from "react";
import FeedCardButtons from "./Buttons/FeedCardButtons";
import { motion } from "framer-motion";
import FeedCardActionsSkeleton from "./FeedCardActions/FeedCardActionsSkeleton";
import { useSelector } from "react-redux";

function FeedAttachedCard({ data, index, attachedData }) {
  const postAction = useSelector((state) => state.postAction);
  return (
    <motion.div
      className="flex flex-col w-full p-4 mb-4 bg-slate-900 rounded-xl"
      initial={{ opacity: 0, y: -20, transition: { duration: 2 } }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex gap-4">
        <div className="w-12 h-12 rounded-full bg-fuchsia-600"></div>
        <div className="flex flex-col">
          <p className="text-md text-slate-200">@{data.nick}</p>
        </div>
      </div>
      <p className="my-2 text-slate-200">{data?.text || data.content}</p>
      <button className="flex items-center justify-between w-full gap-4 p-2 transition-colors duration-300 border rounded-2xl border-slate-700 group hover:bg-cGradient2 hover:border-slate-600">
        <div className="flex items-center gap-4">
          <img
            src={`https://image.tmdb.org/t/p/w500/${attachedData?.poster || data.attachedFilm.poster}`}
            className="object-cover rounded-full w-14 h-14 grayscale group-hover:grayscale-0"
          ></img>
          <div className="flex gap-1">
            <p className="text-slate-400 group-hover:text-slate-200">{attachedData?.title || data.attachedFilm.title}</p>
            <p className="text-slate-400 group-hover:text-slate-200">
              ({attachedData?.releaseDate.slice(0, 4) || data.attachedFilm.releaseDate.slice(0, 4)})
            </p>
          </div>
        </div>
        <BookmarkIcon className="w-6 h-6 text-slate-400 group-hover:text-slate-200" />
      </button>
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
