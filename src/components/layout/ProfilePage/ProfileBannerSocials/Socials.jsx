import { ExternalLinkIcon, GitHubLogoIcon, InstagramLogoIcon, LinkedInLogoIcon, Share1Icon } from "@radix-ui/react-icons";
import React from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
function Socials({ user, hasUser }) {
  const handleClick = (link) => {
    navigator.clipboard.writeText(link) && toast.success("Copied to clipboard!");
  };

  return (
    <div className="flex items-center justify-center md:block">
      <div className="absolute flex flex-row-reverse items-center justify-center h-12 gap-2 w-fit md:right-5 bottom-2 md:bottom-3">
        <div className="flex flex-row-reverse w-full gap-2">
          {user && (
            <button onClick={() => handleClick(`https://sharepal.dev/#/user/${user?.nick}`)}>
              <motion.div
                className="relative p-2 text-lg transition-all bg-transparent border-2 rounded-lg border-slate-400 text-slate-400 hover:border-fuchsia-800 hover:bg-fuchsia-800 hover:text-cWhite"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <ExternalLinkIcon />
              </motion.div>
            </button>
          )}
          {user?.instagram && (
            <a href={user?.instagram} target="_blank" rel="noreferrer">
              <motion.div
                className="relative p-2 text-lg transition-all bg-transparent border-2 rounded-lg border-slate-400 text-slate-400 hover:border-fuchsia-800 hover:bg-fuchsia-800 hover:text-cWhite"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <InstagramLogoIcon />
              </motion.div>
            </a>
          )}
          {user?.github && (
            <a href={user?.github} target="_blank" rel="noreferrer">
              <motion.div
                className="relative p-2 text-lg transition-all bg-transparent border-2 rounded-lg border-slate-400 text-slate-400 hover:border-fuchsia-800 hover:bg-fuchsia-800 hover:text-cWhite"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <GitHubLogoIcon />
              </motion.div>
            </a>
          )}
          {user?.linkedin && (
            <a href={user?.linkedin} target="_blank" rel="noreferrer">
              <motion.div
                className="relative p-2 text-lg transition-all bg-transparent border-2 rounded-lg border-slate-400 text-slate-400 hover:border-fuchsia-800 hover:bg-fuchsia-800 hover:text-cWhite"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <LinkedInLogoIcon />
              </motion.div>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default Socials;
