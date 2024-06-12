import { BookmarkFilledIcon, BookmarkIcon, EyeOpenIcon, PauseIcon } from "@radix-ui/react-icons";
import React from "react";
import ActionButton from "./ActionButton/ActionButton";
import { useTranslation } from "react-i18next";
import { createUnfinished, updateCurrentUserData, updateWantToWatch, updateWatched } from "../../../firebase/firebaseActions";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../../store/userSlice";
import { modalActions } from "../../../store/modalSlice";

function WatchedThisActions() {
  const { user } = useSelector((state) => state.user);
  const { modalHasData } = useSelector((state) => state.modal);
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const watchedHandler = () => {
    updateWatched({ id: modalHasData.id, mediaType: modalHasData.mediaType, name: user.nick, photoURL: user.photoURL }).then(() => {
      dispatch(modalActions.closeModal());
      i18n.language === "en" ? toast("Information added to your stats!") : toast("Bilgi profiline eklendi!");
    });
    return true;
  };
  const currentlyWatchingHandler = () => {
    const { title, poster, releaseDate } = modalHasData;
    const currentData = {
      currentlyWatching: { title, poster, releaseDate },
    };
    updateCurrentUserData(localStorage.getItem("user"), currentData).then(() => {
      dispatch(modalActions.closeModal());
      i18n.language === "en" ? toast("Currently watching updated!") : toast("Şu an izlediğin güncellendi!");
      dispatch(userActions.updateUser({ ...user, currentlyWatching: currentData }));
    });
    return true;
  };

  const wantToWatchHandler = () => {
    updateWantToWatch({ id: modalHasData.id, mediaType: modalHasData.mediaType, name: user.nick, photoURL: user.photoURL }).then(() => {
      dispatch(modalActions.closeModal());
      i18n.language === "en" ? toast("Information added to your stats!") : toast("Bu içeriğe bilgi eklendi!");
    });
    return true;
  };

  const unfinishedHandler = () => {
    createUnfinished({ id: modalHasData.id, mediaType: modalHasData.mediaType, name: user.nick, photoURL: user.photoURL }).then(() => {
      dispatch(modalActions.closeModal());
      i18n.language === "en" ? toast("Information added to your stats!") : toast("Bu içeriğe bilgi eklendi!");
    });
    return true;
  };

  return (
    <>
      <div className="flex gap-4 mt-10">
        <ActionButton
          title={t("watchedThis.watched")}
          icon={<BookmarkFilledIcon className={"w-6 h-6 transition-all text-slate-200"} />}
          onClick={watchedHandler}
        />
        <ActionButton
          title={t("watchedThis.wantToWatch")}
          icon={<BookmarkIcon className={"w-6 h-6 transition-all text-slate-200"} />}
          onClick={wantToWatchHandler}
        />
      </div>
      <div className="flex gap-4 mt-4">
        <ActionButton
          title={t("watchedThis.currentlyWatching")}
          icon={<EyeOpenIcon className="w-6 h-6 transition-all text-slate-200" />}
          onClick={currentlyWatchingHandler}
        />
        <ActionButton
          title={t("watchedThis.unfinished")}
          icon={<PauseIcon className="w-6 h-6 transition-all text-slate-200" />}
          onClick={unfinishedHandler}
        />
      </div>
    </>
  );
}

export default WatchedThisActions;
