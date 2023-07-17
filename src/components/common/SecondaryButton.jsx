import React from "react";
import { Link } from "react-router-dom";

function SecondaryButton({ title, whereTo }) {
  return (
    <Link to={whereTo}>
      <button className="p-2 text-xl transition-colors duration-150 rounded-lg select-none text-cWhite hover:text-cDarkerPurple w-fit">
        {title}
      </button>
    </Link>
  );
}

export default SecondaryButton;
