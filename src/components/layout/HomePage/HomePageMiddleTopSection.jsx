import React from "react";
import { motion } from "framer-motion";
import HomeAttachCard from "./HomeAttachCard";

function HomePageMiddleTopSection() {
  const cardsList = {
    hidden: {
      y: 10,
      opacity: 0,
      transition: {
        when: "afterChildren",
      },
    },
    visible: {
      opacity: 1,
      y: 0,
      animationDuration: 1.9,
      transition: {
        staggerChildren: 0.5,
        when: "beforeChildren",
      },
    },
  };
  const cardInfoList = {
    hidden: {
      y: 10,
      opacity: 0,
      transition: {
        when: "afterChildren",
      },
    },
    visible: {
      opacity: 1,
      y: 0,
      animationDuration: 1.7,
      transition: {
        staggerChildren: 0.9,
      },
    },
  };
  const item = { hidden: { y: 10, opacity: 0 }, visible: { y: 0, opacity: 1 } };
  const data = {
    photoURL:
      "https://firebasestorage.googleapis.com/v0/b/sharepal-5d528.appspot.com/o/profilePhotos%2F3wbvLT6UkNSy2E3pYBtSfHwjUu82?alt=media&token=80111a1b-802d-4cd8-9848-4a345815fa55",
    postId: "-NoJI2zbKpRPpWUYwEsI",
    nick: "Mustafa",
    content: "Gerçekten çok farklı, güzel bir deneyimdi ve izlerken karışık duygulara kapıldım.",
    attachedFilm: {
      backdrop: "/rrfBenawPGhkt5yvb124NSZwnAC.jpg",
      poster: "/qjhahNLSZ705B5JP92YMEYPocPz.jpg",
      releaseDate: "2023-11-16",
      title: "Saltburn",
    },
    likes: 1,
    comments: 0,
    edited: false,
    repost: 0,
    repostsList: null,
    date: 1705442562467,
    userId: "1",
    attachedAction: null,
    actionName: null,
  };
  return (
    <motion.div initial="hidden" animate="visible" variants={cardsList} className="flex relative flex-col-reverse gap-4 mt-2 lg:flex-row">
      <motion.div variants={item} className="w-full h-96 rounded-3xl">
        <motion.div initial="hidden" animate="visible" variants={cardInfoList} className="flex flex-col items-center justify-center h-full">
          <motion.h1 variants={item} className="mb-4 z-10 text-4xl font-bold text-white lg:text-5xl">
            Welcome to SharePal!
          </motion.h1>
          <div className="w-1/2 absolute right-20 z-0 opacity-70 bottom-[-6rem]">
            <HomeAttachCard key={"1"} isAttached={true} data={data} index={"1"} display={true} />;
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default HomePageMiddleTopSection;
