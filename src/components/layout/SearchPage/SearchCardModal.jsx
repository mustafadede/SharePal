import React, { useEffect, useState } from "react";
import ModalHeader from "../ModalSkeleton/ModalHeader";
import { useSelector, useDispatch } from "react-redux";
import { modalActions } from "../../../store/modalSlice";
import { userActions } from "../../../store/userSlice";
import { toast } from "react-toastify";
import { updateCurrentUserData } from "../../../firebase/firebaseActions";
import useSimilar from "../../../hooks/useSimilar";
import useImages from "../../../hooks/useImages";
import useProvider from "../../../hooks/useProvider";
import SeachCardModalTop from "./SearchCardModal/SeachCardModalTop";
import SearchCardModalCenter from "./SearchCardModal/SearchCardModalCenter";
import SearchCardModalBottom from "./SearchCardModal/SearchCardModalBottom";

function SearchCardModal() {
  const { id, title, poster, releaseDate, overview, vote, backdrop, genres, mediaType, upcoming } = useSelector(
    (state) => state.modal.modalHasData
  );
  const [similar, setSimilar] = useState([]);
  const [images, setImages] = useState([]);
  const [providers, setProviders] = useState([]);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    useSimilar(id, mediaType).then((data) => {
      setSimilar(data);
    });
    useImages(id, mediaType).then((data) => {
      setImages(data);
    });
    useProvider(id, mediaType).then((data) => {
      setProviders(data?.US);
    });
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
        vote={vote}
        overview={overview}
        providers={providers}
        watchlistHandler={watchlistHandler}
        currentlyWatchingHandler={currentlyWatchingHandler}
      />
      <SearchCardModalBottom images={images} similar={similar} />
    </div>
  );
}

export default SearchCardModal;
