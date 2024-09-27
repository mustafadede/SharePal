import React, { useEffect, useState } from "react";
import { getSelectedUserSharedList, getSelectedUserSuggestionLists } from "../../../firebase/firebaseActions";
import MyListsModalCard from "./MyListsModalCard";
import { modalActions } from "../../../store/modalSlice";
import { useTranslation } from "react-i18next";

function FriendsLists() {
  const [lists, setLists] = useState([]);
  const { t } = useTranslation();
  useEffect(() => {
    getSelectedUserSharedList(localStorage.getItem("user")).then((res) => {
      res.forEach((list) => {
        getSelectedUserSuggestionLists(list.id).then((res) => {
          setLists((prev) => [...prev, res]);
        });
      });
    });
  }, []);

  const clickHandler = (id, title, list, date) => {
    dispatch(modalActions.closeModal());
    dispatch(modalActions.openModal({ name: "listModal", data: { id, title, list, date } }));
  };
  return (
    <div className="mt-4 overflow-scroll h-80 md:h-fit no-scrollbar">
      {lists.map((list, i) => {
        return (
          <MyListsModalCard
            key={i}
            listNum={i}
            title={list[0].title}
            id={list[0].id}
            isPinned={list[0].isPinned || false}
            date={list[0].date}
            list={list[0].list}
            clickHandler={clickHandler}
            pinnedDisabled={true}
            suggestionList={true}
            from={list[0].from}
            userId={list[0].userId}
            nodeId={list[0].nodeId}
          />
        );
      })}
      {lists.length === 0 && <p className="text-md text-slate-400">{t("pinned.noList")}</p>}
    </div>
  );
}

export default FriendsLists;
