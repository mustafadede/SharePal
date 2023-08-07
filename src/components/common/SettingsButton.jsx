import React from "react";

function SettingsButton({ title, handleSelection }) {
  return (
    <button
      className="w-full h-16 pl-4 text-left transition-all rounded-xl text-slate-400 hover:text-slate-200 hover:bg-cGradient2"
      onClick={() => handleSelection(title)}
    >
      {title}
    </button>
  );
}

export default SettingsButton;
