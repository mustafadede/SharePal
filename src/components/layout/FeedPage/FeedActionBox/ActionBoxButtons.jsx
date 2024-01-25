import React from "react";
import FeedActionBoxButton from "../../../common/FeedActionBoxButton";
import { Link2Icon, LockOpen1Icon } from "@radix-ui/react-icons";
import { useDispatch, useSelector } from "react-redux";
import { createPostActions } from "../../../../store/createPostSlice";
import { modalActions } from "../../../../store/modalSlice";

function ActionBoxButtons() {
  const dispatch = useDispatch();
  const { spoiler } = useSelector((state) => state.createPost);

  const handleAttachedFilm = () => {
    dispatch(modalActions.openModal({ name: "attachedFilmModal" }));
    dispatch(modalActions.assignLastModalName("attachedFilmModal"));
  };
  return (
    <>
      <FeedActionBoxButton
        icons={<Link2Icon className="w-6 h-6 transition-all text-slate-300" />}
        text="Attach Film/Series"
        onClickAction={() => {
          handleAttachedFilm();
        }}
      />
      <FeedActionBoxButton
        icons={<LockOpen1Icon className="w-6 h-6 transition-all text-slate-300" />}
        text="Sshhh! Spoiler!"
        onClickAction={() => {
          dispatch(createPostActions.updateSpoiler(!spoiler));
        }}
        check={spoiler}
      />
    </>
  );
}

export default ActionBoxButtons;
