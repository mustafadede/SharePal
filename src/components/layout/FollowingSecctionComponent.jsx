import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSelectedUserPosts, getSelectedUserPostsList } from "../../firebase/firebaseActions";
import FeedCard from "../common/FeedCard";
import { postsActions } from "../../store/postsSlice";

function FollowingSecctionComponent({ tab }) {
  const { followingList } = useSelector((state) => state.following);
  const { posts, status } = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchFollowingPosts = async () => {
      dispatch(postsActions.updateStatus("loading"));
      dispatch(postsActions.resetPosts());

      // get all the following users posts parallelly
      const allPosts = await Promise.all(
        followingList.map(async (item) => {
          const userPostIds = await getSelectedUserPostsList(item.uid);
          const userPosts = await Promise.all(
            userPostIds.map(async (postId) => {
              return await getSelectedUserPosts(postId);
            })
          );
          return userPosts.flat();
        })
      );

      // merge all the posts and sort them by date
      const mergedPosts = allPosts.flat().sort((a, b) => a.date - b.date);

      dispatch(postsActions.updatePosts(mergedPosts));
      dispatch(postsActions.updateStatus("done"));
    };

    if (followingList.length > 0) {
      fetchFollowingPosts();
    }
  }, [tab, followingList, dispatch]);

  return (
    status === "done" &&
    posts
      .map((data) => {
        if (data.attachedFilm) {
          return <FeedCard key={data.postId} isAttached={true} data={data} />;
        } else if (data.spoiler) {
          return <FeedCard key={data.postId} isSpoiler={true} data={data} />;
        } else if (data.actionName) {
          return <FeedCard key={data.postId} isAction={true} data={data} />;
        } else if (!data.actionName && !data.attachedFilm && !data.spoiler) {
          return <FeedCard key={data.postId} isComment={true} data={data} />;
        }
        return null;
      })
      .reverse()
  );
}

export default FollowingSecctionComponent;
