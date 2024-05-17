import { EmailAuthProvider, getAuth, reauthenticateWithCredential, updatePassword } from "firebase/auth";
import React, { useState } from "react";
import { toast } from "react-toastify";
import SettingsSubTitle from "../../../common/SettingsPage/SettingsSubTitle";
import { useTranslation } from "react-i18next";

function ChangePasswordComponent() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const { t } = useTranslation();

  const formHandler = () => {
    if (!currentPassword || !newPassword || !confirmNewPassword) return toast.error(t("password.fillAllFields"));
    if (newPassword !== confirmNewPassword) return toast.error(t("password.passwordsDoNotMatch"));
    if (newPassword.length < 6) return toast.error(t("password.passwordLengthError"));
    toast.info(t("password.changingPassword"));
    const credential = EmailAuthProvider.credential(getAuth().currentUser.email, currentPassword);
    reauthenticateWithCredential(getAuth().currentUser, credential)
      .then(() => {
        updatePassword(getAuth().currentUser, newPassword)
          .then(() => {
            toast.success(t("password.passwordChanged"));
            setCurrentPassword("");
            setNewPassword("");
            setConfirmNewPassword("");
          })
          .catch((err) => {
            toast.error(err.message);
          });
      })
      .catch((err) => {
        console.log(err.message);
        toast.error(err.message);
      });
  };
  return (
    <>
      <SettingsSubTitle title={t("password.title")} />
      <input
        className="px-4 py-3 my-2 text-xl transition-colors bg-slate-800 text-cWhite focus:outline-none focus:bg-opacity-40 rounded-2xl"
        placeholder={t("password.currentPassword")}
        type="password"
        value={currentPassword}
        onChange={(e) => {
          setCurrentPassword(e.target.value);
        }}
      />
      <input
        className="px-4 py-3 my-2 text-xl transition-colors bg-slate-800 text-cWhite focus:outline-none focus:bg-opacity-40 rounded-2xl"
        placeholder={t("password.newPassword")}
        type="password"
        value={newPassword}
        onChange={(e) => {
          setNewPassword(e.target.value);
        }}
      />
      <input
        className="px-4 py-3 my-2 text-xl transition-colors bg-slate-800 text-cWhite focus:outline-none focus:bg-opacity-40 rounded-2xl"
        placeholder={t("password.confirmNewPassword")}
        type="password"
        value={confirmNewPassword}
        onChange={(e) => {
          setConfirmNewPassword(e.target.value);
        }}
      />
      <button
        className="w-full px-4 py-3 my-2 text-xl transition-all hover:bg-fuchsia-800 bg-slate-600 text-cWhite focus:outline-none rounded-2xl"
        onClick={formHandler}
      >
        {t("password.change")}
      </button>
    </>
  );
}

export default ChangePasswordComponent;
