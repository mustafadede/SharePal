import React from "react";

function HoverInfo({ title }) {
  return (
    <span className="absolute top-[-20px] right-0 p-1 w-16 flex justify-center -mt-2 -mr-3 text-xs scale-0 rounded-lg text-slate-200 opacity-0 bg-slate-600/70 transition-all duration-150 lg:group-hover:scale-100 group-hover:opacity-100">
      {title}
    </span>
  );
}

export default HoverInfo;
