import React from "react";
import FeedCommentCard from "./FeedCard/FeedCommentCard";
import FeedAttachedCard from "./FeedCard/FeedAttachedCard";
import FeedUploadCard from "./FeedCard/FeedUploadCard";

function FeedCard({ isAttached = false, isComment = false, isUpload = false, data, index, attachedData }) {
  return isComment ? (
    <FeedCommentCard data={data} index={index} />
  ) : isAttached ? (
    <FeedAttachedCard data={data} attachedData={attachedData} index={index} />
  ) : isUpload ? (
    <FeedUploadCard data={data} index={index} />
  ) : null;
}

export default FeedCard;
