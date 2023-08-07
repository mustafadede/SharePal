import React from "react";
import { PlusIcon } from "@radix-ui/react-icons";
import { motion } from "framer-motion";

function MyListsCard() {
  const clickHandler = () => {
    console.log("clicked");
  };
  return (
    <motion.div
      className="p-4 mt-4 w-72 h-fit bg-slate-900 rounded-2xl"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="flex justify-between">
        <p className="text-xl text-slate-200">My Lists</p>
        <button onClick={clickHandler}>
          <PlusIcon className="w-6 h-6 transition-all cursor-pointer text-slate-200 hover:text-slate-400" />
        </button>
      </div>
      <div className="flex flex-col justify-center pt-4 ">
        <p className="text-md text-slate-400">You have no lists yet.</p>
      </div>
    </motion.div>
  );
}

export default MyListsCard;
