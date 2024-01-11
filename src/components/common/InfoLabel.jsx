import React from "react";

function InfoLabel({ text, additionalClasses = "" }) {
  return (
    <p
      className={
        additionalClasses
          ? "w-full p-4 mt-1 text-xl text-center text-slate-400 bg-slate-900 rounded-2xl h-fit" + additionalClasses
          : "w-full p-4 mt-1 mb-2 text-xl text-center text-slate-400 bg-slate-900 rounded-2xl h-fit"
      }
    >
      {text}
    </p>
  );
}

export default InfoLabel;
