import React from "react";
import { useDispatch } from "react-redux";
import { modalActions } from "../../../../store/modalSlice";
import { useNavigate } from "react-router-dom";
import { cardActions } from "../../../../store/cardSlice";

function FeedCardActionsSkeleton({ action, number, data, relatedPostId = false, relatedUserId = false }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClick = () => {
    if (action === "likes") {
      dispatch(modalActions.openModal({ name: "likesModal", data: { title: "Likes", ids: data?.likesList } }));
    } else if (action === "comments") {
      dispatch(cardActions.updateData([data]));
      if (!relatedPostId && !relatedUserId) {
        navigate(`/feed/${data.nick}/${data.postId}`, { state: { uId: data.userId, pId: data.postId } });
      } else {
        navigate(`/feed/${data.nick}/${data.postId}`, {
          state: { uId: data.userId, pId: data.postId, relatedPostId: relatedPostId, relatedUserId: relatedUserId, cardStat: "comment" },
        });
      }
    } else if (action === "reposts") {
      dispatch(modalActions.openModal({ name: "likesModal", data: { title: "Reposts", ids: data.repostsList } }));
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
