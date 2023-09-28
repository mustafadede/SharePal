import React from "react";
import FeedCardButtons from "./Buttons/FeedCardButtons";
import { motion } from "framer-motion";
import FeedCardActionsSkeleton from "./FeedCardActions/FeedCardActionsSkeleton";
import { NavLink } from "react-router-dom";
import { LockClosedIcon } from "@radix-ui/react-icons";
import { useSelector } from "react-redux";

function FeedSpoilerCard({ data }) {
  const user = useSelector((state) => state.user.user.nick);
  const day = new Date(data.date).getDate();
  const month = new Date(data.date).getMonth() + 1;
  const year = new Date(data.date).getFullYear();
  const hour = new Date(data.date).getHours();
  const minute = new Date(data.date).getMinutes();
  const date = `${day}/${month}/${year} ${hour}:${minute < 10 ? "0" + minute : minute}`;

  const handleSpoiler = (e) => {
    if (e.target.classList.contains("blur-sm")) {
      e.target.classList.remove("blur-sm");
    } else {
      e.target.classList.add("blur-sm");
    }
  };
  console.log(data.nick === user);
  return (
    <motion.div
      className="flex flex-col w-full p-4 mb-4 bg-slate-900 rounded-xl"
      initial={{ opacity: 0, y: -20, transition: { duration: 2 } }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex gap-4">
          {!data.photoURL && <div className="w-12 h-12 rounded-full bg-fuchsia-600"></div>}
          {data.photoURL && <img className="object-cover w-12 h-12 rounded-full bg-fuchsia-600" src={data.photoURL}></img>}
          <div className="flex flex-col">
            <NavLink to={data.nick === user ? `/profile` : `/profile/${data.nick}`}>
              <p className="transition-all duration-300 text-md text-slate-200 hover:cursor-pointer w-fit hover:underline hover:text-fuchsia-600">
                @{data.nick}
              </p>
            </NavLink>
            <p className="text-sm text-slate-400">{date}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <LockClosedIcon className="w-4 h-4 text-slate-200" />
          <p className="text-sm text-slate-400">Spoiler!</p>
        </div>
      </div>
      <p className="py-4 transition-all duration-150 cursor-pointer select-none text-slate-200 blur-sm" onClick={handleSpoiler}>
        {data.text || data.content}
      </p>
      <div className="flex gap-2">
        <FeedCardActionsSkeleton action={"likes"} number={data.likes} data={data} />
        <FeedCardActionsSkeleton action={"comments"} number={data.comments} data={data} />
        <FeedCardActionsSkeleton action={"reposts"} number={data.repost} data={data} />
      </div>
      <FeedCardButtons data={data} />
    </motion.div>
  );
}

export default FeedSpoilerCard;
