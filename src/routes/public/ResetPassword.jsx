import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Navbar from "../../components/layout/Navbar";
import LoginPill from "../../components/common/LoginPill";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useTranslation } from "react-i18next";

function ResetPassword() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

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
    if (data.email) {
      const auth = getAuth();
      sendPasswordResetEmail(auth, data.email)
        .then(() => {
          i18n.language === "tr" ? toast("Şifre sıfırlama e-postası gönderildi!") : toast("Password reset email sent!");
          navigate("/login");
        })
        .catch((error) => {
          toast(error.message);
        });
    } else {
      toast("Please fill all the fields correctly!");
    }
  };

  return (
    <>
      <Navbar />
      <motion.div className="flex flex-col items-center justify-center mt-10 h-96">
        <h1 className="mb-4 text-3xl font-bold text-center md:text-4xl lg:text-5xl text-cWhite">{t("forgot.title")}</h1>
        <motion.form className="w-[46rem] flex flex-col items-center" onSubmit={handleSubmit(submitHandler)}>
          <motion.input
            type="email"
            id="email"
            placeholder={t("login.emailPlaceholder")}
            className={onClassDefiner(errors.email)}
            {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
            aria-invalid={errors.email ? true : false}
          />
          <div className="flex w-1/3 md:w-3/4">
            {localStorage.getItem("m") ? (
              <div className="flex justify-start">
                <LoginPill
                  text={JSON.parse(localStorage.getItem("m"))}
                  onClickHandler={() => {
                    setValue("email", JSON.parse(localStorage.getItem("m")), { shouldValidate: true });
                  }}
                />
              </div>
            ) : null}
          </div>
          <button type="submit" className="w-1/3 py-2 mt-4 text-xl rounded-lg md:w-3/4 bg-fuchsia-800 text-cWhite">
            {t("forgot.button")}
          </button>
        </motion.form>
      </motion.div>
    </>
  );
}

export default ResetPassword;
