import React, { useState } from "react";
import CustomButton from "../../common/CustomButton";
import { useDispatch } from "react-redux";
import { modalActions } from "../../../store/modalSlice";
import { updateCurrentUserData } from "../../../firebase/firebaseActions";

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
    <div className="absolute flex flex-col justify-start w-[40.5rem] mt-4 top-72">
      {stepper === 0 && (
        <>
          <p className="text-xl font-semibold lg:text-3xl text-cWhite">Welcome to SharePal!</p>
          <p className="h-16 pt-2 text-md lg:text-lg text-slate-400">Let's get you started with a few steps.</p>
        </>
      )}
      {stepper === 1 && (
        <>
          <p className="text-xl font-semibold lg:text-3xl text-cWhite">List it, Pin it!</p>
          <p className="pt-2 text-md lg:text-lg text-slate-400">
            Create a list of your favorite movies, tv shows! Track it with SharePal. Pin it for easy access. Share your list with your
            friends!
          </p>
        </>
      )}
      {stepper === 2 && (
        <>
          <p className="text-xl font-semibold lg:text-3xl text-cWhite">Share it!</p>
          <p className="pt-2 text-md lg:text-lg text-slate-400">
            Share your thoughts in Feed! Attach movie or tv show. Be critic about it. You are the writer!
          </p>
        </>
      )}
      {stepper === 3 && (
        <>
          <p className="text-xl font-semibold lg:text-3xl text-cWhite">Follow!</p>
          <p className="h-16 pt-2 text-md lg:text-lg text-slate-400">
            Follow your friends. See what they are up to. See their lists. See their thoughts.
          </p>
        </>
      )}
      {stepper === 0 && (
        <div className="flex justify-end mt-4">
          <CustomButton title="Next" onClickHandler={() => setStepper(stepper + 1)} />
        </div>
      )}
      {stepper === 1 && (
        <div className="flex justify-between mt-4">
          <CustomButton title="Back" onClickHandler={() => setStepper(stepper - 1)} />
          <CustomButton title="Next" onClickHandler={() => setStepper(stepper + 1)} />
        </div>
      )}
      {stepper === 2 && (
        <div className="flex justify-between mt-4">
          <CustomButton title="Back" onClickHandler={() => setStepper(stepper - 1)} />
          <CustomButton title="Next" onClickHandler={() => setStepper(stepper + 1)} />
        </div>
      )}
      {stepper === 3 && (
        <div className="flex justify-between mt-4">
          <CustomButton title="Back" onClickHandler={() => setStepper(stepper - 1)} />
          <CustomButton title="Finish" onClickHandler={clickHandler} />
        </div>
      )}
    </div>
  );
}

export default SplashModalBottom;
