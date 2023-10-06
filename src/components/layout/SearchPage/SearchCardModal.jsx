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
} from "../../../firebase/firebaseActions";
import useSimilar from "../../../hooks/useSimilar";
import useImages from "../../../hooks/useImages";
import useProvider from "../../../hooks/useProvider";
import SeachCardModalTop from "./SearchCardModal/SeachCardModalTop";
import SearchCardModalCenter from "./SearchCardModal/SearchCardModalCenter";
import SearchCardModalBottom from "./SearchCardModal/SearchCardModalBottom";
import { wantToWatchActions } from "../../../store/wantToWatchSlice";
import { watchedActions } from "../../../store/watchedSlice";

function SearchCardModal() {
  const { id, title, poster, releaseDate, overview, vote, backdrop, genres, mediaType, upcoming } = useSelector(
    (state) => state.modal.modalHasData
  );
  const [similar, setSimilar] = useState([]);
  const [clickAction1, setClickAction1] = useState(false);
  const [clickAction2, setClickAction2] = useState(false);
  const [images, setImages] = useState([]);
  const [providers, setProviders] = useState([]);
  const [wantToWatch, setWantToWatch] = useState(false);
  const [watched, setWatched] = useState(false);
  const { user } = useSelector((state) => state.user);
  const { followingList } = useSelector((state) => state.following);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(wantToWatchActions.reset());
    dispatch(watchedActions.reset());
    useSimilar(id, mediaType).then((data) => {
      setSimilar(data);
    });
    useImages(id, mediaType).then((data) => {
      setImages(data);
    });
    useProvider(id, mediaType).then((data) => {
      setProviders(data?.US);
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
    updateWantToWatch({ id: id, mediaType: mediaType, name: user.nick, photoURL: user.photoURL }).then(() => {
      setClickAction1(true);
      toast("Information attached to this!");
    });
  };

  const watchedHandler = () => {
    updateWatched({ id: id, mediaType: mediaType, name: user.nick, photoURL: user.photoURL }).then(() => {
      setClickAction2(true);
      toast("Information attached to this!");
    });
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
        providers={providers}
        watchlistHandler={watchlistHandler}
        currentlyWatchingHandler={currentlyWatchingHandler}
        bestMovieHandler={bestMovieInYearHandler}
        bestSeriesHandler={bestSeriesInYearHandler}
        wantToWatchHandler={wantToWatchHandler}
        watchedHandler={watchedHandler}
        wantToWatch={wantToWatch}
        watched={watched}
        clickAction1={clickAction1}
        clickAction2={clickAction2}
      />
      <SearchCardModalBottom images={images} similar={similar} />
    </div>
  );
}

export default SearchCardModal;
