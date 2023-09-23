import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { modalActions } from "../../../../store/modalSlice";
import EmptyCard from "../EmptyCard";
import ListsSectionCard from "./ListsSectionCard";
import { getSelectedUserLists } from "../../../../firebase/firebaseActions";

function ListsSection({ username, userUID }) {
  const dispatch = useDispatch();
  const { myLists } = useSelector((state) => state.myLists);
  const [pinnedLists, setPinnedLists] = useState([]);
  const clickHandler = () => {
    dispatch(modalActions.openModal({ name: "pinnedModal" }));
  };

  useEffect(() => {
    if (username) {
      const getData = async () => {
        getSelectedUserLists(userUID).then((lists) => {
          setPinnedLists(lists);
        });
      };
      getData();
    }
  }, []);
  console.log(pinnedLists);
  return (
    <>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="flex flex-col gap-4">
        <motion.div className="flex flex-col flex-wrap justify-start w-full gap-4 p-4 h-fit bg-slate-900 rounded-2xl">
          {!username && myLists.length === 0 && (
            <EmptyCard title="You don't have any list. Do you wanna create ?" clickHandler={clickHandler} />
          )}
          {!username && myLists.length !== 0 && (
            <>
              <p className="text-2xl text-white">Pinned Lists</p>
              <div className="flex flex-row flex-wrap xl:gap-4 2xl:gap-4">
                {myLists.map((list) => {
                  if (list.isPinned) return <ListsSectionCard key={list.id} title={list.title} isPinned={list.isPinned} data={list} />;
                })}
              </div>
              <p className="text-2xl text-white">Lists</p>
              <div className="flex flex-row flex-wrap xl:gap-4 2xl:gap-4">
                {myLists.map((list) => {
                  if (!list.isPinned) {
                    return <ListsSectionCard key={list.id} title={list.title} data={list} />;
                  }
                })}
              </div>
            </>
          )}
          {username && pinnedLists.length === 0 && <p className="text-2xl text-slate-400">This user doesn't have any list.</p>}
          {username && pinnedLists.length !== 0 && (
            <>
              <p className="text-2xl text-white">Pinned Lists</p>
              <div className="flex flex-row flex-wrap xl:gap-4 2xl:gap-4">
                {pinnedLists.map((list) => {
                  if (list.isPinned) return <ListsSectionCard key={list.id} title={list.title} isPinned={list.isPinned} data={list} />;
                })}
              </div>
              <p className="text-2xl text-white">Lists</p>
              <div className="flex flex-row flex-wrap xl:gap-4 2xl:gap-4">
                {pinnedLists.map((list) => {
                  if (!list.isPinned) {
                    return <ListsSectionCard key={list.id} title={list.title} data={list} />;
                  }
                })}
              </div>
            </>
          )}
        </motion.div>
      </motion.div>
    </>
  );
}

export default ListsSection;
