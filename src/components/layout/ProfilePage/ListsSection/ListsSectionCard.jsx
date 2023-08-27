import { DrawingPinFilledIcon } from "@radix-ui/react-icons";
import React from "react";
import { useDispatch } from "react-redux";
import { modalActions } from "../../../../store/modalSlice";

function ListsSectionCard({ title, isPinned, data }) {
  const dispatch = useDispatch();
  const clickHandler = () => {
    dispatch(modalActions.openModal({ name: "listModal", data: { ...data } }));
  };
  return (
    <button
      className="relative flex items-center justify-between w-48 gap-2 p-2 transition-all border border-transparent h-fit hover:border-slate-600 group rounded-2xl"
      onClick={clickHandler}
    >
      <p className="text-xl transition-all text-slate-200 2xl:text-2xl group-hover:text-fuchsia-600">{title}</p>
      {isPinned && <DrawingPinFilledIcon className="w-7 h-7 text-fuchsia-600 right-4 top-4" />}
    </button>
  );
}

export default ListsSectionCard;
