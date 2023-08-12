import React from "react";
import { motion } from "framer-motion";
function PostsSection() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full h-96">
      <p className="text-3xl text-slate-200">Posts</p>
    </motion.div>
  );
}

export default PostsSection;
