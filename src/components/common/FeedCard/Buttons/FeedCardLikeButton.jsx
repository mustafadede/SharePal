import React, { useState } from "react";
import { HeartIcon, HeartFilledIcon } from "@radix-ui/react-icons";
import { useDispatch, useSelector } from "react-redux";
import { postActionActions } from "../../../../store/postActionSlice";
import { updateSelectedPost } from "../../../../firebase/firebaseActions";
function FeedCardLikeButton({ data }) {
  const [isLiked, setIsLiked] = useState(false);
  const dispatch = useDispatch();
  const likes = useSelector((state) => state.postAction.postLikesList);

  const handleLike = () => {
    setIsLiked(!isLiked);
    // if (!isLiked) {
    //   updateSelectedPost(data.userId, data.postId, { likes: data.likes + 1 });
    //   dispatch(postActionActions.addPostToLikesList({ id: data.postId, userId: data.userId }));
    // } else {
    //   data.likes > 0 && updateSelectedPost(data.userId, data.postId, { likes: data.likes - 1 });
    // }
  };

  // useState(() => {
  //   const checkIfLiked = () => {
  //     const isLiked = likes.find((like) => like.id === data.postId && like.userId === data.userId);
  //     isLiked && setIsLiked(true);
  //   };
  //   checkIfLiked();
  // }, []);

  return (
    <button className="flex items-center gap-2" onClick={handleLike}>
      {isLiked ? (
        <>
          <HeartFilledIcon className="w-6 h-5 transition-all text-fuchsia-600" />
          <p className="hidden transition-all md:block text-md text-fuchsia-600">Like</p>
        </>
      ) : (
        <>
          <HeartIcon className="w-6 h-5 transition-all text-slate-400 hover:text-slate-200" />
          <p className="hidden transition-all md:block text-md text-slate-400 hover:text-slate-200">Like</p>
        </>
      )}
    </button>
  );
}

export default FeedCardLikeButton;
