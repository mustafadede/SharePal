import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { modalActions } from "../../../../store/modalSlice";
import EmptyCard from "../EmptyCard";
import ListsSectionCard from "./ListsSectionCard";
import { getSelectedUserLists } from "../../../../firebase/firebaseActions";
import { MyListsActions } from "../../../../store/myListsSlice";
import { useTranslation } from "react-i18next";

function ListsSection({ username, uid, accountPrivacyFlag }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { myLists, status } = useSelector((state) => state.myLists);
  const [userList, setUserList] = useState([]);
  const clickHandler = () => {
    dispatch(modalActions.openModal({ name: "pinnedModal" }));
  };

  useEffect(() => {
    if (username && accountPrivacyFlag) {
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
          {!username && status === "loading" && <p className="w-full mt-1 text-xl text-center text-slate-400">{t("info.loading")}</p>}
          {!username && myLists.length > 0 && status === "done" && (
            <>
              <p className="text-2xl text-white">{t("myLists.pinned")}</p>
              <div className="flex flex-row flex-wrap xl:gap-4 2xl:gap-4">
                {myLists.map((list, index) => {
                  if (list.isPinned) return <ListsSectionCard key={index} title={list.title} isPinned={list.isPinned} data={list} />;
                })}
              </div>
              <p className="text-2xl text-white">{t("myLists.lists")}</p>
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
              <p className="text-2xl text-white">{t("myLists.pinned")}</p>
              <div className="flex flex-row flex-wrap xl:gap-4 2xl:gap-4">
                {userList.map((list) => {
                  if (list.isPinned)
                    return <ListsSectionCard key={list.id} title={list.title} isPinned={list.isPinned} data={list} username={username} />;
                })}
              </div>
              <p className="text-2xl text-white">{t("myLists.lists")}</p>
              <div className="flex flex-row flex-wrap xl:gap-4 2xl:gap-4">
                {userList.map((list) => {
                  if (!list.isPinned) {
                    return <ListsSectionCard key={list.id} title={list.title} data={list} username={username} />;
                  }
                })}
              </div>
            </>
          )}
          {username && userList.length === 0 && <p className="w-full mt-1 text-xl text-center text-slate-400">{t("myLists.noList")}</p>}
          {!username && myLists.length === 0 && status === "done" && <EmptyCard title={t("myLists.create")} clickHandler={clickHandler} />}
        </motion.div>
      </motion.div>
    </>
  );
}

export default ListsSection;
