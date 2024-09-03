import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function UnfinishedComponent() {
  const { modalHasData } = useSelector((state) => state.modal);
  const { unfinishedList } = useSelector((state) => state.unfinished);
  const { t, i18n } = useTranslation();
  return (
    <div>
      <h3 className="pb-1 mt-4 overflow-hidden text-xl md:mt-0 h-fit text-slate-200">
        {unfinishedList?.length > 0 ? unfinishedList?.length + t("unfinished.userUnfinished") : t("unfinished.noUserUnfinished")}
      </h3>
      <div className="flex flex-wrap justify-center gap-2 mb-2 md:justify-start yt-2 md:mt-0 md:mb-0">
        {unfinishedList?.length > 0 ? (
          unfinishedList.map((item, i) => {
            return (
              <Link to={`/user/${item?.name}`} key={i}>
                {item?.photoURL ? (
                  <img src={item?.photoURL} className="object-cover w-12 h-12 rounded-full" loading="lazy" alt={item?.name} />
                ) : (
                  <div
                    className="flex items-center justify-center w-12 h-12 text-2xl rounded-full text-slate-200 bg-fuchsia-600"
                    alt={item?.name}
                  >
                    {item?.name?.charAt(0)}
                  </div>
                )}
              </Link>
            );
          })
        ) : i18n.language === "tr" ? (
          <p className="text-slate-600">{t("wantToWatch.info")}</p>
        ) : (
          <p className="text-slate-600">
            {t("wantToWatch.info")}
            {modalHasData.mediaType === "tv" ? " " + modalHasData.mediaType.toUpperCase() + " Show" : " " + modalHasData.mediaType}.
          </p>
        )}
      </div>
    </div>
  );
}

export default UnfinishedComponent;
