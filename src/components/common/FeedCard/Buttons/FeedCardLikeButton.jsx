import React, { useState } from "react";
import { HeartIcon, HeartFilledIcon } from "@radix-ui/react-icons";
function FeedCardLikeButton() {
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  return (
    <button className="flex items-center gap-2" onClick={handleLike}>
      {isLiked ? (
        <>
          <HeartFilledIcon className="w-6 h-5 transition-all text-fuchsia-600" />
          <p className="transition-all text-md text-fuchsia-600">Like</p>
        </>
      ) : (
        <>
          <HeartIcon className="w-6 h-5 transition-all text-slate-400 hover:text-slate-200" />
          <p className="transition-all text-md text-slate-400 hover:text-slate-200">Like</p>
        </>
      )}
    </button>
  );
}

export default FeedCardLikeButton;
