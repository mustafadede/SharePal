import React from "react";
import FeedCommentCard from "./FeedCard/FeedCommentCard";
import FeedAttachedCard from "./FeedCard/FeedAttachedCard";
import FeedUploadCard from "./FeedCard/FeedUploadCard";

function FeedCard({ isAttached = false, isComment = false, isUpload = false }) {
  return isComment ? <FeedCommentCard /> : isAttached ? <FeedAttachedCard /> : isUpload ? <FeedUploadCard /> : null;
}

export default FeedCard;
