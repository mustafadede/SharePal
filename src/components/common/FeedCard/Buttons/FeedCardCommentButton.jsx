import React from "react";
import { ChatBubbleIcon } from "@radix-ui/react-icons";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { cardActions } from "../../../../store/cardSlice";
function FeedCardCommentButton({ data }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const clickHandler = () => {
    dispatch(cardActions.updateData([data]));
    navigate(`/feed/${data.nick}/${data.postId}`, { state: { uId: data.userId, pId: data.postId } });
  };
  return (
    <button className="flex items-center gap-2" onClick={clickHandler}>
      <ChatBubbleIcon className="w-5 h-5 text-slate-400 hover:text-slate-200" />
      <p className="hidden text-md md:block text-slate-400 hover:text-slate-200">Reply</p>
    </button>
  );
}

export default FeedCardCommentButton;
