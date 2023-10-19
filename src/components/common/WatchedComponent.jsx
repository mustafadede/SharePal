import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function WatchedComponent() {
  const { modalHasData } = useSelector((state) => state.modal);
  const { watchedList } = useSelector((state) => state.watched);
  return (
    <div>
      <h3 className="pb-1 mt-4 overflow-hidden text-xl md:mt-0 h-fit text-slate-200">
        {watchedList?.length > 0 ? watchedList?.length + " user watched this 🥳" : "People's watched 🥳"}
      </h3>
      <div className="flex flex-wrap justify-center gap-2 mb-2 md:justify-start yt-2 md:mt-0 md:mb-0">
        {watchedList?.length > 0 ? (
          watchedList.map((item, i) => {
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

export default WatchedComponent;
