import React from "react";
import { useDispatch } from "react-redux";
import { modalActions } from "../../../../store/modalSlice";

function FeedCardActionsSkeleton({ action, number, data }) {
  const dispatch = useDispatch();
  const handleClick = () => {
    if (action === "likes") {
      dispatch(modalActions.openModal({ name: "likesModal", data: { title: "Likes", ids: data?.likesList } }));
    } else if (action === "reposts") {
      dispatch(modalActions.openModal({ name: "likesModal", data: { title: "Reposts", ids: data?.repostsList } }));
    }
  };
  return (
    <button className="flex gap-1 cursor-pointer group" onClick={handleClick}>
      <p className="transition-all text-slate-400 group-hover:text-fuchsia-600">{number ? number : 0}</p>
      <p className="transition-all text-slate-400 group-hover:text-fuchsia-600">{action}</p>
    </button>
  );
}

export default FeedCardActionsSkeleton;
