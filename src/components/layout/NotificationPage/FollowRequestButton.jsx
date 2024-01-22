import { ChevronRightIcon, EnvelopeClosedIcon } from "@radix-ui/react-icons";
import React from "react";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { notificationActions } from "../../../store/notificationSlice";

function FollowRequestButton() {
  const dispatch = useDispatch();

  return (
    <motion.button
      className="flex items-center justify-between w-full h-16 gap-4 px-6 mt-4 duration-300 border border-transparent bg-slate-900 rounded-xl hover:border-slate-200"
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      onClick={() => dispatch(notificationActions.updateFollowRequest())}
    >
      <div className="flex gap-4">
        <EnvelopeClosedIcon className="w-6 h-6 text-slate-200" />
        <p className="text-lg select-none text-slate-200">Follow Requests</p>
      </div>
      <ChevronRightIcon className="w-6 h-6 text-slate-200" />
    </motion.button>
  );
}

export default FollowRequestButton;
