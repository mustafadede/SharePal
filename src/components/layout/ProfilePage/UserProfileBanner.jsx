import React from "react";
import { motion } from "framer-motion";

function UserProfileBanner({ user = { nick: "Loading...", quote: "Loading...", banner: "" } }) {
  const photo = user?.photoURL;

  return (
    <motion.div
      className="relative w-full h-64 overflow-hidden rounded-2xl bg-slate-900"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      {/*  Banner start */}
      <motion.img className="absolute object-cover w-full opacity-40 rounded-2xl" src={user?.banner}></motion.img>
      {/*  Banner end */}
      <div className="relative flex items-center w-auto h-full gap-4 left-10">
        {/*  Profile picture start */}
        {!photo && <motion.div className="w-40 h-40 rounded-full bg-fuchsia-600"></motion.div>}
        {photo && (
          <motion.img
            className="object-cover w-40 h-40 rounded-full bg-fuchsia-600"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            src={photo}
          ></motion.img>
        )}
        {/*  Profile picture end */}
        {/*  Name, Quote start */}
        <div>
          {/*  Name section start */}
          <motion.h1
            className="text-4xl text-white"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {user?.nick || "Loading..."}
          </motion.h1>
          {/*  Name section end */}
          {/* Quote section start */}
          <motion.p
            className="relative text-lg italic font-semibold lg:w-96 xl:w-[40rem] text-slate-400 top-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <svg
              className="w-8 h-8 absolute text-slate-600 mb-4 right-0 top-[-7px] transform opacity-40 -translate-y-2/4 -translate-x-2/4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 18 14"
            >
              <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z" />
            </svg>
            {user?.quote}
          </motion.p>
          {/*  Quote section end */}
        </div>
      </div>
      {/*  Name, Quote end */}
      {/*  Edit button start */}

      {/*  Edit button end */}
    </motion.div>
  );
}

export default UserProfileBanner;
