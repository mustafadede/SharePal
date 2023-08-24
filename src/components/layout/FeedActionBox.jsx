import React from "react";
import { Link2Icon, CameraIcon, Cross1Icon } from "@radix-ui/react-icons";
import { motion } from "framer-motion";
import FeedActionBoxButton from "../common/FeedActionBoxButton";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { createPostActions } from "../../store/createPostSlice";
import { createPostAction } from "../../firebase/firebaseActions";
import { getAuth } from "firebase/auth";
import { modalActions } from "../../store/modalSlice";

function FeedActionBox() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { attachedFilm, attachedPhoto, text } = useSelector((state) => state.createPost);
  const { modalHasData, modalName } = useSelector((state) => state.modal);
  const createPost = () => {
    if (text.length > 0 && text.length <= 280) {
      dispatch(
        createPostActions.updatePost({
          id: getAuth().currentUser.uid,
          text: text,
          attachedFilm: modalHasData ? modalHasData : attachedFilm,
          attachedPhoto: attachedPhoto,
          nick: user.nick,
          likes: 0,
          comments: 0,
          reposts: 0,
          date: new Date().toISOString(),
        })
      );
      dispatch(createPostActions.updateText(""));
      dispatch(createPostActions.updateAttachedFilm(null));
      dispatch(createPostActions.updateAttachedPhoto(null));
      createPostAction(text, modalHasData ? modalHasData : attachedFilm, attachedPhoto) && toast.success("Post created!");
    } else {
      toast.error("Post field must be between 1 and 280 characters!");
    }
  };
  const handlePost = (e) => {
    if (e.ctrlKey && e.key === "Enter") {
      createPost();
    }
  };
  const handleAttachedFilm = () => {
    dispatch(modalActions.openModal({ name: "attachedFilmModal" }));
  };

  return (
    <>
      <motion.div
        className="w-full px-3 py-2 mb-4 overflow-hidden rounded-lg h-fit bg-slate-900"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <motion.textarea
          name="post"
          className="w-full h-20 px-4 py-2 my-2 rounded-lg outline-none resize-none text-md text-cWhite bg-slate-800 "
          placeholder="What's happening?"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          onChange={(e) =>
            e.target.value.length > 0 && e.target.value.length <= 280 && dispatch(createPostActions.updateText(e.target.value))
          }
          onKeyDown={(e) => handlePost(e)}
        />
        {modalName === "attachedFilmModal" && modalHasData && (
          <motion.div
            className="flex items-center justify-between w-full px-4 py-2 mb-3 text-sm transition-all rounded-lg hover:bg-fuchsia-800 text-slate-300 bg-slate-800"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center gap-2">
              <img className="w-8 h-8 rounded-full" src={`https://image.tmdb.org/t/p/w500/${modalHasData.poster}`} alt="poster" />
              <div className="flex flex-col">
                <span className="text-cWhite">{modalHasData.title}</span>
                <span className="text-slate-300">{modalHasData.releaseDate.slice(0, 4)}</span>
              </div>
            </div>
            <button
              className="flex items-center justify-center w-8 h-8 transition-colors rounded-lg text-slate-300 hover:bg-slate-800 hover:text-cWhite"
              onClick={() => {
                dispatch(modalActions.closeModal());
                dispatch(createPostActions.updateAttachedFilm(null));
              }}
            >
              <Cross1Icon className="w-4 h-4" />
            </button>
          </motion.div>
        )}
        <div className="flex w-full gap-2">
          <FeedActionBoxButton
            icons={<Link2Icon className="h-6 transition-all w-fit text-slate-300" />}
            text="Attach Film/Series"
            onClickAction={() => {
              handleAttachedFilm();
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
    </>
  );
}

export default FeedActionBox;
