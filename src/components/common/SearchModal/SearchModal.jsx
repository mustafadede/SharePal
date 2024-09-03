import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
function SearchModal() {
  const { t } = useTranslation();
  const [search, setSearch] = useState("");
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  return (
    <div className="p-[2px] w-80 md:w-[45rem] h-[35rem] md:h-[30rem] border border-slate-400/20 bg-slate-900 rounded-2xl overflow-hidden">
      <div className="w-full h-full p-3 outline-none rounded-xl">
        <motion.input
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            ease: "easeIn",
            delay: 0.4,
            duration: 0.2,
          }}
          className="w-full px-4 py-3 text-2xl text-white transition-all outline-none bg-slate-800 rounded-xl"
          type="text"
          autoFocus
          placeholder={t("search.placeholder")}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => handleSearch(e)}
        />
        <div className="w-full h-[87%] mt-2 gap-2 flex rounded-xl">
          <div className="w-1/3 h-full p-2 overflow-y-auto bg-slate-950/40 rounded-xl"></div>
          <div className="w-2/3 h-full p-2 overflow-y-auto rounded-xl"></div>
        </div>
      </div>
    </div>
  );
}

export default SearchModal;
