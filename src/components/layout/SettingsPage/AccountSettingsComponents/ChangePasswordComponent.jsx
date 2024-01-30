import { EmailAuthProvider, getAuth, reauthenticateWithCredential, updatePassword } from "firebase/auth";
import React, { useState } from "react";
import { toast } from "react-toastify";

function ChangePasswordComponent() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const formHandler = () => {
    if (!currentPassword || !newPassword || !confirmNewPassword) return toast.error("You didn't fill all the fields!");
    if (newPassword !== confirmNewPassword) return toast.error("New passwords don't match!");
    if (newPassword.length < 6) return toast.error("Password must be at least 6 characters long!");
    toast.info("Changing password...");
    const credential = EmailAuthProvider.credential(getAuth().currentUser.email, currentPassword);
    reauthenticateWithCredential(getAuth().currentUser, credential)
      .then(() => {
        updatePassword(getAuth().currentUser, newPassword)
          .then(() => {
            toast.success("Password changed successfully!");
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
      <p className="my-2 text-xl text-slate-300">Password</p>
      <input
        className="px-4 py-3 my-2 text-xl transition-colors bg-slate-800 text-cWhite focus:outline-none focus:bg-opacity-40 rounded-2xl"
        placeholder="Current Password"
        value={currentPassword}
        onChange={(e) => {
          setCurrentPassword(e.target.value);
        }}
      />
      <input
        className="px-4 py-3 my-2 text-xl transition-colors bg-slate-800 text-cWhite focus:outline-none focus:bg-opacity-40 rounded-2xl"
        placeholder="Your New Password"
        value={newPassword}
        onChange={(e) => {
          setNewPassword(e.target.value);
        }}
      />
      <input
        className="px-4 py-3 my-2 text-xl transition-colors bg-slate-800 text-cWhite focus:outline-none focus:bg-opacity-40 rounded-2xl"
        placeholder="Confirm New Password"
        value={confirmNewPassword}
        onChange={(e) => {
          setConfirmNewPassword(e.target.value);
        }}
      />
      <button
        className="w-full px-4 py-3 my-2 text-xl transition-all hover:bg-fuchsia-800 bg-slate-600 text-cWhite focus:outline-none rounded-2xl"
        onClick={formHandler}
      >
        Change Password
      </button>
    </>
  );
}

export default ChangePasswordComponent;
