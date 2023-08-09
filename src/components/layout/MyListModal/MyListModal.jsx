import React, { useState } from "react";
import ModalHeader from "../ModalSkeleton/ModalHeader";
import { useDispatch, useSelector } from "react-redux";
import MyListsModalCard from "./MyListsModalCard";
import { MyListsActions } from "../../../store/myListsSlice";

function MyListModal() {
  const [listname, setListname] = useState("");
  const dispatch = useDispatch();
  const { myLists, length } = useSelector((state) => state.myLists);
  const handleCreateList = () => {
    dispatch(
      MyListsActions.setMyLists({
        id: length,
        title: listname,
        isPinned: false,
      })
    );
  };
  return (
    <div className="px-8 pt-4 overflow-hidden h-96">
      <ModalHeader title="My Lists" />
      <div className="flex flex-col justify-center py-4 pt-4">
        <div className="flex flex-col gap-4">
          <p className="text-xl text-slate-300">Create List</p>
          <div className="flex gap-6 pt-2 pb-6">
            <input
              className="px-2 py-1 bg-transparent border-b outline-none w-96 border-slate-300 text-slate-300"
              type="text"
              placeholder="List Name"
              onChange={(e) => setListname(e.target.value)}
            />
            <button
              className="px-4 py-2 transition-all border rounded-lg border-slate-300 hover:border-fuchsia-600 text-slate-300 hover:text-fuchsia-600"
              onClick={handleCreateList}
            >
              Create
            </button>
          </div>
        </div>
        <div className="h-48 overflow-scroll no-scrollbar">
          {/** My Lists map */}
          {length === 0 && <p className="text-md text-slate-400">You have no lists yet.</p>}
          {length > 0 && myLists.map((list) => <MyListsModalCard key={list.id} title={list.title} id={list.id} />)}
        </div>
      </div>
    </div>
  );
}

export default MyListModal;
