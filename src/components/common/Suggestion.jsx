import React from "react";

function Suggestion({ title, suggestion1, suggestion2, suggestion3, handleSuggestion }) {
  return (
    <>
      {/** Suggestion section start */}
      <div className="flex flex-col gap-0 py-2 md:flex-row md:gap-2">
        <p className="text-center md:text-left text-md text-slate-300">{title} suggestion:</p>
        <div className="flex flex-row flex-wrap justify-center gap-2">
          <button
            className="text-left underline transition-all rounded-lg hover:border-fuchsia-600 text-slate-300 hover:text-fuchsia-600"
            onClick={() => handleSuggestion(suggestion1)}
          >
            {suggestion1}
          </button>
          <button
            className="text-left underline transition-all rounded-lg hover:border-fuchsia-600 text-slate-300 hover:text-fuchsia-600"
            onClick={() => handleSuggestion(suggestion2)}
          >
            {suggestion2}
          </button>
          <button
            className="text-left underline transition-all rounded-lg hover:border-fuchsia-600 text-slate-300 hover:text-fuchsia-600"
            onClick={() => handleSuggestion(suggestion3)}
          >
            {suggestion3}
          </button>
        </div>
      </div>
      {/** Suggestion section end */}
    </>
  );
}

export default Suggestion;
