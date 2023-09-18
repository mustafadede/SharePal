import React from "react";
import { ChatBubbleIcon } from "@radix-ui/react-icons";
function FeedCardCommentButton() {
  return (
    <button className="flex items-center gap-2">
      <ChatBubbleIcon className="w-5 h-5 text-slate-400 hover:text-slate-200" />
      <p className="hidden text-md md:block text-slate-400 hover:text-slate-200">Reply</p>
    </button>
  );
}

export default FeedCardCommentButton;
