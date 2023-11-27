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
  const [unfinished, setUnfinished] = useState(false);
  const [trailerID, setTrailerID] = useState("");
  const { user } = useSelector((state) => state.user);
  const { followingList } = useSelector((state) => state.following);
  const dispatch = useDispatch();

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
      setProviders(data?.US);
    });

    useTrailer(id, mediaType).then((data) => {
      setTrailerID(data[0]?.key);
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
      toast("Currently watching updated!");
      dispatch(userActions.updateUser({ ...user, currentlyWatching: data }));
    });
  };

  const bestMovieInYearHandler = () => {
    const data = {
      bestMovieYear: { title, poster, releaseDate },
    };
    updateCurrentUserData(localStorage.getItem("user"), data).then(() => {
      toast("Best movie updated!");
      dispatch(userActions.updateUser({ ...user, bestMovieYear: data }));
    });
  };

  const bestSeriesInYearHandler = () => {
    const data = {
      bestSeriesYear: { title, poster, releaseDate },
    };
    updateCurrentUserData(localStorage.getItem("user"), data).then(() => {
      toast("Best series updated!");
      dispatch(userActions.updateUser({ ...user, bestSeriesYear: data }));
    });
  };

  const wantToWatchHandler = () => {
    if (!clickAction1) {
      updateWantToWatch({ id: id, mediaType: mediaType, name: user.nick, photoURL: user.photoURL }).then(() => {
        setClickAction1(true);
        setWantToWatch(true);
        toast("Information attached to this!");
      });
    } else {
      deleteWantToWatch({ id: id, mediaType: mediaType, name: user.nick, photoURL: user.photoURL }).then(() => {
        setClickAction1(false);
        setWantToWatch(false);
        toast("Information removed from this!");
      });
    }
  };

  const watchedHandler = () => {
    if (!clickAction2) {
      updateWatched({ id: id, mediaType: mediaType, name: user.nick, photoURL: user.photoURL }).then(() => {
        setClickAction2(true);
        setWatched(true);
        toast("Information attached to this!");
      });
    } else {
      deleteWatched({ id: id, mediaType: mediaType, name: user.nick, photoURL: user.photoURL }).then(() => {
        setClickAction2(false);
        setWatched(false);
        toast("Information removed from this!");
      });
    }
  };

  const unfinishedHandler = () => {
    if (!clickAction3) {
      createUnfinished({ id: id, mediaType: mediaType, name: user.nick, photoURL: user.photoURL }).then(() => {
        setClickAction3(true);
        setUnfinished(true);
        toast("Information attached to this!");
      });
    } else {
      deleteUnfinished({ id: id, mediaType: mediaType, name: user.nick, photoURL: user.photoURL }).then(() => {
        setClickAction3(false);
        setUnfinished(false);
        toast("Information removed from this!");
      });
    }
  };

  return (
    <div className="bg-slate-900 w-96 h-[38rem] md:w-[45rem] lg:w-[50rem] md:h-[37rem] rounded-2xl relative overflow-hidden overflow-y-scroll no-scrollbar">
      <div className="absolute top-0 z-20 w-full p-6">
        <ModalHeader title="Information" />
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
      />
      <SearchCardModalBottom similar={similar} />
    </div>
  );
}

export default SearchCardModal;
