import React, { useState } from "react";
import ModalHeader from "../ModalSkeleton/ModalHeader";
import { useDispatch, useSelector } from "react-redux";
import MyListsModalCard from "./MyListsModalCard";
import { MyListsActions } from "../../../store/myListsSlice";
import { toast } from "react-toastify";
import Suggestion from "../../common/Suggestion";

function MyListModal() {
  const [listname, setListname] = useState("");
  const dispatch = useDispatch();
  const { myLists } = useSelector((state) => state.myLists);
  const handleCreateList = () => {
    if (listname !== "") {
      dispatch(
        MyListsActions.setMyLists({
          id: Math.random().toString(36).substr(2, 9),
          title: listname,
          isPinned: false,
        })
      );
    } else {
      toast.error("List name cannot be empty.");
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
        })
      );
    }
  };
  return (
    <div className="px-8 pt-4 overflow-hidden h-[30rem]">
      <ModalHeader title="My Lists" />
      <div className="flex flex-col justify-center py-4 pt-4">
        {/** Create List section start */}
        <div className="flex flex-col gap-4">
          <p className="text-xl text-slate-300">Create List</p>
          <div className="flex gap-6 pt-2">
            <input
              className="px-2 py-1 bg-transparent border-b outline-none w-96 border-slate-300 text-slate-300"
              type="text"
              placeholder="List Name"
              onChange={(e) => setListname(e.target.value)}
              onKeyDown={(e) => handleListener(e)}
            />
            <button
              className="px-4 py-2 transition-all border rounded-lg border-slate-300 hover:border-fuchsia-600 text-slate-300 hover:text-fuchsia-600"
              onClick={handleCreateList}
            >
              Create
            </button>
          </div>
        </div>
        {/** Create List section end */}
        <Suggestion
          title="Name"
          suggestion1="My Watchlist"
          suggestion2="My Top 10"
          suggestion3="My Top 5"
          handleSuggestion={handleSuggestion}
        />
        {/** My Lists section start */}
        <div className="h-64 overflow-scroll no-scrollbar">
          {/** My Lists map */}
          {myLists.length === 0 && <p className="text-md text-slate-400">You have no lists yet.</p>}
          {myLists.length > 0 &&
            myLists.map((list, i) => (
              <MyListsModalCard key={list.id} listNum={i} title={list.title} id={list.id} isPinned={list.isPinned} />
            ))}
        </div>
      </div>
      {/** My Lists section end */}
    </div>
  );
}

export default MyListModal;
