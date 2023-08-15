import React from "react";
import { PlusIcon } from "@radix-ui/react-icons";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { modalActions } from "../../../store/modalSlice";
import MyListsModalCard from "../../layout/MyListModal/MyListsModalCard";

function MyPinnedListsCard() {
  const { myLists, pinnedLists } = useSelector((state) => state.myLists);
  const dispatch = useDispatch();
  const clickHandler = () => {
    dispatch(modalActions.openModal({ name: "pinnedModal" }));
  };
  return (
    <>
      <motion.div
        className="p-4 mt-4 w-72 h-fit bg-slate-900 rounded-2xl"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex justify-between">
          <p className="text-xl text-slate-200">My Pinned Lists</p>
          <button onClick={clickHandler} id="pinnedModal">
            <PlusIcon className="w-6 h-6 transition-all cursor-pointer text-slate-200 hover:text-slate-400" />
          </button>
        </div>
        <div className="flex flex-col justify-center pt-2">
          {myLists.length === 0 && <p className="text-md text-slate-400">You don't have any list. Do you wanna create ?</p>}
          {myLists.length !== 0 && pinnedLists.length === 0 && <p className="text-md text-slate-400">You have lists. Do you wanna pin ?</p>}
          {myLists.map((list, i) => {
            if (list.isPinned)
              return <MyListsModalCard key={list.id} listNum={i} title={list.title} id={list.id} isPinned={list.isPinned} disabled />;
          })}
        </div>
      </motion.div>
    </>
  );
}

export default MyPinnedListsCard;