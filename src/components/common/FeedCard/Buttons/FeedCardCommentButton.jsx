import React from "react";
import { ChatBubbleIcon } from "@radix-ui/react-icons";
function FeedCardCommentButton() {
  return (
    <button className="flex items-center gap-2">
      <ChatBubbleIcon className="w-5 h-5 text-slate-400 hover:text-slate-200" />
      <p className="text-md text-slate-400 hover:text-slate-200">Yorum Yap</p>
    </button>
  );
}

export default FeedCardCommentButton;
