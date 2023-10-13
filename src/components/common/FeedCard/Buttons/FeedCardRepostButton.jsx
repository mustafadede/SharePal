import React, { useEffect, useState } from "react";
import { LoopIcon } from "@radix-ui/react-icons";
import { useDispatch } from "react-redux";
import { postsActions } from "../../../../store/postsSlice";
import { getAuth } from "firebase/auth";
import {
  createSelectedUserPostRepostsLists,
  removeSelectedUserPostRepostsLists,
  updateSelectedPost,
} from "../../../../firebase/firebaseActions";
function FeedCardRepostButton({ data }) {
  const [isReposted, setIsReposted] = useState(false);
  const dispatch = useDispatch();
  const handleRepost = () => {
    setIsReposted(!isReposted);
    if (!isReposted) {
      dispatch(
        postsActions.repostPost({
          postId: data.postId,
          repost: data.repost + 1,
          repostsList: data.repostsList
            ? [...data.repostsList, { id: getAuth().currentUser.uid, nick: getAuth().currentUser.displayName }]
            : [{ id: getAuth().currentUser.uid, nick: getAuth().currentUser.displayName }],
        })
      );
      updateSelectedPost(data.userId, data.postId, {
        repost: data.repost + 1,
        repostsList: data.repostsList
          ? [...data.repostsList, { id: getAuth().currentUser.uid, nick: getAuth().currentUser.displayName }]
          : [{ id: getAuth().currentUser.uid, nick: getAuth().currentUser.displayName }],
      }).then(() => {
        createSelectedUserPostRepostsLists([
          {
            id: data.userId,
            date: new Date().toISOString(),
            postId: data.postId,
          },
        ]);
      });
    } else {
      updateSelectedPost(data.userId, data.postId, {
        repost: data.repost - 1,
        repostsList: data.repostsList?.filter((val) => val.id !== getAuth().currentUser.uid),
      }).then(() => {
        dispatch(
          postsActions.repostPost({
            postId: data.postId,
            repost: data.repost - 1,
            repostsList: data.repostsList?.filter((val) => val.id !== getAuth().currentUser.uid),
          })
        );
        removeSelectedUserPostRepostsLists(data.userId, data.postId, {
          id: getAuth().currentUser.uid,
        });
      });
    }
  };

  useEffect(() => {
    const checkIfReposted = () => {
      data?.repostsList?.find((val) => val.id === getAuth().currentUser.uid) && setIsReposted(true);
    };
    checkIfReposted();
  }, []);

  return (
    <button className="flex items-center gap-2" onClick={handleRepost}>
      {isReposted ? (
        <>
          <LoopIcon className="w-6 h-5 transition-all text-fuchsia-600" />
          <p className="hidden transition-all md:block text-md text-fuchsia-600">Repost</p>
        </>
      ) : (
        <>
          <LoopIcon className="w-6 h-5 transition-all text-slate-400 hover:text-slate-200" />
          <p className="hidden transition-all md:block text-md text-slate-400 hover:text-slate-200">Repost</p>
        </>
      )}
    </button>
  );
}

export default FeedCardRepostButton;
