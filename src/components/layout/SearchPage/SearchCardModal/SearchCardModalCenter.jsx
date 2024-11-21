import React, { useEffect, useState } from "react";
import SearchCardModalCenterTop from "./SearchCardModalCenterComponents/SearchCardModalCenterTop";
import SearchCardModalCenterMore from "./SearchCardModalCenterComponents/SearchCardModalCenterMore";
import { useTranslation } from "react-i18next";
import Tabs from "../../ProfilePage/Tabs";
import InfoLabel from "../../../common/InfoLabel";
import { getSelectedFilmComments } from "../../../../firebase/firebaseActions";
import FeedCard from "../../../common/FeedCard";
import { ChatBubbleIcon, ReaderIcon } from "@radix-ui/react-icons";
import { motion } from "framer-motion";

function SearchCardModalCenter({
  id,
  mediaType,
  releaseDate,
  vote,
  overview,
  trailerID,
  providers,
  watchlistHandler,
  attachHandler,
  currentlyWatchingHandler,
  bestMovieHandler,
  bestSeriesHandler,
  wantToWatchHandler,
  watchedHandler,
  unfinishedHandler,
  wantToWatch,
  watched,
  unfinished,
  clickAction1,
  clickAction2,
  clickAction3,
  images,
  credits,
}) {
  const { t } = useTranslation();
  const yearIndicator = new Date().getFullYear();
  const [seeMore, setSeeMore] = useState(false);
  const [tab, setTab] = useState(0);
  const [comments, setComments] = useState([]);
  const [status, setStatus] = useState("loading");
  const tabs = [
    {
      id: 0,
      name: t("searchCard.tab1"),
      icon: <ReaderIcon className="w-6 h-6" />,
    },
    {
      id: 1,
      name: t("searchCard.tab2"),
      icon: <ChatBubbleIcon className="w-6 h-6" />,
    },
  ];

  useEffect(() => {
    setStatus("loading");
    const fetchComments = async () => {
      getSelectedFilmComments(id)
        .then((res) => {
          setComments(res);
          setStatus("done");
        })
        .catch((err) => {
          console.log(err);
          setStatus("done");
        });
    };
    tab === 1 && fetchComments();
  }, [tab]);

  return (
    <>
      <div className="px-6 mt-12">
        <Tabs tabs={tabs} activeTab={tab} setActiveTab={setTab} additionalClasses={"border border-1 border-slate-400 text-slate-200"} />
      </div>
      {tab === 0 ? (
        <div>
          <SearchCardModalCenterTop
            mediaType={mediaType}
            releaseDate={releaseDate}
            watchlistHandler={watchlistHandler}
            attachHandler={attachHandler}
            currentlyWatchingHandler={currentlyWatchingHandler}
            bestMovieHandler={bestMovieHandler}
            bestSeriesHandler={bestSeriesHandler}
            wantToWatchHandler={wantToWatchHandler}
            unfinishedHandler={unfinishedHandler}
            watchedHandler={watchedHandler}
            wantToWatch={wantToWatch}
            watched={watched}
            unfinished={unfinished}
            clickAction1={clickAction1}
            clickAction2={clickAction2}
            clickAction3={clickAction3}
            yearIndicator={yearIndicator}
          />
          <div className="flex flex-col w-full px-6 pt-6 text-center md:flex-col md:text-left">
            {seeMore ? (
              <>
                <SearchCardModalCenterMore
                  overview={overview}
                  vote={vote}
                  providers={providers}
                  images={images}
                  trailerID={trailerID}
                  credits={credits}
                />
                <button
                  className="px-4 py-2 mt-4 text-lg transition-all duration-150 hover:bg-cGradient2/40 rounded-2xl text-slate-400 hover:text-slate-200"
                  onClick={() => setSeeMore(false)}
                >
                  {t("searchCard.seeLess")}
                </button>
              </>
            ) : (
              <button
                className="flex justify-center px-4 py-2 text-lg duration-150 text-slate-200 rounded-2xl bg-cGradient2/40 hover:bg-cGradient2/80"
                onClick={() => setSeeMore(true)}
              >
                {t("searchCard.seeMore")}
              </button>
            )}
          </div>
        </div>
      ) : (
        <>
          {status === "loading" && <InfoLabel text="Loading comments..." additionalClasses="mt-6" />}
          {status === "done" && comments?.length === 0 && (
            <div>
              <InfoLabel text="Nothing happening in here" additionalClasses="mt-6" />
            </div>
          )}
          {comments?.length > 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.5 }} className="px-4">
              {comments.map((comment) => (
                <FeedCard key={comment.postId} isAttached={true} data={comment} notification />
              ))}
            </motion.div>
          )}
        </>
      )}
    </>
  );
}

export default SearchCardModalCenter;
