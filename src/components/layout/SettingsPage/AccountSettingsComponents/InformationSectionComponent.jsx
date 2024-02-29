import React from "react";

function InformationSectionComponent({ user, setNick, setEmail, setQuote, setTopOne }) {
  return (
    <>
      <p className="w-full my-2 text-xl text-slate-300">Information</p>
      <input
        className="w-full px-4 py-3 my-2 text-xl transition-colors bg-slate-800 text-cWhite focus:outline-none focus:bg-opacity-40 rounded-2xl"
        placeholder={`Your nickname (${user?.nick})`}
        onChange={(e) => {
          setNick(e.target.value);
        }}
      />
      <input
        className="w-full px-4 py-3 my-2 text-xl transition-colors bg-slate-800 text-cWhite focus:outline-none focus:bg-opacity-40 rounded-2xl"
        placeholder={`Email (${user?.email})`}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <input
        className="w-full px-4 py-3 my-2 text-xl transition-colors bg-slate-800 text-cWhite focus:outline-none focus:bg-opacity-40 rounded-2xl"
        placeholder={`Quote (${user?.quote})`}
        onChange={(e) => {
          setQuote(e.target.value);
        }}
      />
      <input
        className="w-full px-4 py-3 my-2 text-xl transition-colors bg-slate-800 text-cWhite focus:outline-none focus:bg-opacity-40 rounded-2xl"
        placeholder={`Favorite in all time (${user?.topOne})`}
        onChange={(e) => {
          setTopOne(e.target.value);
        }}
      />
    </>
  );
}

export default InformationSectionComponent;
