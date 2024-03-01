import { InfoCircledIcon } from "@radix-ui/react-icons";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { deleteAccount, updateCurrentUserData } from "../../../../firebase/firebaseActions";
import { useNavigate } from "react-router-dom";
import SettingsSubTitle from "../../../common/SettingsPage/SettingsSubTitle";

function DangerZoneComponent() {
  const [comfirm, setComfirm] = useState(false);
  const [suresure, setSuresure] = useState(false);
  const [reallysure, setReallysure] = useState(false);
  const navigate = useNavigate();
  const deleteAccountHandler = () => {
    updateCurrentUserData(localStorage.getItem("user"), { deleted: true }).then(() => {
      deleteAccount().then((res) => {
        res && toast.success("Your account has been deleted.") && localStorage.removeItem("user") && localStorage.removeItem("m");
        res && navigate("/login");
      });
    });
  };
  return (
    <div>
      <SettingsSubTitle title="✨ Danger Zone ✨" />
      {!comfirm && (
        <p className="flex items-center gap-2 my-2 text-md text-fuchsia-600">
          <InfoCircledIcon className="w-5 h-5 text-fuchsia-600" />
          You can't undo this action and this action will be applied to your account immediately.
        </p>
      )}
      {comfirm ? (
        suresure ? (
          reallysure ? (
            <>
              <p className="my-2 text-2xl text-slate-300">
                Actually we have a deal for you! Don't delete your account and we'll give you %50 discount for ✨ Pro max ultra prime galaxy
                universe ✨ plan. Are you want to take blue pill or red pill ?
              </p>
              <div className="flex items-center gap-2">
                <InfoCircledIcon className="w-4 h-4 text-fuchsia-600" />
                <p className="my-2 text-lg text-fuchsia-600">Note for the users and developer: We don't have any plan. </p>
              </div>
              <div className="flex gap-4">
                <button
                  className="w-1/2 px-4 py-3 my-2 text-xl transition-all bg-blue-600/60 hover:bg-slate-600 text-cWhite focus:outline-none rounded-2xl"
                  onClick={() => {
                    setComfirm(false);
                    setSuresure(false);
                    setReallysure(false);
                  }}
                >
                  Give me the blue pill please
                </button>
                <button
                  className="w-1/2 px-4 py-3 my-2 transition-all bg-red-600 text-md hover:bg-red-600/60 text-cWhite focus:outline-none rounded-2xl"
                  onClick={deleteAccountHandler}
                >
                  We want truth, blood for blood, eye for eye. Delete my account!
                </button>
              </div>
            </>
          ) : (
            <>
              <p className="my-2 text-2xl text-slate-300">Are you really really sure?</p>
              <div className="flex gap-4">
                <button
                  className="w-1/2 px-4 py-3 my-2 text-xl transition-all bg-slate-600 hover:bg-red-600/60 text-cWhite focus:outline-none rounded-2xl"
                  onClick={() => setReallysure(true)}
                >
                  Yes
                </button>
                <button
                  className="w-1/2 px-4 py-3 my-2 text-xl transition-all bg-red-600/60 hover:bg-slate-600 text-cWhite focus:outline-none rounded-2xl"
                  onClick={() => setSuresure(false)}
                >
                  No
                </button>
              </div>
            </>
          )
        ) : (
          <>
            <p className="my-2 text-2xl text-slate-300">Are you sure?</p>
            <div className="flex gap-4">
              <button
                className="w-1/2 px-4 py-3 my-2 text-xl transition-all bg-slate-600 hover:bg-red-600/60 text-cWhite focus:outline-none rounded-2xl"
                onClick={() => setSuresure(true)}
              >
                Yes
              </button>
              <button
                className="w-1/2 px-4 py-3 my-2 text-xl transition-all bg-red-600/60 hover:bg-slate-600 text-cWhite focus:outline-none rounded-2xl"
                onClick={() => setComfirm(false)}
              >
                No
              </button>
            </div>
          </>
        )
      ) : (
        <button
          className="w-full px-4 py-3 my-2 text-xl transition-all bg-slate-600 hover:bg-red-600/60 text-cWhite focus:outline-none rounded-2xl"
          onClick={() => setComfirm(true)}
        >
          Delete Account
        </button>
      )}
    </div>
  );
}

export default DangerZoneComponent;
