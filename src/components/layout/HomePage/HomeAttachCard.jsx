import { DateFormatter } from "../../../utils/formatter";
import { ChatBubbleIcon, HeartIcon, LockClosedIcon, LoopIcon, RocketIcon } from "@radix-ui/react-icons";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

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

function HomeAttachCard() {
  const date = DateFormatter(data);

  // const onClickHandler = () => {
  //   dispatch(modalActions.openModal({ name: "pinnedModal", data: data.attachedFilm }));
  //   setBookmarked(!bookmarked);
  // };

  return (
    <div className="flex flex-col w-[1/3] opacity-40 scale-90">
      <motion.div
        className="flex flex-col w-full p-4 mb-4 bg-slate-900 rounded-xl"
        initial={{ opacity: 0, y: -20, transition: { duration: 2 } }}
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
              <Link
                to={"/user/Mustafa"}
                className="transition-all duration-300 text-md hover:underline hover:text-fuchsia-600 text-slate-200 w-fit"
              >
                @{data.nick}
              </Link>
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
          <p className={"py-4 select-none text-slate-200 cursor-pointer duration-150 transition-all blur-sm"} onClick={handleSpoiler}>
            {data.text || data.content}
          </p>
        )}
        {!data.spoiler && <p className="py-4 select-none text-slate-200">{data.text || data.content}</p>}
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
        <div className="flex gap-2">
          <button className="flex gap-1 cursor-default group">
            <p className="transition-all text-slate-400">6</p>
            <p className="transition-all text-slate-400">likes</p>
          </button>
          <button className="flex gap-1 cursor-default group">
            <p className="transition-all text-slate-400">2</p>
            <p className="transition-all text-slate-400">comments</p>
          </button>
          <button className="flex gap-1 cursor-default group">
            <p className="transition-all text-slate-400">1</p>
            <p className="transition-all text-slate-400">reposts</p>
          </button>
        </div>
        <div className="flex justify-around mt-4">
          <button className="flex items-center gap-2 cursor-default">
            <HeartIcon className="w-6 h-5 transition-all text-slate-400" />
            <p className="hidden transition-all md:block text-md text-slate-400">Like</p>
          </button>
          <button className="flex items-center gap-2 cursor-default">
            <ChatBubbleIcon className="w-5 h-5 text-slate-400" />
            <p className="hidden text-md md:block text-slate-400">Reply</p>
          </button>
          <button className="flex items-center gap-2 cursor-default">
            <LoopIcon className="w-6 h-5 transition-all text-slate-400" />
            <p className="hidden transition-all md:block text-md text-slate-400 ">Repost</p>
          </button>
          <button className="flex items-center gap-2 cursor-default">
            <RocketIcon className="w-5 h-5 text-slate-400" />
            <p className="hidden text-md md:block text-slate-400">Share</p>
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default HomeAttachCard;
