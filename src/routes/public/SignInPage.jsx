import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import video from "../../assets/video-playback.webm";

function SignInPage() {
  return (
    <AnimatePresence>
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
    </AnimatePresence>
  );
}

export default SignInPage;
