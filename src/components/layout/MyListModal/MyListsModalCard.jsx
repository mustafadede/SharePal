import { Cross1Icon, DrawingPinFilledIcon, DrawingPinIcon } from "@radix-ui/react-icons";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { MyListsActions } from "../../../store/myListsSlice";

function MyListsModalCard({ title, id, disabled = false }) {
  const { isPinned } = useSelector((state) => state.myLists.myLists[id]);
  const dispatch = useDispatch();
  const handlePin = (id) => {
    dispatch(MyListsActions.setPinned(id));
  };
  return (
    <div
      className={`flex items-center justify-between w-full h-10  overflow-hidden peer group ${
        disabled ? "" : "hover:border-fuchsia-400 border-slate-200 border px-4 py-6 mb-4"
      } rounded-xl`}
    >
      <p className={` text-slate-200  ${disabled ? "text-md" : "group-hover:text-fuchsia-400 text-xl"}`}>{title}</p>
      <div className="flex items-center gap-2">
        <button className="ml-auto transition-all rounded-lg" onClick={() => handlePin(id)}>
          {!isPinned ? (
            <DrawingPinIcon className="w-6 h-6 ml-auto text-slate-200 hover:text-fuchsia-600" />
          ) : (
            <DrawingPinFilledIcon className="w-6 h-6 ml-auto text-fuchsia-600" />
          )}
        </button>
        {!disabled && (
          <button className="ml-auto transition-all rounded-lg">
            <Cross1Icon className="w-6 h-6 ml-auto text-slate-200 hover:text-red-600" />
          </button>
        )}
      </div>
    </div>
  );
}

export default MyListsModalCard;
