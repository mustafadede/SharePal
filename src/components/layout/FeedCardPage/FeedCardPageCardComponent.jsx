import React from "react";
import FeedCard from "../../common/FeedCard";
import InfoLabel from "../../common/InfoLabel";

function FeedCardPageCardComponent({ cardData }) {
  return (
    <div>
      {cardData &&
        cardData[0]?.attachedFilm &&
        cardData.map((data, index) => <FeedCard key={index} isAttached={true} data={data} index={index} />)}
      {cardData &&
        cardData[0]?.spoiler &&
        cardData.map((data, index) => <FeedCard key={index} isSpoiler={true} data={data} index={index} />)}
      {cardData &&
        cardData[0]?.actionName &&
        localStorage.getItem("user") == cardData[0]?.userId &&
        cardData.map((data, index) => <FeedCard key={index} isAction={true} data={data} index={index} />)}
      {cardData &&
        !cardData[0]?.actionName &&
        !cardData[0]?.attachedFilm &&
        !cardData[0]?.spoiler &&
        cardData.map((data, index) => <FeedCard key={index} isComment={true} data={data} index={index} />)}
      {cardData.length === 0 && <InfoLabel text="Not Found." />}
    </div>
  );
}

export default FeedCardPageCardComponent;
