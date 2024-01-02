import React, { useState } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { Cross1Icon, DotsHorizontalIcon } from "@radix-ui/react-icons";
import ActionDetailsCard from "../ActionDetailsCard";
import { postsActions } from "../../../store/postsSlice";
import { deleteSelectedPost } from "../../../firebase/firebaseActions";
import { toast } from "react-toastify";
import { DateFormatter, TextShorter } from "../../../utils/formatter";
import { modalActions } from "../../../store/modalSlice";
import useSearchWithYear from "../../../hooks/useSearchWithYear";

function FeedActionCard({ data, notification }) {
  const [settings, setSettings] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user?.nick);
  // utils functions
  const date = DateFormatter(data);
  const title = TextShorter(data.attachedAction.title, 21);

  const deleteHandler = () => {
    deleteSelectedPost(localStorage.getItem("user"), data.postId).then(() => {
      dispatch(postsActions.deletePost(data.postId)) && toast.success("Post deleted successfully");
    });
  };

  const onClickHandler = () => {
    const movieInfoHandler = () => {
      useSearchWithYear(data.attachedAction.title, data.attachedAction.releaseDate).then((data) => {
        if (data) {
          dispatch(
            modalActions.openModal({
              name: "searchCardModal",
              data: {
                id: data.id,
                title: data.original_title || data.original_name,
                poster: data.poster_path,
                releaseDate: data.release_date || data.first_air_date,
                overview: data.overview,
                vote: data.vote_average,
                backdrop: data.backdrop_path,
                genres: data.genre_ids,
                mediaType: data.media_type,
                upcoming: data.upcoming,
              },
            })
          );
        }
      });
    };
    movieInfoHandler();
  };

  return (
    <div className="flex flex-col w-full">
      <motion.div
        className="relative flex flex-col w-full mb-4 overflow-hidden h-36 bg-slate-900 rounded-xl"
        initial={{ opacity: 0, y: -20, transition: { duration: 2 } }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/*Action Card Top section: Profile Picture and Name start */}
        {!notification && data.nick === user && (
          <div className="absolute z-10 flex flex-col top-4 right-4">
            <button onClick={() => setSettings(!settings)}>
              <DotsHorizontalIcon className="w-6 h-6 transition-colors duration-150 text-slate-200 hover:text-cWhite" />
            </button>
          </div>
        )}
        {/*Action Card Top section: Profile Picture and Name end */}

        {/*Action Card Middle Top section start */}
        {data.actionName === "wantToWatch" ? (
          <div className="flex w-full h-full group">
            <div
              className="z-10 flex flex-col justify-center w-full h-full gap-2 p-4"
              style={{
                background: "linear-gradient(to left, rgba(15, 23, 42, 0), rgba(15, 23, 42, 1))",
              }}
            >
              <div className="flex items-end gap-2">
                <NavLink to={data.nick === user ? `/profile` : `/user/${data.nick}`}>
                  <p className="w-full transition-all duration-300 text-md lg:text-xl text-fuchsia-600 hover:cursor-pointer hover:text-white">
                    {data.nick.length < 14 ? data.nick : data.nick.slice(0, 14) + "..."}
                  </p>
                </NavLink>
                <span className="duration-150 text-md text-slate-400 group-hover:text-slate-200"> wants to watch</span>
              </div>
              <p className="z-10 flex items-center w-full gap-2 italic h-30">
                <button
                  className="w-full text-lg text-white transition-all duration-300 lg:text-3xl text-start group-hover:text-fuchsia-600 hover:cursor-pointer"
                  onClick={onClickHandler}
                >
                  <span>{title}</span>
                </button>
              </p>
              <div className="flex items-center gap-2">
                <p className="px-2 text-sm border rounded-lg cursor-default lg:px-3 w-fit lg:text-md border-fuchsia-800 text-fuchsia-800">
                  {data.attachedAction.mediaType === "movie"
                    ? data.attachedAction.mediaType.charAt(0).toUpperCase() + data.attachedAction.mediaType.slice(1)
                    : data.attachedAction.mediaType.toUpperCase()}
                </p>
              </div>
              <p className="mb-2 text-xs transition-all duration-1000 cursor-default lg:text-sm text-slate-400">{date}</p>
            </div>
            <div className="flex justify-center w-1/2 overflow-hidden">
              <img
                className="absolute right-[-1rem] top-[-2.5rem] grayscale group-hover:grayscale-0 blur-sm duration-300 transition-all object-center w-full bg-fuchsia-600 "
                src={`https://image.tmdb.org/t/p/w500${data.attachedAction.poster}`}
              ></img>
            </div>
          </div>
        ) : null}
      </motion.div>
      {/*Action Card Middle Top section end */}
      {/*Action Card Bottom section start */}
      {settings && (
        <ActionDetailsCard
          haveBorder={false}
          icon1={
            <button
              className="flex items-center w-full px-4 py-2 text-sm text-left transition-all bg-fuchsia-800/20 text-slate-200 rounded-xl hover:bg-slate-800"
              onClick={deleteHandler}
            >
              <Cross1Icon className="w-5 h-5 mr-2" />
              Delete
            </button>
          }
        />
      )}
      {/*Action Card Bottom section end */}
    </div>
  );
}

export default FeedActionCard;
