import React from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
function ListsSection() {
  const modal = useSelector((state) => state.modal);
  const myLists = useSelector((state) => state.myLists.myLists);
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-4">
      <div className="flex flex-row flex-wrap justify-start w-full gap-4 p-4 h-fit bg-slate-900 rounded-2xl">
        {myLists.length === 0 && <p className="text-2xl text-slate-400">You don't have any lists yet</p>}
        {myLists.map((list) => {
          return (
            <button key={list.id} className="flex flex-col w-48 h-48 gap-2 p-4 transition-all hover:bg-slate-800 group rounded-2xl">
              <img
                className="object-cover w-full h-full rounded-xl group-hover:opacity-75"
                src="https://static01.nyt.com/images/2017/04/24/arts/24bates/24bates-videoSixteenByNineJumbo1600.jpg"
              ></img>
              <p className="text-xl transition-all text-slate-200 2xl:text-2xl group-hover:text-slate-600">{list.title}</p>
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}

export default ListsSection;
