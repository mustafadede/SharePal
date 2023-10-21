import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { modalActions } from "../../../../store/modalSlice";
import EmptyCard from "../EmptyCard";
import ListsSectionCard from "./ListsSectionCard";
import { getSelectedUserLists } from "../../../../firebase/firebaseActions";
import { MyListsActions } from "../../../../store/myListsSlice";

function ListsSection({ username, uid }) {
  const dispatch = useDispatch();
  const { myLists, status } = useSelector((state) => state.myLists);
  const [userList, setUserList] = useState([]);
  const clickHandler = () => {
    dispatch(modalActions.openModal({ name: "pinnedModal" }));
  };

  useEffect(() => {
    if (username) {
      const getData = async () => {
        getSelectedUserLists(uid).then((lists) => {
          setUserList(lists);
        });
      };
      getData();
    } else {
      const getData = async () => {
        dispatch(MyListsActions.updateStatus("loading"));
        getSelectedUserLists(localStorage.getItem("user"))
          .then((lists) => {
            dispatch(MyListsActions.initilizeList(lists));
          })
          .then(() => {
            dispatch(MyListsActions.updateStatus("done"));
          });
      };
      getData();
    }
  }, []);
  return (
    <>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="flex flex-col gap-4">
        <motion.div className="flex flex-col flex-wrap justify-start w-full gap-4 p-4 h-fit bg-slate-900 rounded-2xl">
          {!username && status === "loading" && <p className="w-full mt-1 text-xl text-center text-slate-400">Loading...</p>}
          {!username && myLists.length > 0 && status === "done" && (
            <>
              <p className="text-2xl text-white">Pinned Lists</p>
              <div className="flex flex-row flex-wrap xl:gap-4 2xl:gap-4">
                {myLists.map((list, index) => {
                  if (list.isPinned) return <ListsSectionCard key={index} title={list.title} isPinned={list.isPinned} data={list} />;
                })}
              </div>
              <p className="text-2xl text-white">Lists</p>
              <div className="flex flex-row flex-wrap xl:gap-4 2xl:gap-4">
                {myLists.map((list, index) => {
                  if (!list.isPinned) {
                    return <ListsSectionCard key={index} title={list.title} data={list} />;
                  }
                })}
              </div>
            </>
          )}
          {username && userList.length > 0 && (
            <>
              <p className="text-2xl text-white">Pinned Lists</p>
              <div className="flex flex-row flex-wrap xl:gap-4 2xl:gap-4">
                {userList.map((list) => {
                  if (list.isPinned)
                    return <ListsSectionCard key={list.id} title={list.title} isPinned={list.isPinned} data={list} username={username} />;
                })}
              </div>
              <p className="text-2xl text-white">Lists</p>
              <div className="flex flex-row flex-wrap xl:gap-4 2xl:gap-4">
                {userList.map((list) => {
                  if (!list.isPinned) {
                    return <ListsSectionCard key={list.id} title={list.title} data={list} username={username} />;
                  }
                })}
              </div>
            </>
          )}
          {username && userList.length === 0 && (
            <p className="w-full mt-1 text-xl text-center text-slate-400">This user doesn't have any list.</p>
          )}
          {!username && myLists.length === 0 && status === "done" && (
            <EmptyCard title="You don't have any list. Do you wanna create ?" clickHandler={clickHandler} />
          )}
        </motion.div>
      </motion.div>
    </>
  );
}

export default ListsSection;
