import React from "react";
import FeedCardButtons from "./Buttons/FeedCardButtons";
import { motion } from "framer-motion";
import FeedCardActionsSkeleton from "./FeedCardActions/FeedCardActionsSkeleton";
import { useSelector } from "react-redux";
function FeedCommentCard({ data, index }) {
  const postAction = useSelector((state) => state.postAction);
  return (
    <motion.div
      className="flex flex-col w-full p-4 mb-4 bg-slate-900 rounded-xl"
      initial={{ opacity: 0, y: -20, transition: { duration: 2 } }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/*Comment Card Top section: Profile Picture and Name start */}
      <div className="flex gap-4">
        {!data.photoURL && <div className="w-12 h-12 rounded-full bg-fuchsia-600"></div>}
        {data.photoURL && <img className="w-12 h-12 rounded-full bg-fuchsia-600" src={data.photoURL}></img>}
        <div className="flex flex-col">
          <p className="text-md text-slate-200">@{data.nick}</p>
          {/* <p className="text-sm text-slate-400">@{data.nick}</p> */}
        </div>
      </div>
      {/*Comment Card Top section: Profile Picture and Name end */}
      {/*Comment Card Middle Top section: Input start */}
      <p className="py-4 text-slate-200">{data?.text || data.content}</p>
      {/*Comment Card Middle Top section: Input end */}
      {/*Comment Card Middle Bottom section: Stats start */}
      <div className="flex gap-2">
        <FeedCardActionsSkeleton action={"likes"} number={postAction.postLikesList[index]?.likes} data={data} />
        <FeedCardActionsSkeleton action={"comments"} number={postAction.postCommentsList[index]?.comments} data={data} />
        <FeedCardActionsSkeleton action={"reposts"} number={postAction.postRepostsList[index]?.reposts} data={data} />
      </div>
      {/*Comment Card Middle Bottom section: Stats end */}
      {/*Comment Card Bottom section: Buttons starts */}
      <FeedCardButtons data={data} />
      {/*Comment Card Bottom section: Buttons end */}
    </motion.div>
  );
}

export default FeedCommentCard;
