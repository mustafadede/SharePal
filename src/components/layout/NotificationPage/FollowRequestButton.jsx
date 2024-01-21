import { ChevronRightIcon, EnvelopeClosedIcon } from "@radix-ui/react-icons";
import React from "react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

function FollowRequestButton() {
  return (
    <motion.button
      className="flex mt-4 gap-4 bg-slate-900 h-16 items-center px-6 rounded-xl border duration-300 border-transparent  hover:border-slate-200 justify-between"
      onClick={() => toast("Coming soon...")}
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
    >
      <div className="flex gap-4">
        <EnvelopeClosedIcon className="w-6 h-6 text-slate-200" />
        <p className="text-lg text-slate-200 select-none">Follow Requests</p>
      </div>
      <ChevronRightIcon className="w-6 h-6 text-slate-200" />
    </motion.button>
  );
}

export default FollowRequestButton;
