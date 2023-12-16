import React, { useState } from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { getUserOnlineStatus } from "../../firebase/firebaseActions";
import { getAuth } from "firebase/auth";

function ProfileOnlineStatus({ username }) {
  const [online, setOnline] = useState(false);
  const { profileUser } = useSelector((state) => state.profile);
  const { user } = useSelector((state) => state.user);
  useState(() => {
    if (!username) {
      setOnline(user?.online);
      console.log(getAuth().currentUser);
    } else {
      getUserOnlineStatus(profileUser?.uid).then((res) => {
        console.log(res);
        setOnline(res?.online);
      });
    }
  }, []);

  return (
    <motion.div
      aria-label="Online status"
      className={
        online
          ? "absolute z-20 w-4 h-4 bg-green-600 rounded-full bottom-1 right-2 md:bottom-3 md:right-4"
          : "absolute z-20 w-4 h-4 rounded-full bottom-1 right-2 md:bottom-3 md:right-4 bg-slate-400"
      }
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    ></motion.div>
  );
}

export default ProfileOnlineStatus;
