import React, { useEffect } from "react";
import { motion } from "framer-motion";
import FeedActionBoxTagItem from "./FeedActionBoxTagItem";

function FeedActionBoxTag() {
  useEffect(() => {}, []);
  return (
    <motion.div
      className="flex items-center justify-start w-full gap-2 px-2 py-2 mb-3 text-sm transition-all duration-200 rounded-lg text-slate-300 bg-slate-800"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
    >
      <FeedActionBoxTagItem
        img={
          "https://firebasestorage.googleapis.com/v0/b/sharepal-5d528.appspot.com/o/profilePhotos%2F3wbvLT6UkNSy2E3pYBtSfHwjUu82?alt=media&token=80111a1b-802d-4cd8-9848-4a345815fa55"
        }
        nick={"Mustafa"}
      />
    </motion.div>
  );
}

export default FeedActionBoxTag;
