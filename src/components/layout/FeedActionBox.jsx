import React from "react";
import { Link2Icon, CameraIcon } from "@radix-ui/react-icons";
import { motion } from "framer-motion";
import FeedActionBoxButton from "../common/FeedActionBoxButton";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { createPostActions } from "../../store/createPostSlice";
import { createPostAction } from "../../firebase/firebaseActions";
import { getAuth } from "firebase/auth";

function FeedActionBox() {
  const dispatch = useDispatch();
  const { attachedFilm, attachedPhoto, text } = useSelector((state) => state.createPost);
  const createPost = () => {
    if (text.length > 0 && text.length <= 280) {
      dispatch(
        createPostActions.updatePost({
          id: getAuth().currentUser.uid + Date.now(),
          text: text,
          attachedFilm: attachedFilm,
          attachedPhoto: attachedPhoto,
          nick: getAuth().currentUser.displayName,
          likes: 0,
          comments: 0,
          replies: 0,
          date: new Date().toISOString(),
          isLiked: false,
          isReposted: false,
        })
      );
      dispatch(createPostActions.updateText(""));
      dispatch(createPostActions.updateAttachedFilm(null));
      dispatch(createPostActions.updateAttachedPhoto(null));
      createPostAction({ text: text, attachedFilm: attachedFilm, attachedPhoto: attachedPhoto }) && toast.success("Post created!");
    } else {
      toast.error("Post field must be between 1 and 280 characters!");
    }
  };

  return (
    <motion.div
      className="w-full px-3 overflow-hidden rounded-lg h-[10.2rem] bg-slate-900"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <motion.textarea
        name="post"
        className="w-full h-20 px-4 py-2 mt-4 rounded-lg outline-none resize-none text-md text-cWhite bg-slate-800 "
        placeholder="What's happening?"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        onChange={(e) =>
          e.target.value.length > 0 && e.target.value.length <= 280 && dispatch(createPostActions.updateText(e.target.value))
        }
      />
      <div className="flex w-full gap-2 mt-1">
        <FeedActionBoxButton
          icons={<Link2Icon className="h-6 transition-all w-fit text-slate-300" />}
          text="Attach Film/Series"
          onClickAction={() => {
            dispatch(createPostActions.updateAttachedFilm({ id: 1, name: "Batman", photo: "https://i.imgur.com/2xW3YzB.png" }));
          }}
        />
        <FeedActionBoxButton
          icons={<CameraIcon className="h-6 transition-all w-fit text-slate-300" />}
          text="Upload Photo"
          onClickAction={() => {
            dispatch(createPostActions.updateAttachedPhoto("https://i.imgur.com/2xW3YzB.png"));
          }}
        />
        <motion.button
          className="w-full p-2 text-lg transition-colors rounded-lg select-none h-100 bg-slate-600 hover:bg-fuchsia-800 text-cWhite"
          onClick={createPost}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Post
        </motion.button>
      </div>
    </motion.div>
  );
}

export default FeedActionBox;
