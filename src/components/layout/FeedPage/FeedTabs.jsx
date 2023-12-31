import React from "react";
import { motion } from "framer-motion";
import { ChatBubbleIcon, HeartFilledIcon, HeartIcon, LoopIcon, PersonIcon } from "@radix-ui/react-icons";
function FeedTabs({ tabInfo, tab, info }) {
  return (
    <motion.div
      className={
        info === "feed"
          ? "sticky flex items-center w-full h-12 mb-4 shadow-xl top-[4.5rem] backdrop-blur bg-slate-900/70 transition-all z-20 rounded-xl"
          : "sticky flex items-center w-full h-12 mb-6 shadow-xl top-1 backdrop-blur bg-slate-900/70 transition-all z-20 rounded-xl"
      }
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
    >
      {info === "feed" ? (
        <>
          <button
            className={`flex items-center justify-center w-1/2 h-full transition-all rounded-tl-xl rounded-bl-xl text-slate-300 hover:text-fuchsia-600 hover:bg-slate-600/20 ${
              tabInfo === 0 ? "bg-slate-600/20" : null
            }`}
            onClick={() => tab(0)}
          >
            <span className={`text-lg font-semibold ${tabInfo === 0 ? "text-fuchsia-400" : null}`}>Feed</span>
          </button>
          <button
            className={`flex items-center justify-center w-1/2 h-full transition-all rounded-tr-xl rounded-br-xl text-slate-300 hover:text-fuchsia-600 hover:bg-slate-600/40 ${
              tabInfo === 1 ? "bg-slate-600/20" : null
            }`}
            onClick={() => tab(1)}
          >
            <span className={`text-lg font-semibold ${tabInfo === 1 ? "text-fuchsia-400" : null}`}>Following</span>
          </button>
        </>
      ) : info === "activities" ? (
        <>
          <button
            className={`flex items-center justify-center w-1/2 h-full transition-all rounded-tl-xl rounded-bl-xl text-slate-300 hover:text-fuchsia-600 hover:bg-slate-600/20 ${
              tabInfo === 0 ? "bg-slate-600/20" : null
            }`}
            onClick={() => tab(0)}
          >
            <span className={`text-lg font-semibold ${tabInfo === 0 ? "text-fuchsia-400" : null}`}>Likes</span>
          </button>
          <button
            className={`flex items-center justify-center w-1/2 h-full transition-all text-slate-300 hover:text-fuchsia-600 hover:bg-slate-600/40 ${
              tabInfo === 1 ? "bg-slate-600/20" : null
            }`}
            onClick={() => tab(1)}
          >
            <span className={`text-lg font-semibold ${tabInfo === 1 ? "text-fuchsia-400" : null}`}>Comments</span>
          </button>
          <button
            className={`flex items-center justify-center w-1/2 h-full transition-all rounded-tr-xl rounded-br-xl text-slate-300 hover:text-fuchsia-600 hover:bg-slate-600/40 ${
              tabInfo === 2 ? "bg-slate-600/20" : null
            }`}
            onClick={() => tab(2)}
          >
            <span className={`text-lg font-semibold ${tabInfo === 2 ? "text-fuchsia-400" : null}`}>Reposts</span>
          </button>
        </>
      ) : (
        <>
          <button
            className={`flex items-center justify-center w-1/2 h-full transition-all rounded-tl-xl rounded-bl-xl text-slate-300 hover:text-fuchsia-600 hover:bg-slate-600/20 ${
              tabInfo === 0 ? "bg-slate-600/20" : null
            }`}
            onClick={() => tab(0)}
          >
            <span className={`hidden md:block text-lg font-semibold ${tabInfo === 0 ? "text-fuchsia-400" : null}`}>Likes</span>
            <HeartIcon className={`w-8 h-6 md:hidden ${tabInfo === 0 ? "text-fuchsia-400" : null}`} />
          </button>
          <button
            className={`flex items-center justify-center w-1/2 h-full transition-all text-slate-300 hover:text-fuchsia-600 hover:bg-slate-600/40 ${
              tabInfo === 1 ? "bg-slate-600/20" : null
            }`}
            onClick={() => tab(1)}
          >
            <span className={`text-lg hidden md:block font-semibold ${tabInfo === 1 ? "text-fuchsia-400" : null}`}>Comments</span>
            <ChatBubbleIcon className={`w-8 h-6 md:hidden ${tabInfo === 1 ? "text-fuchsia-400" : null}`} />
          </button>
          <button
            className={`flex items-center justify-center w-1/2 h-full transition-all text-slate-300 hover:text-fuchsia-600 hover:bg-slate-600/40 ${
              tabInfo === 2 ? "bg-slate-600/20" : null
            }`}
            onClick={() => tab(2)}
          >
            <span className={`text-lg hidden md:block font-semibold ${tabInfo === 2 ? "text-fuchsia-400" : null}`}>Reposts</span>
            <LoopIcon className={`w-8 h-6 md:hidden ${tabInfo === 2 ? "text-fuchsia-400" : null}`} />
          </button>
          <button
            className={`flex items-center justify-center w-1/2 h-full transition-all rounded-tr-xl rounded-br-xl text-slate-300 hover:text-fuchsia-600 hover:bg-slate-600/40 ${
              tabInfo === 3 ? "bg-slate-600/20" : null
            }`}
            onClick={() => tab(3)}
          >
            <span className={`text-lg hidden md:block font-semibold ${tabInfo === 3 ? "text-fuchsia-400" : null}`}>Follow</span>
            <PersonIcon className={`w-8 h-6 md:hidden ${tabInfo === 3 ? "text-fuchsia-400" : null}`} />
          </button>
        </>
      )}
    </motion.div>
  );
}

export default FeedTabs;
