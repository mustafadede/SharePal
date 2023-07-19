import React from "react";
import { Link } from "react-router-dom";

function SecondaryButton({ title, whereTo }) {
  return (
    <Link to={whereTo}>
      <button className="p-2 text-lg transition-colors duration-150 rounded-lg select-none md:text-xl text-cWhite hover:text-fuchsia-700 w-fit">
        {title}
      </button>
    </Link>
  );
}

export default SecondaryButton;
