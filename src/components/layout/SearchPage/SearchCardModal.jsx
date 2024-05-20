import React, { useEffect, useState } from "react";
import ModalHeader from "../ModalSkeleton/ModalHeader";
import { useSelector, useDispatch } from "react-redux";
import { modalActions } from "../../../store/modalSlice";
import { userActions } from "../../../store/userSlice";
import { toast } from "react-toastify";
import {
  getSelectedUserWatched,
  getSelectedUserWantToWatch,
  updateCurrentUserData,
  updateWantToWatch,
  updateWatched,
  createUnfinished,
  getSelectedUserUnfinished,
  deleteWantToWatch,
  deleteWatched,
  deleteUnfinished,
  createFeedAction,
} from "../../../firebase/firebaseActions";
import useSimilar from "../../../hooks/useSimilar";
import useImages from "../../../hooks/useImages";
import useProvider from "../../../hooks/useProvider";
import SeachCardModalTop from "./SearchCardModal/SeachCardModalTop";
import SearchCardModalCenter from "./SearchCardModal/SearchCardModalCenter";
import SearchCardModalBottom from "./SearchCardModal/SearchCardModalBottom";
import { wantToWatchActions } from "../../../store/wantToWatchSlice";
import { watchedActions } from "../../../store/watchedSlice";
import useTrailer from "../../../hooks/useTrailer";
import { unfinishedActions } from "../../../store/unfinishedSlice";
import { useNavigate } from "react-router-dom";
import { useCredits } from "../../../hooks/useCredits";
import { useTranslation } from "react-i18next";

function SearchCardModal() {
  const { id, title, poster, releaseDate, overview, vote, backdrop, genres, mediaType, upcoming } = useSelector(
    (state) => state.modal.modalHasData
  );
  const [similar, setSimilar] = useState([]);
  const [clickAction1, setClickAction1] = useState(false);
  const [clickAction2, setClickAction2] = useState(false);
  const [clickAction3, setClickAction3] = useState(false);
  const [images, setImages] = useState([]);
  const [providers, setProviders] = useState([]);
  const [wantToWatch, setWantToWatch] = useState(false);
  const [watched, setWatched] = useState(false);
  const [credits, setCredits] = useState([]);
  const [unfinished, setUnfinished] = useState(false);
  const [trailerID, setTrailerID] = useState("");
  const { user } = useSelector((state) => state.user);
  const { followingList } = useSelector((state) => state.following);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  useEffect(() => {
    dispatch(wantToWatchActions.reset());
    dispatch(watchedActions.reset());
    dispatch(unfinishedActions.reset());
    useSimilar(id, mediaType).then((data) => {
      setSimilar(data);
    });
    useImages(id, mediaType).then((data) => {
      setImages(data);
    });
    useProvider(id, mediaType).then((data) => {
      i18n.language === "en" ? setProviders(data?.US) : setProviders(data?.TR);
    });

    useTrailer(id, mediaType).then((data) => {
      setTrailerID(data[0]?.key);
    });

    useCredits(id, mediaType).then((data) => {
      setCredits(data);
    });
    getSelectedUserWantToWatch(localStorage.getItem("user")).then((res) => {
      if (res.length > 0) {
        const arr = res.find((item) => item.id === id);
        arr && setWantToWatch(true);
      }
    });

    getSelectedUserWatched(localStorage.getItem("user")).then((res) => {
      if (res.length > 0) {
        const arr = res.find((item) => item.id === id);
        arr && setWatched(true);
      }
    });

    getSelectedUserUnfinished(localStorage.getItem("user")).then((res) => {
      if (res.length > 0) {
        const arr = res.find((item) => item.id === id);
        arr && setUnfinished(true);
      }
    });

    if (followingList) {
      followingList.map((item) => {
        getSelectedUserWantToWatch(item.uid).then((res) => {
          if (res.length > 0) {
            const arr = res.find((item) => item.id === id);
            arr && dispatch(wantToWatchActions.update(arr));
          }
        });
      });
    }

    if (followingList) {
      followingList.map((item) => {
        getSelectedUserWatched(item.uid).then((res) => {
          if (res.length > 0) {
            const arr = res.find((item) => item.id === id);
            arr && dispatch(watchedActions.update(arr));
          }
        });
      });
    }

    if (followingList) {
      followingList.map((item) => {
        getSelectedUserUnfinished(item.uid).then((res) => {
          if (res.length > 0) {
            const arr = res.find((item) => item.id === id);
            arr && dispatch(unfinishedActions.update(arr));
          }
        });
      });
    }
  }, []);

  const watchlistHandler = () => {
    dispatch(modalActions.openModal({ name: "pinnedModal", data: { title, poster, releaseDate, vote, backdrop } }));
  };

  const currentlyWatchingHandler = () => {
    const data = {
      currentlyWatching: { title, poster, releaseDate },
    };
    updateCurrentUserData(localStorage.getItem("user"), data).then(() => {
      i18n.language === "en" ? toast("Currently watching updated!") : toast("Şu an izlediğin güncellendi!");
      dispatch(userActions.updateUser({ ...user, currentlyWatching: data }));
    });
  };

  const bestMovieInYearHandler = () => {
    const data = {
      bestMovieYear: { title, poster, releaseDate },
    };
    updateCurrentUserData(localStorage.getItem("user"), data).then(() => {
      i18n.language === "en" ? toast("Best movie updated!") : toast("En iyi film güncellendi!");
      dispatch(userActions.updateUser({ ...user, bestMovieYear: data }));
    });
  };

  const bestSeriesInYearHandler = () => {
    const data = {
      bestSeriesYear: { title, poster, releaseDate },
    };
    updateCurrentUserData(localStorage.getItem("user"), data).then(() => {
      i18n.language === "en" ? toast("Best series updated!") : toast("En iyi dizi güncellendi!");
      dispatch(userActions.updateUser({ ...user, bestSeriesYear: data }));
    });
  };

  const wantToWatchHandler = () => {
    if (!clickAction1) {
      updateWantToWatch({ id: id, mediaType: mediaType, name: user.nick, photoURL: user.photoURL }).then(() => {
        setClickAction1(true);
        setWantToWatch(true);
        createFeedAction({
          attachedAction: {
            id: id,
            mediaType: mediaType,
            title: title,
            poster: poster,
            releaseDate: releaseDate,
            vote: vote,
            backdrop: backdrop,
            genres: genres,
            upcoming: upcoming || null,
          },
          nick: user?.nick,
          actionName: "wantToWatch",
        });
        i18n.language === "en" ? toast("Information attached to this!") : toast("Bu içeriğe bilgi eklendi!");
      });
    } else {
      deleteWantToWatch({ id: id, mediaType: mediaType, name: user.nick, photoURL: user.photoURL }).then(() => {
        setClickAction1(false);
        setWantToWatch(false);
        deleteSelectedPost(localStorage.getItem("user"), post);
        i18n.language === "en" ? toast("Information removed from this!") : toast("Bu içerikten bilgi kaldırıldı!");
      });
    }
  };

  const watchedHandler = () => {
    if (!clickAction2) {
      updateWatched({ id: id, mediaType: mediaType, name: user.nick, photoURL: user.photoURL }).then(() => {
        setClickAction2(true);
        setWatched(true);
        i18n.language === "en" ? toast("Information attached to this!") : toast("Bu içeriğe bilgi eklendi!");
      });
    } else {
      deleteWatched({ id: id, mediaType: mediaType, name: user.nick, photoURL: user.photoURL }).then(() => {
        setClickAction2(false);
        setWatched(false);
        i18n.language === "en" ? toast("Information removed from this!") : toast("Bu içerikten bilgi kaldırıldı!");
      });
    }
  };

  const attachHandler = () => {
    dispatch(modalActions.closeModal({ name: "attachedFilmModal", data: { title, poster, releaseDate, backdrop } }));
    navigate(`/feed`);
    i18n.language === "en" ? toast("Attached to your post!") : toast("Paylaşacağın gönderiye eklendi!");
  };
  const unfinishedHandler = () => {
    if (!clickAction3) {
      createUnfinished({ id: id, mediaType: mediaType, name: user.nick, photoURL: user.photoURL }).then(() => {
        setClickAction3(true);
        setUnfinished(true);
        i18n.language === "en" ? toast("Information attached to this!") : toast("Bu içeriğe bilgi eklendi!");
      });
    } else {
      deleteUnfinished({ id: id, mediaType: mediaType, name: user.nick, photoURL: user.photoURL }).then(() => {
        setClickAction3(false);
        setUnfinished(false);
        i18n.language === "en" ? toast("Information removed from this!") : toast("Bu içerikten bilgi kaldırıldı!");
      });
    }
  };

  return (
    <div className="bg-slate-900 w-96 h-[38rem] md:w-[45rem] lg:w-[50rem] md:h-[37rem] rounded-2xl relative overflow-hidden overflow-y-scroll no-scrollbar">
      <div className="absolute top-0 z-20 w-full p-6">
        <ModalHeader title={t("searchCard.title")} />
      </div>
      {/* Image & Backdrop Image & title & release date */}
      <SeachCardModalTop
        poster={poster}
        backdrop={backdrop}
        title={title}
        releaseDate={releaseDate}
        mediaType={mediaType}
        genres={genres}
        upcoming={upcoming}
      />
      {/* Actions & Overview & Rating */}
      <SearchCardModalCenter
        mediaType={mediaType}
        releaseDate={releaseDate}
        vote={vote}
        overview={overview}
        trailerID={trailerID}
        providers={providers}
        watchlistHandler={watchlistHandler}
        attachHandler={attachHandler}
        currentlyWatchingHandler={currentlyWatchingHandler}
        bestMovieHandler={bestMovieInYearHandler}
        bestSeriesHandler={bestSeriesInYearHandler}
        wantToWatchHandler={wantToWatchHandler}
        unfinishedHandler={unfinishedHandler}
        watchedHandler={watchedHandler}
        wantToWatch={wantToWatch}
        watched={watched}
        unfinished={unfinished}
        clickAction1={clickAction1}
        clickAction2={clickAction2}
        clickAction3={clickAction3}
        images={images}
        credits={credits}
      />
      <SearchCardModalBottom similar={similar} />
    </div>
  );
}

export default SearchCardModal;
