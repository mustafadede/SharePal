import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getAllSelectedUserPostLikeLists, getSpecificPost } from "../../../firebase/firebaseActions";
import FeedCard from "../../common/FeedCard";
function ActivitiesSection({ username, uid }) {
  const [activities, setActivities] = useState([]);
  useEffect(() => {
    if (username) {
      getAllSelectedUserPostLikeLists(uid).then((result) => {
        result.forEach((value) => {
          getSpecificPost(value.id.trim(), value.postId).then((res) => {
            setActivities((prev) => [...prev, res]);
          });
        });
      });
    } else {
      getAllSelectedUserPostLikeLists(localStorage.getItem("user")).then((result) => {
        result.forEach((value) => {
          getSpecificPost(value.id.trim(), value.postId).then((res) => {
            setActivities((prev) => [...prev, res]);
          });
        });
      });
    }
  }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full overflow-y-scroll no-scrollbar">
      {username && activities.length === 0 && <p className="text-2xl text-slate-400">This user doesn't have any activity.</p>}
      {!username && activities.length === 0 && <p className="text-2xl text-slate-400">You don't have any activity.</p>}
      {activities
        .map((data, index) => {
          if (data[0].attachedFilm) {
            return <FeedCard key={index} isAttached={true} data={data[0]} index={index} />;
          } else if (data[0].spoiler) {
            return <FeedCard key={index} isSpoiler={true} data={data[0]} index={index} />;
          } else {
            return <FeedCard key={index} isComment={true} data={data[0]} index={index} />;
          }
        })
        .reverse()}
    </motion.div>
  );
}

export default ActivitiesSection;
