import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

function LoginRestrictionComponent() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const clickHandler = () => {
    navigate("/login");
  };
  return (
    <button className="w-full p-4 mt-1 text-xl text-center hover:underline text-slate-400 bg-slate-900 rounded-2xl" onClick={clickHandler}>
      {t("info.loginToSee")}
    </button>
  );
}

export default LoginRestrictionComponent;
