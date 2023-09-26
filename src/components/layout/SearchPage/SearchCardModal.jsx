import React, { useEffect, useState } from "react";
import ModalHeader from "../ModalSkeleton/ModalHeader";
import { useSelector, useDispatch } from "react-redux";
import { EyeOpenIcon, Link2Icon, PlusIcon } from "@radix-ui/react-icons";
import SearchCardButton from "./SearchCardButton";
import { motion } from "framer-motion";
import { modalActions } from "../../../store/modalSlice";
import { userActions } from "../../../store/userSlice";
import { toast } from "react-toastify";
import { updateCurrentUserData } from "../../../firebase/firebaseActions";
import { movieGenresJSON, tvGenresJSON } from "../../../assets/genreData";
import useSimilar from "../../../hooks/useSimilar";
import Slider from "../../common/Slider";
import useImages from "../../../hooks/useImages";
import ImagesSlider from "../../common/ImagesSlider";
import useProvider from "../../../hooks/useProvider";

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
    <div className="bg-slate-900 w-[50rem] h-[37rem] rounded-2xl relative overflow-hidden overflow-y-scroll no-scrollbar">
      <div className="absolute top-0 z-20 w-full p-6">
        <ModalHeader title="Information" />
      </div>
      {/* Image & Backdrop Image & title & release date */}
      <div className="relative flex flex-row-reverse w-full h-[21rem]">
        {/* Image */}
        <motion.div
          className="absolute z-10 h-full top-12 w-52 right-20 drop-shadow-2xl"
          initial={{ y: 0, opacity: 0 }}
          animate={{ y: -5, opacity: 1 }}
        >
          <img
            src={`https://image.tmdb.org/t/p/w500/${poster}`}
            className="w-full transition-all duration-300 border cursor-pointer drop-shadow-xl rounded-xl border-slate-400 hover:border-fuchsia-600"
            alt={poster}
          />
        </motion.div>
        {/*Backdrop Image */}
        <div className="absolute top-0 right-0 w-full h-full overflow-hidden blur-md rounded-tr-2xl">
          <img src={`https://image.tmdb.org/t/p/w500/${backdrop}`} className="w-full scale-y-150" alt={poster} />
        </div>
        {/* Title & Release Date */}
        <div className="absolute top-0 left-0 flex flex-col justify-center w-2/3 h-full p-6">
          <h1 className="mt-4 mb-3 text-4xl text-fuchsia-600">{title}</h1>
          <h2 className="mb-2 text-2xl text-fuchsia-700">{upcoming ? releaseDate : releaseDate.slice(0, 4)}</h2>
          <h3 className="px-3 text-xl border rounded-md w-fit border-fuchsia-700 text-fuchsia-800">
            {mediaType === "movie" ? mediaType[0].toUpperCase() + mediaType.slice(1) : mediaType?.toUpperCase()}
          </h3>
          <div className="relative flex flex-wrap gap-2 top-4">
            {mediaType === "movie" &&
              genres
                .filter((genre) => movieGenresJSON.some((movieGenre) => movieGenre.id === genre))
                .map((filteredGenre) => (
                  <p key={filteredGenre} className="px-3 py-2 text-sm border rounded-lg 2xl:text-md border-fuchsia-800 text-fuchsia-800">
                    {movieGenresJSON.find((movieGenre) => movieGenre.id === filteredGenre).name}
                  </p>
                ))}
            {mediaType === "tv" &&
              genres
                .filter((genre) => tvGenresJSON.some((tvGenre) => tvGenre.id === genre))
                .map((filteredGenre) => (
                  <p key={filteredGenre} className="px-3 py-2 text-sm border rounded-lg 2xl:text-md border-fuchsia-800 text-fuchsia-800">
                    {tvGenresJSON.find((tvGenre) => tvGenre.id === filteredGenre).name}
                  </p>
                ))}
          </div>
        </div>
      </div>
      {/* Actions & Overview & Rating */}
      <div className="relative flex gap-2 px-6 py-4 top-6">
        <div className="flex gap-4">
          <div className="w-[30rem]">
            <h2 className="mb-3 text-3xl text-slate-200">Actions</h2>
            <div className="flex flex-wrap gap-2">
              <SearchCardButton
                title={"Add to Watchlist"}
                icon={<PlusIcon className="w-6 h-6 transition-all text-slate-400 group-hover:text-fuchsia-600" />}
                clickHandler={watchlistHandler}
              />
              <SearchCardButton
                title={"Make Attachment"}
                icon={<Link2Icon className="w-6 h-6 transition-all text-slate-400 group-hover:text-fuchsia-600" />}
              />
              <SearchCardButton
                title={"Set Currently Watching"}
                icon={<EyeOpenIcon className="w-6 h-6 transition-all text-slate-400 group-hover:text-fuchsia-600" />}
                clickHandler={currentlyWatchingHandler}
              />
            </div>
          </div>
          <div className="flex flex-col">
            <h3 className="pb-2 text-4xl text-slate-200">Rating</h3>
            <div className="flex">
              <p className="text-3xl text-slate-400">{vote.toString().slice(0, 3) + "/"}</p>
              <p className="text-3xl text-slate-400"> 10</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full p-6">
        <div className="w-2/3 pr-4">
          <h3 className="text-4xl text-slate-200">Overview</h3>
          <p className="text-slate-300">{overview}</p>
        </div>
        <div className="w-1/3">
          {providers?.flatrate?.length ? (
            <div className="mt-4">
              <h3 className="pb-2 text-4xl text-slate-200">Providers</h3>
              <div className="flex flex-wrap gap-2">
                {providers?.flatrate?.map((provider) => (
                  <img
                    key={provider.provider_id}
                    src={`https://image.tmdb.org/t/p/w500/${provider.logo_path}`}
                    className="w-12 h-12 transition-all duration-300 border cursor-pointer drop-shadow-xl rounded-xl border-slate-400 hover:border-fuchsia-600"
                    alt={provider.provider_name}
                  />
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
      <div className="flex flex-col gap-4 p-6">
        <h1 className="text-4xl text-slate-200">Images</h1>
        {images ? (
          <ImagesSlider data={images} dataClassName="images" />
        ) : (
          <p className="mt-4 text-lg text-slate-600">No image content found.</p>
        )}
      </div>
      <div className="flex flex-col gap-4 p-6">
        <h1 className="text-4xl text-slate-200">Recommendations</h1>
        {similar?.length ? (
          <Slider data={similar} dataClassName="similar" />
        ) : (
          <p className="mt-4 text-lg text-slate-600">No recommended content found.</p>
        )}
      </div>
    </div>
  );
}

export default SearchCardModal;
