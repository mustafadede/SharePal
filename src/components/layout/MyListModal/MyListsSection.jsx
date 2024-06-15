import React, { useState } from "react";
import Suggestion from "../../common/Suggestion";
import MyListsModalCard from "./MyListsModalCard";
import { useDispatch, useSelector } from "react-redux";
import { modalActions } from "../../../store/modalSlice";
import { useTranslation } from "react-i18next";
import { MyListsActions } from "../../../store/myListsSlice";
import { createPinnedList } from "../../../firebase/firebaseActions";
import { toast } from "react-toastify";
import { PlusIcon } from "@radix-ui/react-icons";

function MyListsSection() {
  const { t, i18n } = useTranslation();
  const [listname, setListname] = useState("");
  const { myLists } = useSelector((state) => state.myLists);
  const { suggestedList } = useSelector((state) => state.suggestedList);
  const dispatch = useDispatch();

  const handleCreateList = () => {
    if (listname !== "") {
      dispatch(
        MyListsActions.setMyLists({
          id: Math.random().toString(36).substr(2, 9),
          title: listname,
          isPinned: false,
          list: [],
          date: new Date().toLocaleDateString(),
        }),
        createPinnedList({
          id: Math.random().toString(36).substr(2, 9),
          title: listname,
          isPinned: false,
          date: new Date().toLocaleDateString(),
        })
      );
    } else {
      i18n.language === "tr" ? toast.error("Liste adı boş olamaz.") : toast.error("List name can't be empty.");
      return;
    }
  };
  const handleListener = (e) => {
    if (e.key === "Enter") {
      handleCreateList();
    }
  };
  const handleSuggestion = (suggestion) => {
    if (suggestion) {
      dispatch(
        MyListsActions.setMyLists({
          id: Math.random().toString(36).substr(2, 9),
          title: suggestion,
          isPinned: false,
          list: [],
          date: new Date().toLocaleDateString(),
        }),
        createPinnedList({
          id: Math.random().toString(36).substr(2, 9),
          title: suggestion,
          isPinned: false,
          date: new Date().toLocaleDateString(),
        })
      );
    }
  };
  const clickHandler = (id, title, list, date) => {
    dispatch(modalActions.closeModal());
    dispatch(modalActions.openModal({ name: "listModal", data: { id, title, list, date } }));
  };
  return (
    <div className="flex flex-col justify-center py-4 pt-4">
      {/** Create List section start */}
      <div className="flex flex-col">
        <p className="text-xl text-slate-300">{t("pinned.subtitle")}</p>
        <div className="flex gap-6 pt-2">
          <input
            className="px-2 py-1 bg-transparent border-b outline-none w-96 border-slate-300 text-slate-300"
            type="text"
            placeholder={t("pinned.placeholder")}
            onChange={(e) => setListname(e.target.value)}
            onKeyDown={(e) => handleListener(e)}
          />
          <button
            className="px-4 py-2 transition-all border rounded-lg border-slate-300 hover:border-fuchsia-600 text-slate-300 hover:text-fuchsia-600"
            onClick={handleCreateList}
          >
            <span className="block md:hidden">
              <PlusIcon className="w-6 h-6" />
            </span>
            <span className="hidden md:block">{t("pinned.button")}</span>
          </button>
        </div>
      </div>
      {/** Create List section end */}
      <Suggestion
        title={t("pinned.suggestion")}
        suggestion1={t("pinned.sug1")}
        suggestion2={t("pinned.sug2")}
        suggestion3={t("pinned.sug3")}
        handleSuggestion={handleSuggestion}
      />
      {/** My Lists section start */}
      <div className="overflow-scroll h-80 md:h-56 no-scrollbar">
        {/** My Lists map */}
        {myLists.length === 0 && <p className="text-md text-slate-400">{t("pinned.noList")}</p>}
        {suggestedList.length > 0 &&
          suggestedList.map((list, i) => (
            <MyListsModalCard
              key={list.id}
              listNum={i}
              title={list.title}
              from={list.from}
              id={list.id}
              userId={list.userId}
              date={list.date}
              list={list.list}
              clickHandler={clickHandler}
              suggestionList={true}
              pinnedDisabled={true}
            />
          ))}
        {myLists.length > 0 &&
          myLists.map((list, i) => (
            <MyListsModalCard
              key={list.id}
              listNum={i}
              title={list.title}
              isPinned={list.isPinned}
              id={list.id}
              date={list.date}
              list={list.list}
              clickHandler={clickHandler}
            />
          ))}
      </div>
    </div>
  );
}

export default MyListsSection;
