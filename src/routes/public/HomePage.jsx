import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../../components/layout/Navbar";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import HomePageTopSection from "../../components/layout/HomePage/HomePageTopSection";
import HomePageMiddleTopSection from "../../components/layout/HomePage/HomePageMiddleTopSection";
import HomePageBottomMiddleSection from "../../components/layout/HomePage/HomePageBottomMiddleSection";

function HomePage() {
  const navigate = useNavigate();
  const { i18n, t } = useTranslation();
  useEffect(() => {
    document.title = "SharePal";
    if (localStorage.getItem("user")) {
      i18n.language === "tr"
        ? toast.success("Zaten giriş yaptınız. Yönlendiriliyorsunuz.")
        : toast.success("You are already logged in. Redirecting to feed.");
      const timeoutDirection = setTimeout(() => {
        navigate("/feed");
      }, 3000);
      return () => clearTimeout(timeoutDirection);
    } else {
      navigate("/");
    }
  }, []);
  return (
    <>
      <Navbar />
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -100 }}
          className="flex flex-col h-full gap-4 mx-10 overflow-hidden"
        >
          <HomePageTopSection />
          <HomePageMiddleTopSection />
          <HomePageBottomMiddleSection />
        </motion.div>
      </AnimatePresence>
    </>
  );
}

export default HomePage;
