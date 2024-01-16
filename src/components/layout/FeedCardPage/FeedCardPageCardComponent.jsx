import React, { useState } from "react";
import FeedCard from "../../common/FeedCard";
import InfoLabel from "../../common/InfoLabel";
import { useSelector } from "react-redux";

function FeedCardPageCardComponent({ cardData }) {
  const { cardState } = useSelector((state) => state.card);

  return (
    <div>
      {cardData.map((data, index) => {
        if (data.attachedFilm) {
          return <FeedCard key={index} isAttached={true} data={data} index={index} />;
        } else if (data.spoiler) {
          return <FeedCard key={index} isSpoiler={true} data={data} index={index} />;
        } else if (!data.actionName && !data.attachedFilm && !data.spoiler) {
          return <FeedCard key={index} isComment={true} data={data} index={index} />;
        }
      })}
      {cardData.length === 0 && cardState === "done" && <InfoLabel text="Not Found." />}
      {cardState === "loading" && <InfoLabel text="Loading..." />}
    </div>
  );
}

export default FeedCardPageCardComponent;
