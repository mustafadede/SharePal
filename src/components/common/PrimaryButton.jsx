import React from "react";
import { Link } from "react-router-dom";
function PrimaryButton({ title, whereTo }) {
  return (
    <Link to={whereTo}>
      <button className="p-2 cursor-pointer text-lg rounded-lg select-none md:text-xl bg-fuchsia-800 text-cWhite w-fit">{title}</button>
    </Link>
  );
}

export default PrimaryButton;
