import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import video from "../../assets/video-playback.webm";
import { createNickForUser, createUserWithEmailAction, isNickUnique } from "../../firebase/firebaseActions";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Navbar from "../../components/layout/Navbar";
import { useTranslation } from "react-i18next";

function SignUpPage() {
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
        } else {
          i18n.language === "tr" ? toast.error("Kullanıcı adı kullanılmaktadır.") : toast.error("Username is taken.");
        }
      });
    }
  };
  useEffect(() => {
    document.title = t("signup.windowSettingsTitle");
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
      <AnimatePresence>
        <div className="relative flex flex-col items-center justify-center overflow-hidden md:flex-row">
          <motion.div
            key={"signupVideo"}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="w-[22rem] md:w-1/2 max-h-24 md:max-h-[calc(100vh-16vh)] mx-10 overflow-hidden rounded-3xl"
          >
            <motion.div className="h-screen overflow-hidden opacity-0 bg-gradient-to-br to-cGradient1 from-pink-800 md:opacity-100">
              <video src={video} autoPlay loop muted height="100%" className="object-cover h-full "></video>
            </motion.div>
          </motion.div>
          <motion.div className="md:w-1/2 max-h-[calc(100vh-16vh)] mx-10 rounded-3xl ">
            <motion.form
              className="flex flex-col items-center justify-center w-full h-96 md:h-full"
              onSubmit={handleSubmit(submitHandler)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.4 }}
            >
              <motion.p
                className="absolute hidden md:left-[26rem] xl:left-[34rem] 2xl:left-[42rem] lg:flex items-center w-fit h-full select-none font-bold text-[20rem] text-cWhite"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4, duration: 0.4 }}
              >
                {step}
              </motion.p>
              <h1 className="mb-10 text-5xl font-bold text-center text-cWhite">{t("signup.title")}</h1>
              {step === 1 && (
                <>
                  <motion.input
                    id="name"
                    type="text"
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
      </AnimatePresence>
    </>
  );
}

export default SignUpPage;
