import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getAllSelectedUserPostLikeLists, getAllSelectedUserPostRepostsLists, getSpecificPost } from "../../../firebase/firebaseActions";
import FeedCard from "../../common/FeedCard";
import FeedTabs from "../FeedPage/FeedTabs";
import InfoLabel from "../../common/InfoLabel";
import LoginRestrictionComponent from "../../common/LoginRestrictionComponent";
function ActivitiesSection({ username, uid }) {
  const [likes, setLikes] = useState([]);
  const [comments, setComments] = useState([]);
  const [reposts, setReposts] = useState([]);

  useEffect(() => {
    if (username) {
      getAllSelectedUserPostLikeLists(uid).then((result) => {
        result.forEach((value) => {
          getSpecificPost(value.id.trim(), value.postId).then((res) => {
            res.length > 0 ? setLikes((prev) => [...prev, res]) : null;
          });
        });
      });
      getAllSelectedUserPostRepostsLists(uid).then((result) => {
        result.forEach((value) => {
          getSpecificPost(value.id.trim(), value.postId).then((res) => {
            res.length > 0 ? setReposts((prev) => [...prev, res]) : null;
          });
        });
      });
    } else {
      getAllSelectedUserPostLikeLists(localStorage.getItem("user")).then((result) => {
        result.forEach((value) => {
          getSpecificPost(value.id.trim(), value.postId).then((res) => {
            res.length > 0 ? setLikes((prev) => [...prev, res]) : null;
          });
        });
      });
      getAllSelectedUserPostRepostsLists(localStorage.getItem("user")).then((result) => {
        result.forEach((value) => {
          getSpecificPost(value.id.trim(), value.postId).then((res) => {
            res.length > 0 ? setReposts((prev) => [...prev, res]) : null;
          });
        });
      });
    }
  }, []);
  const [tab, setTab] = useState(0);
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full overflow-y-scroll no-scrollbar">
      {localStorage.getItem("user") && <FeedTabs tabInfo={tab} tab={setTab} info={"activities"} />}
      {!localStorage.getItem("user") ? <LoginRestrictionComponent /> : null}
      {username && likes.length === 0 && tab === 0 && localStorage.getItem("user") && (
        <p className="w-full p-4 mt-1 text-xl text-center text-slate-400 bg-slate-900 rounded-2xl h-fit">
          This user doesn't have any likes.
        </p>
      )}
      {username && comments.length === 0 && tab === 1 && <InfoLabel text="This user doesn't have any comments." />}
      {username && reposts.length === 0 && tab === 2 && <InfoLabel text="This user doesn't have any reposts." />}
      {!username && likes.length === 0 && tab === 0 && <InfoLabel text="You don't have any likes." />}
      {!username && comments.length === 0 && tab === 1 && <InfoLabel text="You don't have any comments." />}
      {!username && reposts.length === 0 && tab === 2 && <InfoLabel text="You don't have any reposts." />}
      {tab === 0 && likes.length > 0
        ? likes
            .map((data, index) => {
              if (data[0].attachedFilm) {
                return <FeedCard key={index} isAttached={true} data={data[0]} index={index} />;
              } else if (data[0].spoiler) {
                return <FeedCard key={index} isSpoiler={true} data={data[0]} index={index} />;
              } else {
                return <FeedCard key={index} isComment={true} data={data[0]} index={index} />;
              }
            })
            .reverse()
        : null}
      {tab === 2 && reposts.length > 0
        ? reposts
            .map((data, index) => {
              if (data[0].attachedFilm) {
                return <FeedCard key={index} isAttached={true} data={data[0]} index={index} />;
              } else if (data[0].spoiler) {
                return <FeedCard key={index} isSpoiler={true} data={data[0]} index={index} />;
              } else {
                return <FeedCard key={index} isComment={true} data={data[0]} index={index} />;
              }
            })
            .reverse()
        : null}
    </motion.div>
  );
}

export default ActivitiesSection;
