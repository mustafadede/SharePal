import React from "react";
import { motion } from "framer-motion";
import { createPostActions } from "../../../../store/createPostSlice";
import { modalActions } from "../../../../store/modalSlice";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { createPostAction } from "../../../../firebase/firebaseActions";
import { getAuth } from "firebase/auth";

function PostButton() {
  const { attachedFilm, spoiler, text } = useSelector((state) => state.createPost);
  const { modalHasData } = useSelector((state) => state.modal);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const createPost = () => {
    if (text.length > 0 && text.length <= 280) {
      dispatch(
        createPostActions.updatePost({
          photoURL: getAuth().currentUser.photoURL || null,
          id: getAuth().currentUser.uid,
          text: text,
          attachedFilm: modalHasData,
          spoiler: spoiler,
          nick: user?.nick,
          likes: 0,
          comments: 0,
          reposts: 0,
          date: new Date().toISOString(),
        })
      );
      createPostAction(text, modalHasData, spoiler, user?.nick) && toast.success("Post created!");
      dispatch(modalActions.closeModal()) && dispatch(createPostActions.resetText());
    } else {
      toast.error("Post field must be between 1 and 280 characters!");
    }
  };

  return (
    <motion.button
      className="w-full p-2 text-lg transition-colors duration-300 rounded-lg select-none h-100 bg-fuchsia-800 hover:bg-slate-700 text-cWhite"
      onClick={createPost}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      Post
    </motion.button>
  );
}

export default PostButton;
