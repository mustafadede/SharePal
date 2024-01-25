import { ChatBubbleIcon, HeartIcon, LoopIcon, RocketIcon } from "@radix-ui/react-icons";
import React from "react";

function NotificationTab({ tabInfo, tab }) {
  return (
    <>
      <button
        className={`flex items-center justify-center w-1/2 h-full transition-all rounded-tl-xl rounded-bl-xl text-slate-300 hover:text-fuchsia-600 hover:bg-slate-600/20 ${
          tabInfo === 0 ? "bg-slate-600/20" : null
        }`}
        onClick={() => tab(0)}
      >
        <span className={`hidden md:block text-lg font-semibold ${tabInfo === 0 ? "text-fuchsia-400" : null}`}>Suggestions</span>
        <RocketIcon className={`w-8 h-6 md:hidden ${tabInfo === 0 ? "text-fuchsia-400" : null}`} />
      </button>
      <button
        className={`flex items-center justify-center w-1/2 h-full transition-all text-slate-300 hover:text-fuchsia-600 hover:bg-slate-600/20 ${
          tabInfo === 1 ? "bg-slate-600/20" : null
        }`}
        onClick={() => tab(1)}
      >
        <span className={`hidden md:block text-lg font-semibold ${tabInfo === 1 ? "text-fuchsia-400" : null}`}>Likes</span>
        <HeartIcon className={`w-8 h-6 md:hidden ${tabInfo === 1 ? "text-fuchsia-400" : null}`} />
      </button>
      <button
        className={`flex items-center justify-center w-1/2 h-full transition-all text-slate-300 hover:text-fuchsia-600 hover:bg-slate-600/40 ${
          tabInfo === 2 ? "bg-slate-600/20" : null
        }`}
        onClick={() => tab(2)}
      >
        <span className={`text-lg hidden md:block font-semibold ${tabInfo === 2 ? "text-fuchsia-400" : null}`}>Comments</span>
        <ChatBubbleIcon className={`w-8 h-6 md:hidden ${tabInfo === 2 ? "text-fuchsia-400" : null}`} />
      </button>
      <button
        className={`flex items-center justify-center w-1/2 h-full transition-all text-slate-300 hover:text-fuchsia-600 hover:bg-slate-600/40 ${
          tabInfo === 3 ? "bg-slate-600/20" : null
        }`}
        onClick={() => tab(3)}
      >
        <span className={`text-lg hidden md:block font-semibold ${tabInfo === 3 ? "text-fuchsia-400" : null}`}>Reposts</span>
        <LoopIcon className={`w-8 h-6 md:hidden ${tabInfo === 3 ? "text-fuchsia-400" : null}`} />
      </button>
    </>
  );
}

export default NotificationTab;
