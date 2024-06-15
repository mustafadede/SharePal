import { InfoCircledIcon } from "@radix-ui/react-icons";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { deleteAccount, updateCurrentUserData } from "../../../../firebase/firebaseActions";
import { useNavigate } from "react-router-dom";
import SettingsSubTitle from "../../../common/SettingsPage/SettingsSubTitle";
import { useTranslation } from "react-i18next";

function DangerZoneComponent() {
  const [comfirm, setComfirm] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const deleteAccountHandler = () => {
    updateCurrentUserData(localStorage.getItem("user"), { deleted: true }).then(() => {
      deleteAccount().then((res) => {
        res && toast.success("Your account has been deleted.") && localStorage.removeItem("user") && localStorage.removeItem("m");
        res && navigate("/login");
      });
    });
  };
  return (
    <div className="px-5 py-4 bg-slate-900/50 rounded-2xl">
      <SettingsSubTitle title={t("dangerZone.title")} />
      {!comfirm && (
        <p className="flex items-center gap-2 my-2 text-md text-fuchsia-600">
          <InfoCircledIcon className="w-5 h-5 text-fuchsia-600" />
          {t("dangerZone.subTitle")}
        </p>
      )}
      {comfirm ? (
        <>
          <p className="my-2 text-md text-slate-300">{t("dangerZone.deleteText")}</p>
          <div className="flex gap-4">
            <button
              className="w-1/2 px-3 py-2 my-2 text-lg transition-all bg-slate-600 hover:bg-red-600/60 text-cWhite focus:outline-none rounded-2xl"
              onClick={deleteAccountHandler}
            >
              {t("dangerZone.confirm")}
            </button>
            <button
              className="w-1/2 px-3 py-2 my-2 text-lg transition-all bg-red-600/60 hover:bg-slate-600 text-cWhite focus:outline-none rounded-2xl"
              onClick={() => setComfirm(false)}
            >
              {t("dangerZone.cancel")}
            </button>
          </div>
        </>
      ) : (
        <button
          className="w-full px-4 py-3 my-2 text-xl transition-all bg-slate-600 hover:bg-red-600/60 text-cWhite focus:outline-none rounded-2xl"
          onClick={() => setComfirm(true)}
        >
          {t("dangerZone.delete")}
        </button>
      )}
    </div>
  );
}

export default DangerZoneComponent;
