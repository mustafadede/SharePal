import React, { useEffect, useState } from "react";
import ModalHeader from "../ModalSkeleton/ModalHeader";
import { useDispatch, useSelector } from "react-redux";
import MyListsModalCard from "./MyListsModalCard";
import { MyListsActions } from "../../../store/myListsSlice";
import { toast } from "react-toastify";
import Suggestion from "../../common/Suggestion";
import { createPinnedList, getSelectedUserLists } from "../../../firebase/firebaseActions";
import { modalActions } from "../../../store/modalSlice";

function MyListModal() {
  const [listname, setListname] = useState("");
  const dispatch = useDispatch();
  const { myLists } = useSelector((state) => state.myLists);

  useEffect(() => {
    const getUserLists = async () => {
      const res = await getSelectedUserLists(localStorage.getItem("user"));
      dispatch(MyListsActions.setMyCoppiedList(res));
    };
    console.log("MyListModal.jsx: getUserLists() called");
    getUserLists();
  }, []);

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
    <div className="bg-slate-900 rounded-2xl px-4 md:px-8 pt-4 overflow-hidden w-[24rem] md:w-[35rem] h-[35rem] md:h-[27rem]">
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
        <div className="overflow-scroll h-80 md:h-56 no-scrollbar">
          {/** My Lists map */}
          {myLists.length === 0 && <p className="text-md text-slate-400">You have no lists yet.</p>}
          {myLists.length > 0 &&
            myLists.map((list, i) => (
              <MyListsModalCard
                key={list.id}
                listNum={i}
                title={list.title}
                id={list.id}
                isPinned={list.isPinned}
                date={list.date}
                list={list.list}
                clickHandler={clickHandler}
              />
            ))}
        </div>
      </div>
      {/** My Lists section end */}
    </div>
  );
}

export default MyListModal;
