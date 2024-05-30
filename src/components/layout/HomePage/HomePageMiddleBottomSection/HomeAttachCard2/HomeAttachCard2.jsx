import { ChatBubbleIcon, HeartIcon, LockClosedIcon, LoopIcon, RocketIcon } from "@radix-ui/react-icons";
import { motion } from "framer-motion";
import { DateFormatter } from "../../../../../utils/formatter";
import { useTranslation } from "react-i18next";

const data = {
  attachedFilm: {
    backdrop: "/abwxHfymXGAbbH3lo9PDEJEfvtW.jpg",
    id: 1894,
    mediaType: "movie",
    poster: "/oZNPzxqM2s5DyVWab09NTQScDQt.jpg",
    releaseDate: "2002-05-15",
    title: "Star Wars: Episode II - Attack of the Clones",
  },
  comments: 0,
  content:
    "Dün akşam ikinci filmi izledim. Birinci filme göre daha akıcıydı bence. Anakin'in tripleri biraz beni sinir etti ama birazcık sanki haklı ? Bilemedim... Yoda çok iyi karakter😄",
  date: 1716573924168,
  edited: true,
  likes: 1,
  likesList: [
    {
      id: "QzsaB0PheOfjGYexmdzK3dYtkMl2",
      nick: "Bleagle13",
    },
  ],
  nick: "Mustafa",
  photoURL:
    "https://firebasestorage.googleapis.com/v0/b/sharepal-5d528.appspot.com/o/profilePhotos%2F3wbvLT6UkNSy2E3pYBtSfHwjUu82?alt=media&token=80111a1b-802d-4cd8-9848-4a345815fa55",
  repost: 2,
  repostsList: [
    {
      id: "QzsaB0PheOfjGYexmdzK3dYtkMl2",
      nick: "Bleagle13",
    },
    {
      id: "V6TG3dhBIzYRIFCCdBPr03Lz9Nb2",
      nick: "Tesy",
    },
  ],
  spoiler: true,
  userId: "3wbvLT6UkNSy2E3pYBtSfHwjUu82",
};

function HomeAttachCard2() {
  const { t } = useTranslation();
  const date = DateFormatter(data);

  return (
    <div className="flex flex-col select-none lg:scale-95 w-ful opacity-95">
      <motion.div
        className="flex flex-col w-full p-4 bg-slate-900 rounded-xl"
        initial={{ opacity: 0, y: -20, transition: { duration: 3 } }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex justify-between w-full">
          <div className="flex gap-4">
            {data.photoURL && (
              <div className="relative w-12 h-12">
                <img className="object-cover w-12 h-12 rounded-full bg-fuchsia-600" loading="lazy" src={data.photoURL}></img>
              </div>
            )}
            <div className="flex flex-col">
              <p className="transition-all duration-300 text-md text-slate-200 w-fit">@{data.nick}</p>
              <p className="text-xs text-slate-400">{date}</p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-2">
            {data.spoiler && (
              <div className="flex gap-2">
                <LockClosedIcon className="w-4 h-4 text-slate-200" />
                <p className="text-sm text-slate-400">Spoiler!</p>
              </div>
            )}
          </div>
        </div>
        {data.spoiler && (
          <p className={"py-4 text-slate-200 duration-150 transition-all  blur-sm select-none"}>{data.text || data.content}</p>
        )}
        {!data.spoiler && <p className="py-4 text-slate-200">{data.text || data.content}</p>}
        <button className="flex items-center justify-between w-full gap-4 p-2 border cursor-default rounded-2xl border-slate-700 group">
          <div className="flex items-center gap-4">
            <img
              src={`https://image.tmdb.org/t/p/w500/${data.attachedFilm.poster}`}
              className="object-cover rounded-full w-14 h-14 grayscale"
              loading="lazy"
            ></img>
            <div className="flex items-center justify-center gap-1">
              <p className="transition-all duration-700 text-slate-400 group-hover:text-slate-200">{data.attachedFilm.title}</p>
              <p className="transition-all duration-700 text-slate-400 group-hover:text-slate-200">
                ({data.attachedFilm.releaseDate.slice(0, 4)})
              </p>
            </div>
          </div>
          {/* <button onClick={onClickHandler}>
          {!bookmarked ? (
            <BookmarkIcon className="w-6 h-6 transition-all duration-700 text-slate-400 group-hover:text-slate-200" />
          ) : (
            <BookmarkFilledIcon className="w-6 h-6 transition-all duration-700 text-fuchsia-600" />
          )}
        </button> */}
        </button>
        <div className="flex gap-2 mt-1">
          <button className="flex gap-1 cursor-default group">
            <p className="transition-all text-slate-400">9</p>
            <p className="transition-all text-slate-400">{t("feedPost.likes")}</p>
          </button>
          <button className="flex gap-1 cursor-default group">
            <p className="transition-all text-slate-400">4</p>
            <p className="transition-all text-slate-400">{t("feedPost.comments")}</p>
          </button>
          <button className="flex gap-1 cursor-default group">
            <p className="transition-all text-slate-400">2</p>
            <p className="transition-all text-slate-400">Reposts</p>
          </button>
        </div>
        <div className="flex justify-around mt-3">
          <button className="flex items-center gap-2 cursor-default">
            <HeartIcon className="w-6 h-5 transition-all text-slate-400" />
            <p className="hidden transition-all md:block text-md text-slate-400">{t("feedCard.like")}</p>
          </button>
          <button className="flex items-center gap-2 cursor-default">
            <ChatBubbleIcon className="w-5 h-5 text-slate-400" />
            <p className="hidden text-md md:block text-slate-400">{t("feedCard.reply")}</p>
          </button>
          <button className="flex items-center gap-2 cursor-default">
            <LoopIcon className="w-6 h-5 transition-all text-slate-400" />
            <p className="hidden transition-all md:block text-md text-slate-400 ">Repost</p>
          </button>
          <button className="flex items-center gap-2 cursor-default">
            <RocketIcon className="w-5 h-5 text-slate-400" />
            <p className="hidden text-md md:block text-slate-400">{t("feedCard.share")}</p>
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default HomeAttachCard2;
