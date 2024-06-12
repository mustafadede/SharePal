import React from "react";
import { motion } from "framer-motion";
import { createPostActions } from "../../../../store/createPostSlice";
import { modalActions } from "../../../../store/modalSlice";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { createPostAction } from "../../../../firebase/firebaseActions";
import { getAuth } from "firebase/auth";
import { useTranslation } from "react-i18next";

function PostButton({ text, setText }) {
  const { t, i18n } = useTranslation();
  const { spoiler } = useSelector((state) => state.createPost);
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
      createPostAction(text, modalHasData, spoiler, user?.nick);
      setText("");
      spoiler && dispatch(createPostActions.updateSpoiler(false));
      if (i18n.language === "en") {
        toast.success("Post created!");
      } else {
        toast.success("Gönderi oluşturuldu!");
      }
      dispatch(modalActions.closeModal()) && dispatch(createPostActions.resetText());
      modalHasData && dispatch(modalActions.openModal({ name: "watchedThisModal", data: modalHasData }));
    } else {
      if (i18n.language === "en") {
        toast.error("Post cannot be empty or exceed 280 characters!");
      } else {
        toast.error("Gönderi boş olamaz veya 280 karakteri aşamaz!");
      }
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
      {t("feedCard.share")}
    </motion.button>
  );
}

export default PostButton;
