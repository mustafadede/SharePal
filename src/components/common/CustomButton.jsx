import React from "react";

function CustomButton({ title, onClickHandler, customClasses }) {
  return (
    <button
      className={`px-6 py-2 transition-colors duration-150 text-lg rounded-lg select-none md:text-xl bg-fuchsia-800 hover:bg-slate-400 text-cWhite w-fit ${customClasses}`}
      onClick={onClickHandler}
    >
      {title}
    </button>
  );
}

export default CustomButton;
