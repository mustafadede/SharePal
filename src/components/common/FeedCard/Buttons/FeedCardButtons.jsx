import React from "react";
import FeedCardLikeButton from "./FeedCardLikeButton";
import FeedCardCommentButton from "./FeedCardCommentButton";
import FeedCardRepostButton from "./FeedCardRepostButton";

function FeedCardButtons() {
  return (
    <div className="flex justify-around mt-4">
      <FeedCardLikeButton />
      <FeedCardCommentButton />
      <FeedCardRepostButton />
    </div>
  );
}

export default FeedCardButtons;
