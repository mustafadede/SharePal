import React from "react";
import FeedCardOnlineStatus from "../../FeedCardOnlineStatus";
import { motion } from "framer-motion";

function NotificationPhoto({ uid, photoURL }) {
  return (
    <div>
      {!photoURL && (
        <div className="relative w-12 h-12 lg:w-16 lg:h-16">
          <motion.div className="w-12 h-12 rounded-full lg:w-16 lg:h-16 bg-fuchsia-600"></motion.div>
          {/* <FeedCardOnlineStatus username={true} data={uid} /> */}
        </div>
      )}
      {photoURL && (
        <div className="relative w-12 h-12 lg:w-16 lg:h-16">
          <motion.img
            className="object-cover w-12 h-12 rounded-full lg:w-16 lg:h-16 bg-fuchsia-600"
            loading="lazy"
            src={photoURL}
          ></motion.img>
          {/* <FeedCardOnlineStatus username={true} data={uid} /> */}
        </div>
      )}
    </div>
  );
}

export default NotificationPhoto;
