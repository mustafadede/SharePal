import { RocketIcon } from "@radix-ui/react-icons";
import React from "react";
import { useDispatch } from "react-redux";
import { modalActions } from "../../../../store/modalSlice";

function FeedCardShareButton({ data }) {
  const dispatch = useDispatch();
  const handleClick = () => {
    console.log("Share button clicked");
    dispatch(modalActions.openModal({ name: "shareModal", data: data }));
  };
  return (
    <button className="flex items-center gap-2" onClick={handleClick}>
      <RocketIcon className="w-5 h-5 text-slate-400 hover:text-slate-200" />
      <p className="hidden text-md md:block text-slate-400 hover:text-slate-200">Share</p>
    </button>
  );
}

export default FeedCardShareButton;
