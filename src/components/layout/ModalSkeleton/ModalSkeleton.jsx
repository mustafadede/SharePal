import React, { useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import { useDispatch } from "react-redux";
import { modalActions } from "../../../store/modalSlice";
import { motion, AnimatePresence } from "framer-motion";

const ModalOverlay = (props) => {
  const stopPropagation = (e) => {
    e.stopPropagation();
  };
  return (
    <AnimatePresence>
      <motion.div
        className="fixed z-50 flex items-center justify-center w-full h-full transition-all backdrop-blur-sm "
        onClick={props.closeModal}
        key="modalOverlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          onClick={stopPropagation}
          key="modalContent"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          exit={{ opacity: 0, y: -20 }}
        >
          {props.children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

function ModalSkeleton(props) {
  const portalElement = document.getElementById("modal");
  const dispatch = useDispatch();
  const escfunction = useCallback((event) => {
    if (event.key === "Escape") {
      dispatch(modalActions.closeModal());
      // console.clear();
    } else {
      return false;
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", escfunction, false);

    return () => {
      document.removeEventListener("keydown", escfunction, false);
    };
  }, []);

  const closeModal = () => {
    dispatch(modalActions.closeModal());
    console.clear();
  };

  return <>{createPortal(<ModalOverlay closeModal={closeModal}>{props.children}</ModalOverlay>, portalElement)}</>;
}

export default ModalSkeleton;
