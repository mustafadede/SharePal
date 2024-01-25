import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import FeedActionBoxTag from "../../common/FeedActionBoxTag/FeedActionBoxTag";
import PostButton from "./FeedActionBox/PostButton";
import ActionBoxButtons from "./FeedActionBox/ActionBoxButtons";
import AttachedModal from "./FeedActionBox/AttachedModal";
import ActionTextArea from "./FeedActionBox/ActionTextArea";

function FeedActionBox() {
  const { tagFlag } = useSelector((state) => state.createPost);
  const { modalHasData, lastModalName } = useSelector((state) => state.modal);

  return (
    <>
      <motion.div
        className="w-full px-2 py-2 mb-4 overflow-hidden rounded-lg h-fit bg-slate-900"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <ActionTextArea />
        {lastModalName === "attachedFilmModal" && <AttachedModal />}
        {tagFlag && <FeedActionBoxTag />}
        <div className="flex justify-end w-full gap-2">
          <ActionBoxButtons />
          <PostButton />
        </div>
      </motion.div>
    </>
  );
}

export default FeedActionBox;
