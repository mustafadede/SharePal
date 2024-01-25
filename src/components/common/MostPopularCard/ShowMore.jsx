import React from "react";
import { NavLink } from "react-router-dom";

function ShowMore() {
  return (
    <p className="pt-4 text-lg transition-colors text-fuchsia-400 hover:text-slate-300">
      <NavLink to={"/explore"}>Show more</NavLink>
    </p>
  );
}

export default ShowMore;
