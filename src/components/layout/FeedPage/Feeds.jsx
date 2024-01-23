import React from "react";
import FeedCard from "../../common/FeedCard";

function Feeds({ tab, status, posts }) {
  return (
    <div>
      {tab === 0 &&
        status === "done" &&
        posts
          .map((data, index) => {
            if (data.attachedFilm) {
              return <FeedCard key={index} isAttached={true} data={data} index={index} />;
            } else if (data.spoiler) {
              return <FeedCard key={index} isSpoiler={true} data={data} index={index} />;
            } else if (data.actionName && localStorage.getItem("user") == data.userId) {
              return <FeedCard key={index} isAction={true} data={data} index={index} />;
            } else if (!data.actionName && !data.attachedFilm && !data.spoiler) {
              return <FeedCard key={index} isComment={true} data={data} index={index} />;
            }
          })
          .reverse()}
    </div>
  );
}

export default Feeds;
