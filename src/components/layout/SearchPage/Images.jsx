import React from "react";

function Images({ path }) {
  return (
    <div className="w-full h-full">
      <img
        src={`https://image.tmdb.org/t/p/w500${path.file_path}`}
        className="w-full h-full transition-all duration-150 border border-transparent hover:border-fuchsia-600 rounded-xl"
        alt="images"
      />
    </div>
  );
}

export default Images;
