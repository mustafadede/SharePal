import React from "react";
import { useTranslation } from "react-i18next";
import SearchCardButton from "../SearchPage/SearchCardButton";
import { BookmarkFilledIcon, BookmarkIcon, EyeOpenIcon, Link2Icon, PauseIcon, PlusIcon } from "@radix-ui/react-icons";
import { motion } from "framer-motion";

function SearchCardModalAsset() {
  const { t, i18n } = useTranslation();

  return (
    <div className="bg-slate-900 z-20 scale-[0.4] md:scale-50 lg:scale-100 shadow-md w-[50rem] h-[37rem] rounded-2xl relative overflow-hidden select-none no-scrollbar">
      <div className="absolute top-0 z-20 w-full p-6">
        <div className="flex items-center justify-between w-full">
          <div className="flex justify-center gap-1">
            <h1 className="text-2xl text-slate-200">{t("searchCard.title")}</h1>
          </div>
        </div>
      </div>
      <div className="relative flex flex-row-reverse w-full h-[21rem]">
        <motion.div
          className="absolute left-auto z-10 w-48 h-full top-12 md:w-52 right-20 drop-shadow-2xl"
          initial={{ y: 0, opacity: 0 }}
          animate={{ y: -5, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <img
            src={`https://image.tmdb.org/t/p/w500//dMOpdkrDC5dQxqNydgKxXjBKyAc.jpg`}
            className="w-full transition-all duration-300 border drop-shadow-xl rounded-xl border-slate-400"
            alt="poster"
            loading="lazy"
          />
        </motion.div>
        <div className="absolute top-0 right-0 w-full h-full overflow-hidden brightness-75 blur-md rounded-tr-2xl">
          <img
            src={`https://image.tmdb.org/t/p/w500//dMOpdkrDC5dQxqNydgKxXjBKyAc.jpg`}
            loading="lazy"
            className="object-cover w-full h-full scale-y-150 opacity-40"
            alt="background"
          />
        </div>
        <div className="absolute top-0 left-0 flex flex-col justify-center w-2/3 h-full p-6 text-left">
          <h1 className="mt-4 mb-3 text-2xl lg:text-4xl text-fuchsia-600">INVINCIBLE</h1>
          <h2 className="mb-2 text-2xl text-slate-300">2021</h2>
          <h3 className="px-3 text-xl border rounded-md w-fit border-slate-300 text-slate-300">TV</h3>
          <div className="relative flex flex-wrap items-center gap-2 top-4">
            {[t("home.animation"), t("home.scifi"), t("home.action"), t("home.drama")].map((item, i) => (
              <p key={i} className="px-3 py-2 text-sm border rounded-lg 2xl:text-md border-slate-300 text-slate-300">
                {item}
              </p>
            ))}
          </div>
        </div>
      </div>
      <div className="relative flex justify-start gap-2 px-6 py-4 text-left top-6">
        <div className="flex flex-row gap-4">
          <div className="w-full min-w-[28rem] max-w-[30rem]">
            <h2 className="mb-2 text-3xl text-slate-200">{t("searchCard.actions")}</h2>
            <div className="flex flex-col justify-start mb-0">
              <div className="flex flex-wrap justify-start gap-2">
                <SearchCardButton
                  title={t("searchCard.watchlist")}
                  icon={<PlusIcon className="w-6 h-6 transition-all text-slate-400" />}
                  clickHandler={false}
                  home={true}
                />
                <SearchCardButton
                  title={t("searchCard.attach")}
                  icon={<Link2Icon className="w-6 h-6 transition-all text-slate-400" />}
                  clickHandler={false}
                  home={true}
                />
                <SearchCardButton
                  title={t("searchCard.wantToWatch")}
                  icon={<BookmarkIcon className={"w-6 h-6 transition-all text-slate-400"} />}
                  clickHandler={false}
                  home={true}
                />
                <SearchCardButton
                  title={t("searchCard.watched")}
                  icon={<BookmarkFilledIcon className={"w-6 h-6 transition-all text-slate-400"} />}
                  clickHandler={false}
                  home={true}
                />
                <SearchCardButton
                  title={t("searchCard.unfinished")}
                  icon={<PauseIcon className={"w-6 h-6 transition-all text-slate-400"} />}
                  clickHandler={false}
                  home={true}
                />
                <SearchCardButton
                  title={t("searchCard.currentlyWatching")}
                  icon={<EyeOpenIcon className="w-6 h-6 transition-all text-slate-400" />}
                  clickHandler={false}
                  home={true}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start gap-4">
            <div>
              <h3 className="pb-1 mt-0 overflow-hidden text-xl h-fit text-slate-200">{t("wantToWatch.noUserWantToWatch")}</h3>

              <div className="flex flex-wrap justify-start gap-2 mt-0 mb-0">
                <p className="text-slate-600">{i18n.language === "en" ? t("wantToWatch.info") + " TV Show" : t("wantToWatch.info")}</p>
              </div>
            </div>
            <div>
              <h3 className="pb-1 mt-0 overflow-hidden text-xl h-fit text-slate-200">{t("watched.noUserWatched")}</h3>
              <div className="flex flex-wrap justify-start gap-2 mt-0 mb-0 yt-2">
                <p className="text-slate-600">{i18n.language === "en" ? t("wantToWatch.info") + " TV Show" : t("wantToWatch.info")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchCardModalAsset;
