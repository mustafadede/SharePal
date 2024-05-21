import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { privacyActions } from "../../../../store/privacySlice";
import { updateCurrentUserData } from "../../../../firebase/firebaseActions";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

function AccountPrivacy() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { AccountPrivacy } = useSelector((state) => state.privacy);
  const handlePrivacy = () => {
    toast(t("info.comingSoon"));
    // if (AccountPrivacy === "Public") {
    //   updateCurrentUserData(localStorage.getItem("user"), { accountPrivate: "Private" });
    // } else {
    //   updateCurrentUserData(localStorage.getItem("user"), { accountPrivate: "Public" });
    // }
    // dispatch(privacyActions.setAccountPrivacy(AccountPrivacy === "Public" ? "Private" : "Public"));
    // toast.success(`Account Privacy set to ${AccountPrivacy === "Public" ? "Private" : "Public"}`);
  };
  return (
    <div className="flex items-center w-full my-2">
      <div className="flex flex-col">
        <p className="w-full mt-2 text-xl text-slate-300">
          {t("privacy.currentPrivacy")}
          <span className="ml-2 text-fuchsia-600">{AccountPrivacy}</span>
        </p>
        <p className="w-full mt-1 text-slate-500">{t("privacy.currentText")}</p>
      </div>
      <button
        className="flex items-center justify-center h-10 px-4 py-2 ml-auto duration-300 w-fit text-slate-200 hover:bg-fuchsia-600 bg-slate-600 rounded-2xl"
        onClick={handlePrivacy}
      >
        {AccountPrivacy === "Public" ? <p className="text-xl">Private</p> : <p className="text-xl">Public</p>}
      </button>
    </div>
  );
}

export default AccountPrivacy;
