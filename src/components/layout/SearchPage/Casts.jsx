import React from "react";

function Casts({ data }) {
  return (
    <div className="w-full h-full">
      {data.profile_path ? (
        <img
          src={`https://image.tmdb.org/t/p/w500${data.profile_path}`}
          className="object-cover w-full h-48 transition-all duration-150 border border-transparent hover:shadow-inner hover:border-fuchsia-600 rounded-xl"
          alt="images"
          loading="lazy"
        />
      ) : (
        <div className="w-full h-48 bg-slate-950 rounded-xl"></div>
      )}
      <h3 className="mt-2 text-lg text-center text-slate-400">{data.character}</h3>
      <h3 className="text-lg text-center text-slate-600">{data.name}</h3>
    </div>
  );
}

export default Casts;
