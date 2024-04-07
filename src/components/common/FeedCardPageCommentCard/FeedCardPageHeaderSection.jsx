import React from "react";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { NavLink } from "react-router-dom";

function FeedCardPageHeaderSection({ nick, newDate, user, isEdited, dataEdited, settings, setSettings, activities, notification }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <NavLink
          to={nick === user?.nick ? `/profile` : `/user/${nick}`}
          className="text-md hover:text-fuchsia-600 text-slate-200 hover:underline"
        >
          @{nick}
        </NavLink>
        <p className="text-sm text-slate-400">{newDate}</p>
      </div>
      <div className="flex items-center gap-2">
        {(isEdited || dataEdited) && <p className="text-xs text-slate-400">(Edited)</p>}
        {!notification && nick === user?.nick && !activities && (
          <button onClick={() => setSettings(!settings)}>
            <DotsHorizontalIcon className="w-6 h-6 transition-colors text-slate-400 hover:text-slate-200" />
          </button>
        )}
      </div>
    </div>
  );
}

export default FeedCardPageHeaderSection;
