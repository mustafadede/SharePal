import { ArrowLeftIcon } from "@radix-ui/react-icons";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { cardActions } from "../../../store/cardSlice";
import { notificationActions } from "../../../store/notificationSlice";

function FeedCardPageBackButton({ location = false }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const clickHandler = () => {
    if (location) {
      dispatch(notificationActions.updateFollowRequest(false));
    } else {
      navigate("/feed", { preventScrollReset: true });
      dispatch(cardActions.deleteComments());
    }
  };
  return (
    <button className="flex items-center justify-start w-full gap-2 mb-2 group" onClick={clickHandler}>
      <ArrowLeftIcon className="w-5 h-5 duration-150 text-slate-200 group-hover:text-fuchsia-600" />
      <p className="duration-150 text-md text-slate-200 group-hover:text-fuchsia-600">Back</p>
    </button>
  );
}

export default FeedCardPageBackButton;
