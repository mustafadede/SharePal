import React from "react";
import FeedCardButtons from "./Buttons/FeedCardButtons";
import { motion } from "framer-motion";
import FeedCardActionsSkeleton from "./FeedCardActions/FeedCardActionsSkeleton";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

function FeedCommentCard({ data, index }) {
  const postAction = useSelector((state) => state.postAction);
  const day = new Date(data.date).getDate();
  const month = new Date(data.date).getMonth() + 1;
  const year = new Date(data.date).getFullYear();
  const hour = new Date(data.date).getHours();
  const minute = new Date(data.date).getMinutes();
  const date = `${day}/${month}/${year} ${hour}:${minute < 10 ? "0" + minute : minute}`;

  return (
    <motion.div
      className="flex flex-col w-full p-4 mb-4 bg-slate-900 rounded-xl"
      initial={{ opacity: 0, y: -20, transition: { duration: 2 } }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/*Comment Card Top section: Profile Picture and Name start */}
      <div className="flex gap-4">
        {!data.photoURL && <div className="w-12 h-12 rounded-full bg-fuchsia-600"></div>}
        {data.photoURL && <img className="object-cover w-12 h-12 rounded-full bg-fuchsia-600" src={data.photoURL}></img>}
        <div className="flex flex-col">
          <NavLink to={`/profile/${data.nick}`}>
            <p className="transition-all duration-300 text-md text-slate-200 hover:cursor-pointer w-fit hover:underline hover:text-fuchsia-600">
              @{data.nick}
            </p>
          </NavLink>
          <p className="text-sm text-slate-400">{date}</p>
        </div>
      </div>
      {/*Comment Card Top section: Profile Picture and Name end */}
      {/*Comment Card Middle Top section: Input start */}
      <p className="py-4 text-slate-200">{data?.text || data.content}</p>
      {/*Comment Card Middle Top section: Input end */}
      {/*Comment Card Middle Bottom section: Stats start */}
      <div className="flex gap-2">
        <FeedCardActionsSkeleton action={"likes"} number={data.likes} data={data} />
        <FeedCardActionsSkeleton action={"comments"} number={data.comments} data={data} />
        <FeedCardActionsSkeleton action={"reposts"} number={data.reposts} data={data} />
      </div>
      {/*Comment Card Middle Bottom section: Stats end */}
      {/*Comment Card Bottom section: Buttons starts */}
      <FeedCardButtons data={data} />
      {/*Comment Card Bottom section: Buttons end */}
    </motion.div>
  );
}

export default FeedCommentCard;
