import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
function WantToWatchComponent() {
  const { modalHasData } = useSelector((state) => state.modal);
  const { wantToWatchList } = useSelector((state) => state.wantToWatch);

  return (
    <div>
      <h3 className="pb-1 mt-4 overflow-hidden text-xl md:mt-0 h-fit text-slate-200">
        {wantToWatchList?.length > 0 ? wantToWatchList?.length + " user want to watch this 🤩" : "People's want to watch 🤩"}
      </h3>
      <div className="flex flex-wrap justify-center gap-2 mt-2 mb-2 md:justify-start md:mt-0 md:mb-0">
        {wantToWatchList?.length > 0 ? (
          wantToWatchList.map((item, i) => {
            return (
              <Link to={`/user/${item?.name}`} key={i}>
                <img src={item?.photoURL} className="object-cover w-12 h-12 rounded-full" alt={item?.name} />;
              </Link>
            );
          })
        ) : (
          <p className="text-slate-600">
            None of your followings discover this
            {modalHasData.mediaType === "tv" ? " " + modalHasData.mediaType.toUpperCase() + " Show" : " " + modalHasData.mediaType}.
          </p>
        )}
      </div>
    </div>
  );
}

export default WantToWatchComponent;
