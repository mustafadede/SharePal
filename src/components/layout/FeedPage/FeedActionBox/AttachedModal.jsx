import React from "react";
import { motion } from "framer-motion";
import { modalActions } from "../../../../store/modalSlice";
import { createPostActions } from "../../../../store/createPostSlice";
import { Cross1Icon } from "@radix-ui/react-icons";
import { useDispatch, useSelector } from "react-redux";

function AttachedModal() {
  const { modalHasData } = useSelector((state) => state.modal);
  const dispatch = useDispatch();

  return (
    <motion.div
      className="flex items-center justify-between w-full px-4 py-2 mb-3 text-sm transition-all rounded-lg hover:bg-fuchsia-800 text-slate-300 bg-slate-800"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
    >
      <div className="flex items-center gap-2">
        <img className="w-8 h-8 rounded-full" src={`https://image.tmdb.org/t/p/w500/${modalHasData.poster}`} loading="lazy" alt="poster" />
        <div className="flex flex-col">
          <span className="text-cWhite">{modalHasData.title}</span>
          <span className="text-slate-300">{modalHasData.releaseDate?.slice(0, 4)}</span>
        </div>
      </div>
      <button
        className="flex items-center justify-center w-8 h-8 transition-colors rounded-lg text-slate-300 hover:bg-slate-800 hover:text-cWhite"
        onClick={() => {
          dispatch(modalActions.closeModal());
          dispatch(modalActions.assignLastModalName(""));
          dispatch(createPostActions.updateAttachedFilm(null));
        }}
      >
        <Cross1Icon className="w-4 h-4" />
      </button>
    </motion.div>
  );
}

export default AttachedModal;
