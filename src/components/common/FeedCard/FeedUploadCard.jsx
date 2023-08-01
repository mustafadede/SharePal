import React from "react";
import FeedCardButtons from "./Buttons/FeedCardButtons";
import { motion } from "framer-motion";

function FeedUploadCard({ data }) {
  return (
    <motion.div
      className="flex flex-col w-full p-4 my-4 bg-slate-900 rounded-xl"
      initial={{ opacity: 0, y: -20, transition: { duration: 2 } }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex gap-4">
        <div className="w-12 h-12 rounded-full bg-fuchsia-600"></div>
        <div className="flex flex-col">
          <p className="text-md text-slate-200">@{data.nick}</p>
          {/* <p className="text-sm text-slate-400">@{data.nick}</p> */}
        </div>
      </div>
      <p className="py-4 text-slate-200">{data.text}</p>
      <img
        src={data.attachedPhoto}
        className="object-cover w-full transition-all duration-300 border h-96 rounded-xl bg-slate-800 border-slate-600 hover:border-fuchsia-600 hover:opacity-70"
      ></img>
      <FeedCardButtons />
    </motion.div>
  );
}

export default FeedUploadCard;
