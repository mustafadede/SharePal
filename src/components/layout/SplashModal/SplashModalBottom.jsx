import React, { useState } from "react";
import CustomButton from "../../common/CustomButton";
import { useDispatch } from "react-redux";
import { modalActions } from "../../../store/modalSlice";
import { updateCurrentUserData } from "../../../firebase/firebaseActions";
import { motion } from "framer-motion";

function SplashModalBottom() {
  const [stepper, setStepper] = useState(0);
  const dispatch = useDispatch();

  const clickHandler = () => {
    updateCurrentUserData(localStorage.getItem("user"), { splash: true }).then(() => {
      dispatch(modalActions.closeModal());
      localStorage.setItem("ss", true);
    });
  };
  // Selam Ömer
  return (
    <div className="absolute flex flex-col justify-start w-[22rem] md:w-[38rem] lg:w-[40.5rem] mt-4 top-36 md:top-60 lg:top-72">
      {stepper === 0 && (
        <>
          <div className="flex gap-2 pb-2">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-xl font-semibold lg:text-3xl text-cWhite"
            >
              Welcome to
            </motion.p>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-xl font-bold tracking-tight text-transparent lg:text-3xl bg-gradient-to-r from-cDarkerPurple to-pink-500 bg-clip-text animate-text"
            >
              SharePal
            </motion.span>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="h-16 mb-1 text-sm md:text-md lg:text-lg text-slate-400"
          >
            Let's get you started with a few steps.
          </motion.p>
        </>
      )}
      {stepper === 1 && (
        <>
          <p className="pb-2 text-xl font-semibold lg:text-3xl text-cWhite">List it, Pin it!</p>
          <p className="mb-2 text-sm md:text-md lg:text-lg text-slate-400">
            Create a list of your favorite movies, tv shows! Track it with SharePal. Pin it for easy access. Share your list with your
            friends!
          </p>
        </>
      )}
      {stepper === 2 && (
        <>
          <p className="pb-2 text-xl font-semibold lg:text-3xl text-cWhite">Share it!</p>
          <p className="mb-2 text-sm md:text-md lg:text-lg text-slate-400">
            Share your thoughts in Feed! Attach movie or tv show. Be critic about it. You are the writer!
          </p>
        </>
      )}
      {stepper === 3 && (
        <>
          <p className="pb-2 text-xl font-semibold lg:text-3xl text-cWhite">Follow!</p>
          <p className="h-16 text-sm md:text-md lg:text-lg text-slate-400">
            Follow your friends. See what they are up to. See their lists. See their thoughts.
          </p>
        </>
      )}
      {stepper === 0 && (
        <div className="flex justify-end">
          <CustomButton title="Next" onClickHandler={() => setStepper(stepper + 1)} />
        </div>
      )}
      {stepper === 1 && (
        <div className="flex justify-between">
          <CustomButton title="Back" onClickHandler={() => setStepper(stepper - 1)} />
          <CustomButton title="Next" onClickHandler={() => setStepper(stepper + 1)} />
        </div>
      )}
      {stepper === 2 && (
        <div className="flex justify-between">
          <CustomButton title="Back" onClickHandler={() => setStepper(stepper - 1)} />
          <CustomButton title="Next" onClickHandler={() => setStepper(stepper + 1)} />
        </div>
      )}
      {stepper === 3 && (
        <div className="flex justify-between">
          <CustomButton title="Back" onClickHandler={() => setStepper(stepper - 1)} />
          <CustomButton title="Finish" onClickHandler={clickHandler} />
        </div>
      )}
    </div>
  );
}

export default SplashModalBottom;
