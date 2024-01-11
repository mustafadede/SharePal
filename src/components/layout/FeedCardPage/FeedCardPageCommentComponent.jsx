import React from "react";
import { motion } from "framer-motion";
import FeedCardPageCommentCard from "../../common/FeedCardPageCommentCard";

function FeedCardPageCommentComponent() {
  return (
    <motion.div
      className="flex flex-col w-full gap-4 h-fit rounded-2xl"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <motion.h1
        className="text-xl text-slate-200"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        Comments
      </motion.h1>
      <FeedCardPageCommentCard />
    </motion.div>
  );
}

export default FeedCardPageCommentComponent;
