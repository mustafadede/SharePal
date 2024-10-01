import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Navbar from "../../components/layout/Navbar";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useTranslation } from "react-i18next";
import { Cross2Icon } from "@radix-ui/react-icons";

function ResetPassword() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [localStorageAdress, setLocalStorageAdress] = useState(localStorage.getItem("PInf") ? true : false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    document.title = t("forgot.windowSettingsTitle");
  }, [i18n.language]);

  const onClassDefiner = (value) => {
    const definer = value
      ? "w-1/3 md:w-3/4 px-4 py-3 my-2 text-xl transition-colors md:w-3/4 bg-red-900 text-cWhite focus:outline-none focus:bg-opacity-40 rounded-2xl"
      : "w-1/3 md:w-3/4 px-4 py-3 my-2 text-xl transition-colors md:w-3/4 bg-cGradient1 text-cWhite focus:outline-none focus:bg-opacity-40 rounded-2xl";
    return definer;
  };

  const submitHandler = (data) => {
    const localMail = JSON.parse(localStorage.getItem("PInf"))?.m || data.email;

    if (localMail) {
      const auth = getAuth();
      sendPasswordResetEmail(auth, localMail)
        .then(() => {
          i18n.language === "tr" ? toast("Şifre sıfırlama e-postası gönderildi!") : toast("Password reset email sent!");
          navigate("/login");
        })
        .catch((error) => {
          if (error.code === "auth/user-not-found") {
            i18n.language === "tr" ? toast.error("Kullanıcı bulunamadı!") : toast.error("User not found!");
          }
          if (error.code === "auth/invalid-email") {
            i18n.language === "tr" ? toast.error("Geçersiz e-posta!") : toast.error("Invalid email!");
          }
          if (error.code === "auth/too-many-requests") {
            i18n.language === "tr"
              ? toast.error("Çok fazla deneme yaptınız, lütfen daha sonra tekrar deneyin!")
              : toast.error("You have tried too many times, please try again later!");
          }
        });
    } else {
      toast("Please fill all the fields correctly!");
    }
  };

  const handleStorage = () => {
    localStorage.removeItem("PInf");
    setLocalStorageAdress(!localStorageAdress);
  };

  return (
    <>
      <Navbar />
      <motion.div className="flex flex-col items-center justify-center mt-10 h-96">
        <h1 className="mb-4 text-3xl font-bold text-center md:text-4xl lg:text-5xl text-cWhite">{t("forgot.title")}</h1>
        <motion.form className="w-[46rem] flex flex-col items-center" onSubmit={handleSubmit(submitHandler)}>
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
            <motion.div className="flex items-center justify-between w-1/3 h-20 px-4 text-xl transition-colors duration-300 border cursor-pointer md:w-3/4 hover:bg-slate-900 border-slate-600 text-cWhite bg-slate-950 rounded-2xl">
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
          <button type="submit" className="w-1/3 py-2 mt-4 text-xl rounded-lg md:w-3/4 bg-fuchsia-800 text-cWhite">
            {t("forgot.button")}
          </button>
        </motion.form>
      </motion.div>
    </>
  );
}

export default ResetPassword;
