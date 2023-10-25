import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSelectedUserPosts } from "../../firebase/firebaseActions";
import FeedCard from "../common/FeedCard";
import { postsActions } from "../../store/postsSlice";

function FollowingSecctionComponent() {
  const { followingList } = useSelector((state) => state.following);
  const { posts, status } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(postsActions.updateStatus("loading"));
    dispatch(postsActions.resetPosts());
    followingList.map((item) => {
      getSelectedUserPosts(item.uid).then((res) => {
        dispatch(postsActions.pushPosts(...res));
      });
    });
    dispatch(postsActions.updateStatus("done"));
  }, []);

  return (
    <>
      {status === "loading" && <p className="w-full mt-1 text-xl text-center text-slate-400">Loading...</p>}
      {status === "done" &&
        posts
          .map((data, index) => {
            if (data.attachedFilm) {
              return <FeedCard key={index} isAttached={true} data={data} index={index} />;
            } else if (data.spoiler) {
              return <FeedCard key={index} isSpoiler={true} data={data} index={index} />;
            } else {
              return <FeedCard key={index} isComment={true} data={data} index={index} />;
            }
          })
          .reverse()}
    </>
  );
}

export default FollowingSecctionComponent;
