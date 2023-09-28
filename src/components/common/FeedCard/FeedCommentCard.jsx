import React, { useState } from "react";
import FeedCardButtons from "./Buttons/FeedCardButtons";
import { motion } from "framer-motion";
import FeedCardActionsSkeleton from "./FeedCardActions/FeedCardActionsSkeleton";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { Cross1Icon, DotsHorizontalIcon, Pencil1Icon } from "@radix-ui/react-icons";

function FeedCommentCard({ data, index }) {
  const [settings, setSettings] = useState(false);
  const user = useSelector((state) => state.user.user.nick);
  const postAction = useSelector((state) => state.postAction);
  const day = new Date(data.date).getDate();
  const month = new Date(data.date).getMonth() + 1;
  const year = new Date(data.date).getFullYear();
  const hour = new Date(data.date).getHours();
  const minute = new Date(data.date).getMinutes();
  const date = `${day}/${month}/${year} ${hour}:${minute < 10 ? "0" + minute : minute}`;

  return (
    <div className="flex flex-col w-full">
      <motion.div
        className="flex flex-col w-full p-4 mb-4 bg-slate-900 rounded-xl"
        initial={{ opacity: 0, y: -20, transition: { duration: 2 } }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/*Comment Card Top section: Profile Picture and Name start */}
        <div className="flex justify-between w-full">
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
          {data.nick === user && (
            <div className="flex flex-col">
              <button onClick={() => setSettings(!settings)}>
                <DotsHorizontalIcon className="w-6 h-6 transition-colors text-slate-400 hover:text-slate-200" />
              </button>
            </div>
          )}
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
      {settings && (
        <motion.div
          className="flex w-full gap-2 p-2 mb-4 bg-slate-900 rounded-xl"
          initial={{ opacity: 0, y: -20, transition: { duration: 7 } }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.2 } }}
        >
          <button className="flex items-center w-full px-4 py-2 text-sm text-left text-slate-200 rounded-xl hover:bg-slate-800">
            <Pencil1Icon className="w-5 h-5 mr-2" />
            Edit
          </button>
          <button className="flex items-center w-full px-4 py-2 text-sm text-left bg-fuchsia-800/20 text-slate-200 rounded-xl hover:bg-slate-800">
            <Cross1Icon className="w-5 h-5 mr-2" />
            Delete
          </button>
        </motion.div>
      )}
    </div>
  );
}

export default FeedCommentCard;
