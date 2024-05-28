import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import DummyListModalCard from "../DummyListModalCard/DummyListModalCard";

const data = [
  {
    backdrop: "/iIvQnZyzgx9TkbrOgcXx0p7aLiq.jpg",
    id: "x4bvnc9ov",
    poster: "/kdPMUMJzyYAc4roD52qavX0nLIC.jpg",
    releaseDate: "2023-07-26",
    title: "Talk to Me",
  },
  {
    backdrop: "/AvSeU3ji59QLN2tfWXzVqI6hg8x.jpg",
    id: "x4bvnc9ov",
    poster: "/pYwZdnXVnVxAr7dx4MEK7tTK9gI.jpg",
    releaseDate: "2023-05-31",
    title: "The Boogeyman",
  },
  {
    backdrop: "/xndolqiw6jMhDDkkw1UPuD1xfrT.jpg",
    id: "x4bvnc9ov",
    poster: "/4iroJUn8YuQBekDwGy7r61YHXiu.jpg",
    releaseDate: "2020-11-25",
    title: "Folklore: The Long Pond Studio Sessions",
  },
];

function FirstSection() {
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.8,
        delayChildren: 1.2,
        staggerChildren: 1.2,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
  };
  const variant = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 0.5,
      transition: {
        duration: 0.5,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const { t } = useTranslation();
  return (
    <div className="flex flex-col-reverse gap-4 lg:flex-row h-fit">
      <motion.div
        className="flex flex-col justify-center w-full h-auto gap-4 px-6 py-4 lg:py-0 lg:w-1/2 bg-slate-900 rounded-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <h1 className="text-4xl font-bold text-slate-300">{t("tab.firstTitle")}</h1>
        <p className="text-lg text-slate-500">{t("tab.firstText")}</p>
      </motion.div>
      <motion.div
        className="container flex-col w-full px-2 pt-2 lg:w-1/2 lg:flex h-fit bg-slate-600/20 rounded-2xl"
        variants={container}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {data.map((item, index) => (
          <DummyListModalCard key={index} {...item} additionalClassName={variant} listNumber={index + 1} />
        ))}
      </motion.div>
    </div>
  );
}

export default FirstSection;
