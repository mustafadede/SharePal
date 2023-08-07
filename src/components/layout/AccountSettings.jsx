import React from "react";
import { motion } from "framer-motion";
function AccountSettings({ user }) {
  return (
    <motion.div
      className="flex flex-col w-full h-full px-5 py-4 ml-4 bg-slate-900 rounded-2xl"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <h1 className="mb-4 text-3xl text-slate-200">Account</h1>
      <div className="flex flex-col gap-2">
        <p className="w-full my-2 text-xl text-slate-300">Information</p>
        <input
          className="w-full px-4 py-3 my-2 text-xl transition-colors bg-slate-800 text-cWhite focus:outline-none focus:bg-opacity-40 rounded-2xl"
          placeholder={`Your nickname (${user.nick})`}
        />
        <input
          className="w-full px-4 py-3 my-2 text-xl transition-colors bg-slate-800 text-cWhite focus:outline-none focus:bg-opacity-40 rounded-2xl"
          placeholder="Email"
        />
        <input
          className="w-full px-4 py-3 my-2 text-xl transition-colors bg-slate-800 text-cWhite focus:outline-none focus:bg-opacity-40 rounded-2xl"
          placeholder="Quote"
        />
        <p className="w-full my-2 text-xl text-slate-300">Pictures</p>
        <div className="flex flex-row justify-center gap-10">
          <div className="flex flex-row gap-4 rounded-2xl">
            <div className="flex flex-col gap-2">
              <p className="text-xl text-slate-300">Profile Picture</p>
              <button className="px-4 py-3 text-lg transition-all hover:bg-slate-800 hover:text-fuchsia-600 bg-cGradient2 text-cWhite focus:outline-none rounded-2xl">
                Upload
              </button>
            </div>
          </div>
          <div className="flex flex-row gap-4 rounded-2xl">
            <div className="flex flex-col gap-2">
              <p className="text-xl text-slate-300">Banner Picture</p>
              <button className="px-4 py-3 text-lg transition-all hover:bg-slate-800 hover:text-fuchsia-600 bg-cGradient2 text-cWhite focus:outline-none rounded-2xl">
                Upload
              </button>
            </div>
          </div>
        </div>
        <p className="my-2 text-xl text-slate-300">Password</p>
        <input
          className="px-4 py-3 my-2 text-xl transition-colors bg-slate-800 text-cWhite focus:outline-none focus:bg-opacity-40 rounded-2xl"
          placeholder="Password"
        />
        <input
          className="px-4 py-3 my-2 text-xl transition-colors bg-slate-800 text-cWhite focus:outline-none focus:bg-opacity-40 rounded-2xl"
          placeholder="Current Password"
        />
        <button className="w-full px-4 py-3 my-2 text-xl transition-all hover:bg-slate-800 hover:text-fuchsia-600 bg-cGradient2 text-cWhite focus:outline-none rounded-2xl">
          Save
        </button>
      </div>
    </motion.div>
  );
}

export default AccountSettings;
