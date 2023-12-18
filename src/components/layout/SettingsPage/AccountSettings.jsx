import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../../store/userSlice";
import { updateCurrentUserData, uploadBannerPhoto, uploadProfilePhoto } from "../../../firebase/firebaseActions";
import { toast } from "react-toastify";
import DangerZoneComponent from "./AccountSettingsComponents/DangerZoneComponent";
import ChangePasswordComponent from "./AccountSettingsComponents/ChangePasswordComponent";

function AccountSettings() {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const photoRef = useRef(null);
  const bannerRef = useRef(null);
  const [nick, setNick] = useState(user?.nick);
  const [email, setEmail] = useState(user?.email);
  const [quote, setQuote] = useState(user?.quote);
  const [topOne, setTopOne] = useState(user?.topOne);
  const [instagram, setInstagram] = useState(user?.instagram);
  const [linkedin, setLinkedin] = useState(user?.linkedin);
  const [github, setGithub] = useState(user?.github);

  const formHandler = () => {
    if (!nick && !email && !quote && !topOne) return toast.error("You didn't change anything!");
    if (nick.length > 34) return toast.error("Nickname is too long! (max 34 characters)");
    if (quote.length > 175) return toast.error("Quote is too long! (max 175 characters)");
    if (email && !email.includes("@")) return toast.error("Email is invalid!");
    dispatch(userActions.updateUser({ ...user, nick, email, quote, topOne, instagram, linkedin, github }));
    const data = {
      nick,
      email,
      quote,
      topOne,
      instagram,
      linkedin,
      github,
    };
    updateCurrentUserData(localStorage.getItem("user"), data) && toast.success("Updated successfully!");
  };

  const handleProfileChange = async (e) => {
    toast.info("Uploading...");
    await uploadProfilePhoto(e.target.files[0]);
  };

  const handleBannerChange = async (e) => {
    toast.info("Uploading...");
    await uploadBannerPhoto(e.target.files[0]);
  };

  const handleUploadPhotoButtonClick = () => {
    if (photoRef.current) {
      photoRef.current.click();
    }
  };
  const handleUploadBannerButtonClick = () => {
    if (bannerRef.current) {
      bannerRef.current.click();
    }
  };
  return (
    <motion.div
      className="h-full px-5 py-4 mb-10 sm:mt-4 lg:mt-0 lg:ml-4 lg:flex-col lg:w-full lg:flex bg-slate-900 rounded-2xl"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <h1 className="mb-4 text-3xl text-slate-200">Account</h1>
      <div className="flex flex-col gap-2">
        <p className="w-full my-2 text-xl text-slate-300">Information</p>
        <input
          className="w-full px-4 py-3 my-2 text-xl transition-colors bg-slate-800 text-cWhite focus:outline-none focus:bg-opacity-40 rounded-2xl"
          placeholder={`Your nickname (${user?.nick})`}
          onChange={(e) => {
            setNick(e.target.value);
          }}
        />
        <input
          className="w-full px-4 py-3 my-2 text-xl transition-colors bg-slate-800 text-cWhite focus:outline-none focus:bg-opacity-40 rounded-2xl"
          placeholder={`Email (${user?.email})`}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          className="w-full px-4 py-3 my-2 text-xl transition-colors bg-slate-800 text-cWhite focus:outline-none focus:bg-opacity-40 rounded-2xl"
          placeholder={`Quote (${user?.quote})`}
          onChange={(e) => {
            setQuote(e.target.value);
          }}
        />
        <input
          className="w-full px-4 py-3 my-2 text-xl transition-colors bg-slate-800 text-cWhite focus:outline-none focus:bg-opacity-40 rounded-2xl"
          placeholder={`Favorite in all time (${user?.topOne})`}
          onChange={(e) => {
            setTopOne(e.target.value);
          }}
        />
        <p className="w-full my-2 text-xl text-slate-300">Socials</p>
        <input
          className="w-full px-4 py-3 my-2 text-xl transition-colors bg-slate-800 text-cWhite focus:outline-none focus:bg-opacity-40 rounded-2xl"
          placeholder={instagram ? instagram : `Your Instagram Profile Link`}
          onChange={(e) => {
            setInstagram(e.target.value);
          }}
        />
        <input
          className="w-full px-4 py-3 my-2 text-xl transition-colors bg-slate-800 text-cWhite focus:outline-none focus:bg-opacity-40 rounded-2xl"
          placeholder={github ? github : `Your GitHub Profile Link`}
          onChange={(e) => {
            setGithub(e.target.value);
          }}
        />
        <input
          className="w-full px-4 py-3 my-2 text-xl transition-colors bg-slate-800 text-cWhite focus:outline-none focus:bg-opacity-40 rounded-2xl"
          placeholder={linkedin ? linkedin : `Your LinkedIn Profile Link`}
          onChange={(e) => {
            setLinkedin(e.target.value);
          }}
        />
        <p className="w-full my-2 text-xl text-slate-300">Pictures</p>
        <div className="flex flex-row justify-center gap-10">
          <div className="flex flex-row gap-4 rounded-2xl">
            <div className="flex flex-col gap-2">
              <p className="text-xl text-slate-300">Profile Picture</p>
              <input type="file" accept="image/jpeg" onChange={handleProfileChange} style={{ display: "none" }} ref={photoRef} />
              <button
                className="px-4 py-3 text-lg transition-all hover:bg-fuchsia-800 bg-slate-600 text-cWhite focus:outline-none rounded-2xl"
                onClick={handleUploadPhotoButtonClick}
              >
                Upload
              </button>
            </div>
          </div>
          <div className="flex flex-row gap-4 rounded-2xl">
            <div className="flex flex-col gap-2">
              <p className="text-xl text-slate-300">Banner Picture</p>
              <input type="file" accept="image/jpeg, image/gif" onChange={handleBannerChange} style={{ display: "none" }} ref={bannerRef} />
              <button
                className="px-4 py-3 text-lg transition-all hover:bg-fuchsia-800 bg-slate-600 text-cWhite focus:outline-none rounded-2xl"
                onClick={handleUploadBannerButtonClick}
              >
                Upload
              </button>
            </div>
          </div>
        </div>
        <ChangePasswordComponent />
        <button
          className="w-full px-4 py-3 my-2 text-xl transition-all hover:bg-fuchsia-800 bg-slate-600 text-cWhite focus:outline-none rounded-2xl"
          onClick={formHandler}
        >
          Save
        </button>
        <DangerZoneComponent />
      </div>
    </motion.div>
  );
}

export default AccountSettings;
