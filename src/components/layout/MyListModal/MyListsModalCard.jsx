import { Cross1Icon, DrawingPinFilledIcon, DrawingPinIcon } from "@radix-ui/react-icons";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { MyListsActions } from "../../../store/myListsSlice";
import { toast } from "react-toastify";

function MyListsModalCard({ title, id, listNum, disabled = false, isPinned = false, list, date, clickHandler }) {
  const dispatch = useDispatch();

  const handlePin = (listNum) => {
    if (!isPinned) {
      dispatch(MyListsActions.setPinned(listNum));
      toast.success("List pinned successfully!");
    } else {
      dispatch(MyListsActions.setPinned(listNum));
      toast.error("List unpinned successfully!");
    }
  };

  const handleRemove = (id) => {
    dispatch(MyListsActions.deleteList(id));
    toast.success("List removed successfully!");
  };

  return (
    <div
      className={`flex items-center cursor-pointer justify-between w-full h-10  overflow-hidden group ${
        disabled ? "" : "hover:border-fuchsia-400 border-slate-200 border px-4 py-6 mb-4"
      } rounded-xl`}
    >
      <p
        className={` text-slate-200 w-full ${disabled ? "text-md" : "group-hover:text-fuchsia-400 text-xl"}`}
        onClick={() => clickHandler(id, title, list, date)}
      >
        {title}
      </p>
      <div className="flex items-center gap-2">
        <button className="ml-auto transition-all rounded-lg" onClick={() => handlePin(listNum)}>
          {!isPinned ? (
            <DrawingPinIcon className="w-6 h-6 ml-auto text-slate-200 hover:text-fuchsia-600" />
          ) : (
            <DrawingPinFilledIcon className={`w-6 h-6 ml-auto text-fuchsia-600`} />
          )}
        </button>
        {!disabled && (
          <button className="ml-auto transition-all rounded-lg" onClick={() => handleRemove(id)}>
            <Cross1Icon className="w-6 h-6 ml-auto text-slate-200 hover:text-red-600" />
          </button>
        )}
      </div>
    </div>
  );
}

export default MyListsModalCard;
