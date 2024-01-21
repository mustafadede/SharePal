import { useSelector } from "react-redux";
import { DateFormatter } from "../../../utils/formatter";
import FeedCardOnlineStatus from "../../common/FeedCardOnlineStatus";
import { ChatBubbleIcon, HeartIcon, LockClosedIcon, LoopIcon, RocketIcon } from "@radix-ui/react-icons";
import { motion } from "framer-motion";

function HomeAttachCard({ data, attachedData, notification }) {
  const user = useSelector((state) => state.user.user?.nick);

  const date = DateFormatter(data);

  // const onClickHandler = () => {
  //   dispatch(modalActions.openModal({ name: "pinnedModal", data: data.attachedFilm }));
  //   setBookmarked(!bookmarked);
  // };

  return (
    <div className="flex flex-col w-full select-none">
      <motion.div
        className="flex flex-col w-full p-4 mb-4 bg-slate-900 rounded-xl"
        initial={{ opacity: 0, y: -20, transition: { duration: 2 } }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex justify-between w-full">
          <div className="flex gap-4">
            {!data.photoURL && (
              <div className="relative w-12 h-12">
                <img className="object-cover w-12 h-12 rounded-full bg-fuchsia-600" loading="lazy" src={data.photoURL}></img>
                <FeedCardOnlineStatus username={!notification && data.nick === user ? false : true} data={data} />
              </div>
            )}
            {data.photoURL && (
              <div className="relative w-12 h-12">
                <img className="object-cover w-12 h-12 rounded-full bg-fuchsia-600" loading="lazy" src={data.photoURL}></img>
                <FeedCardOnlineStatus username={!notification && data.nick === user ? false : true} data={data} />
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
          <p className={"py-4 text-slate-200 cursor-pointer duration-150 transition-all  blur-sm select-none"} onClick={handleSpoiler}>
            {data.text || data.content}
          </p>
        )}
        {!data.spoiler && <p className="py-4 text-slate-200">{data.text || data.content}</p>}
        <button className="flex items-center cursor-default justify-between w-full gap-4 p-2 border rounded-2xl border-slate-700 group">
          <div className="flex items-center gap-4">
            <img
              src={`https://image.tmdb.org/t/p/w500/${attachedData?.poster || data.attachedFilm.poster}`}
              className="object-cover rounded-full w-14 h-14 grayscale"
              loading="lazy"
            ></img>
            <div className="flex items-center justify-center gap-1">
              <p className="transition-all duration-700 text-slate-400 group-hover:text-slate-200">
                {attachedData?.title || data.attachedFilm.title}
              </p>
              <p className="transition-all duration-700 text-slate-400 group-hover:text-slate-200">
                ({attachedData?.releaseDate.slice(0, 4) || data.attachedFilm.releaseDate.slice(0, 4)})
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
        {!notification && (
          <div className="flex gap-2">
            <button className="flex gap-1 cursor-default group">
              <p className="transition-all text-slate-400">9</p>
              <p className="transition-all text-slate-400">likes</p>
            </button>
            <button className="flex gap-1 cursor-default group">
              <p className="transition-all text-slate-400">4</p>
              <p className="transition-all text-slate-400">comments</p>
            </button>
            <button className="flex gap-1 cursor-default group">
              <p className="transition-all text-slate-400">2</p>
              <p className="transition-all text-slate-400">reposts</p>
            </button>
          </div>
        )}
        <div className="flex justify-around mt-4">
          <button className="flex items-center cursor-default gap-2">
            <HeartIcon className="w-6 h-5 transition-all text-slate-400" />
            <p className="hidden transition-all md:block text-md text-slate-400">Like</p>
          </button>
          <button className="flex items-center cursor-default gap-2">
            <ChatBubbleIcon className="w-5 h-5 text-slate-400" />
            <p className="hidden text-md md:block text-slate-400">Reply</p>
          </button>
          <button className="flex items-center cursor-default gap-2">
            <LoopIcon className="w-6 h-5 transition-all text-slate-400" />
            <p className="hidden transition-all md:block text-md text-slate-400 ">Repost</p>
          </button>
          <button className="flex items-center cursor-default gap-2">
            <RocketIcon className="w-5 h-5 text-slate-400" />
            <p className="hidden text-md md:block text-slate-400">Share</p>
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default HomeAttachCard;
