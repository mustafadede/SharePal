import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function UnfinishedComponent() {
  const { modalHasData } = useSelector((state) => state.modal);
  const { unfinishedList } = useSelector((state) => state.unfinished);
  return (
    <div>
      <h3 className="pb-1 mt-4 overflow-hidden text-xl md:mt-0 h-fit text-slate-200">
        {unfinishedList?.length > 0 ? unfinishedList?.length + " user unfinished this 😔" : "People's unfinished 😔"}
      </h3>
      <div className="flex flex-wrap justify-center gap-2 mb-2 md:justify-start yt-2 md:mt-0 md:mb-0">
        {unfinishedList?.length > 0 ? (
          unfinishedList.map((item, i) => {
            return (
              <Link to={`/user/${item?.name}`} key={i}>
                <img src={item?.photoURL} className="object-cover w-12 h-12 rounded-full" loading="lazy" alt={item?.name} />;
              </Link>
            );
          })
        ) : (
          <p className="text-slate-600">
            None of your followings finished this
            {modalHasData.mediaType === "tv" ? " " + modalHasData.mediaType.toUpperCase() + " Show" : " " + modalHasData.mediaType}.
          </p>
        )}
      </div>
    </div>
  );
}

export default UnfinishedComponent;
