import React from "react";
import FollowRequestButton from "./FollowRequestButton";
import NotificationFollowCard from "../../common/NotificationCard/NotificationFollowCard";
import FeedCardPageBackButton from "../FeedCardPage/FeedCardPageBackButton";
import InfoLabel from "../../common/InfoLabel";

function FollowSection({ notificationList, status, activeTab, followRequestStatus }) {
  return (
    <div>
      {/* {!followRequestStatus && activeTab === 0 && <FollowRequestButton />} */}
      {status === "loading" && activeTab === 0 && <InfoLabel text="Loading..." />}
      {!followRequestStatus &&
        activeTab === 0 &&
        notificationList
          ?.filter((notification) => notification?.type === "follow")
          .reverse()
          .map((notification, index) => (
            <NotificationFollowCard
              key={index}
              uid={notification.from?.uid}
              nick={notification.from?.nick}
              photoURL={notification.from?.photo}
              date={notification?.date}
              deleteId={notification.id}
            />
          ))}
      {followRequestStatus && activeTab === 0 && (
        <div className="mt-2">
          <FeedCardPageBackButton location={true} />
          <InfoLabel text="Coming soon..." />
        </div>
      )}
    </div>
  );
}

export default FollowSection;
