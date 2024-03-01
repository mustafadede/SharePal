import React from "react";
import { useDispatch } from "react-redux";
import { modalActions } from "../../../store/modalSlice";
import { useNavigate } from "react-router-dom";

function FeedCardPageAction({ action, number, data }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClick = () => {
    if (action === "comments") {
      console.log("card comments");
    }
  };
  return (
    <button className="flex gap-1 cursor-pointer group" onClick={handleClick}>
      <p className="transition-all text-slate-400 group-hover:text-fuchsia-600">{number ? number : 0}</p>
      <p className="transition-all text-slate-400 group-hover:text-fuchsia-600">{action}</p>
    </button>
  );
}

export default FeedCardPageAction;
