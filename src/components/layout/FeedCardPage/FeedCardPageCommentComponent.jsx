import React from "react";
import { motion } from "framer-motion";
import InfoLabel from "../../common/InfoLabel";

function FeedCardPageCommentComponent() {
  return (
    <motion.div
      className="flex flex-col w-full gap-2 h-fit rounded-2xl"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <motion.h1
        className="text-2xl text-slate-200"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        Comments
      </motion.h1>
      <InfoLabel text="No comments yet" />
    </motion.div>
  );
}

export default FeedCardPageCommentComponent;
