import React, { useState } from "react";
import { HeartIcon, HeartFilledIcon } from "@radix-ui/react-icons";
import { useDispatch, useSelector } from "react-redux";
import { createSelectedUserPostLikeLists, removeSelectedUserPostLikeLists, updateSelectedPost } from "../../../../firebase/firebaseActions";
import { getAuth } from "firebase/auth";
function FeedCardLikeButton({ data }) {
  const [isLiked, setIsLiked] = useState(false);
  const dispatch = useDispatch();

  const handleLike = () => {
    setIsLiked(!isLiked);
    if (!isLiked) {
      updateSelectedPost(data.userId, data.postId, {
        likes: data.likes + 1,
        likesList: data.likesList ? [...data.likesList, getAuth().currentUser.uid] : [getAuth().currentUser.uid],
      });
      createSelectedUserPostLikeLists([
        {
          id: data.userId,
          date: new Date().toISOString(),
          postId: data.postId,
        },
      ]);
    } else {
      updateSelectedPost(data.userId, data.postId, {
        likes: data.likes - 1,
        likeList: data.likeList.filter((id) => id !== getAuth().currentUser.uid),
      });
      removeSelectedUserPostLikeLists(data.userId, data.postId, {
        id: getAuth().currentUser.uid,
      });
    }
  };

  useState(() => {
    const checkIfLiked = () => {
      data.likesList?.find((id) => id === getAuth().currentUser.uid) && setIsLiked(true);
    };
    checkIfLiked();
  }, []);

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
