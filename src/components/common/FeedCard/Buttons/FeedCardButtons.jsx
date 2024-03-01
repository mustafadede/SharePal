import React from "react";
import FeedCardLikeButton from "./FeedCardLikeButton";
import FeedCardCommentButton from "./FeedCardCommentButton";
import FeedCardRepostButton from "./FeedCardRepostButton";
import FeedCardShareButton from "./FeedCardShareButton";

function FeedCardButtons({ data, isCommentVisible, setCommentVisible }) {
  return (
    <div className="flex justify-around mt-4">
      <FeedCardLikeButton data={data} />
      <FeedCardCommentButton isCommentVisible={isCommentVisible} setCommentVisible={setCommentVisible} />
      <FeedCardRepostButton data={data} />
      <FeedCardShareButton data={data} />
    </div>
  );
}

export default FeedCardButtons;
