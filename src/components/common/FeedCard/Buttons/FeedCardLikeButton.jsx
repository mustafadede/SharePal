import React, { useState } from "react";
import { HeartIcon, HeartFilledIcon } from "@radix-ui/react-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  createNotification,
  createSelectedUserPostLikeLists,
  removeSelectedUserPostLikeLists,
  updateSelectedPost,
} from "../../../../firebase/firebaseActions";
import { getAuth } from "firebase/auth";
import { postsActions } from "../../../../store/postsSlice";
function FeedCardLikeButton({ data }) {
  const [isLiked, setIsLiked] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const handleLike = () => {
    setIsLiked(!isLiked);
    if (!isLiked) {
      console.log(data.likes);
      dispatch(
        postsActions.updateLike({
          postId: data.postId,
          likes: data.likes + 1,
          likesList: data.likesList
            ? [...data.likesList, { id: getAuth().currentUser.uid, nick: getAuth().currentUser.displayName }]
            : [{ id: getAuth().currentUser.uid, nick: getAuth().currentUser.displayName }],
        })
      );
      // updateSelectedPost(data.userId, data.postId, {
      //   likes: data.likes + 1,
      //   likesList: data.likesList
      //     ? [...data.likesList, { id: getAuth().currentUser.uid, nick: getAuth().currentUser.displayName }]
      //     : [{ id: getAuth().currentUser.uid, nick: getAuth().currentUser.displayName }],
      // }).then(() => {
      //   createSelectedUserPostLikeLists([
      //     {
      //       id: data.userId,
      //       date: new Date().toISOString(),
      //       postId: data.postId,
      //     },
      //   ]).then(() => {
      //     if (data.userId !== getAuth().currentUser.uid) {
      //       createNotification(data.userId, {
      //         from: {
      //           uid: localStorage.getItem("user"),
      //           nick: user.nick,
      //           photo: user.photoURL,
      //           postId: data.postId,
      //         },
      //         date: new Date().toISOString(),
      //         type: "like",
      //       });
      //     }
      //   });
      // });
    } else {
      console.log(data.likes);
      dispatch(
        postsActions.updateLike({
          postId: data.postId,
          likes: data.likes - 1,
          likesList: data.likesList?.filter((val) => val.id !== getAuth().currentUser.uid),
        })
      );
      // updateSelectedPost(data.userId, data.postId, {
      //   likes: data.likes - 1,
      //   likesList: data.likesList?.filter((val) => val.id !== getAuth().currentUser.uid),
      // }).then(() => {
      //   removeSelectedUserPostLikeLists(data.userId, data.postId, {
      //     id: getAuth().currentUser.uid,
      //   });
      // });
    }
  };

  useState(() => {
    const checkIfLiked = () => {
      data.likesList?.find((val) => val.id === getAuth().currentUser.uid) && setIsLiked(true);
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
