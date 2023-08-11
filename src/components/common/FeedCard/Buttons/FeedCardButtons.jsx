import React from "react";
import FeedCardLikeButton from "./FeedCardLikeButton";
import FeedCardCommentButton from "./FeedCardCommentButton";
import FeedCardRepostButton from "./FeedCardRepostButton";

function FeedCardButtons({ data }) {
  return (
    <div className="flex justify-around mt-4">
      <FeedCardLikeButton data={data} />
      <FeedCardCommentButton data={data} />
      <FeedCardRepostButton data={data} />
    </div>
  );
}

export default FeedCardButtons;
