import React, { useState } from "react";
import { Link2Icon, CameraIcon } from "@radix-ui/react-icons";
import { motion } from "framer-motion";
import FeedActionBoxButton from "../common/FeedActionBoxButton";
import { toast } from "react-toastify";

function FeedActionBox() {
  const [text, setText] = useState("");

  const createPost = () => {
    if (text.length === 0) {
      toast.error("Post can't be empty!");
      return;
    }
    console.log(text);
    console.log("Post Created");
    setText("");
  };

  return (
    <div className="w-full px-3 overflow-hidden rounded-lg h-[10.2rem] bg-slate-900">
      <motion.textarea
        name="post"
        className="w-full h-20 px-4 py-2 mt-4 rounded-lg outline-none resize-none text-md text-cWhite bg-slate-800 "
        placeholder="What's happening?"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        onChange={(e) => e.target.value.length > 0 && e.target.value.length <= 280 && setText(e.target.value)}
      />
      <div className="flex w-full gap-2 mt-1">
        <FeedActionBoxButton
          icons={<Link2Icon className="h-6 transition-all w-fit text-slate-300" />}
          text="Attach Film/Series"
          onClickAction={() => {
            console.log("Attach Film/Series");
          }}
        />
        <FeedActionBoxButton icons={<CameraIcon className="h-6 transition-all w-fit text-slate-300" />} text="Upload Photo" />
        <button
          className="w-full p-2 text-lg transition-colors rounded-lg select-none h-100 bg-slate-600 hover:bg-fuchsia-800 text-cWhite"
          onClick={createPost}
        >
          Post
        </button>
      </div>
    </div>
  );
}

export default FeedActionBox;
