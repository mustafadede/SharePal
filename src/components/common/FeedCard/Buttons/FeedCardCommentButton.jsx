import React from "react";
import { ChatBubbleIcon } from "@radix-ui/react-icons";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { cardActions } from "../../../../store/cardSlice";
import { useTranslation } from "react-i18next";
function FeedCardCommentButton({ isCommentVisible, setCommentVisible }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const clickHandler = () => {
    if (window.location.hash.length < 7) {
      setCommentVisible(!isCommentVisible);
    }
  };
  return (
    <button className="flex items-center gap-2" onClick={clickHandler}>
      <ChatBubbleIcon className="w-5 h-5 text-slate-400 hover:text-slate-200" />
      <p className="hidden text-md md:block text-slate-400 hover:text-slate-200">{t("feedCard.reply")}</p>
    </button>
  );
}

export default FeedCardCommentButton;
