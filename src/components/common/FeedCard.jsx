import React from "react";
import FeedCommentCard from "./FeedCard/FeedCommentCard";
import FeedAttachedCard from "./FeedCard/FeedAttachedCard";
import FeedSpoilerCard from "./FeedCard/FeedSpoilerCard";

function FeedCard({ isAttached = false, isComment = false, isSpoiler = false, data, index, attachedData, notification = false }) {
  return isComment ? (
    <FeedCommentCard data={data} index={index} notification={notification} />
  ) : isAttached ? (
    <FeedAttachedCard data={data} attachedData={attachedData} index={index} notification={notification} />
  ) : isSpoiler ? (
    <FeedSpoilerCard data={data} index={index} notification={notification} />
  ) : null;
}

export default FeedCard;
