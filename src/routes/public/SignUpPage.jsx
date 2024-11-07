import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createNickForUser, createUserWithEmailAction, isNickUnique } from "../../firebase/firebaseActions";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Navbar from "../../components/layout/Navbar";
import { useTranslation } from "react-i18next";
import Footer from "../../components/common/Footer";

const images = ["/public/images/0.jpg", "/public/images/1.jpg", "/public/images/2.jpg", "/public/images/3.jpg"];

function SignUpPage() {
  const [imageState, setImageState] = useState(0);
  const { t, i18n } = useTranslation();
  const [step, setStep] = useState(1);

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onClassDefiner = (value) => {
    const definer = value
      ? "w-full px-4 py-3 my-2 text-xl transition-colors md:w-3/4 bg-red-900 text-cWhite focus:outline-none focus:bg-opacity-40 rounded-2xl"
      : "w-full px-4 py-3 my-2 text-xl transition-colors md:w-3/4 bg-cGradient1 text-cWhite focus:outline-none focus:bg-opacity-40 rounded-2xl";
    return definer;
  };

  const submitHandler = (data) => {
    if (data.confirmPassword !== data.password) {
      return i18n.language === "tr" ? toast.error("Şifreler eşleşmiyor!") : toast.error("Passwords do not match!");
    }
    if (data.password && data.password.length >= 6) {
      isNickUnique(data.name).then((res) => {
        if (res) {
          createUserWithEmailAction(data).then((res) => {
            if (res) {
              createNickForUser(data.name);
              navigate("/login");
              i18n.language === "tr" ? toast("Hesap oluşturuldu.") : toast("Account created successfully!");
            }
          });
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
        } else {
          i18n.language === "tr" ? toast.error("Kullanıcı adı kullanılmaktadır.") : toast.error("Username is taken.");
        }
      });
    }
  };
  useEffect(() => {
    document.title = t("signup.windowSettingsTitle");
    const interval = setInterval(() => {
      setImageState((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const stepperFunction = (stepperInfo) => {
    if (stepperInfo === "back") {
      return setStep(step - 1);
    } else if (stepperInfo === "next") {
      return setStep(step + 1);
    }
  };
  return (
    <>
      <Navbar />
      <div className="relative flex flex-col items-center justify-center h-screen mx-6 mb-4 overflow-hidden md:flex-row">
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="relative items-center justify-center hidden w-1/2 overflow-hidden rounded-2xl md:flex"
          >
            <img src="public/images/phone.png" alt="phone" className="object-cover w-[1640px] rounded-2xl" />
            <motion.img
              key={imageState}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0.7 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              src={images[imageState]}
              alt="screen"
              className="absolute z-10 object-cover w-8/12 top-32 lg:top-40 xl:top-52 2xl:top-60"
            />
          </motion.div>
        </AnimatePresence>
        <motion.div className="md:w-1/2 max-h-[calc(100vh-16vh)] mx-10 rounded-3xl ">
          <motion.form
            className="flex flex-col items-center justify-center w-full h-96 md:h-full"
            onSubmit={handleSubmit(submitHandler)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.4 }}
          >
            <h1 className="mb-10 text-5xl font-bold text-center text-cWhite">{t("signup.title")}</h1>
            {step === 1 && (
              <>
                <motion.input
                  id="name"
                  type="text"
                  required
                  placeholder={t("signup.namePlaceholder")}
                  className={onClassDefiner(errors.name)}
                  {...register("name", { required: true, minLength: 3 })}
                  aria-invalid={errors.name ? true : false}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
                <button
                  type="submit"
                  className="w-full py-2 mt-2 text-xl rounded-lg md:w-3/4 bg-fuchsia-600 text-cWhite"
                  onClick={() => stepperFunction("next")}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {t("signup.next")}
                </button>
              </>
            )}
            {step === 2 && (
              <>
                <motion.input
                  type="email"
                  id="email"
                  required
                  placeholder={t("signup.emailPlaceholder")}
                  className={onClassDefiner(errors.email)}
                  {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
                  aria-invalid={() => (errors.email ? true : false)}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
                <div className="flex w-64 md:w-[26rem] gap-4">
                  <button
                    type="submit"
                    className="w-full py-2 mt-2 text-xl rounded-lg md:w-3/4 bg-slate-800 text-cWhite"
                    onClick={() => stepperFunction("back")}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {t("signup.back")}
                  </button>
                  <button
                    type="submit"
                    className="w-full py-2 mt-2 text-xl rounded-lg md:w-3/4 bg-fuchsia-600 text-cWhite"
                    onClick={() => stepperFunction("next")}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {t("signup.next")}
                  </button>
                </div>
              </>
            )}
            {step === 3 && (
              <>
                <motion.input
                  type="password"
                  placeholder={t("signup.passwordPlaceholder")}
                  required
                  className={onClassDefiner(errors.password)}
                  {...register("password", { required: true, minLength: 6 })}
                  aria-invalid={errors.password ? true : false}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
                <motion.input
                  type="password"
                  id="confirmPassword"
                  required
                  placeholder={t("signup.confirmPasswordPlaceholder")}
                  className={onClassDefiner(errors.confirmPassword)}
                  {...register("confirmPassword", { required: true, minLength: 6 })}
                  aria-invalid={errors.confirmPassword ? true : false}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
                <div className="flex w-64 md:w-[26rem] gap-4">
                  <button
                    type="submit"
                    className="w-full py-2 mt-2 text-xl rounded-lg md:w-3/4 bg-slate-800 text-cWhite"
                    onClick={() => stepperFunction("back")}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {t("signup.back")}
                  </button>
                  <button type="submit" className="w-full py-2 mt-2 text-xl rounded-lg md:w-3/4 bg-fuchsia-600 text-cWhite">
                    {t("signup.title")}
                  </button>
                </div>
              </>
            )}
          </motion.form>
        </motion.div>
      </div>
      <Footer />
    </>
  );
}

export default SignUpPage;
