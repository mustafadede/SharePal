import React, { useEffect } from "react";
import { PlusIcon } from "@radix-ui/react-icons";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { modalActions } from "../../../store/modalSlice";
import MyListsModalCard from "../../layout/MyListModal/MyListsModalCard";
import { getSelectedUserLists } from "../../../firebase/firebaseActions";
import { MyListsActions } from "../../../store/myListsSlice";
import { useTranslation } from "react-i18next";

function MyPinnedListsCard({ isCard = false }) {
  const { myLists } = useSelector((state) => state.myLists);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const clickHandler = () => {
    dispatch(modalActions.openModal({ name: "pinnedModal" }));
  };
  useEffect(() => {
    const getData = async () => {
      const res = await getSelectedUserLists(localStorage.getItem("user"));
      dispatch(MyListsActions.initilizeList(res));
    };
    getData();
  }, []);
  return (
    <>
      <motion.div
        className="w-full p-4 mt-4 h-fit bg-slate-900 rounded-2xl"
        initial={!isCard && { opacity: 0, y: -20 }}
        animate={!isCard && { opacity: 1, y: 0 }}
        transition={!isCard && { delay: 0.2 }}
      >
        <div className="flex justify-between">
          <p className="text-xl text-slate-200">{t("myPinnedList.title")}</p>
          <button onClick={clickHandler} id="pinnedModal">
            <PlusIcon className="w-6 h-6 transition-all cursor-pointer text-slate-200 hover:text-slate-400" />
          </button>
        </div>
        <div className="flex flex-col justify-center pt-2">
          {myLists.length === 0 && <p className="text-md text-slate-400">{t("myPinnedList.noList")}</p>}
          {myLists.length !== 0 && <p className="text-md text-slate-400">{t("myPinnedList.noPinned")}</p>}
          {myLists.map((list, i) => {
            if (list.isPinned)
              return (
                <MyListsModalCard
                  key={list.id}
                  listNum={i}
                  title={list.title}
                  id={list.id}
                  isPinned={list.isPinned}
                  list={list.list}
                  date={list.date}
                  disabled
                />
              );
          })}
        </div>
      </motion.div>
    </>
  );
}

export default MyPinnedListsCard;
