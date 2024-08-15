import React from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { modalActions } from "../../../../store/modalSlice";
import { createPostAction } from "../../../../firebase/firebaseActions";
import { createPostActions } from "../../../../store/createPostSlice";
import { useDispatch, useSelector } from "react-redux";
import { getAuth } from "firebase/auth";
import { useTranslation } from "react-i18next";

function ActionTextArea({ text, setText }) {
  const { attachedFilm, spoiler } = useSelector((state) => state.createPost);
  const { modalHasData } = useSelector((state) => state.modal);
  const { user } = useSelector((state) => state.user);
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();

  const createPost = () => {
    if (text.length > 0 && text.length <= 280) {
      dispatch(
        createPostActions.updatePost({
          photoURL: getAuth().currentUser.photoURL || null,
          id: getAuth().currentUser.uid,
          text: text,
          attachedFilm: modalHasData ? modalHasData : attachedFilm,
          spoiler: spoiler,
          nick: user?.nick,
          likes: 0,
          comments: 0,
          reposts: 0,
          date: new Date().toISOString(),
        })
      );
      createPostAction(text, modalHasData ? modalHasData : attachedFilm, spoiler, user?.nick);
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

  const handlePost = (e) => {
    if (e.ctrlKey && e.key === "Enter") {
      createPost();
    }
  };

  return (
    <motion.div className="relative">
      <motion.textarea
        name="post"
        className="w-full h-20 px-4 py-2 my-2 rounded-lg outline-none resize-none text-md text-cWhite bg-slate-800"
        placeholder={t("box.wp")}
        value={text}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => handlePost(e)}
      />
      <motion.div className="absolute px-2 select-none right-1 bg-black/30 rounded-2xl bottom-4">
        <motion.p className="text-sm text-white/40">{text.length}/280</motion.p>
      </motion.div>
    </motion.div>
  );
}

export default ActionTextArea;
