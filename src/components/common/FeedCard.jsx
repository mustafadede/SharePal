import React from "react";
import FeedCommentCard from "./FeedCard/FeedCommentCard";
import FeedAttachedCard from "./FeedCard/FeedAttachedCard";
import FeedUploadCard from "./FeedCard/FeedUploadCard";

function FeedCard({ isAttached = false, isComment = false, isUpload = false, data }) {
  return isComment ? (
    <FeedCommentCard data={data} />
  ) : isAttached ? (
    <FeedAttachedCard data={data} />
  ) : isUpload ? (
    <FeedUploadCard data={data} />
  ) : null;
}

export default FeedCard;
