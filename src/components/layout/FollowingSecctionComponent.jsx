import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSelectedUserPosts } from "../../firebase/firebaseActions";
import FeedCard from "../common/FeedCard";
import { postsActions } from "../../store/postsSlice";

function FollowingSecctionComponent({ tab }) {
  const { followingList } = useSelector((state) => state.following);
  const { posts, status } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(postsActions.updateStatus("loading"));
    dispatch(postsActions.resetPosts());
    followingList.map((item) => {
      getSelectedUserPosts(item.uid).then((res) => {
        console.log(res);
        res.map((post) => {
          dispatch(postsActions.pushPosts(post));
        });
      });
    });
    dispatch(postsActions.updateStatus("done"));
  }, [tab]);

  return (
    <>
      {status === "done" ? (
        posts
          .map((data, index) => {
            if (data.attachedFilm) {
              return <FeedCard key={index} isAttached={true} data={data} index={index} />;
            } else if (data.spoiler) {
              return <FeedCard key={index} isSpoiler={true} data={data} index={index} />;
            } else if (data.actionName) {
              return <FeedCard key={index} isAction={true} data={data} index={index} />;
            } else if (!data.actionName && !data.attachedFilm && !data.spoiler) {
              return <FeedCard key={index} isComment={true} data={data} index={index} />;
            }
          })
          .reverse()
      ) : status === "loading" ? (
        <p className="w-full mt-1 text-xl text-center text-slate-400">Loading...</p>
      ) : (
        <p className="w-full mt-1 text-xl text-center text-slate-400">You don't follow anyone</p>
      )}
    </>
  );
}

export default FollowingSecctionComponent;
