import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import video from "../../assets/video-playback.webm";
import PrimaryButton from "../../components/common/PrimaryButton";

function SignUpPage() {
  return (
    <AnimatePresence>
      <div className="flex">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -100 }}
          className="w-1/2 max-h-[calc(100vh-16vh)] mx-10 overflow-hidden rounded-3xl"
        >
          <motion.div className="h-screen overflow-hidden bg-gradient-to-br to-cGradient1 from-pink-800">
            <video src={video} autoPlay loop muted height="100%" className="object-cover h-full"></video>
          </motion.div>
        </motion.div>
        <motion.div className="w-1/2 max-h-[calc(100vh-16vh)] mx-10 overflow-hidden rounded-3xl ">
          <motion.form className="flex flex-col items-center justify-center w-full h-full">
            <h1 className="mb-10 text-5xl font-bold text-center text-cWhite">Sign Up</h1>
            <motion.input
              type="text"
              placeholder="Username"
              className="w-3/4 px-4 py-3 my-2 text-xl transition-colors bg-cGradient1 text-cWhite focus:outline-none focus:bg-opacity-40 rounded-2xl"
            />
            <motion.input
              type="email"
              placeholder="Email"
              className="w-3/4 px-4 py-3 my-2 text-xl transition-colors bg-cGradient1 text-cWhite focus:outline-none focus:bg-opacity-40 rounded-2xl"
            />
            <motion.input
              type="password"
              placeholder="Password"
              className="w-3/4 px-4 py-3 my-2 text-xl transition-colors bg-cGradient1 text-cWhite focus:outline-none focus:bg-opacity-40 rounded-2xl"
            />
            <motion.input
              type="password"
              placeholder="Confirm Password"
              className="w-3/4 px-4 py-3 my-2 text-xl transition-colors bg-cGradient1 text-cWhite focus:outline-none focus:bg-opacity-40 rounded-2xl"
            />
            <PrimaryButton title="Sign Up" whereTo="/login" />
          </motion.form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

export default SignUpPage;
