import React from "react";
import { DotsHorizontalIcon, LockClosedIcon } from "@radix-ui/react-icons";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

function FeedCardHeader({ data, date, isEdited, setSettings, settings, user, notification, share }) {
  const { t } = useTranslation();
  return (
    <div className="flex justify-between w-full">
      <div className="flex gap-4">
        {!data.photoURL && <div className="w-12 h-12 rounded-full bg-fuchsia-600"></div>}
        {data.photoURL && (
          <div className="relative w-12 h-12">
            <img className="object-cover w-12 h-12 rounded-full bg-fuchsia-600" loading="lazy" src={data.photoURL}></img>
            {/* <FeedCardOnlineStatus username={!notification && data.nick === user ? false : true} data={data} /> */}
          </div>
        )}
        <div className="flex flex-col justify-center">
          <NavLink to={data.nick === user ? `/profile` : `/user/${data.nick}`}>
            <p
              className={
                share
                  ? "transition-all duration-300 text-md hover:cursor-pointer w-fit text-fuchsia-600"
                  : "transition-all duration-300 text-md text-slate-200 hover:cursor-pointer w-fit hover:underline hover:text-fuchsia-600"
              }
            >
              @{data.nick}
            </p>
          </NavLink>
          <p className="text-xs text-slate-400">{date}</p>
        </div>
      </div>
      <div className="flex items-center justify-center gap-2">
        {data.spoiler && (
          <div className="flex gap-2">
            <LockClosedIcon className="w-4 h-4 text-slate-200" />
            <p className="text-sm text-slate-400">{t("feedCard.spoiler")}</p>
          </div>
        )}
        {!notification && data.nick === user && (
          <div className="flex items-center justify-center gap-2">
            {(isEdited || data.edited) && <p className="text-sm text-slate-400">({t("feedCard.edit")})</p>}
            <button onClick={() => setSettings(!settings)}>
              <DotsHorizontalIcon className="w-6 h-6 transition-colors text-slate-400 hover:text-slate-200" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default FeedCardHeader;
