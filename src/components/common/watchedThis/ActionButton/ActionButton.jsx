import React from "react";

function ActionButton({ title, icon, onClick }) {
  return (
    <button className="flex items-center justify-center w-1/2 gap-2 p-2 text-lg rounded-lg text-cWhite bg-fuchsia-800" onClick={onClick}>
      {icon}
      <p className="text-sm text-center md:text-md text-slate-200">{title}</p>
    </button>
  );
}

export default ActionButton;
