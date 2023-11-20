import React from "react";
import { motion } from "framer-motion";
import Socials from "./ProfileBannerSocials/Socials";

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
      {user?.banner && (
        <motion.img className="absolute object-cover w-full h-full opacity-40 rounded-2xl" loading="lazy" src={user.banner}></motion.img>
      )}
      {/*  Banner end */}
      <div className="relative flex items-center justify-center w-auto h-full gap-10 md:gap-4 xl:left-10">
        {/*  Profile picture start */}
        {!photo && <motion.div className="w-24 h-24 rounded-full md:w-40 md:h-40 bg-fuchsia-600"></motion.div>}
        {photo && (
          <motion.img
            className="object-cover w-24 h-24 rounded-full md:w-40 md:h-40 bg-fuchsia-600"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            src={photo}
            loading="lazy"
          ></motion.img>
        )}
        {/*  Profile picture end */}
        {/*  Name, Quote start */}
        <div>
          {/*  Name section start */}
          <motion.h1
            className="text-2xl text-white md:text-4xl"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {user?.nick || "Loading..."}
          </motion.h1>
          {/*  Name section end */}
          {/* Quote section start */}
          <motion.p
            className="relative text-sm md:text-lg italic font-semibold w-32 lg:w-96 xl:w-[40rem] text-slate-400 top-2"
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
      {/*  Social media start */}
      <Socials user={user} hasUser={true} />
      {/*  Social media end */}
    </motion.div>
  );
}

export default UserProfileBanner;
