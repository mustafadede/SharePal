import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import Slider from "../../common/Slider";
import ModalHeader from "../ModalSkeleton/ModalHeader";
import useGetAllCreditsForPeople from "../../../hooks/useGetAllCreditsForPeople";
import { useSelector } from "react-redux";

function PersonModal() {
  const { modalHasData } = useSelector((state) => state.modal);
  const { t } = useTranslation();
  const [credits, setCredits] = useState({ cast: [], crew: [] });
  const [isLoading, setIsLoading] = useState(true);
  const { id, name, profile_path, known_for } = modalHasData;

  useEffect(() => {
    const fetchCredits = async () => {
      setIsLoading(true);
      const data = await useGetAllCreditsForPeople(id);
      setCredits(data);
      setIsLoading(false);
    };
    fetchCredits();
  }, [id]);

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="bg-slate-900 w-96 h-[38rem] md:w-[45rem] lg:w-[50rem] md:h-[37rem] rounded-2xl relative overflow-hidden overflow-y-scroll no-scrollbar"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="z-20 w-full p-6" variants={itemVariants}>
        <ModalHeader title={name} />
      </motion.div>
      <div className="relative flex flex-row-reverse w-full h-full mb-10 md:h-48">
        <motion.div
          className="absolute z-10 w-48 h-full left-1/4 md:left-auto top-[-2rem] md:w-52 md:right-20 drop-shadow-2xl"
          initial={{ y: 0, opacity: 0 }}
          animate={{ y: -5, opacity: 1 }}
        >
          <img
            src={`https://image.tmdb.org/t/p/w500/${profile_path}`}
            className="w-full transition-all duration-300 border cursor-pointer drop-shadow-xl rounded-xl border-slate-400 hover:border-fuchsia-600"
            alt={name}
            loading="lazy"
          />
        </motion.div>
      </div>

      <motion.div className="p-6" variants={itemVariants}>
        <motion.h2 className="mb-4 text-2xl text-slate-200" variants={itemVariants}>
          {t("person.knownFor")}
        </motion.h2>
        <AnimatePresence>
          {known_for && known_for.length > 0 ? (
            <motion.div className="flex flex-wrap gap-2" variants={containerVariants}>
              {known_for.map((item, index) => (
                <motion.span
                  key={index}
                  className="px-3 py-1 rounded-full bg-slate-800 text-slate-400"
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, backgroundColor: "rgb(30 41 59)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.title || item.name}
                </motion.span>
              ))}
            </motion.div>
          ) : (
            <motion.p className="text-slate-400" variants={itemVariants}>
              {t("person.noKnownFor")}
            </motion.p>
          )}
        </AnimatePresence>

        {!isLoading && (credits.cast.length > 0 || credits.crew.length > 0) && (
          <motion.div className="mt-6 space-y-6" variants={itemVariants}>
            {credits.cast.length > 0 && (
              <div>
                <motion.h2 className="mb-4 text-2xl text-slate-200" variants={itemVariants}>
                  {t("person.actingRoles")}
                </motion.h2>
                <Slider
                  data={credits.cast.map((item) => ({
                    ...item,
                    uniqueKey: `cast_${item.id}_${item.credit_id}`,
                  }))}
                  dataClassName="credits"
                />
              </div>
            )}

            {credits.crew.length > 0 && (
              <div>
                <motion.h2 className="mb-4 text-2xl text-slate-200" variants={itemVariants}>
                  {t("person.crewRoles")}
                </motion.h2>
                <Slider
                  data={credits.crew.map((item) => ({
                    ...item,
                    uniqueKey: `crew_${item.id}_${item.credit_id}`,
                  }))}
                  dataClassName="credits"
                />
              </div>
            )}
          </motion.div>
        )}

        {isLoading && (
          <motion.div className="flex justify-center mt-6" variants={itemVariants}>
            <div className="w-8 h-8 border-4 rounded-full border-slate-600 border-t-slate-200 animate-spin" />
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}

export default PersonModal;
