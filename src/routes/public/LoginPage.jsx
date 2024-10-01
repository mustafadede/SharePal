import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import video from "../../assets/video-playback.webm";
import { signInWithEmailAction } from "../../firebase/firebaseActions";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Navbar from "../../components/layout/Navbar";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/authSlice";
import { Cross2Icon, EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import CheckBox from "../../components/common/CheckBox";
import { browserLocalPersistence, browserSessionPersistence, setPersistence } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
import { useTranslation } from "react-i18next";

function LoginPage() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [status, setStatus] = useState("idle");
  const [localStorageAdress, setLocalStorageAdress] = useState(localStorage.getItem("PInf") ? true : false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const submitHandler = (data) => {
    const localMail = JSON.parse(localStorage.getItem("PInf"))?.m || data.email;
    if (localMail && data.password && data.password.length >= 6) {
      localStorageAdress && setValue("email", localMail, { shouldValidate: true });
      setStatus("loading");
      signInWithEmailAction(localMail, data.password).then((res) => {
        if (res.operationType === "signIn") {
          i18n.language === "tr" ? toast("Giriş başarılı!") : toast("Login successful!");
          localStorage.setItem("m", JSON.stringify(localMail));
          setStatus("done");
          navigate("/feed");
          dispatch(authActions.login(res.user.uid));
        } else {
          setStatus("idle");
        }
        if (res === "auth/wrong-password") {
          i18n.language === "tr" ? toast.error("Şifre yanlış!") : toast.error("Wrong password!");
        }
        if (res === "auth/user-not-found") {
          i18n.language === "tr" ? toast.error("Kullanıcı bulunamadı!") : toast.error("User not found!");
        }
        if (res === "auth/too-many-requests") {
          i18n.language === "tr"
            ? toast.error("Çok fazla deneme yaptınız, lütfen daha sonra tekrar deneyin!")
            : toast.error("You have tried too many times, please try again later!");
        }
        if (res === "auth/invalid-email") {
          i18n.language === "tr" ? toast.error("Geçersiz e-posta!") : toast.error("Invalid email!");
        }
      });
    } else {
      i18n.language === "tr" ? toast.error("Lütfen tüm alanları doldurun!") : toast.error("Please fill in all fields!");
    }
  };

  const handleShowPasword = () => {
    setShowPassword(!showPassword);
  };

  const onClassDefiner = (value) => {
    const definer = value
      ? "w-full px-4 py-3 my-2 text-xl transition-colors md:w-3/4 bg-red-900 text-cWhite focus:outline-none focus:bg-opacity-40 rounded-2xl"
      : "w-full px-4 py-3 my-2 text-xl transition-colors md:w-3/4 bg-cGradient1 text-cWhite focus:outline-none focus:bg-opacity-40 rounded-2xl";
    return definer;
  };

  const StateHandler = () => {
    setRememberMe(!rememberMe);
    setPersistence(auth, rememberMe ? browserSessionPersistence : browserLocalPersistence);
  };

  const handleStorage = () => {
    localStorage.removeItem("PInf");
    setLocalStorageAdress(!localStorageAdress);
  };

  useEffect(() => {
    document.title = t("login.windowSettingsTitle");
  }, [i18n.language]);
  return (
    <>
      <Navbar />
      <AnimatePresence>
        <div className="flex flex-col items-center justify-center overflow-hidden md:flex-row">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            className="w-[22rem] md:w-1/2 max-h-24 md:max-h-[calc(100vh-16vh)] mx-10 overflow-hidden rounded-3xl"
          >
            <motion.div className="h-screen overflow-hidden opacity-0 bg-gradient-to-br to-cGradient1 from-pink-800 md:opacity-100">
              <video src={video} autoPlay loop muted height="100%" className="object-cover h-full "></video>
            </motion.div>
          </motion.div>
          <motion.div className="md:w-1/2 max-h-[calc(100vh-16vh)] mx-10">
            <motion.form className="flex flex-col items-center justify-center w-full h-96 md:h-full" onSubmit={handleSubmit(submitHandler)}>
              <h1 className="mb-10 text-5xl font-bold text-center text-cWhite">{t("login.title")}</h1>
              {!localStorageAdress && (
                <motion.input
                  type="email"
                  id="email"
                  placeholder={t("login.emailPlaceholder")}
                  className={onClassDefiner(errors.email)}
                  {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
                  aria-invalid={errors.email ? true : false}
                />
              )}
              {localStorageAdress && (
                <motion.div className="flex items-center justify-between w-full h-20 px-4 text-xl transition-colors duration-300 border cursor-pointer md:w-3/4 hover:bg-slate-900 border-slate-600 text-cWhite bg-slate-950 rounded-2xl">
                  <div className="flex items-center justify-start gap-4 select-none">
                    <img src={JSON.parse(localStorage.getItem("PInf")).p} alt="profile" className="object-cover rounded-full w-14 h-14" />
                    <p>{JSON.parse(localStorage.getItem("PInf")).n}</p>
                  </div>
                  <button
                    type="button"
                    className="text-md text-slate-400"
                    onClick={() => {
                      handleStorage();
                    }}
                  >
                    <Cross2Icon className="w-6 h-6" />
                  </button>
                </motion.div>
              )}
              <div className="relative flex justify-center w-full">
                <motion.input
                  type={showPassword ? "text" : "password"}
                  placeholder={t("login.passwordPlaceholder")}
                  className={onClassDefiner(errors.password)}
                  {...register("password", { required: true, minLength: 6 })}
                  aria-invalid={errors.password ? true : false}
                />
                <button
                  type="button"
                  className="absolute select-none top-6 md:right-14 xl:right-24 2xl:right-24 right-4 text-slate-400"
                  onClick={handleShowPasword}
                >
                  {showPassword ? <EyeOpenIcon className="w-6 h-6" /> : <EyeClosedIcon className="w-6 h-6" />}
                </button>
              </div>
              <div className="flex justify-between w-full sm:justify-around md:ml-2">
                <CheckBox label={t("login.remember")} onClickHandler={StateHandler} />
                <motion.button
                  type="button"
                  className="duration-150 md:mr-4 text-md lg:text-lg hover:underline text-fuchsia-400 focus:outline-none"
                  onClick={() => {
                    navigate("/reset");
                  }}
                >
                  {t("login.forgot")}
                </motion.button>
              </div>
              <button
                type="submit"
                className={
                  status === "loading"
                    ? "w-full py-2 mt-2 text-xl rounded-lg md:w-3/4 bg-slate-600 text-cWhite"
                    : "w-full py-2 mt-2 text-xl rounded-lg md:w-3/4 bg-fuchsia-600 text-cWhite"
                }
              >
                {status === "loading" ? t("info.loading") : t("login.title")}
              </button>
            </motion.form>
          </motion.div>
        </div>
      </AnimatePresence>
    </>
  );
}

export default LoginPage;
