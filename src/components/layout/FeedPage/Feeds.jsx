import React, { useEffect } from "react";
import FeedCard from "../../common/FeedCard";
import { getAllPosts } from "../../../firebase/firebaseActions";
import { postsActions } from "../../../store/postsSlice";
import { useDispatch, useSelector } from "react-redux";

function Feeds({ tab }) {
  const { posts, status } = useSelector((state) => state.posts);
  const { post } = useSelector((state) => state.createPost);
  const dispatch = useDispatch();

  useEffect(() => {
    const getData = async () => {
      dispatch(postsActions.updateStatus("loading"));
      const response = await getAllPosts();
      dispatch(postsActions.updatePosts(response));
      dispatch(postsActions.updateStatus("done"));
    };
    getData();
  }, [tab, post]);

  return (
    <div>
      {tab === 0 &&
        status === "done" &&
        posts
          .map((data, index) => {
            if (data.attachedFilm) {
              return <FeedCard key={index} isAttached={true} data={data} index={index} />;
            } else if (data.spoiler) {
              return <FeedCard key={index} isSpoiler={true} data={data} index={index} />;
            } else if (data.actionName && localStorage.getItem("user") == data.userId) {
              return <FeedCard key={index} isAction={true} data={data} index={index} />;
            } else if (!data.actionName && !data.attachedFilm && !data.spoiler) {
              return <FeedCard key={index} isComment={true} data={data} index={index} />;
            }
          })
          .reverse()}
    </div>
  );
}

export default Feeds;
