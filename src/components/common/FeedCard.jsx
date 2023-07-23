import React from "react";
import FeedCommentCard from "./FeedCard/FeedCommentCard";
import FeedAttachedCard from "./FeedCard/FeedAttachedCard";

function FeedCard({ isAttached = false, isComment = false, isUpload = false }) {
  return isComment ? <FeedCommentCard /> : isAttached ? <FeedAttachedCard /> : isUpload ? <FeedCommentCard /> : null;
}

export default FeedCard;
