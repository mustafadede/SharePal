import React from "react";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { modalActions } from "../../../store/modalSlice";

function PersonCard({ id, name, profile_path, known_for }) {
  const dispatch = useDispatch();

  const handleModal = () => {
    dispatch(
      modalActions.openModal({
        name: "personModal",
        data: {
          id,
          name,
          profile_path,
          known_for,
        },
      })
    );
  };

  return (
    <motion.div
      className="relative w-40 m-2 overflow-hidden duration-150 border-transparent cursor-pointer hover:border hover:border-white h-72 md:h-80 rounded-2xl"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleModal}
    >
      {profile_path ? (
        <motion.img
          className="object-cover w-full h-full transition-all duration-300 brightness-90"
          src={`https://image.tmdb.org/t/p/w500/${profile_path}`}
          alt={name}
          loading="lazy"
          whileHover={{ brightness: 0.5 }}
        />
      ) : (
        <motion.div
          className="flex items-center justify-center w-full h-full bg-slate-800"
          whileHover={{ backgroundColor: "rgb(30 41 59)" }}
        >
          <p className="p-4 text-center text-slate-400">{name}</p>
        </motion.div>
      )}
      <motion.div
        className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <motion.h3
          className="text-lg font-medium text-slate-200"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {name}
        </motion.h3>
        {known_for && known_for.length > 0 && (
          <motion.p
            className="text-sm text-slate-400 line-clamp-2"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Known for: {known_for.map((item) => item.title || item.name).join(", ")}
          </motion.p>
        )}
      </motion.div>
    </motion.div>
  );
}

export default PersonCard;
