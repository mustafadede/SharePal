import React from "react";

function FeedActionBoxButton({ icons, text, onClick }) {
  return (
    <button className="flex items-center h-12 px-4 transition-all rounded-lg w-100 hover:bg-slate-800">
      {icons}
      <span className=" hidden lg:block transition-all w-[8.5rem] h-fit text-md text-slate-200">{text}</span>
    </button>
  );
}

export default FeedActionBoxButton;
