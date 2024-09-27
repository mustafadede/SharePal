import React, { useEffect, useState } from "react";
import FeedCard from "../../common/FeedCard";
import { getPreviousPosts, getInitialPosts } from "../../../firebase/firebaseActions";
import { postsActions } from "../../../store/postsSlice";
import { useDispatch, useSelector } from "react-redux";
import throttle from "lodash/throttle";
import { useTranslation } from "react-i18next";

function Feeds({ tab }) {
  const { t } = useTranslation();

  const { posts, status } = useSelector((state) => state.posts);
  const { post } = useSelector((state) => state.createPost);
  const dispatch = useDispatch();

  const [allPostsLoaded, setAllPostsLoaded] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  const [lastPostDate, setLastPostDate] = useState(null);

  useEffect(() => {
    const getData = async () => {
      dispatch(postsActions.updateStatus("loading"));
      const response = await getInitialPosts();
      if (response.length > 0) {
        const newLastPostDate = response[0].date;
        setLastPostDate(newLastPostDate);
        dispatch(postsActions.updatePosts(response));
      }
      dispatch(postsActions.updateStatus("done"));
    };
    getData();
  }, [tab, post]);

  const handleScroll = throttle(() => {
    if (loadMore || status !== "done") return;

    const isBottom = window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 100;

    if (isBottom) {
      setLoadMore(true);

      const getData = async () => {
        const response = await getPreviousPosts(lastPostDate);
        if (response.length > 0) {
          const newLastPostDate = response[0].date;
          setLastPostDate(newLastPostDate);
          const reversedResponse = response.reverse();
          dispatch(postsActions.addMorePosts(reversedResponse));
          dispatch(postsActions.updateStatus("done"));
        }
        if (response.length < 5) {
          setAllPostsLoaded(true);
        }
        setLoadMore(false);
      };
      getData();
    }
  }, 300); // 300ms throttling

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastPostDate, posts]);

  return (
    <>
      {tab === 0 &&
        status === "done" &&
        posts.map((data) => {
          if (data.attachedFilm) {
            return <FeedCard key={data.postId} isAttached={true} data={data} />;
          } else if (data.spoiler) {
            return <FeedCard key={data.postId} isSpoiler={true} data={data} />;
          } else if (data.actionName && localStorage.getItem("user") === data.userId) {
            return <FeedCard key={data.postId} isAction={true} data={data} />;
          } else if (!data.actionName && !data.attachedFilm && !data.spoiler) {
            return <FeedCard key={data.postId} isComment={true} data={data} />;
          }
          return null;
        })}
      {loadMore && status === "done" && (
        <div className="flex items-center justify-center">
          <div className="px-4 py-2 mb-4 rounded-lg text-slate-400">{t("info.loading")}</div>
        </div>
      )}
      {allPostsLoaded && status === "done" && (
        <div className="flex items-center justify-center">
          <div className="px-4 py-2 mb-4 rounded-lg text-slate-400">{t("feed.end")}</div>
        </div>
      )}
    </>
  );
}

export default Feeds;
