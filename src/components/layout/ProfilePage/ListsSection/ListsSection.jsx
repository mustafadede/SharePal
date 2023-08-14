import React from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { modalActions } from "../../../../store/modalSlice";
import EmptyCard from "../EmptyCard";
import ListsSectionCard from "./ListsSectionCard";

function ListsSection() {
  const dispatch = useDispatch();
  const { myLists, pinnedLists } = useSelector((state) => state.myLists);

  const clickHandler = () => {
    dispatch(modalActions.openModal("pinnedModal"));
  };
  let flag = 0;
  return (
    <>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-4">
        <motion.div className="flex flex-col flex-wrap justify-start w-full gap-4 p-4 h-fit bg-slate-900 rounded-2xl">
          {myLists.length === 0 && <EmptyCard title="You don't have any list. Do you wanna create ?" clickHandler={clickHandler} />}
          {myLists.length !== 0 && (
            <>
              <p className="text-2xl text-white">Pinned Lists</p>
              <div className="flex flex-row flex-wrap xl:gap-4 2xl:gap-4">
                {pinnedLists.length === 0 && <EmptyCard title="You don't have any Pinned List" clickHandler={clickHandler} />}
                {pinnedLists.map((list) => {
                  return <ListsSectionCard key={list.id} title={list.title} isPinned={list.isPinned} />;
                })}
              </div>
              <p className="text-2xl text-white">Lists</p>
              <div className="flex flex-row flex-wrap xl:gap-4 2xl:gap-4">
                {myLists.map((list) => {
                  if (!list.isPinned) {
                    flag++;
                    return <ListsSectionCard key={list.id} title={list.title} />;
                  }
                })}
                {flag === 0 && <EmptyCard title="You don't have any regular list" clickHandler={clickHandler} />}
              </div>
            </>
          )}
        </motion.div>
      </motion.div>
    </>
  );
}

export default ListsSection;
