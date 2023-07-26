import React, { useState } from "react";
import { LoopIcon } from "@radix-ui/react-icons";
function FeedCardRepostButton() {
  const [isReposted, setIsReposted] = useState(false);
  const handleRepost = () => {
    setIsReposted(!isReposted);
  };
  return (
    <button className="flex items-center gap-2" onClick={handleRepost}>
      {isReposted ? (
        <>
          <LoopIcon className="w-6 h-5 transition-all text-fuchsia-600" />
          <p className="transition-all text-md text-fuchsia-600">Repost</p>
        </>
      ) : (
        <>
          <LoopIcon className="w-6 h-5 transition-all text-slate-400 hover:text-slate-200" />
          <p className="transition-all text-md text-slate-400 hover:text-slate-200">Repost</p>
        </>
      )}
    </button>
  );
}

export default FeedCardRepostButton;
