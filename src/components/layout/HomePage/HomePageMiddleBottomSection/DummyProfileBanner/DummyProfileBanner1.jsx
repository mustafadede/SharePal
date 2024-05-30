import React from "react";
import { motion } from "framer-motion";

function DummyProfileBanner1({
  nick = "Mustafa",
  quote = "Think Mark, Think!",
  banner = "https://firebasestorage.googleapis.com/v0/b/sharepal-5d528.appspot.com/o/bannerPhotos%2F3wbvLT6UkNSy2E3pYBtSfHwjUu82?alt=media&token=21c768dd-9e66-4b45-a720-38e71b9481f2",
}) {
  const photo =
    "https://firebasestorage.googleapis.com/v0/b/sharepal-5d528.appspot.com/o/profilePhotos%2F3wbvLT6UkNSy2E3pYBtSfHwjUu82?alt=media&token=80111a1b-802d-4cd8-9848-4a345815fa55";
  return (
    <motion.div
      className="relative flex items-center w-full h-48 rounded-2xl"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.0 }}
    >
      {/*  Banner start */}
      <motion.img className="absolute object-cover w-full h-full opacity-20 rounded-2xl" loading="lazy" src={banner}></motion.img>
      {/*  Banner end */}
      <div className="relative flex items-center justify-center w-auto h-full gap-4 pl-12 opacity-80">
        {/*  Profile picture start */}
        <div className="w-24 h-24">
          <motion.img
            className="object-cover w-24 h-24 rounded-full opacity-90 bg-fuchsia-600"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            loading="lazy"
            src={photo}
          ></motion.img>
        </div>
        {/*  Profile picture end */}
        {/*  Name, Quote start */}
        <div>
          {/*  Name section start */}
          <motion.h1 className="text-2xl text-white opacity-80 md:text-4xl">{nick}</motion.h1>
          {/*  Name section end */}
          {/* Quote section start */}
          <motion.p className="w-full text-sm italic font-semibold opacity-60 md:text-lg text-slate-400 top-2">{quote}</motion.p>
          {/*  Quote section end */}
        </div>
      </div>
      {/*  Name, Quote end */}
    </motion.div>
  );
}

export default DummyProfileBanner1;
