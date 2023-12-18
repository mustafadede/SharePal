import React from "react";

function ChangePasswordComponent() {
  return (
    <>
      <p className="my-2 text-xl text-slate-300">Password</p>
      <input
        className="px-4 py-3 my-2 text-xl transition-colors bg-slate-800 text-cWhite focus:outline-none focus:bg-opacity-40 rounded-2xl"
        placeholder="Cuurent Password"
      />
      <input
        className="px-4 py-3 my-2 text-xl transition-colors bg-slate-800 text-cWhite focus:outline-none focus:bg-opacity-40 rounded-2xl"
        placeholder="Your New Password"
      />
      <input
        className="px-4 py-3 my-2 text-xl transition-colors bg-slate-800 text-cWhite focus:outline-none focus:bg-opacity-40 rounded-2xl"
        placeholder="Confirm New Password"
      />
    </>
  );
}

export default ChangePasswordComponent;
