import React from "react";
import FeedCommentCard from "./FeedCard/FeedCommentCard";
import FeedAttachedCard from "./FeedCard/FeedAttachedCard";
import FeedSpoilerCard from "./FeedCard/FeedSpoilerCard";

function FeedCard({ isAttached = false, isComment = false, isSpoiler = false, data, index, attachedData }) {
  return isComment ? (
    <FeedCommentCard data={data} index={index} />
  ) : isAttached ? (
    <FeedAttachedCard data={data} attachedData={attachedData} index={index} />
  ) : isSpoiler ? (
    <FeedSpoilerCard data={data} index={index} />
  ) : null;
}

export default FeedCard;
