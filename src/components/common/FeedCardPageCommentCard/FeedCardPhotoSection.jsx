import React from "react";

function FeedCardPhotoSection({ photo }) {
  return (
    <div className="relative w-12 h-12">
      {!photo && <div className="w-12 h-12 rounded-full bg-fuchsia-600"></div>}
      {photo && <img src={photo} alt="profile" className="object-cover w-10 h-10 rounded-full" />}
    </div>
  );
}

export default FeedCardPhotoSection;
