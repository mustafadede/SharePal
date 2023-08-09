import { Cross1Icon } from "@radix-ui/react-icons";
import React from "react";
import { useDispatch } from "react-redux";
import { modalActions } from "../../../store/modalSlice";

function ModalHeader(props) {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(modalActions.closeModal());
  };
  return (
    <div className="flex items-center pb-2">
      <h1 className="text-2xl text-slate-200">{props.title}</h1>
      <Cross1Icon className="w-6 h-6 ml-auto cursor-pointer text-slate-200 hover:text-slate-100" onClick={handleClick} />
    </div>
  );
}

export default ModalHeader;
