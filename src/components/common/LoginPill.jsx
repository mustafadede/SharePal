import React from "react";

function LoginPill({ text, onClickHandler }) {
  return (
    <button
      onClick={onClickHandler}
      className="px-2 py-1 transition-all duration-150 border rounded-2xl text-cWhite border-slate-400 hover:border-fuchsia-600"
    >
      {text}
    </button>
  );
}

export default LoginPill;
