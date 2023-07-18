import React from "react";
import { Link } from "react-router-dom";
function PrimaryButton({ title, whereTo }) {
  return (
    <Link to={whereTo}>
      <button className="p-2 text-xl rounded-lg select-none bg-fuchsia-800 text-cWhite w-fit">{title}</button>
    </Link>
  );
}

export default PrimaryButton;
