import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import video from "../../assets/video-playback.webm";
import { signInWithEmailAction } from "../../firebase/firebaseActions";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";

function LoginPage() {
  const [email, setEmail] = useState("mustafadede@gmail.com");
  const [password, setPassword] = useState("123123");

  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (email && password && password.length >= 6) {
      signInWithEmailAction(email, password).then((res) => {
        if (res) {
          toast("Giriş başarılı!");
          navigate("/feed");
        }
      });
    } else {
      toast("Lütfen bilgileri kontrol edin!");
    }
  };
  return (
    <>
      <Navbar />
      <AnimatePresence>
        <div className="flex flex-col items-center justify-center md:flex-row overflow-hidden">
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
          <motion.div className="md:w-1/2 max-h-[calc(100vh-16vh)] mx-10 overflow-hidden rounded-3xl ">
            <motion.form className="flex flex-col items-center justify-center w-full h-96 md:h-full" onSubmit={submitHandler}>
              <h1 className="mb-10 text-5xl font-bold text-center text-cWhite">Log In</h1>
              <motion.input
                type="email"
                placeholder="mustafadede@gmail.com"
                className="w-full px-4 py-3 my-2 text-xl transition-colors md:w-3/4 bg-cGradient1 text-cWhite focus:outline-none focus:bg-opacity-40 rounded-2xl"
                onChange={handleEmailChange}
              />
              <motion.input
                type="password"
                placeholder="123123"
                className="w-full px-4 py-3 my-2 text-xl transition-colors md:w-3/4 bg-cGradient1 text-cWhite focus:outline-none focus:bg-opacity-40 rounded-2xl"
                onChange={handlePasswordChange}
              />
              <button type="submit" className="w-full py-2 mt-2 text-xl rounded-lg md:w-3/4 bg-fuchsia-600 text-cWhite">
                Log In
              </button>
            </motion.form>
          </motion.div>
        </div>
      </AnimatePresence>
    </>
  );
}

export default LoginPage;
